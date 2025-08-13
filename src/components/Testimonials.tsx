
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Professional Photographer",
    content: "Click N Cut has been a game-changer for my photography business. Access to high-end equipment without the upfront costs allowed me to take on jobs I wouldn't have been able to otherwise. Their service is impeccable, and the equipment is always in perfect condition.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Indie Filmmaker",
    content: "As an independent filmmaker, budgets are always tight. Click N Cut helps me get professional-grade equipment for shoots without breaking the bank. The rental process is seamless, and their team is always helpful with technical questions.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Vikram Mehta",
    role: "Content Creator",
    content: "I've been using Click N Cut for all my YouTube productions. The ability to rent different equipment for different types of shoots gives me creative flexibility I wouldn't have otherwise. Their editing software rentals are also a huge plus!",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg"
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-3"
          >
            Client Stories
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our Customers Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Don't just take our word for it. Hear from creators who have elevated 
            their projects with our premium equipment.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -left-4 -top-4 text-primary opacity-20">
            <Quote className="h-20 w-20" />
          </div>
          
          <div className="bg-card rounded-lg p-8 md:p-12 border border-border relative">
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : activeIndex > index ? -20 : 20
                  }}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "absolute w-full transition-all duration-300",
                    activeIndex === index ? "translate-x-0" : "translate-x-full opacity-0 pointer-events-none"
                  )}
                >
                  <p className="text-lg mb-8 italic">{testimonial.content}</p>
                  
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="h-14 w-14 rounded-full object-cover border-2 border-primary mr-4"
                    />
                    <div>
                      <h4 className="font-medium text-lg">{testimonial.name}</h4>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Show active testimonial */}
              <motion.div
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg mb-8 italic">{testimonials[activeIndex].content}</p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-primary mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-muted-foreground">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <button 
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-muted hover:bg-primary/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
