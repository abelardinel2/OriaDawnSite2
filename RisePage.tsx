import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Sun, Rainbow, Star, Music, Palette, Leaf, Heart, Calendar, MapPin, Users } from "lucide-react";
import kidsGiveImg from "@assets/IMG_1802_1755750809193.jpeg";
import kidsShareImg from "@assets/IMG_1804_1755750856582.jpeg";
import kidsMakeImg from "@assets/IMG_1805_1755750856582.jpeg";
import kidsConnectImg from "@assets/IMG_1806_1755750856582.jpeg";

interface VolunteerFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  availability: string;
  whyInterested: string;
  experienceWithChildren: string;
  isOver18: string;
  agreesBackgroundCheck: string;
}

export default function RisePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [volunteerForm, setVolunteerForm] = useState<VolunteerFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    availability: "",
    whyInterested: "",
    experienceWithChildren: "",
    isOver18: "",
    agreesBackgroundCheck: "false"
  });

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

  const volunteerMutation = useMutation({
    mutationFn: async (data: VolunteerFormData) => {
      const response = await apiRequest("POST", "/api/volunteer-signup", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thanks for reaching out!",
        description: "We'll be in touch soon to get you involved with RISE.",
      });
      setVolunteerForm({
        fullName: "",
        email: "",
        phoneNumber: "",
        availability: "",
        whyInterested: "",
        experienceWithChildren: "",
        isOver18: "",
        agreesBackgroundCheck: "false"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
      console.error("Volunteer signup error:", error);
    }
  });

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    volunteerMutation.mutate(volunteerForm);
  };

  const handleVolunteerInputChange = (field: keyof VolunteerFormData, value: string) => {
    setVolunteerForm(prev => ({ ...prev, [field]: value }));
  };

  const activities = [
    {
      title: "Kids Give 🌟",
      icon: Star,
      image: kidsGiveImg,
      alt: "Children engaged in giving and community service activities",
      items: [
        "Bake & deliver cookies to a shelter",
        "Make kindness cards for seniors or hospital staff",
        "Collect books or toys for donation drives"
      ],
      bgColor: "bg-warm-peach/30"
    },
    {
      title: "Kids Share 🎶",
      icon: Music,
      image: kidsShareImg,
      alt: "Children sharing their creativity through music and performance",
      items: [
        "Pizza + Poetry Nights (kids share stories, art, or music)",
        "Open mic nights for drawings, songs, or jokes"
      ],
      bgColor: "bg-retro-orange/30"
    },
    {
      title: "Kids Make 🎨",
      icon: Palette,
      image: kidsMakeImg,
      alt: "Children creating and making art projects together",
      items: [
        "Group art projects with recycled materials",
        "DIY crafts with purpose (seed packets, bookmarks, gift bags)",
        "Collaborate on a mural, zine, or pop-up project"
      ],
      bgColor: "bg-soft-yellow/50"
    },
    {
      title: "Kids Connect 🌿",
      icon: Leaf,
      image: kidsConnectImg,
      alt: "Children connecting with nature and each other outdoors",
      items: [
        "Guided nature walks & seasonal scavenger hunts",
        "Creek or park cleanups",
        "Community garden days or plant swaps"
      ],
      bgColor: "bg-sage-mint/50"
    }
  ];

  const upcomingProjects = [
    {
      title: "Hearts of Service",
      emoji: "💖",
      description: "A project to connect kids with local veterans through art, notes, and shared stories.",
      date: "Saturday, November 9, 2025",
      status: "Details to follow",
      ages: "Open to all ages",
      icon: Heart
    },
    {
      title: "Community Garden Kickoff",
      emoji: "🌱",
      description: "Start our neighborhood garden with seed planting, tool decorating, and planning our harvest goals.",
      date: "Sunday, March 15, 2025",
      status: "Registration opens soon",
      ages: "Ages 6-16+",
      icon: Leaf
    },
    {
      title: "Creative Connection Circle",
      emoji: "🎨",
      description: "Monthly art and storytelling sessions where kids share their creativity and build friendships.",
      date: "First Saturday of each month",
      status: "Ongoing program",
      ages: "Ages 4-14",
      icon: Palette
    }
  ];

  return (
    <div ref={contentRef} className="min-h-screen" data-testid="rise-page">
      <section className="bg-gradient-to-br from-warm-peach via-soft-yellow to-sage-mint min-h-screen pt-20">
        {/* Sunrise Header */}
        <div className="relative overflow-hidden">
          <div className="sunrise-rays absolute inset-0 h-32"></div>
          <div className="container mx-auto px-4 py-16 relative">
            <div className="text-center content-section">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full shadow-lg" style={{background: 'linear-gradient(135deg, hsl(174, 62%, 83%) 0%, hsl(25, 95%, 83%) 50%, hsl(35, 75%, 95%) 100%)'}} data-testid="rise-sun-icon">
                  <Sun className="w-8 h-8" style={{color: 'hsl(174, 62%, 35%)'}} />
                </div>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-deep-green mb-4" data-testid="rise-title">
                Oria Dawn R.I.S.E.
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-2 font-semibold tracking-wide" data-testid="rise-acronym">
                REACH • INSPIRE • SERVE • EMPOWER
              </p>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light" data-testid="rise-tagline">
                A space where kids rise through kindness, creativity & community.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* This Is What We Do Section */}
          <div className="content-section mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shadow-lg mb-4" style={{background: 'linear-gradient(135deg, hsl(174, 62%, 83%) 0%, hsl(25, 95%, 83%) 50%, hsl(35, 75%, 95%) 100%)'}} data-testid="what-we-do-icon">
                <Rainbow className="w-6 h-6" style={{color: 'hsl(25, 95%, 45%)'}} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-green mb-4" data-testid="what-we-do-title">
                This Is What We Do
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto" data-testid="what-we-do-description">
                At Oria Dawn RISE, we create real-world, heart-centered experiences for kids — outside the classroom and beyond the screen. Our programs are simple, joyful, and rooted in community, creativity, and service.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activities.map((activity, index) => (
                <div 
                  key={activity.title}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border ${activity.bgColor}`}
                  data-testid={`activity-card-${index}`}
                >
                  <div className="text-center mb-6">
                    <img 
                      src={activity.image}
                      alt={activity.alt}
                      className="w-full h-48 object-contain bg-gray-50 rounded-lg mb-4"
                      data-testid={`activity-image-${index}`}
                    />
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg" data-testid={`activity-icon-${index}`}>
                      <activity.icon className="w-6 h-6 text-deep-green" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-deep-green mb-4 text-center" data-testid={`activity-title-${index}`}>
                    {activity.title}
                  </h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    {activity.items.map((item, itemIndex) => (
                      <li key={itemIndex} data-testid={`activity-item-${index}-${itemIndex}`}>
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* All Ages Welcome Section */}
          <div className="content-section bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-warm-peach/30" data-testid="all-ages-section">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shadow-lg mb-6" style={{background: 'linear-gradient(135deg, hsl(174, 62%, 83%) 0%, hsl(25, 95%, 83%) 50%, hsl(35, 75%, 95%) 100%)'}} data-testid="all-ages-icon">
                <Rainbow className="w-6 h-6" style={{color: 'hsl(174, 62%, 35%)'}} />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-green mb-6" data-testid="all-ages-title">
                All Ages Welcome
              </h2>
              <p className="text-lg text-gray-700 mb-4 font-semibold" data-testid="age-range">
                (Ages 4–16+)
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed" data-testid="all-ages-description-1">
                At Oria Dawn RISE, we welcome kids of all ages — from curious preschoolers to thoughtful teens — to grow, create, and serve together. Each age brings its own energy, and all are needed. No pressure. No grades.
              </p>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" data-testid="all-ages-description-2">
                Our activities are designed to include everyone — whether your child wants to bake, draw, garden, or share a song. Each age brings its own energy, and all are needed.
              </p>
            </div>
          </div>

          {/* Upcoming Projects Section */}
          <div className="content-section mt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-retro-orange to-soft-yellow shadow-lg mb-4" data-testid="upcoming-projects-icon">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-green mb-4" data-testid="upcoming-projects-title">
                Upcoming Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-testid="upcoming-projects-description">
                Join us for these heart-centered experiences that bring our community together through creativity and service.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {upcomingProjects.map((project, index) => (
                <div 
                  key={project.title}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-warm-peach/20 hover:shadow-xl transition-shadow duration-300"
                  data-testid={`project-card-${index}`}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2" data-testid={`project-emoji-${index}`}>
                      {project.emoji}
                    </div>
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-sage-mint to-warm-peach shadow-md" data-testid={`project-icon-${index}`}>
                      <project.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-deep-green mb-3 text-center" data-testid={`project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed" data-testid={`project-description-${index}`}>
                    {project.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600" data-testid={`project-date-${index}`}>
                      <Calendar className="w-4 h-4 mr-2 text-retro-orange" />
                      {project.date}
                    </div>
                    <div className="flex items-center text-gray-600" data-testid={`project-status-${index}`}>
                      <MapPin className="w-4 h-4 mr-2 text-retro-orange" />
                      {project.status}
                    </div>
                    <div className="flex items-center text-gray-600" data-testid={`project-ages-${index}`}>
                      <Users className="w-4 h-4 mr-2 text-retro-orange" />
                      {project.ages}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteer Signup Form */}
          <div className="content-section mt-16">
            <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-warm-peach/30" data-testid="volunteer-signup-section">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-warm-peach to-sage-mint shadow-lg mb-4" data-testid="volunteer-signup-icon">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-deep-green mb-4" data-testid="volunteer-signup-title">
                  Join the Volunteer Circle
                </h2>
                <p className="text-lg text-gray-600" data-testid="volunteer-signup-description">
                  Ready to help create meaningful experiences for kids in our community?
                </p>
              </div>

              <form onSubmit={handleVolunteerSubmit} className="space-y-6" data-testid="volunteer-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </Label>
                    <Input
                      type="text"
                      id="fullName"
                      required
                      value={volunteerForm.fullName}
                      onChange={(e) => handleVolunteerInputChange("fullName", e.target.value)}
                      className="w-full px-4 py-3 border border-warm-peach/30 rounded-lg focus:ring-2 focus:ring-retro-orange focus:border-transparent transition-all duration-300"
                      data-testid="input-fullName"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      required
                      value={volunteerForm.email}
                      onChange={(e) => handleVolunteerInputChange("email", e.target.value)}
                      className="w-full px-4 py-3 border border-warm-peach/30 rounded-lg focus:ring-2 focus:ring-retro-orange focus:border-transparent transition-all duration-300"
                      data-testid="input-email"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number (optional)
                  </Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    value={volunteerForm.phoneNumber}
                    onChange={(e) => handleVolunteerInputChange("phoneNumber", e.target.value)}
                    className="w-full px-4 py-3 border border-warm-peach/30 rounded-lg focus:ring-2 focus:ring-retro-orange focus:border-transparent transition-all duration-300"
                    data-testid="input-phoneNumber"
                  />
                </div>

                <div>
                  <Label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability *
                  </Label>
                  <Select value={volunteerForm.availability} onValueChange={(value) => handleVolunteerInputChange("availability", value)}>
                    <SelectTrigger className="w-full px-4 py-3 border border-warm-peach/30 rounded-lg focus:ring-2 focus:ring-retro-orange focus:border-transparent transition-all duration-300" data-testid="select-availability">
                      <SelectValue placeholder="When are you available?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="flexible">Flexible - any time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="whyInterested" className="block text-sm font-semibold text-gray-700 mb-2">
                    Why are you interested in volunteering with RISE? *
                  </Label>
                  <Textarea
                    id="whyInterested"
                    required
                    value={volunteerForm.whyInterested}
                    onChange={(e) => handleVolunteerInputChange("whyInterested", e.target.value)}
                    className="w-full px-4 py-3 border border-warm-peach/30 rounded-lg focus:ring-2 focus:ring-retro-orange focus:border-transparent transition-all duration-300 resize-none"
                    rows={3}
                    placeholder="Share what draws you to work with kids and community..."
                    data-testid="textarea-whyInterested"
                  />
                </div>

                <div>
                  <Label htmlFor="experienceWithChildren" className="block text-sm font-semibold text-gray-700 mb-2">
                    Do you have experience with children or community groups? *
                  </Label>
                  <Textarea
                    id="experienceWithChildren"
                    required
                    value={volunteerForm.experienceWithChildren}
                    onChange={(e) => handleVolunteerInputChange("experienceWithChildren", e.target.value)}
                    className="w-full px-4 py-3 border border-warm-peach/30 rounded-lg focus:ring-2 focus:ring-retro-orange focus:border-transparent transition-all duration-300 resize-none"
                    rows={3}
                    placeholder="Tell us about any experience (formal or informal) you have..."
                    data-testid="textarea-experienceWithChildren"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-semibold text-gray-700 mb-3">
                    Are you over 18? *
                  </Label>
                  <RadioGroup 
                    value={volunteerForm.isOver18} 
                    onValueChange={(value) => handleVolunteerInputChange("isOver18", value)}
                    className="flex space-x-6"
                    data-testid="radio-isOver18"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="over18-yes" className="border-retro-orange data-[state=checked]:bg-retro-orange" />
                      <Label htmlFor="over18-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="over18-no" className="border-retro-orange data-[state=checked]:bg-retro-orange" />
                      <Label htmlFor="over18-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreesBackgroundCheck"
                    checked={volunteerForm.agreesBackgroundCheck === "true"}
                    onCheckedChange={(checked) => handleVolunteerInputChange("agreesBackgroundCheck", checked ? "true" : "false")}
                    className="mt-1 border-retro-orange data-[state=checked]:bg-retro-orange data-[state=checked]:border-retro-orange"
                    data-testid="checkbox-agreesBackgroundCheck"
                  />
                  <Label htmlFor="agreesBackgroundCheck" className="text-sm text-gray-700 leading-relaxed">
                    I agree to a background check if required for volunteer activities involving children
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="btn-hover w-full bg-gradient-to-r from-retro-orange to-warm-peach text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300"
                  disabled={volunteerMutation.isPending}
                  data-testid="button-volunteer-submit"
                >
                  {volunteerMutation.isPending ? "Joining..." : "Join the Volunteer Circle"}
                </Button>
              </form>
            </div>
          </div>

          {/* CTA Section */}
          <div className="content-section text-center mt-16">
            <Link href="/contact" data-testid="get-involved-cta">
              <Button className="btn-hover bg-gradient-to-r from-retro-orange to-warm-peach text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
