import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

const RelatedPosts = ({ currentSlug, category }: RelatedPostsProps) => {
  const { data: posts } = useQuery({
    queryKey: ["related-posts", category, currentSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug, title, featured_image, read_time")
        .eq("is_published", true)
        .eq("category", category)
        .neq("slug", currentSlug)
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
        Related Articles 📚
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block bg-card border border-border rounded-xl overflow-hidden hover:shadow-card transition-all duration-300"
          >
            {post.featured_image && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-4">
              <h4 className="font-serif font-semibold text-foreground line-clamp-2 group-hover:text-secondary transition-colors">
                {post.title}
              </h4>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>{post.read_time} min read</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
