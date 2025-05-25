
import { Badge } from '@/components/ui/badge';

export const AboutSection = () => {
  const skills = ['HTML', 'SEO', 'LinkedIn', 'WordPress', 'Python', 'React', 'TypeScript', 'Node.js'];

  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Who Am I?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-primary-200 to-primary-400 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="w-64 h-64 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center">
                  <span className="text-gray-600 text-2xl font-semibold">ANAND S</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-warm rounded-full animate-glow" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent-purple rounded-full animate-float" />
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              I'm a full-stack freelancer who helps professionals and startups grow online 
              through smart branding, content, and tech. I'm passionate about delivering 
              clean, scalable digital results.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="skill-tag px-4 py-2 text-sm font-medium"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary mb-2">3+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
