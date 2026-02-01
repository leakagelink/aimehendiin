import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: "1",
    slug: "best-bridal-mehendi-designs-2026",
    title: "2026 की Best Bridal Mehendi Designs",
    titleEn: "Best Bridal Mehendi Designs 2026",
    excerpt: "दुल्हनों के लिए सबसे खूबसूरत और ट्रेंडिंग Bridal Mehendi Designs। AI से बनाएं अपना unique design।",
    image: "https://images.unsplash.com/photo-1595486650748-8f08e7839c90?w=800&h=500&fit=crop",
    category: "Bridal",
    date: "2026-01-28",
    readTime: "5 min",
  },
  {
    id: "2",
    slug: "arabic-mehendi-design-guide",
    title: "Arabic Mehendi Design कैसे बनाएं",
    titleEn: "Complete Guide to Arabic Mehendi",
    excerpt: "Arabic Mehendi की complete guide। जानें इसकी खासियत और कैसे बनाएं perfect Arabic design।",
    image: "https://images.unsplash.com/photo-1560707854-fb9a10ced6e2?w=800&h=500&fit=crop",
    category: "Arabic",
    date: "2026-01-25",
    readTime: "7 min",
  },
  {
    id: "3",
    slug: "simple-mehendi-designs-beginners",
    title: "Simple Mehendi Design Ideas for Beginners",
    titleEn: "Simple Mehendi for Beginners",
    excerpt: "शुरुआती लोगों के लिए आसान और सुंदर Simple Mehendi Designs। Step by step guide।",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=500&fit=crop",
    category: "Simple",
    date: "2026-01-22",
    readTime: "4 min",
  },
  {
    id: "4",
    slug: "karwa-chauth-mehendi-2026",
    title: "Karwa Chauth Special Mehendi Designs 2026",
    titleEn: "Karwa Chauth Special Designs",
    excerpt: "करवा चौथ के लिए खास मेहंदी डिज़ाइन। Traditional और modern दोनों styles।",
    image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800&h=500&fit=crop",
    category: "Festival",
    date: "2026-01-20",
    readTime: "6 min",
  },
  {
    id: "5",
    slug: "finger-mehendi-latest-trends",
    title: "Finger Mehendi Designs - Latest Trends",
    titleEn: "Trending Finger Mehendi",
    excerpt: "Latest finger mehendi trends और designs। Quick apply के लिए perfect choices।",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
    category: "Finger",
    date: "2026-01-18",
    readTime: "4 min",
  },
];

const Blog = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          <div className="mb-12">
            <Link 
              to={`/blog/${blogPosts[0].slug}`}
              className="group block bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-xs font-medium text-secondary">
                      Featured
                    </span>
                    <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {blogPosts[0].category}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(blogPosts[0].date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
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
                      {formatDate(post.date)}
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
