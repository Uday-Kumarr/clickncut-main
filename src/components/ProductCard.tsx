
import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ProductCardProps = {
  product: Product;
  index: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [showAddAnimation, setShowAddAnimation] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Show enhanced 3D animation
    setShowAddAnimation(true);
    
    // Wait for animation to complete before adding to cart
    setTimeout(() => {
      addToCart(product, 1, 1);
      setShowAddAnimation(false);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }, 800);
  };

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className="relative bg-card rounded-lg overflow-hidden border border-border h-full transition-all duration-300 hover:border-primary/50 hover:shadow-md group-hover:translate-y-[-5px]">
          <div className="aspect-[4/3] overflow-hidden bg-black relative">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={handleImageLoad}
              onError={() => {
                // Fallback for failed images
                console.error(`Failed to load image for ${product.name}`);
                setImageLoaded(true); // Stop showing loader even if image fails
              }}
            />
            
            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-black/60 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-white">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>
            
            {/* Price badge - reduced prices as requested */}
            <div className="absolute top-3 right-3">
              <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                ₹{(product.price >= 4000) ? Math.floor(product.price * 0.8) : product.price}/day
              </span>
            </div>
            
            {/* Quick actions overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-10 w-10 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full h-10 w-10 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                asChild
              >
                <Link to={`/products/${product.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium text-lg mb-1 transition-colors group-hover:text-primary">
              {product.name}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {product.description}
            </p>
            
            {/* Availability indicator */}
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium">
                <span className={`inline-block h-2 w-2 rounded-full mr-1 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-primary text-primary hover:bg-primary hover:text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Enhanced 3D Add to Cart Animation */}
      <AnimatePresence>
        {showAddAnimation && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            initial={{ opacity: 0, scale: 0.8, rotateY: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1.2, 
              rotateY: 360,
              z: 50 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              y: -100,
              rotateY: 0
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <div className="bg-primary text-white rounded-full p-3 shadow-lg relative">
              <ShoppingCart className="h-8 w-8" />
              <motion.div
                className="absolute -inset-2 rounded-full"
                initial={{ opacity: 0.5, scale: 1 }}
                animate={{ 
                  opacity: 0, 
                  scale: 1.5,
                  border: "2px solid rgba(255, 0, 0, 0.5)"
                }}
                transition={{ 
                  duration: 0.8,
                  ease: "easeOut",
                  repeat: 1
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;
