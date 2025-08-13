import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, ArrowLeft, Loader2, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login: React.FC = () => {
  // Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [signupError, setSignupError] = useState("");
  
  // Animation state
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Background gradients - updated with darker colors for better text visibility
  const gradients = [
    "linear-gradient(90deg, #1A1F2C 0%, #333333 100%)",
    "linear-gradient(90deg, #222222 0%, #403E43 100%)",
    "linear-gradient(90deg, #222 0%, #333333 100%)",
    "linear-gradient(90deg, #1A1F2C 0%, #2B3044 100%)",
    "linear-gradient(90deg, #222222 0%, #333333 100%)",
  ];
  const [currentGradient, setCurrentGradient] = useState(0);

  // Change gradient every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGradient(prev => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setError("");
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate("/");
      } else {
        setError("Invalid credentials. Try user@example.com / password");
      }
    } catch (err) {
      setError("An error occurred during login");
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupName || !signupEmail || !signupAddress || !signupPassword || !confirmPassword) {
      setSignupError("Please fill in all fields");
      return;
    }
    
    if (signupPassword !== confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }
    
    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters long");
      return;
    }
    
    setSignupError("");
    setIsSigningUp(true);
    
    try {
      // We'll simulate an email notification here
      toast({
        title: "Welcome to Click N Cut!",
        description: `A confirmation email has been sent to ${signupEmail}`,
      });
      
      // Show success animation
      setShowSuccessAnimation(true);
      
      // Wait for animation to complete before redirecting
      setTimeout(async () => {
        const success = await signup(signupName, signupEmail, signupPassword);
        
        if (success) {
          navigate("/");
        }
      }, 3000);
    } catch (err) {
      setSignupError("An error occurred during registration");
      toast({
        title: "Registration error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setShowSuccessAnimation(false);
      setIsSigningUp(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Click N Cut</title>
      </Helmet>

      <div 
        className="min-h-screen flex flex-col"
        style={{
          background: gradients[currentGradient],
          backgroundSize: "200% 200%",
          transition: "background 2s ease"
        }}
      >
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        <div className="flex-grow flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center justify-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                >
                  <Camera className="h-12 w-12 text-white drop-shadow-lg" />
                </motion.div>
                <span className="ml-2 text-3xl font-bold tracking-tight text-white drop-shadow-lg">
                  Click<span className="text-[#ea384c]">N</span> Cut
                </span>
              </Link>
            </div>
            
            <AnimatePresence>
              {showSuccessAnimation ? (
                <motion.div 
                  className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [0, 1.2, 1],
                        rotate: [0, 20, 0]
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="mx-auto mb-8"
                    >
                      <Camera className="h-32 w-32 text-primary" />
                    </motion.div>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-3xl font-bold mb-4 text-white"
                    >
                      Welcome to Click <span className="text-[#ea384c]">N</span> Cut!
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-white/80 mb-8"
                    >
                      Your account has been created successfully.<br />
                      A confirmation email has been sent to your email address.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                    >
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                      <p className="text-white/60 mt-2">
                        Redirecting to homepage...
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-6 bg-white/10 backdrop-blur-sm">
                    <TabsTrigger value="login" className="data-[state=active]:bg-white/20 text-white">Login</TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-white/20 text-white">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-lg">
                      <h1 className="text-2xl font-bold mb-6 text-white">Welcome Back!</h1>
                      
                      {error && (
                        <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-3 mb-6">
                          {error}
                        </div>
                      )}
                      
                      <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
                              Email
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <label htmlFor="password" className="block text-sm font-medium text-white">
                                Password
                              </label>
                              <a href="#" className="text-xs text-[#ea384c] hover:underline">
                                Forgot password?
                              </a>
                            </div>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                              <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Logging in...
                              </>
                            ) : (
                              "Log In"
                            )}
                          </Button>

                          <div className="mt-4 text-center text-sm text-white/80">
                            <p>
                              Demo credentials: <br />
                              Email: user@example.com <br />
                              Password: password
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="signup">
                    <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-lg p-8 shadow-lg">
                      <h1 className="text-2xl font-bold mb-6 text-white">Create an account</h1>
                      
                      {signupError && (
                        <div className="bg-red-500/20 border border-red-500/30 text-white rounded-md p-3 mb-6">
                          {signupError}
                        </div>
                      )}
                      
                      <form onSubmit={handleSignup}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1 text-white">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                              <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={signupName}
                                onChange={(e) => setSignupName(e.target.value)}
                                className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="signupEmail" className="block text-sm font-medium mb-1 text-white">
                              Email
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                              <Input
                                id="signupEmail"
                                type="email"
                                placeholder="Enter your email"
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium mb-1 text-white">
                              Address
                            </label>
                            <Input
                              id="address"
                              type="text"
                              placeholder="Enter your address"
                              value={signupAddress}
                              onChange={(e) => setSignupAddress(e.target.value)}
                              className="bg-black/30 border-white/20 text-white placeholder:text-white/50"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="signupPassword" className="block text-sm font-medium mb-1 text-white">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                              <Input
                                id="signupPassword"
                                type="password"
                                placeholder="Create a password"
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-white">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                              />
                            </div>
                          </div>
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/20" 
                            disabled={isSigningUp}
                          >
                            {isSigningUp ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Creating account...
                              </>
                            ) : (
                              "Sign Up"
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Animated circles background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              initial={{ 
                width: Math.random() * 100 + 50, 
                height: Math.random() * 100 + 50,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
                opacity: [Math.random() * 0.3 + 0.1, Math.random() * 0.5 + 0.2],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;
