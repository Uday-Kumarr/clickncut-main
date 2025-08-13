
import React from "react";
import { motion } from "framer-motion";
import { Camera, Clock, Truck, FileCheck } from "lucide-react";

type Step = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: <Camera className="h-8 w-8 text-primary" />,
    title: "Choose Your Gear",
    description: "Browse our extensive collection of cameras, lenses, and accessories to find what suits your needs."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Set Rental Duration",
    description: "Select how long you need the equipment, from a single day to several months."
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Fast Delivery",
    description: "We deliver your equipment to your doorstep at your preferred time and date."
  },
  {
    icon: <FileCheck className="h-8 w-8 text-primary" />,
    title: "Create & Return",
    description: "Capture your vision, then simply return the equipment when you're done."
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-3"
          >
            Simple Process
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Renting premium camera equipment has never been easier. 
            Our streamlined process gets you the gear you need without hassle.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg border border-border relative overflow-hidden group hover-scale"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="mb-5 relative">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <span className="absolute top-0 right-0 bg-background text-primary font-bold w-8 h-8 rounded-full flex items-center justify-center border border-border">
                  {index + 1}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-3 relative">{step.title}</h3>
              <p className="text-muted-foreground relative">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
