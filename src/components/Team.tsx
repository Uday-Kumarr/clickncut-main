
import React from "react";
import { motion } from "framer-motion";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    id: "2023000402",
    name: "Deepak",
    role: "2023000402",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "2023000367",
    name: "Abhinav",
    role: "2023000367",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "2023000357",
    name: "Kritik",
    role: "2023000357",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
  },
  {
    id: "2023000366",
    name: "Srimanth",
    role: "2023000366",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    id: "2023000365",
    name: "Revan",
    role: "2023000365",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const Team: React.FC = () => {
  const goldColor = "#FFD700";
  const goldGradient = "linear-gradient(90deg, #B8860B, #FFD700, #DAA520)";

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The talented individuals behind Click N Cut, working hard to bring you the best camera rental experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg bg-card transition-all duration-300 group-hover:shadow-lg border border-border group-hover:border-[#DAA520]">
                <div className="p-8 text-center">
                  {/* Replace image with profile icon using member's initials */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" 
                    style={{ background: goldGradient }}>
                    <span className="text-2xl font-bold text-white">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h3 
                    className="font-bold text-xl mb-1 transition-colors duration-300"
                    style={{ 
                      background: goldGradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[#DAA520]">{member.role}</p>
                  
                  {/* Gold border animation */}
                  <motion.div 
                    className="h-0.5 mx-auto mt-3 rounded"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "70%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                    style={{ background: goldGradient }}
                  />
                </div>
                
                {/* Liquid animation overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{
                  background: `${goldGradient}`,
                  maskImage: "url('https://assets.codepen.io/4175254/noise-mask.png')",
                  maskSize: "cover",
                  mixBlendMode: "overlay"
                }}>
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: "url('https://assets.codepen.io/4175254/noise.png')",
                    }}
                  />
                </div>
              </div>
              
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-0.5 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm"
                style={{ background: goldGradient }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
