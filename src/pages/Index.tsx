
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IDCardEntry } from '@/components/IDCardEntry';
import { CursorFollower } from '@/components/CursorFollower';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ClientsSection } from '@/components/ClientsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';

const Index = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      setShowPortfolio(true);
      toast.success("Welcome to my portfolio! 🎉");
    }, 800);
  };

  if (!showPortfolio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-purple/5 dark:from-background dark:via-gray-900 dark:to-accent-purple/10 relative overflow-hidden">
        <CursorFollower />
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <IDCardEntry onUnlock={handleUnlock} isUnlocked={isUnlocked} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-accent-purple/5 dark:from-background dark:via-gray-900 dark:to-accent-purple/10 relative">
      <CursorFollower />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">ANAND S</div>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-primary">ANAND S</div>
            <div className="text-muted-foreground">
              © 2024 Anand S. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
