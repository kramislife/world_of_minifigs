import droid from "@/assets/bestSellingAssets/droid.png";
import droid2 from "@/assets/bestSellingAssets/droid2.jpg";

export const AVAILABILITY_STATES = {
  IN_STOCK: {
    text: "In Stock, Ready to Ship",
    dotColor: "bg-green-500",
    textColor: "text-green-400",
  },
  LIMITED: {
    text: "Limited Stock",
    dotColor: "bg-yellow-500",
    textColor: "text-yellow-400",
  },
  OUT_OF_STOCK: {
    text: "Out of Stock",
    dotColor: "bg-red-500",
    textColor: "text-red-400",
  },
  PRE_ORDER: {
    text: "Pre-order Available",
    dotColor: "bg-blue-500",
    textColor: "text-blue-400",
  },
  COMING_SOON: {
    text: "Coming Soon",
    dotColor: "bg-purple-500",
    textColor: "text-purple-400",
  },
  UNAVAILABLE: {
    text: "Currently Unavailable",
    dotColor: "bg-gray-500",
    textColor: "text-gray-400",
  },
};

export const FILTER_CATEGORIES = {
  price: {
    name: "Price Range",
    options: [
      { value: "0-100", label: "$0 - $100" },
      { value: "101-500", label: "$101 - $500" },
      { value: "501-1000", label: "$501 - $1000" },
      { value: "1000+", label: "Over $1000" },
    ],
  },
  theme: {
    name: "Theme",
    options: [
      { value: "sci-fi", label: "Sci-Fi" },
      { value: "space", label: "Space" },
      { value: "futuristic", label: "Futuristic" },
      { value: "steampunk", label: "Steampunk" },
    ],
  },
  collection: {
    name: "Collection",
    options: [
      { value: "winter-special", label: "Winter Special" },
      { value: "galactic-series", label: "Galactic Series" },
      { value: "tech-series", label: "Tech Series" },
      { value: "vintage", label: "Vintage" },
    ],
  },
  availability: {
    name: "Availability",
    options: [
      { value: "in-stock", label: "In Stock" },
      { value: "pre-order", label: "Pre-order" },
      { value: "coming-soon", label: "Coming Soon" },
      { value: "limited", label: "Limited Stock" },
    ],
  },
  skillLevel: {
    name: "Skill Level",
    options: [
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" },
      { value: "expert", label: "Expert" },
    ],
  },
  designer: {
    name: "Designer",
    options: [
      { value: "emily-wilson", label: "Emily Wilson" },
      { value: "oliver-lee", label: "Oliver Lee" },
      { value: "ava-martin", label: "Ava Martin" },
      { value: "jackson-hall", label: "Jackson Hall" },
    ],
  },
};

