import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactFormData {
  name: string;
  email: string;
  interest: string;
  message: string;
}

export default function ContactPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    interest: "",
    message: ""
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

  const submitContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", interest: "", message: "" });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation - ensure required fields are filled
    if (!formData.name || !formData.email || !formData.message || !formData.interest) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Service, and Message).",
        variant: "destructive",
      });
      return;
    }
    
    // Create mailto link with prefilled data
    const subject = encodeURIComponent(`Contact Form: ${formData.interest || 'General Inquiry'}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Service: ${formData.interest || 'Not specified'}

Message:
${formData.message}
    `);
    
    const mailtoLink = `mailto:contact@oriadawn.xyz?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
    
    // Still submit to backend for record keeping
    submitContactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div ref={contentRef} className="min-h-screen" data-testid="contact-page">
      <section className="bg-soft-beige min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="content-section text-center mb-12">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-deep-green mb-6" data-testid="contact-title">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600" data-testid="contact-subtitle">
                Ready to explore intelligent systems or join our community? Let's connect.
              </p>
            </div>

            <div className="content-section bg-white rounded-2xl shadow-xl p-8 md:p-12" data-testid="contact-form-container">
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div>
                  <Label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-green focus:border-transparent transition-all duration-300"
                    data-testid="input-name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-green focus:border-transparent transition-all duration-300"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <Label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service *
                  </Label>
                  <Select value={formData.interest} onValueChange={(value) => handleInputChange("interest", value)}>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-green focus:border-transparent transition-all duration-300" data-testid="select-interest">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom-app-build">Custom App Build</SelectItem>
                      <SelectItem value="system-consulting">System Consulting</SelectItem>
                      <SelectItem value="trading-market-analysis">Trading / Market Analysis</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell me about your project, questions, or how you'd like to get involved..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-green focus:border-transparent transition-all duration-300 resize-none"
                    data-testid="textarea-message"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="btn-hover w-full bg-deep-green text-white py-4 rounded-lg font-semibold text-lg hover:bg-deep-green/90"
                  disabled={submitContactMutation.isPending}
                  data-testid="button-submit"
                >
                  {submitContactMutation.isPending ? "Sending..." : "Send"}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center" data-testid="contact-info">
                <p className="text-gray-600">Or reach out directly:</p>
                <a 
                  href="mailto:contact@oriadawn.xyz" 
                  className="text-deep-green font-semibold hover:text-gold transition-colors"
                  data-testid="email-link"
                >
                  contact@oriadawn.xyz
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
