import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowLeft, Tag, Share2, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BlogPostSEO from "@/components/blog/BlogPostSEO";
import AuthorCard from "@/components/blog/AuthorCard";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPosts from "@/components/blog/RelatedPosts";
import SocialShareButtons from "@/components/blog/SocialShareButtons";
import FloatingShareBar from "@/components/blog/FloatingShareBar";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import RelatedCollections from "@/components/blog/RelatedCollections";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null);

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Add IDs to headings for TOC navigation
  useEffect(() => {
    if (contentRef.current && post) {
      const headings = contentRef.current.querySelectorAll("h2, h3");
      headings.forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
    }
  }, [post]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8 md:py-16">
          <div className="container max-w-4xl">
            <Skeleton className="h-6 w-32 mb-6" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="aspect-video w-full mb-8 rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        {/* Not-found state must never be indexed and must not emit a canonical */}
        <Helmet>
          <title>Article Not Found (404) | AIMehendi.in</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <Header />
        <main className="py-16 md:py-24">
          <div className="container text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Article Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                Sorry, यह article exist नहीं करता या remove कर दिया गया है।
              </p>
              <Link to="/blog">
                <Button size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                  Back to Blog
                </Button>
              </Link>
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
      <BlogPostSEO
        title={post.title}
        metaTitle={post.meta_title}
        metaDescription={post.meta_description}
        slug={post.slug}
        featuredImage={post.featured_image}
        publishedAt={post.published_at}
        category={post.category}
        tags={post.tags}
        excerpt={post.excerpt}
        content={post.content}
      />

      {/* Floating Share Bar */}
      <FloatingShareBar
        title={post.title}
        url={typeof window !== "undefined" ? window.location.href : `https://aimehendi.in/blog/${post.slug}`}
        excerpt={post.excerpt}
      />

      <Header />

      {/* Hero Section with Featured Image */}
      {post.featured_image && (
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={post.featured_image}
            alt={`${post.title} - ${post.category} Mehendi Design`}
            title={post.meta_title}
            loading="eager"
            decoding="async"
            width={1200}
            height={672}
            className="w-full h-full object-cover"
            itemProp="image"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
      )}

      <main className={`py-8 md:py-12 ${post.featured_image ? "-mt-32 md:-mt-40 relative z-10" : ""}`}>
        <article className="container max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-secondary transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Article Card */}
          <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
            {/* Article Header */}
            <header className="p-6 md:p-10 border-b border-border">
              {/* Category & Featured Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-4 py-1.5 rounded-full bg-secondary/10 text-sm font-medium text-secondary">
                  {post.category}
                </span>
                {post.is_featured && (
                  <span className="px-4 py-1.5 rounded-full bg-accent/10 text-sm font-medium text-accent flex items-center gap-1">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                {post.title}
              </h1>

              {/* English Title */}
              {post.title_en && (
                <p className="text-lg text-muted-foreground mb-6">
                  {post.title_en}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span className="font-medium text-foreground">Dheeraj Tagde</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={post.published_at || post.created_at || ""}>
                    {formatDate(post.published_at || post.created_at)}
                  </time>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{post.read_time} min read</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors ml-auto"
                  aria-label="Share article"
                >
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </header>

            {/* Article Body */}
            <div className="p-6 md:p-10">
              {/* Excerpt Box */}
              <div className="bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/20 rounded-xl p-6 mb-8">
                <p className="text-lg text-foreground leading-relaxed font-medium">
                  {post.excerpt}
                </p>
                {post.excerpt_en && (
                  <p className="text-muted-foreground mt-3 text-sm italic">
                    {post.excerpt_en}
                  </p>
                )}
              </div>

              {/* Table of Contents */}
              <TableOfContents content={post.content} />

              {/* Article Content */}
              <div
                ref={contentRef}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Tag className="h-5 w-5 text-secondary" aria-hidden="true" />
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-muted hover:bg-secondary/10 text-sm font-medium text-muted-foreground hover:text-secondary transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share Buttons */}
              <div className="mt-10 pt-8 border-t border-border">
                <SocialShareButtons
                  title={post.title}
                  url={typeof window !== "undefined" ? window.location.href : `https://aimehendi.in/blog/${post.slug}`}
                  excerpt={post.excerpt}
                />
              </div>
            </div>
          </div>

          {/* Author Section */}
          <section className="mt-10">
            <AuthorCard />
          </section>

          {/* CTA Section */}
          <section className="mt-10 bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/10 rounded-2xl p-8 md:p-10 text-center border border-secondary/20">
            <div className="max-w-xl mx-auto">
              <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
                🌿 Free AI Tool
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                अपना Unique Mehendi Design बनाएं!
              </h3>
              <p className="text-muted-foreground mb-6">
                AI Mehendi Generator से seconds में beautiful designs generate करें। No skills needed!
              </p>
              <Link to="/generate">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-gold">
                  Try AI Generator Free →
                </Button>
              </Link>
            </div>
          </section>

          {/* Contextual gallery / landing page links relevant to this topic */}
          <RelatedCollections
            category={post.category}
            tags={post.tags}
            title={post.title}
          />

          {/* Related Posts */}
          <RelatedPosts currentSlug={post.slug} category={post.category} />

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors font-medium"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              सभी Articles देखें
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