export const PRODUCTS = {
  bestSelling: [
    {
      id: 1,
      title: "Nutcracker",
      originalPrice: 1000,
      price: 800,
      images: [droid, droid2, droid, droid2, droid],
      rating: 4.5,
      reviewCount: 4,
      availability: AVAILABILITY_STATES.PRE_ORDER,
      details: [
        { label: "Theme", value: "Sci-Fi" },
        { label: "Collection", value: "Winter Special" },
        { label: "Release", value: "2024" },
      ],
      description: {
        intro:
          "Experience the magic of winter with our special edition Nutcracker. This unique piece combines traditional charm with modern design.",
        features:
          "Features include LED lighting, motorized movement, and premium metallic finish.",
        usage:
          "Perfect for holiday displays, collections, or as a centerpiece for your winter decorations.",
      },
      reviews: [
        {
          id: 1,
          author: "John Doe",
          rating: 5,
          date: "03/15/2024",
          content:
            "Exceptional build quality and attention to detail. The LED lighting adds a magical touch.",
        },
        {
          id: 2,
          author: "Jane Smith",
          rating: 5,
          date: "03/10/2024",
          content:
            "Perfect centerpiece for my winter collection. The motorized movement is smooth and quiet.",
        },
        {
          id: 3,
          author: "Mike Johnson",
          rating: 4,
          date: "03/05/2024",
          content:
            "Great design, but assembly instructions could be clearer. Still, very satisfied with the purchase.",
        },
        {
          id: 4,
          author: "Sarah Wilson",
          rating: 4,
          date: "02/28/2024",
          content:
            "Beautiful piece, the metallic finish is stunning. Shipping was fast and packaging was secure.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 957 pieces"],
          description:
            "A comprehensive set for dedicated builders. Each piece is precisely engineered for perfect fit and durability.",
        },
        {
          type: "skillLevel",
          items: ["Intermediate"],
          description:
            "Perfect for experienced builders. Requires attention to detail and basic building techniques.",
        },
        {
          type: "dimensions",
          items: ["Height: 12 inches", "Width: 8 inches", "Weight: 2.5 lbs"],
        },
        {
          type: "designer",
          items: ["Emily Wilson"],
          description:
            "Award-winning designer with over 10 years of experience in creating iconic builds.",
        },
      ],
    },
    {
      id: 2,
      title: "Droid",
      originalPrice: 900,
      price: 900,
      images: [droid, droid2, droid, droid2, droid],
      rating: 4.0,
      reviewCount: 3,
      availability: AVAILABILITY_STATES.LIMITED,
      details: [
        { label: "Theme", value: "Space Opera" },
        { label: "Collection", value: "Galactic Series" },
        { label: "Release", value: "2023" },
      ],
      description: {
        intro:
          "Meet your new robotic companion from the Galactic Series. This detailed droid replica captures the essence of sci-fi adventure.",
        features:
          "Includes articulated joints, light-up elements, and authentic weathering effects.",
        usage:
          "Great for display, photography, or as part of your sci-fi collection.",
      },
      reviews: [
        {
          id: 1,
          author: "Alex Brown",
          rating: 4,
          date: "03/12/2024",
          content:
            "The articulation is fantastic. Love the weathering effects - very realistic!",
        },
        {
          id: 2,
          author: "Chris Lee",
          rating: 4,
          date: "03/08/2024",
          content:
            "Great addition to my collection. The light-up features are well implemented.",
        },
        {
          id: 3,
          author: "Emma Davis",
          rating: 4,
          date: "03/01/2024",
          content:
            "Solid build quality and great attention to detail. Worth the price.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 1,243 pieces"],
          description:
            "Complex build with numerous detailed parts. Includes specialized pieces for authentic mechanical features.",
        },
        {
          type: "skillLevel",
          items: ["Advanced"],
          description:
            "Challenging build process requiring patience and advanced building techniques. Recommended for skilled builders.",
        },
        {
          type: "dimensions",
          items: ["Height: 15 inches", "Width: 10 inches", "Weight: 3.2 lbs"],
        },
        {
          type: "designer",
          items: ["Emily Wilson"],
          description:
            "Sci-fi specialist designer known for innovative mechanical designs and authentic detailing.",
        },
      ],
    },
    {
      id: 3,
      title: "Robot",
      originalPrice: 1200,
      price: 700,
      images: [droid, droid2, droid, droid2, droid],
      rating: 5.0,
      reviewCount: 5,
      availability: AVAILABILITY_STATES.OUT_OF_STOCK,
      details: [
        { label: "Theme", value: "Futuristic" },
        { label: "Collection", value: "Tech Series" },
        { label: "Release", value: "2024" },
      ],
      description: {
        intro:
          "Step into the future with our most advanced robot design yet. This model showcases cutting-edge mechanical engineering.",
        features:
          "Includes programmable LED matrix, sound effects, and modular components.",
        usage:
          "Ideal for tech enthusiasts, collectors, and modern display pieces.",
      },
      reviews: [
        {
          id: 1,
          author: "Tom Wilson",
          rating: 5,
          date: "03/14/2024",
          content:
            "The LED matrix is incredible! Programming features are easy to use.",
        },
        {
          id: 2,
          author: "Lisa Chen",
          rating: 5,
          date: "03/11/2024",
          content: "Amazing sound effects and the modular design is genius!",
        },
        {
          id: 3,
          author: "David Kim",
          rating: 5,
          date: "03/07/2024",
          content:
            "Best tech toy I've purchased. The engineering is outstanding.",
        },
        {
          id: 4,
          author: "Rachel Green",
          rating: 5,
          date: "03/03/2024",
          content:
            "Perfect for displaying. The modular components are well designed.",
        },
        {
          id: 5,
          author: "Mark Taylor",
          rating: 5,
          date: "02/28/2024",
          content: "Exceeded my expectations. Every feature works flawlessly.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 2,108 pieces"],
          description:
            "Our most complex robot build featuring unique elements and intricate mechanical components. Includes spare parts.",
        },
        {
          type: "skillLevel",
          items: ["Expert"],
          description:
            "For seasoned builders who enjoy complex challenges. Features advanced building techniques and detailed instructions.",
        },
        {
          type: "dimensions",
          items: ["Height: 18 inches", "Width: 12 inches", "Weight: 4.5 lbs"],
        },
        {
          type: "designer",
          items: ["Oliver Lee"],
          description:
            "Robotics design expert with background in mechanical engineering. Known for innovative articulation systems.",
        },
      ],
    },
    {
      id: 4,
      title: "Mechanical Toy",
      originalPrice: 600,
      price: 600,
      images: [droid, droid2, droid, droid2, droid],
      rating: 4.8,
      reviewCount: 4,
      availability: AVAILABILITY_STATES.COMING_SOON,
      details: [
        { label: "Theme", value: "Steampunk" },
        { label: "Collection", value: "Vintage" },
        { label: "Release", value: "2024" },
      ],
      description: {
        intro:
          "Discover the charm of vintage mechanics with our steampunk-inspired creation. Each piece tells a story of industrial artistry.",
        features:
          "Handcrafted brass elements, working gears, and authentic vintage finish.",
        usage:
          "Perfect for steampunk enthusiasts, collectors, and unique home decor.",
      },
      reviews: [
        {
          id: 1,
          author: "Peter Parker",
          rating: 5,
          date: "03/13/2024",
          content:
            "The brass elements are beautifully crafted. Love watching the gears in motion.",
        },
        {
          id: 2,
          author: "Mary Jane",
          rating: 5,
          date: "03/09/2024",
          content:
            "Perfect steampunk aesthetic. The vintage finish is absolutely gorgeous.",
        },
        {
          id: 3,
          author: "Harry Osborn",
          rating: 5,
          date: "03/04/2024",
          content: "A true work of art. The mechanical movements are hypnotic.",
        },
        {
          id: 4,
          author: "Gwen Stacy",
          rating: 4,
          date: "02/29/2024",
          content:
            "Beautiful craftsmanship, though winding mechanism could be smoother.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 834 pieces"],
          description:
            "Intricate steampunk mechanics with custom-designed gears and decorative elements. Each piece carefully selected.",
        },
        {
          type: "skillLevel",
          items: ["Intermediate"],
          description:
            "Suitable for most builders with some experience. Includes detailed step-by-step instructions and building tips.",
        },
        {
          type: "dimensions",
          items: ["Height: 10 inches", "Width: 6 inches", "Weight: 2.0 lbs"],
        },
        {
          type: "designer",
          items: ["Ava Martin"],
          description:
            "Vintage mechanism specialist with expertise in steampunk aesthetics. Master of incorporating working gears.",
        },
      ],
    },
  ],
  latestProducts: [
    {
      id: 5,
      title: "Batman",
      originalPrice: 600,
      price: 600,
      images: [droid2, droid, droid2, droid, droid2],
      rating: 4.5,
      reviewCount: 4,
      availability: AVAILABILITY_STATES.IN_STOCK,
      details: [
        { label: "Theme", value: "Space" },
        { label: "Collection", value: "Vintage" },
        { label: "Release", value: "2024" },
      ],
      description: {
        intro:
          "Discover the charm of vintage mechanics with our steampunk-inspired creation.",
        features: "Handcrafted brass elements and working gears.",
        usage: "Perfect for steampunk enthusiasts and collectors.",
      },
      reviews: [
        {
          id: 1,
          author: "Peter Parker",
          rating: 5,
          date: "03/13/2024",
          content:
            "The brass elements are beautifully crafted. Love watching the gears in motion.",
        },
        {
          id: 2,
          author: "Mary Jane",
          rating: 5,
          date: "03/09/2024",
          content:
            "Perfect steampunk aesthetic. The vintage finish is absolutely gorgeous.",
        },
        {
          id: 3,
          author: "Harry Osborn",
          rating: 4,
          date: "03/04/2024",
          content: "A true work of art. The mechanical movements are hypnotic.",
        },
        {
          id: 4,
          author: "Gwen Stacy",
          rating: 4,
          date: "02/29/2024",
          content:
            "Beautiful craftsmanship, though winding mechanism could be smoother.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 834 pieces"],
          description:
            "Intricate steampunk mechanics with custom-designed gears and decorative elements. Each piece carefully selected.",
        },
        {
          type: "skillLevel",
          items: ["Intermediate"],
          description:
            "Suitable for most builders with some experience. Includes detailed step-by-step instructions and building tips.",
        },
        {
          type: "dimensions",
          items: ["Height: 10 inches", "Width: 6 inches", "Weight: 2.0 lbs"],
        },
        {
          type: "designer",
          items: ["Ava Martin"],
          description:
            "Vintage mechanism specialist with expertise in steampunk aesthetics. Master of incorporating working gears.",
        },
      ],
    },
    {
      id: 6,
      title: "Superman",
      originalPrice: 700,
      price: 700,
      images: [droid2, droid, droid2, droid, droid2],
      rating: 4.0,
      reviewCount: 3,
      availability: AVAILABILITY_STATES.LIMITED,
      details: [
        { label: "Theme", value: "Space" },
        { label: "Collection", value: "Tech Series" },
        { label: "Release", value: "2024" },
      ],
      description: {
        intro: "Step into the future with our advanced robot design.",
        features: "Includes programmable LED matrix and sound effects.",
        usage: "Ideal for tech enthusiasts and collectors.",
      },
      reviews: [
        {
          id: 1,
          author: "Alex Brown",
          rating: 4,
          date: "03/12/2024",
          content:
            "The articulation is fantastic. Love the weathering effects - very realistic!",
        },
        {
          id: 2,
          author: "Chris Lee",
          rating: 4,
          date: "03/08/2024",
          content:
            "Great addition to my collection. The light-up features are well implemented.",
        },
        {
          id: 3,
          author: "Emma Davis",
          rating: 4,
          date: "03/01/2024",
          content:
            "Solid build quality and great attention to detail. Worth the price.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 1,243 pieces"],
          description:
            "Complex build with numerous detailed parts. Includes specialized pieces for authentic mechanical features.",
        },
        {
          type: "skillLevel",
          items: ["Advanced"],
          description:
            "Challenging build process requiring patience and advanced building techniques. Recommended for skilled builders.",
        },
        {
          type: "dimensions",
          items: ["Height: 15 inches", "Width: 10 inches", "Weight: 3.2 lbs"],
        },
        {
          type: "designer",
          items: ["Jackson Hall"],
          description:
            "Sci-fi specialist designer known for innovative mechanical designs and authentic detailing.",
        },
      ],
    },
    {
      id: 7,
      title: "Wonder Woman",
      originalPrice: 900,
      price: 900,
      images: [droid2, droid, droid2, droid, droid2],
      rating: 5.0,
      reviewCount: 5,
      availability: AVAILABILITY_STATES.OUT_OF_STOCK,
      details: [
        { label: "Theme", value: "Space" },
        { label: "Collection", value: "Galactic Series" },
        { label: "Release", value: "2024" },
      ],
      description: {
        intro: "Meet your new robotic companion from the Galactic Series.",
        features: "Includes articulated joints and light-up elements.",
        usage: "Great for display and sci-fi collection.",
      },
      reviews: [
        {
          id: 1,
          author: "Tom Wilson",
          rating: 5,
          date: "03/14/2024",
          content:
            "The LED matrix is incredible! Programming features are easy to use.",
        },
        {
          id: 2,
          author: "Lisa Chen",
          rating: 5,
          date: "03/11/2024",
          content: "Amazing sound effects and the modular design is genius!",
        },
        {
          id: 3,
          author: "David Kim",
          rating: 5,
          date: "03/07/2024",
          content:
            "Best tech toy I've purchased. The engineering is outstanding.",
        },
        {
          id: 4,
          author: "Rachel Green",
          rating: 5,
          date: "03/03/2024",
          content:
            "Perfect for displaying. The modular components are well designed.",
        },
        {
          id: 5,
          author: "Mark Taylor",
          rating: 5,
          date: "02/28/2024",
          content: "Exceeded my expectations. Every feature works flawlessly.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 2,108 pieces"],
          description:
            "Our most complex robot build featuring unique elements and intricate mechanical components. Includes spare parts.",
        },
        {
          type: "skillLevel",
          items: ["Expert"],
          description:
            "For seasoned builders who enjoy complex challenges. Features advanced building techniques and detailed instructions.",
        },
        {
          type: "dimensions",
          items: ["Height: 18 inches", "Width: 12 inches", "Weight: 4.5 lbs"],
        },
        {
          type: "designer",
          items: ["Emily Wilson"],
          description:
            "Robotics design expert with background in mechanical engineering. Known for innovative articulation systems.",
        },
      ],
    },
    {
      id: 8,
      title: "Flash",
      originalPrice: 1000,
      price: 800,
      images: [droid2, droid, droid2, droid, droid2],
      rating: 4.5,
      reviewCount: 4,
      availability: AVAILABILITY_STATES.COMING_SOON,
      details: [
        { label: "Theme", value: "Space" },
        { label: "Collection", value: "Winter Special" },
        { label: "Release", value: "2024" },
      ],
      description: {
        intro:
          "Experience the magic of winter with our special edition Nutcracker.",
        features: "Features include LED lighting and motorized movement.",
        usage: "Perfect for holiday displays and collections.",
      },
      reviews: [
        {
          id: 1,
          author: "John Doe",
          rating: 5,
          date: "03/15/2024",
          content:
            "Exceptional build quality and attention to detail. The LED lighting adds a magical touch.",
        },
        {
          id: 2,
          author: "Jane Smith",
          rating: 5,
          date: "03/10/2024",
          content:
            "Perfect centerpiece for my winter collection. The motorized movement is smooth and quiet.",
        },
        {
          id: 3,
          author: "Mike Johnson",
          rating: 4,
          date: "03/05/2024",
          content:
            "Great design, but assembly instructions could be clearer. Still, very satisfied with the purchase.",
        },
        {
          id: 4,
          author: "Sarah Wilson",
          rating: 4,
          date: "02/28/2024",
          content:
            "Beautiful piece, the metallic finish is stunning. Shipping was fast and packaging was secure.",
        },
      ],
      specifications: [
        {
          type: "pieceCount",
          items: ["Total: 957 pieces"],
          description:
            "A comprehensive set for dedicated builders. Each piece is precisely engineered for perfect fit and durability.",
        },
        {
          type: "skillLevel",
          items: ["Intermediate"],
          description:
            "Perfect for experienced builders. Requires attention to detail and basic building techniques.",
        },
        {
          type: "dimensions",
          items: ["Height: 12 inches", "Width: 8 inches", "Weight: 2.5 lbs"],
        },
        {
          type: "designer",
          items: ["Jackson Hall"],
          description:
            "Award-winning designer with over 10 years of experience in creating iconic builds.",
        },
      ],
    },
  ],
};

// For components that need all products combined
export const allProducts = [
  ...PRODUCTS.bestSelling,
  ...PRODUCTS.latestProducts,
];
