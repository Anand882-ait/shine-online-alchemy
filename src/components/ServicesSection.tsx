
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const ServicesSection = () => {
  const services = [
    {
      icon: '👤',
      title: 'LinkedIn Profile Optimization',
      description: 'Transform your LinkedIn presence with strategic profile optimization and compelling content.',
      details: 'Complete profile makeover, keyword optimization, compelling headlines, and professional summary writing.',
    },
    {
      icon: '📈',
      title: 'LinkedIn Branding & Management',
      description: 'Build your personal brand and grow your network with consistent, engaging content.',
      details: 'Content strategy, post scheduling, engagement management, and network growth tactics.',
    },
    {
      icon: '✍️',
      title: 'Technical Writing',
      description: 'High-quality blogs, documentation, and ghostwriting for technical and business content.',
      details: 'Blog posts, technical documentation, whitepapers, case studies, and thought leadership articles.',
    },
    {
      icon: '💻',
      title: 'Website Development & Maintenance',
      description: 'Modern, responsive websites built with the latest technologies and best practices.',
      details: 'Custom web development, responsive design, performance optimization, and ongoing maintenance.',
    },
  ];

  return (
    <section id="services" className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Services
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="service-card p-8 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:animate-bounce">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="border-t border-border pt-4 mt-4">
                  <p className="text-sm text-muted-foreground mb-4">{service.details}</p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
