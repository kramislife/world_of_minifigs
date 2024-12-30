import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, Heart, Building2, ArrowRight } from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";

const About = () => {
  // Using similar animation patterns as featuredProductAnimations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <Metadata title="About Us" />
      <motion.div
        className="container mx-auto px-4 py-16 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div variants={contentVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-brand">
            Explore the Infinite. Build Your Legacy.
          </h1>
          <p className="text-muted-foreground text-lg">
            From the heart of Lehi, Utah
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={contentVariants}>
          <Card className="mb-12 bg-brand/5 shadow-lg">
            <CardContent className="p-8">
              <p className="text-lg leading-relaxed text-foreground">
                Brick Extreme was born out of a passion for Lego and a desire to
                push the boundaries of custom brick building. Founded in 2024 by
                Mark and Derik Storey, our team of talented Brick Artisans is
                dedicated to crafting extraordinary Lego creations tailored to
                your unique vision.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          <motion.div variants={contentVariants}>
            <Card className="h-full hover:bg-brand/10 transition-colors shadow-lg">
              <CardContent className="p-8 text-center">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-brand" />
                <CardTitle className="text-brand">Innovation</CardTitle>
                <p className="text-muted-foreground">
                  Pushing the boundaries of custom brick building
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={contentVariants}>
            <Card className="h-full hover:bg-brand/10 transition-colors shadow-lg">
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-brand" />
                <CardTitle className="text-brand">Passion</CardTitle>
                <p className="text-muted-foreground">
                  Dedicated to crafting extraordinary creations
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={contentVariants}>
            <Card className="h-full hover:bg-brand/10 transition-colors shadow-lg">
              <CardContent className="p-8 text-center">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-brand" />
                <CardTitle className="text-brand">Legacy</CardTitle>
                <p className="text-muted-foreground">
                  Building memories that last a lifetime
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={contentVariants} className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-brand">
            Defy the Limits. Create Your Next Fig!
          </h2>
          <Button
            size="lg"
            className="group bg-brand hover:bg-brand-end transition-colors"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default About;
