
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Click N Cut - Premium Camera Rental & Editing Services</title>
        <meta 
          name="description" 
          content="Rent high-quality cameras, lenses, and accessories. Professional editing services also available. Perfect for photographers and filmmakers." 
        />
      </Helmet>

      <Hero />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      
      {/* CTA Section */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Ready to Elevate Your Next <span className="text-primary">Creative Project?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground mb-8"
            >
              Browse our extensive collection of premium cameras, lenses, and accessories. 
              Professional quality without the premium price tag.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
                <Link to="/products">
                  Explore All Products
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
