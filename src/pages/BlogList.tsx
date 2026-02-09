import { useState } from "react";
import { blogs as staticBlogs } from "../data/blogs";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState(staticBlogs);

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-200 pb-24">
      <section className="max-w-5xl mx-auto pt-16 px-5.5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-col items-center md:items-start text-center md:text-left mb-16"
        >
          <h1 className="text-primary text-4xl sm:text-5xl md:text-6xl font-bold font-space-grotesk tracking-tight">
            Our <span className="text-accent">Blog</span>
          </h1>
          <p className="text-secondary text-lg max-w-xl mt-5">
            Insights, tutorials, and reflections on design, technology, and the
            future of the web.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group flex flex-col bg-background border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 h-full shadow-lg hover:shadow-blue-500/10 cursor-pointer"
            >
              <div className="px-5 pt-6 flex items-center gap-2 group/author">
                <div className="w-8 h-8 flex text-white justify-center items-center text-xs font-bold rounded-full bg-linear-to-br from-blue-500 to-purple-600 border border-white/10 shadow-md shadow-blue-500/20">
                  M
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-[11px] font-bold font-space-grotesk tracking-wider uppercase">
                    Rahim Siddiqui
                  </span>
                </div>
              </div>
              <div className="block overflow-hidden transition-colors duration-300 aspect-video w-full relative p-5 pb-0 bg-background">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://picsum.photos/800/450?random=${index}`;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
              </div>

              <div className="px-5 py-6 md:pb-8 flex flex-col grow">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#3b82f6] bg-[#1d4ed8]/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                    {post.category}
                  </span>
                  <span className="text-xs text-secondary font-mono">
                    {new Date(post.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </span>
                </div>

                <div className="block group/title">
                  <h2 className="text-primary text-2xl font-bold font-space-grotesk mb-3 leading-tight group-hover/title:text-blue-600 dark:group-hover:text-blue-500 truncate transition-colors duration-100">
                    {post.title}
                  </h2>
                </div>

                <p className="text-secondary text-sm leading-relaxed mb-8 grow line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors"
                  >
                    Read More
                    <svg
                      className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogList;
