
import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Canon EOS R5",
    description: "Professional full-frame mirrorless camera with 8K video recording capability.",
    price: 12500,
    category: "camera",
    image: "https://images.unsplash.com/photo-1621520291095-aa6c7137f048?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "45MP Full-Frame CMOS Sensor",
      "8K RAW Video Recording",
      "High-Speed Continuous Shooting",
      "In-Body Image Stabilization",
      "Dual Card Slots"
    ],
    stock: 5
  },
  {
    id: "2",
    name: "Sony a7S III",
    description: "Full-frame mirrorless camera optimized for video and low-light performance.",
    price: 11000,
    category: "camera",
    image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "12.1MP Full-Frame CMOS Sensor",
      "4K 120p Video Recording",
      "16-Bit RAW Output",
      "ISO Range of 40-409600",
      "5-Axis In-Body Image Stabilization"
    ],
    stock: 3
  },
  {
    id: "3",
    name: "Canon RF 50mm f/1.2L USM",
    description: "Ultra-fast standard prime lens with exceptional image quality.",
    price: 5200,
    category: "lens",
    image: "https://images.unsplash.com/photo-1525385444278-b7968b2b38fe?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "Extremely fast f/1.2 maximum aperture",
      "Ring-type Ultrasonic Motor (USM)",
      "Customizable Control Ring",
      "Weather-Sealed Construction",
      "Minimum Focus Distance of 0.4m"
    ],
    stock: 8
  },
  {
    id: "4",
    name: "DJI Ronin-S",
    description: "Professional 3-axis gimbal stabilizer for DSLR and mirrorless cameras.",
    price: 3600,
    category: "accessory",
    image: "https://images.unsplash.com/photo-1606134500648-172747cda149?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "8.8 lb Payload Capacity",
      "Single-Handed Operation",
      "Sport Mode for Fast-Moving Subjects",
      "12-Hour Battery Life",
      "Silent Motors"
    ],
    stock: 6
  },
  {
    id: "5",
    name: "Adobe Premiere Pro Subscription",
    description: "Professional video editing software with comprehensive tools and features.",
    price: 4000,
    category: "editing",
    image: "https://images.unsplash.com/photo-1654506905352-cee2bc48862e?q=80&w=1000",
    rentalAvailable: false,
    features: [
      "Multi-Camera Editing",
      "Advanced Color Grading",
      "After Effects Integration",
      "Motion Graphics Templates",
      "VR Editing"
    ],
    stock: 999
  },
  {
    id: "6",
    name: "Blackmagic Pocket Cinema Camera 6K",
    description: "Compact cinema camera with 6K resolution and Super 35 sensor.",
    price: 9800,
    category: "camera",
    image: "https://images.unsplash.com/photo-1589038939341-31cc6d6e3140?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "Super 35 Sensor",
      "6K Resolution Recording",
      "13 Stops of Dynamic Range",
      "Dual Native ISO up to 25,600",
      "EF Lens Mount"
    ],
    stock: 4
  },
  {
    id: "7",
    name: "DaVinci Resolve Studio",
    description: "Professional editing, color correction, visual effects, and audio post-production software.",
    price: 6500,
    category: "editing",
    image: "https://images.unsplash.com/photo-1626785774625-9b118f5e8e98?q=80&w=1000",
    rentalAvailable: false,
    features: [
      "Advanced Color Grading Tools",
      "Multi-User Collaboration",
      "Fairlight Audio Post-Production",
      "Fusion Visual Effects",
      "Neural Engine AI Features"
    ],
    stock: 999
  },
  {
    id: "8",
    name: "Sony 24-70mm f/2.8 GM",
    description: "Professional standard zoom lens with constant f/2.8 aperture.",
    price: 4500,
    category: "lens",
    image: "https://images.unsplash.com/photo-1607139677169-2aa160eea0c6?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "Constant f/2.8 Maximum Aperture",
      "XA Lens Element and Nano AR Coating",
      "Direct Drive SSM Focus System",
      "Dust and Moisture Resistant",
      "Focus Hold Button and AF/MF Switch"
    ],
    stock: 7
  },
  {
    id: "9",
    name: "Godox SL-60W LED Video Light",
    description: "Professional LED continuous lighting for video production with bowens mount.",
    price: 2800,
    category: "lighting",
    image: "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "60W Daylight-Balanced Output",
      "5600K Color Temperature",
      "Bowens S-Type Mount",
      "Wireless Remote Control",
      "Silent Cooling System"
    ],
    stock: 10
  },
  {
    id: "10",
    name: "Aputure 120d II LED Light",
    description: "Professional LED light with impressive output and precision color accuracy.",
    price: 3500,
    category: "lighting",
    image: "https://images.unsplash.com/photo-1612631609061-512368da963f?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "120W Daylight-Balanced Output",
      "CRI/TLCI 97+ Color Accuracy",
      "Bowens Mount Compatibility",
      "DMX Control Option",
      "Noise-Free Operation"
    ],
    stock: 8
  },
  {
    id: "11",
    name: "DJI Mavic 3 Pro",
    description: "Professional drone with Hasselblad camera system and advanced flight capabilities.",
    price: 18500,
    category: "drone",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "Hasselblad 4/3 CMOS Sensor",
      "5.1K/50fps Video Recording",
      "46-Minute Flight Time",
      "15km Video Transmission",
      "Advanced Return to Home"
    ],
    stock: 5
  },
  {
    id: "12",
    name: "DJI Mini 3 Pro",
    description: "Compact sub-250g drone with professional-grade camera and obstacle avoidance.",
    price: 7200,
    category: "drone",
    image: "https://images.unsplash.com/photo-1576502200916-f4ed2a1819e6?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "1/1.3-inch CMOS Sensor",
      "4K/60fps HDR Video",
      "34-Minute Flight Time",
      "Tri-Directional Obstacle Sensing",
      "Under 250g Takeoff Weight"
    ],
    stock: 6
  },
  {
    id: "13",
    name: "Final Cut Pro X",
    description: "Apple's professional video editing software with powerful tools and seamless ProRes integration.",
    price: 5500,
    category: "editing",
    image: "https://images.unsplash.com/photo-1633118442179-e9dae2a4af25?q=80&w=1000",
    rentalAvailable: false,
    features: [
      "Magnetic Timeline Interface",
      "Advanced Color Grading",
      "Seamless ProRes Integration",
      "Motion Graphics Templates",
      "360° VR Editing"
    ],
    stock: 999
  },
  {
    id: "14",
    name: "Adobe After Effects Subscription",
    description: "Industry-standard motion graphics and visual effects software.",
    price: 4200,
    category: "editing",
    image: "https://images.unsplash.com/photo-1626785774625-9b118f5e8e98?q=80&w=1000",
    rentalAvailable: false,
    features: [
      "Advanced Compositing Tools",
      "3D Design Capabilities",
      "Character Animation",
      "Dynamic Motion Graphics",
      "Integration with other Adobe Apps"
    ],
    stock: 999
  },
  {
    id: "15",
    name: "Nikon Z9",
    description: "Flagship professional mirrorless camera with advanced AI subject detection.",
    price: 14500,
    category: "camera",
    image: "https://images.unsplash.com/photo-1580707221190-bd94d9087b7f?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "45.7MP Stacked CMOS Sensor",
      "8K30p and 4K120p Video Recording",
      "120fps Continuous Shooting",
      "3D Tracking with Subject Detection",
      "Blackout-Free EVF"
    ],
    stock: 3
  },
  {
    id: "16",
    name: "Canon RF 70-200mm f/2.8L IS USM",
    description: "Professional telephoto zoom lens with constant f/2.8 aperture.",
    price: 6200,
    category: "lens",
    image: "https://images.unsplash.com/photo-1617560492504-7477691760e0?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "Constant f/2.8 Maximum Aperture",
      "Optical Image Stabilization",
      "Dual Nano USM Motors",
      "Customizable Control Ring",
      "Weather-Sealed Construction"
    ],
    stock: 5
  },
  {
    id: "17",
    name: "RØDE VideoMic Pro+",
    description: "Professional on-camera shotgun microphone for clear audio recording.",
    price: 1800,
    category: "accessory",
    image: "https://images.unsplash.com/photo-1618143357686-6b45e4f486db?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "Digital Switching with Safety Channel",
      "Automatic Power On/Off",
      "Rechargeable Battery",
      "2-Stage High Pass Filter",
      "High Frequency Boost"
    ],
    stock: 12
  },
  {
    id: "18",
    name: "Profoto B10 Plus",
    description: "Compact battery-powered studio flash with high output and TTL.",
    price: 5300,
    category: "lighting",
    image: "https://images.unsplash.com/photo-1563319002-700a4c2fc187?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "500Ws Output",
      "High-Speed Sync",
      "TTL Metering",
      "Smartphone Control",
      "Continuous LED Light"
    ],
    stock: 6
  },
  {
    id: "19",
    name: "Neewer LED Ring Light",
    description: "18-inch bi-color LED ring light kit with stand for portrait and video shooting.",
    price: 1200,
    category: "lighting",
    image: "https://images.unsplash.com/photo-1574009696517-7e6268b89714?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "3200-5600K Color Temperature",
      "Dimmable Output",
      "Smartphone Holder",
      "Hot Shoe Adapter",
      "Remote Control"
    ],
    stock: 15
  },
  {
    id: "20",
    name: "Adobe Photoshop Subscription",
    description: "Professional photo editing and graphic design software.",
    price: 3600,
    category: "editing",
    image: "https://images.unsplash.com/photo-1562159278-1253a58da141?q=80&w=1000",
    rentalAvailable: false,
    features: [
      "Advanced Layer Controls",
      "Content-Aware Fill",
      "Neural Filters",
      "Camera RAW Integration",
      "3D Design Capabilities"
    ],
    stock: 999
  },
  {
    id: "21",
    name: "Autel EVO II Pro",
    description: "Professional drone with 6K camera and advanced obstacle avoidance.",
    price: 12500,
    category: "drone",
    image: "https://images.unsplash.com/photo-1606740256334-432a3872f1b8?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "1-inch CMOS Sensor",
      "6K Video Recording",
      "40-Minute Flight Time",
      "Omnidirectional Obstacle Avoidance",
      "9km Video Transmission"
    ],
    stock: 4
  },
  {
    id: "22",
    name: "Skylum Luminar AI",
    description: "AI-powered photo editing software with automated enhancement tools.",
    price: 2900,
    category: "editing",
    image: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=1000",
    rentalAvailable: false,
    features: [
      "AI Sky Replacement",
      "Portrait Enhancement",
      "Composition AI",
      "Landscape Enhancement",
      "One-Click Presets"
    ],
    stock: 999
  },
  {
    id: "23",
    name: "GoPro HERO11 Black",
    description: "Waterproof action camera with stabilization and 5.3K video.",
    price: 2800,
    category: "camera",
    image: "https://images.unsplash.com/photo-1569175578771-c1c1962e434d?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "5.3K60 Video",
      "HyperSmooth 5.0 Stabilization",
      "27MP Photos",
      "Waterproof to 33ft",
      "TimeWarp 3.0"
    ],
    stock: 10
  },
  {
    id: "24",
    name: "Sigma 85mm f/1.4 Art",
    description: "Professional portrait lens with exceptional sharpness and bokeh.",
    price: 3800,
    category: "lens",
    image: "https://images.unsplash.com/photo-1610402568654-da5fdb7f3b0c?q=80&w=1000",
    rentalAvailable: true,
    features: [
      "f/1.4 Maximum Aperture",
      "Hyper-Sonic Motor (HSM)",
      "Super Multi-Layer Coating",
      "Brass Bayonet Mount",
      "Minimum Focus Distance of 0.85m"
    ],
    stock: 7
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
}
