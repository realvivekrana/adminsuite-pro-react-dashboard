import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    avatar: "SJ",
    content: "AdminSuite Pro has transformed how we manage our operations. The analytics dashboard provides insights we never had before, and the user interface is incredibly intuitive.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO at StartupHub",
    avatar: "MC",
    content: "The best admin dashboard I've used. Clean code, excellent documentation, and the React + TypeScript stack makes it easy to customize. Highly recommended for any SaaS product.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director at DataFlow",
    avatar: "ER",
    content: "We switched to AdminSuite Pro six months ago and haven't looked back. The real-time analytics and user management features have streamlined our entire workflow.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by teams <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our customers have to say about AdminSuite Pro
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition-all duration-500" />
              
              {/* Card */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary ring-2 ring-primary/20">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
