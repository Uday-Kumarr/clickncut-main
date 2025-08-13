
// Import the new Team component to update the Contact page
import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import Team from "@/components/Team";

const Contact: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Click N Cut</title>
        <meta 
          name="description" 
          content="Get in touch with our team for inquiries about camera rentals, availability, and custom packages." 
        />
      </Helmet>

      <div className="mt-20 pt-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-muted-foreground">
              Have questions about our equipment or services? We're here to help you find the perfect gear for your creative project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-lg p-6 text-center transition-transform hover:translate-y-[-5px] border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">We'll respond within 24 hours</p>
              <a 
                href="mailto:djaggupa@gitam.in" 
                className="text-primary hover:underline"
              >
                djaggupa@gitam.in
              </a>
            </div>

            <div className="bg-card rounded-lg p-6 text-center transition-transform hover:translate-y-[-5px] border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">Mon-Fri from 9AM to 6PM</p>
              <a 
                href="tel:9550366399" 
                className="text-primary hover:underline"
              >
                +91 9550366399
              </a>
            </div>

            <div className="bg-card rounded-lg p-6 text-center transition-transform hover:translate-y-[-5px] border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-4">Come see our equipment</p>
              <address className="not-italic text-primary">
                GITAM University<br />
                Rushikonda, Visakhapatnam
              </address>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Your Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help you?" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message here..." 
                    rows={6} 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              <div className="h-[400px] rounded-lg overflow-hidden border border-border">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.237522536619!2d83.37185207573845!3d17.737193283066898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943471d26771d%3A0x5c9f582957124521!2sGITAM%20University!5e0!3m2!1sen!2sin!4v1720442125962!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GITAM University Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section with Gold Theme */}
        <Team />
      </div>
    </>
  );
};

export default Contact;
