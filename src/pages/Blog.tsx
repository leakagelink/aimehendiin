import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  title_en: string | null;
  excerpt: string;
  featured_image: string | null;
  category: string;
  published_at: string | null;
  created_at: string | null;
  read_time: number | null;
  is_featured: boolean | null;
}

const Blog = () => {
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, slug, title, title_en, excerpt, featured_image, category, published_at, created_at, read_time, is_featured")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const featuredPost = blogPosts?.find(post => post.is_featured) || blogPosts?.[0];
  const otherPosts = blogPosts?.filter(post => post.id !== featuredPost?.id) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8 md:py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                मेहंदी <span className="text-secondary">ब्लॉग</span>
              </h1>
            </div>
            <div className="mb-12">
              <Skeleton className="h-64 md:h-80 w-full rounded-2xl" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 md:py-16">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              मेहंदी <span className="text-secondary">ब्लॉग</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Mehendi tips, tutorials, and inspiration. Latest trends and traditional designs.
              <br />
              <span className="text-sm">
                मेहंदी टिप्स, ट्यूटोरियल्स और प्रेरणा।
              </span>
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <Link 
                to={`/blog/${featuredPost.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                    <img
                      src={featuredPost.featured_image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=500&fit=crop"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">
                        Featured
                      </span>
                      <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredPost.published_at || featuredPost.created_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {featuredPost.read_time} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=500&fit=crop"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {post.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-foreground mt-3 mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                    <span className="flex items-center gap-1 text-secondary group-hover:translate-x-1 transition-transform">
                      Read More
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
