import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import retroSunImg from "@assets/generated_images/Retro_teal_orange_sun_08d87596.png";

export default function AnalyticsPage() {
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

    // Auto-trigger animations on page load
    setTimeout(() => {
      sections?.forEach((section) => section.classList.add("visible"));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const sections = [
    {
      title: "Custom App Build",
      description: "Tailored applications that solve your unique business challenges with cutting-edge technology and intelligent design."
    },
    {
      title: "System Consulting",
      description: "Strategic guidance for optimizing your workflows, integrating new technologies, and maximizing operational efficiency."
    },
    {
      title: "Trading / Market Analysis",
      description: "Advanced market intelligence, real-time alerts, and analytical tools for informed trading decisions in digital assets and traditional markets."
    },
    {
      title: "Innovation & Beyond",
      description: "Visionary solutions that push boundaries - from intelligent bots to prompt engineering breakthroughs that transform how you work."
    }
  ];

  return (
    <div ref={contentRef} className="min-h-screen" data-testid="analytics-page">
      <section className="analytics-gradient min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            <div className="content-section text-slate-800">
              <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6" style={{color: 'hsl(174, 62%, 35%)'}} data-testid="analytics-title">
                See Tomorrow Today
              </h1>
              <h2 className="text-2xl md:text-3xl font-light mb-8" style={{color: 'hsl(25, 95%, 45%)'}} data-testid="analytics-subtitle">
                What problem would you like to solve?
              </h2>
              <p className="text-xl mb-8 text-slate-700 leading-relaxed" data-testid="analytics-description">
                At Oria Dawn, we develop cutting-edge solutions through visionary prompt engineering. From intelligent systems to real-time analytics, we create the tools that maximize your potential in the markets and beyond.
              </p>
              <p className="text-lg mb-12 text-slate-600 font-semibold" data-testid="analytics-tagline">
                So what will you build today?
              </p>
              
              <div className="space-y-8 mb-12">
                {sections.map((section, index) => (
                  <div 
                    key={section.title}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    data-testid={`analytics-section-${index}`}
                  >
                    <h3 className="font-serif text-xl font-semibold mb-3" style={{color: 'hsl(174, 62%, 35%)'}} data-testid={`section-title-${index}`}>
                      {section.title}
                    </h3>
                    <p className="text-slate-700 leading-relaxed" data-testid={`section-description-${index}`}>
                      {section.description}
                    </p>
                  </div>
                ))}
              </div>
              
              <Link href="/contact">
                <Button className="btn-hover px-10 py-4 rounded-full font-bold text-lg transition-all duration-300" style={{backgroundColor: 'hsl(25, 95%, 65%)', color: 'white'}} data-testid="work-with-me-button">
                  Work With Me
                </Button>
              </Link>
            </div>
            
            <div className="content-section">
              <div className="relative" data-testid="analytics-images">
                <img 
                  src={retroSunImg} 
                  alt="Retro-style sun with teal, orange and cream colors representing innovative analytics" 
                  className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl"
                  data-testid="main-analytics-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-400/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
