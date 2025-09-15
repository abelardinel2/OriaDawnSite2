import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface EmailSubscriptionData {
  firstName: string;
  email: string;
  interestedInAnalytics: string;
  interestedInRise: string;
}

export default function Footer() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<EmailSubscriptionData>({
    firstName: "",
    email: "",
    interestedInAnalytics: "false",
    interestedInRise: "false"
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: EmailSubscriptionData) => {
      const response = await apiRequest("POST", "/api/email-subscription", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll hear from us soon with updates and insights.",
      });
      setFormData({ firstName: "", email: "", interestedInAnalytics: "false", interestedInRise: "false" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
      console.error("Subscription error:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    subscriptionMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof EmailSubscriptionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <footer style={{background: 'linear-gradient(135deg, hsl(174, 62%, 83%) 0%, hsl(25, 95%, 83%) 50%, hsl(35, 75%, 95%) 100%)'}} className="text-slate-800 py-16" data-testid="main-footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Email Subscription Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-lg" data-testid="email-subscription-form">
            <h3 className="font-serif text-2xl font-bold mb-2" style={{color: 'hsl(174, 62%, 35%)'}} data-testid="subscription-title">
              Stay Connected
            </h3>
            <p className="text-slate-600 mb-6" data-testid="subscription-description">
              Get updates on market insights and community programs.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="subscription-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="block text-sm font-medium text-slate-600 mb-1">
                    First Name (optional)
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-teal-400 focus:ring-teal-400"
                    placeholder="Your first name"
                    data-testid="input-firstName"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">
                    Email *
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-teal-400 focus:ring-teal-400"
                    placeholder="your@email.com"
                    data-testid="input-email"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">I'm interested in:</p>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analytics"
                    checked={formData.interestedInAnalytics === "true"}
                    onCheckedChange={(checked) => handleInputChange("interestedInAnalytics", checked ? "true" : "false")}
                    className="border-slate-300"
                    data-testid="checkbox-analytics"
                  />
                  <Label htmlFor="analytics" className="text-slate-600">
                    Oria Dawn Analytics
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rise"
                    checked={formData.interestedInRise === "true"}
                    onCheckedChange={(checked) => handleInputChange("interestedInRise", checked ? "true" : "false")}
                    className="border-slate-300"
                    data-testid="checkbox-rise"
                  />
                  <Label htmlFor="rise" className="text-slate-600">
                    Oria Dawn RISE
                  </Label>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full font-semibold py-2 rounded-lg transition-colors"
                style={{backgroundColor: 'hsl(25, 95%, 65%)', color: 'white'}}
                disabled={subscriptionMutation.isPending}
                data-testid="button-subscribe"
              >
                {subscriptionMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
          
          {/* Copyright */}
          <div className="flex flex-col justify-center">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl font-bold mb-4" style={{color: 'hsl(174, 62%, 35%)'}}>
                Oria Dawn
              </h3>
              <p className="text-slate-600 mb-4">
                Building intelligent systems for the markets and heart-centered programs for the next generation.
              </p>
              <p className="text-slate-500 text-sm" data-testid="footer-copyright">
                © 2025 Oria Dawn · contact@oriadawn.xyz
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
