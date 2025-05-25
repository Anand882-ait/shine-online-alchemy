
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Portfolio
        </h2>
        
        {/* LinkedIn Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-primary">LinkedIn Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="service-card p-6 group">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">Before/After</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Profile Makeover</Badge>
                  <Badge variant="outline" className="text-xs">+250% Views</Badge>
                </div>
                <h4 className="font-semibold mb-2">Tech Startup CEO</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete LinkedIn transformation resulting in 3x connection requests.
                </p>
                <Button variant="outline" size="sm">View Case Study</Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Writing */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-accent-purple">Technical Writing</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="service-card p-6 group">
                <div className="aspect-video bg-gradient-to-br from-accent-purple/20 to-accent-purple/40 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-accent-purple font-semibold">Article Preview</span>
                </div>
                <h4 className="font-semibold mb-2">Modern Web Development</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive guide on React best practices and performance optimization.
                </p>
                <Button variant="outline" size="sm">Read Article</Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Website Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-accent-emerald">Website Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="service-card p-6 group">
                <div className="aspect-video bg-gradient-to-br from-accent-emerald/20 to-accent-emerald/40 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-accent-emerald font-semibold">Website Screenshot</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">React</Badge>
                  <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                  <Badge variant="secondary" className="text-xs">Tailwind</Badge>
                </div>
                <h4 className="font-semibold mb-2">E-commerce Platform</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Modern, responsive e-commerce solution with advanced features.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Live Site</Button>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
