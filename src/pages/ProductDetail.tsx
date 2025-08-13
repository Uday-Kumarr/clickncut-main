import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById, products } from "@/lib/data";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Eye
} from "lucide-react";
import { Product } from "@/types";

const ProductCard: React.FC<{ product: Product, index: number }> = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className="relative bg-card rounded-lg overflow-hidden border border-border h-full transition-all duration-300 hover:border-primary/50 hover:shadow-md group-hover:translate-y-[-5px]">
          <div className="aspect-[4/3] overflow-hidden bg-black">
            <img
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            />
            
            <div className="absolute top-3 left-3">
              <span className="bg-black/60 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-white">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>
            
            <div className="absolute top-3 right-3">
              <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                ₹{product.price}/day
              </span>
            </div>
            
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
    </motion.div>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [rentalDays, setRentalDays] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [showCameraAnimation, setShowCameraAnimation] = useState(true);

  useEffect(() => {
    if (!product) {
      navigate("/products");
      toast({
        title: "Product not found",
        description: "The requested product could not be found.",
        variant: "destructive",
      });
      return;
    }

    const related = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
    setRelatedProducts(related);
    
    setShowCameraAnimation(true);
    const timer = setTimeout(() => {
      setShowCameraAnimation(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [product, navigate, toast]);

  const incrementQuantity = () => {
    if (quantity < product?.stock!) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const incrementRentalDays = () => {
    setRentalDays(prevDays => prevDays + 1);
  };

  const decrementRentalDays = () => {
    if (rentalDays > 1) {
      setRentalDays(prevDays => prevDays - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, rentalDays);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (!product) {
    return null;
  }

  const totalPrice = product.price * quantity * rentalDays;

  return (
    <>
      <Helmet>
        <title>{product.name} - Click <span className="text-[#ea384c]">N</span> Cut</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <AnimatePresence>
        {showCameraAnimation && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-64 h-64 flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, 5, 0, -5, 0] }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ 
                duration: 1.5,
                type: "spring",
                stiffness: 200
              }}
            >
              <motion.div className="w-56 h-40 bg-black rounded-md relative">
                <motion.div 
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-24 h-24 bg-gray-900 rounded-full border-4 border-gray-800"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.div 
                    className="absolute inset-0 m-2 bg-black rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <motion.div 
                      className="absolute inset-0 m-4 bg-gradient-to-br from-blue-900 to-gray-900 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="absolute right-10 top-0 w-12 h-8 bg-gray-800 rounded-sm -translate-y-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: -8, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                
                <motion.div 
                  className="absolute right-6 top-0 w-5 h-5 bg-red-500 rounded-full -translate-y-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 1, duration: 0.5 }}
                />
                
                <motion.div 
                  className="absolute right-20 top-0 w-8 h-3 bg-white/80 -translate-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0, 1] }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 bg-black"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              />
              
              <motion.div 
                className="absolute w-full text-center bottom-0 translate-y-16 text-white text-xl font-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 16 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <span className="text-white">Click<span className="text-[#ea384c]">N</span>Cut</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-16 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/products")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden bg-black rounded-lg border border-border"
            >
              <div
                className={`cursor-pointer transition-transform duration-500 ${
                  isImageZoomed ? "scale-125" : "scale-100"
                }`}
                onClick={() => setIsImageZoomed(!isImageZoomed)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square"
                />
              </div>

              <div className="absolute top-4 right-4">
                <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                  ₹{product.price}/day
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-medium mb-3">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

              <p className="text-lg text-muted-foreground mb-6">{product.description}</p>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="flex items-start"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center mb-6">
                <div
                  className={`h-3 w-3 rounded-full mr-2 ${
                    product.stock > 5
                      ? "bg-green-500"
                      : product.stock > 0
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
                <span>
                  {product.stock > 5
                    ? "In Stock"
                    : product.stock > 0
                    ? `Low Stock (${product.stock} left)`
                    : "Out of Stock"}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {product.rentalAvailable && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rental Days</label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={decrementRentalDays}
                        disabled={rentalDays <= 1}
                        className="h-10 w-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{rentalDays}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={incrementRentalDays}
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-secondary p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span>Base price:</span>
                  <span>₹{product.price.toFixed(2)}/day</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantity:</span>
                  <span>x{quantity}</span>
                </div>
                {product.rentalAvailable && (
                  <div className="flex justify-between mb-2">
                    <span>Rental period:</span>
                    <span>{rentalDays} days</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                  <span>Total price:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <div className="mt-6 flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-2" />
                <span>Expected delivery: 1-3 business days</span>
              </div>
            </motion.div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
