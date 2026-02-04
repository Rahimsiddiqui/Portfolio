import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const Blog = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 1. Try to find in localStorage
        const cachedBlogs = localStorage.getItem("blogs");
        if (cachedBlogs) {
          const blogs = JSON.parse(cachedBlogs);
          const foundPost = blogs.find(
            (p) => p.slug === slug || p._id === slug,
          );
          if (foundPost) {
            setPost(foundPost);
            setViews(foundPost.views || 0);
            setLoading(false);
            return;
          }
        }

        // 2. Fetch from API if not in cache
        const response = await fetch(`http://localhost:5000/api/blog/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setPost(data);
          setViews(data.views || 0);
        } else {
          console.error("Post not found");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.emit("view-blog", post.slug);

    socket.on("view-count-update", (data) => {
      if (data.slug === post.slug) {
        setViews(data.views);
      }
    });

    socket.on("set-cookie", (data) => {
      let cookieString = `${data.name}=${data.value}; path=/`;
      if (data.options?.maxAge) {
        cookieString += `; max-age=${data.options.maxAge / 1000}`;
      }
      document.cookie = cookieString;
    });

    return () => {
      socket.disconnect();
    };
  }, [post?.slug]); // Only run when we have the slug

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border-3 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-3 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h1 className="text-primary text-2xl font-bold mb-4">Post not found</h1>
        <Link
          to="/blog"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-200 pb-24">
      <article className="max-w-4xl mx-auto pt-16 px-5.5 sm:px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-8"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Blogs
          </Link>

          <div className="flex items-center gap-3 mb-6 group/author">
            <div className="w-10 h-10 flex justify-center items-center font-bold rounded-full bg-linear-to-br from-blue-500 to-purple-600 border border-white/10 shadow-md shadow-blue-500/20">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-sm font-bold font-space-grotesk tracking-wider uppercase">
                Rahim Siddiqui
              </span>
              <span className="text-secondary text-[10px] uppercase tracking-[0.1em]">
                Author
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
              {post.category}
            </span>
            <span className="text-xs text-secondary font-mono">
              {new Date(post.createdAt || post.date).toLocaleDateString(
                "en-US",
                { month: "short", day: "numeric", year: "numeric" },
              )}
            </span>
            <span className="text-xs text-secondary font-mono flex items-center gap-1 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {views}
            </span>
          </div>

          <h1 className="text-primary text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk leading-tight tracking-tight mb-8">
            {post.title}
          </h1>

          <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-border/40">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg dark:prose-invert max-w-none text-secondary"
        >
          <div
            className="blog-content space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* CSS for custom blog content styling since we aren't using tailwind-prose */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .blog-content h2 {
            color: var(--color-primary);
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.875rem;
            font-weight: 700;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
          }
          .blog-content p {
            line-height: 1.8;
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
          }
          .blog-content blockquote {
            border-left: 4px solid var(--color-blue-500);
            padding-left: 1.5rem;
            font-style: italic;
            color: var(--color-primary);
            margin: 2.5rem 0;
            font-size: 1.25rem;
          }
          .blog-content ul {
            list-style-type: disc;
            padding-left: 1.5rem;
            margin-bottom: 1.5rem;
            space-y: 0.5rem;
          }
          .blog-content li {
            margin-bottom: 0.5rem;
          }
        `,
          }}
        />
      </article>
    </div>
  );
};

export default Blog;
