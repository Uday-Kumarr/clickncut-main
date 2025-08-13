
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data";
import { Category } from "@/types";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Search, Camera, DollarSign, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Products: React.FC = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Price filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(6000);
  
  // Animation states
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animateFilters, setAnimateFilters] = useState(false);
  const [animateProducts, setAnimateProducts] = useState(false);
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  useEffect(() => {
    // Check if category is specified in URL query parameter
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    
    if (categoryParam && ["camera", "lens", "accessory", "editing", "all", "lighting", "drone"].includes(categoryParam)) {
      setActiveCategory(categoryParam as Category);
    }
    
    // Set min and max price based on products
    const prices = products.map(p => p.price);
    setMinPrice(Math.min(...prices));
    setMaxPrice(Math.max(...prices));
    setPriceRange([Math.min(...prices), Math.max(...prices)]);
  }, [location.search]);

  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Category filter
    if (activeCategory !== "all") {
      result = result.filter(product => product.category === activeCategory);
    }
    
    // Search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(lowercaseSearch) || 
          product.description.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Price filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setFilteredProducts(result);
    
    // Trigger animations when the filters change
    setAnimateProducts(true);
    setTimeout(() => {
      setAnimateProducts(false);
    }, 300);
  }, [activeCategory, searchTerm, priceRange]);

  // Trigger sequential animations on page load
  useEffect(() => {
    setTimeout(() => {
      setAnimateHeader(true);
      setTimeout(() => {
        setAnimateFilters(true);
        setTimeout(() => {
          setAnimateProducts(true);
        }, 200);
      }, 200);
    }, 100);
  }, []);

  // Camera floating animations
  const cameraFloatVariants = {
    animate: {
      y: [0, -15, 0],
      rotateZ: [0, -3, 0, 3, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Product grid animation variants
  const productContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Shop Equipment - Click N Cut</title>
        <meta 
          name="description" 
          content="Browse and rent premium photography and videography equipment. Cameras, lenses, accessories, and editing software available." 
        />
      </Helmet>

      <div className="mt-16 pt-16">
        {/* Header with cinematic background */}
        <div className="bg-secondary py-10 md:py-16 border-b border-border relative overflow-hidden">
          {/* Cinematic video background */}
          <div className="absolute inset-0 z-0 opacity-30">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://static.videezy.com/system/resources/previews/000/046/370/original/200807_14_Cameras.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-secondary/70 to-secondary"></div>
          </div>
          
          {/* Floating camera animation */}
          <motion.div 
            variants={cameraFloatVariants}
            animate="animate"
            className="absolute z-10 opacity-20 top-10 right-10 hidden md:block"
          >
            <Camera size={120} className="text-primary" />
          </motion.div>
          
          <motion.div 
            variants={cameraFloatVariants}
            animate="animate"
            className="absolute z-10 opacity-10 bottom-20 left-10 hidden md:block"
            style={{ animationDelay: "2s" }}
          >
            <Camera size={80} className="text-white" />
          </motion.div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-center"
            >
              Premium Equipment Collection
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-muted-foreground text-center max-w-2xl mx-auto mb-8"
            >
              Browse our curated selection of professional cameras, lenses, accessories, 
              and editing software for all your creative needs.
            </motion.p>
            
            {/* Search and filter container with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8"
            >
              {/* Search with typing animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative w-full md:w-[400px]"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search for equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
                
                {/* Animated typing indicator when input is focused */}
                {searchTerm === "" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-0.5 bg-primary"
                  />
                )}
              </motion.div>
              
              {/* Price Filter with pulsing animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-background relative overflow-hidden group">
                      <motion.div 
                        className="absolute inset-0 bg-primary/10 transform origin-left" 
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <DollarSign className="h-4 w-4 mr-2 group-hover:text-primary transition-colors duration-300" />
                      <span>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <div className="space-y-4">
                      <motion.h4 
                        className="font-medium"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        Price Range
                      </motion.h4>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <Slider
                          defaultValue={[minPrice, maxPrice]}
                          value={[priceRange[0], priceRange[1]]}
                          max={6000}
                          step={100}
                          minStepsBetweenThumbs={1}
                          onValueChange={handlePriceChange}
                          className="mt-6"
                        />
                      </motion.div>
                      <motion.div 
                        className="flex items-center justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <div className="bg-background border border-input rounded p-2">
                          ₹{priceRange[0]}
                        </div>
                        <div className="bg-background border border-input rounded p-2">
                          ₹{priceRange[1]}
                        </div>
                      </motion.div>
                    </div>
                  </PopoverContent>
                </Popover>
              </motion.div>
            </motion.div>
            
            {/* Categories with staggered animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <CategoryFilter 
                activeCategory={activeCategory} 
                onCategoryChange={setActiveCategory} 
              />
            </motion.div>
          </div>
        </div>
        
        {/* Product Grid with staggered animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeCategory}-${searchTerm}-${priceRange[0]}-${priceRange[1]}`}
            className="container mx-auto px-4 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3 
                  className="text-xl font-medium mb-2"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  No products found
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Try adjusting your search or filters to find what you're looking for.
                </motion.p>
              </motion.div>
            ) : (
              <>
                <motion.p 
                  className="text-muted-foreground mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </motion.p>
                
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={productContainerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

export default Products;
