
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Helping Brands &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-purple">
            Individuals
          </span>{' '}
          Shine Online
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
          From LinkedIn growth to clean websites — I blend strategy, writing, and code.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transform hover:scale-105 transition-all duration-300"
          >
            View Portfolio
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-6 border-2 hover:bg-primary-50 dark:hover:bg-primary-950 transform hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-purple rounded-full opacity-20 animate-float" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 bg-gradient-to-br from-accent-emerald to-primary-400 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-accent-warm to-primary-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
};
