import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import pastelSunriseImg from "@assets/generated_images/Pastel_teal_orange_sunrise_32b942c2.png";

export default function HomePage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = contentRef.current?.querySelectorAll(".content-section");
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={contentRef} className="min-h-screen" data-testid="home-page">
      <section className="hero-gradient min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="content-section">
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-deep-green leading-tight mb-8" data-testid="hero-title">
                <span className="block">Oria Dawn</span>
                <span className="block text-retro-orange text-3xl md:text-4xl font-light italic">Maximize your potential</span>
              </h1>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 border border-sage-mint/30 shadow-lg" data-testid="hero-questions">
                <div className="text-xl md:text-2xl text-deep-green mb-6 font-light space-y-3">
                  <p className="flex items-center"><span className="text-retro-orange mr-3 text-2xl">✦</span>What is it that you can imagine?</p>
                  <p className="flex items-center"><span className="text-retro-orange mr-3 text-2xl">✦</span>What would you like to create?</p>
                  <p className="flex items-center"><span className="text-retro-orange mr-3 text-2xl">✦</span>What problem would you like to solve?</p>
                </div>
                
                <div className="border-t border-sage-mint/30 pt-6">
                  <p className="text-xl font-serif font-bold text-deep-green mb-4">At Oria Dawn, we build tomorrow's tools today.</p>
                  <p className="text-lg text-gray-700 mb-4">With <span className="font-semibold text-retro-orange">visionary prompt engineering</span> we develop:</p>
                  
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-start space-x-3">
                      <span className="text-sage-mint text-lg">▶</span>
                      <span className="text-gray-700">Applications that solve unique challenges</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-sage-mint text-lg">▶</span>
                      <span className="text-gray-700">Alert systems with real-time data</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-sage-mint text-lg">▶</span>
                      <span className="text-gray-700">Intelligent Bots that work for you</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-sage-mint text-lg">▶</span>
                      <span className="text-gray-700">Analytics for trading & research</span>
                    </div>
                  </div>
                  
                  <div className="bg-retro-orange/10 rounded-xl p-4 mb-4">
                    <p className="text-lg text-deep-green">Our <span className="font-semibold">R.I.S.E volunteer program for kids</span>. Getting kids working together to reach, inspire, serve, and empower their communities.</p>
                  </div>
                  
                  <p className="font-bold text-2xl text-center text-deep-green">So what will you build today?</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/analytics" data-testid="cta-analytics">
                  <Button className="btn-hover bg-deep-green text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-deep-green/90">
                    Explore Analytics
                  </Button>
                </Link>
                <Link href="/rise" data-testid="cta-rise">
                  <Button className="btn-hover bg-retro-orange text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-retro-orange/90">
                    Visit RISE
                  </Button>
                </Link>
              </div>
            </div>
            <div className="content-section">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden shadow-2xl" data-testid="hero-image">
                <img 
                  src={pastelSunriseImg} 
                  alt="Soft pastel sunrise with teal, orange and cream colors" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-mint/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
