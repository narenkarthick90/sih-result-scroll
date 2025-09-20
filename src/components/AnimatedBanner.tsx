import { useEffect, useState } from "react";

interface AnimatedBannerProps {
  text: string;
  emoji?: string;
}

export const AnimatedBanner = ({ text, emoji = "🎉" }: AnimatedBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    // Start typing animation after component mounts
    const timer1 = setTimeout(() => setIsVisible(true), 300);
    // Start glow effect after typing completes
    const timer2 = setTimeout(() => setShowGlow(true), 3800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl p-8 mb-8 animate-slide-in-up">
      {/* Background shimmer effect */}
      <div className="absolute inset-0 animate-shimmer opacity-50" />
      
      {/* Main content */}
      <div className="relative text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span 
            className={`inline-block ${isVisible ? 'animate-typing' : 'w-0'} ${
              showGlow ? 'animate-glow' : ''
            } bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}
          >
            {text}
          </span>
          {showGlow && (
            <span className="ml-4 inline-block animate-bounce text-2xl md:text-4xl">
              {emoji}
            </span>
          )}
        </h1>
        
        {showGlow && (
          <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-scale">
            Official Smart India Hackathon Results - IIC NITT
          </p>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="absolute top-8 right-8 w-3 h-3 bg-accent rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-4 left-8 w-2 h-2 bg-primary rounded-full animate-pulse delay-700" />
    </div>
  );
};