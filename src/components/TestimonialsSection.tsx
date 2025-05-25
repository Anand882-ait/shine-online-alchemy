
import { Card } from '@/components/ui/card';
import { useState } from 'react';

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "Anand transformed my LinkedIn presence completely. Within weeks, I was getting quality connection requests and job offers.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "SJ"
    },
    {
      quote: "The website Anand built for us exceeded all expectations. Modern, fast, and perfectly represents our brand.",
      author: "Michael Chen",
      role: "Startup Founder",
      avatar: "MC"
    },
    {
      quote: "His technical writing skills are exceptional. The documentation he created made our complex product accessible to everyone.",
      author: "Emily Rodriguez",
      role: "Product Manager",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          What Clients Say
        </h2>
        
        <div className="relative">
          <Card className="service-card p-8 text-center min-h-[300px] flex flex-col justify-center">
            <div className="text-4xl text-primary mb-6">"</div>
            <blockquote className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
              {testimonials[currentTestimonial].quote}
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {testimonials[currentTestimonial].avatar}
                </span>
              </div>
              <div className="text-left">
                <div className="font-semibold">{testimonials[currentTestimonial].author}</div>
                <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
          </Card>
          
          {/* Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
