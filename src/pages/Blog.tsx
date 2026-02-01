import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight, User, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const AUTHOR = {
  name: "Dheeraj Tagde",
  avatar: "https://ui-avatars.com/api/?name=Dheeraj+Tagde&background=c4956a&color=fff&size=100&font-size=0.35",
  initials: "DT",
};

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
      month: "short",
      day: "numeric",
    });
  };

  const featuredPost = blogPosts?.find(post => post.is_featured) || blogPosts?.[0];
  const otherPosts = blogPosts?.filter(post => post.id !== featuredPost?.id) || [];

  // JSON-LD for Blog listing
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "AIMehendi Blog - Mehendi Tips & Tutorials",
    description: "Latest mehendi design tips, tutorials, bridal inspiration and traditional henna art guides.",
    url: "https://aimehendi.in/blog",
    author: {
      "@type": "Person",
      name: AUTHOR.name,
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8 md:py-16">
          <div className="container">
            <div className="text-center mb-12">
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <Skeleton className="h-80 w-full rounded-2xl mb-12" />
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
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Mehendi Blog - Tips, Tutorials & Design Ideas | AIMehendi.in</title>
        <meta name="description" content="Explore latest mehendi design tips, bridal henna tutorials, and traditional mehndi art guides. Expert advice by Dheeraj Tagde." />
        <meta name="author" content={AUTHOR.name} />
        <link rel="canonical" href="https://aimehendi.in/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Mehendi Blog - Tips & Tutorials | AIMehendi.in" />
        <meta property="og:description" content="Latest mehendi design tips, tutorials, and inspiration." />
        <meta property="og:url" content="https://aimehendi.in/blog" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <Header />
      
      <main className="py-8 md:py-16">
        <div className="container">
          {/* Page Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
              <BookOpen className="h-4 w-4" />
              Expert Mehendi Guides
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">
              मेहंदी <span className="text-secondary">ब्लॉग</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Mehendi tips, tutorials और inspiration। Latest trends से लेकर traditional designs तक।
            </p>
            {/* Author Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-soft">
              <Avatar className="h-10 w-10 ring-2 ring-secondary/20">
                <AvatarImage src={AUTHOR.avatar} alt={AUTHOR.name} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-semibold">
                  {AUTHOR.initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Written by</p>
                <p className="font-medium text-foreground">{AUTHOR.name}</p>
              </div>
            </div>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12 md:mb-16">
              <Link 
                to={`/blog/${featuredPost.slug}`}
                className="group block bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-glow transition-all duration-500"
              >
                <div className="grid md:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-video md:aspect-auto md:h-full overflow-hidden">
                    <img
                      src={featuredPost.featured_image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=500&fit=crop"}
                      alt={`${featuredPost.title} - ${featuredPost.category} Mehendi Design`}
                      title={featuredPost.title}
                      loading="eager"
                      decoding="async"
                      width={800}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-background/20" />
                    {/* Featured Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium shadow-lg">
                      <Sparkles className="h-4 w-4" />
                      Featured Article
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-10 flex flex-col justify-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-muted text-sm font-medium text-muted-foreground w-fit mb-4">
                      {featuredPost.category}
                    </span>
                    
                    <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    
                    {featuredPost.title_en && (
                      <p className="text-muted-foreground text-sm mb-4 italic">
                        {featuredPost.title_en}
                      </p>
                    )}
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={AUTHOR.avatar} alt={AUTHOR.name} />
                          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                            {AUTHOR.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">{AUTHOR.name}</span>
                      </div>
                      <span className="text-muted-foreground">•</span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredPost.published_at || featuredPost.created_at)}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {featuredPost.read_time} min read
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Section Title */}
          {otherPosts.length > 0 && (
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Latest Articles
              </h2>
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground">{otherPosts.length} articles</span>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {otherPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.featured_image || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=500&fit=crop"}
                    alt={`${post.title} - ${post.category} Mehendi Design`}
                    title={post.title}
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Author & Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={AUTHOR.avatar} alt={AUTHOR.name} />
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {AUTHOR.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs">
                        <p className="font-medium text-foreground">{AUTHOR.name}</p>
                        <p className="text-muted-foreground">{formatDate(post.published_at || post.created_at)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-secondary font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Read
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {(!blogPosts || blogPosts.length === 0) && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                Coming Soon!
              </h3>
              <p className="text-muted-foreground">
                New articles jaldi aane wale hain। Stay tuned!
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 rounded-2xl p-8 md:p-12 text-center border border-secondary/20">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
              🌿 Try Now
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
              AI Mehendi Generator आज़माएं!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Reading se zyada, creating try करें! Seconds में unique mehendi designs generate करें।
            </p>
            <Link 
              to="/generate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium rounded-full shadow-gold transition-all"
            >
              Generate Design Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
