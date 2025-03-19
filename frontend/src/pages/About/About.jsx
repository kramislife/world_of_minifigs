import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  Heart,
  Building2,
  ArrowRight,
  Users,
  Target,
  Shield,
  Star,
  Package,
  Truck,
  MessageSquare,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Metadata from "@/components/layout/Metadata/Metadata";

const About = () => {
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      content:
        "Brick Extreme created the perfect custom LEGO® cityscape for our office lobby. Their attention to detail is unmatched!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Tech Entrepreneur",
      content:
        "The team transformed my product concept into an amazing LEGO® model. It's now the centerpiece of our innovation lab.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Event Planner",
      content:
        "Our corporate event featured Brick Extreme's interactive build stations. Guests couldn't stop talking about it!",
      rating: 5,
    },
  ];

  return (
    <>
      <Metadata
        title="About Brick Extreme | Custom LEGO® Creations"
        description="Discover the story behind Brick Extreme, Utah's premier custom LEGO® design studio. Learn about our mission, values, and the talented team behind our extraordinary brick creations."
      />

      {/* Hero Section with Background Video */}
      <div className="relative bg-gradient-to-b from-brand-start to-darkBrand h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          className="absolute inset-0 object-cover w-full h-full opacity-40"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/lego-timelapse.mp4" type="video/mp4" />
        </video>
        <motion.div
          className="relative z-20 h-full max-w-[1920px] mx-auto px-4 sm:px-6 flex flex-col justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={contentVariants}
            className="text-4xl md:text-7xl font-bold mb-6 text-white"
          >
            Crafting Dreams,
            <br />
            One Brick at a Time
          </motion.h1>
          <motion.p
            variants={contentVariants}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8"
          >
            From the heart of Lehi, Utah, we're revolutionizing the world of
            custom LEGO® creations with imagination and expertise
          </motion.p>
          <motion.div
            variants={contentVariants}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              size="lg"
              className="group bg-red-600 hover:bg-red-700 transition-colors"
            >
              Our Portfolio
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 transition-colors text-white"
            >
              Request a Quote
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-darkBrand border-t border-b border-gray-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "1,000+", label: "Custom Projects" },
              { value: "24", label: "Brick Artisans" },
              { value: "50+", label: "Corporate Clients" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-red-500">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-[1920px] mx-auto px-4 sm:px-6 py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Our Story Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-100">
                Our Story
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Brick Extreme was born out of a passion for LEGO® and a desire
                to push the boundaries of custom brick building. Founded in 2024
                by Mark and Derik Storey, our team of talented Brick Artisans is
                dedicated to crafting extraordinary creations tailored to your
                unique vision.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                What started as a hobby quickly grew into a thriving business as
                word spread about our attention to detail and innovative
                designs. Today, we serve clients across the globe, from
                individual collectors to major corporations, all while
                maintaining our commitment to quality and customer satisfaction.
              </p>
              <Button
                size="lg"
                className="group bg-red-600 hover:bg-red-700 transition-colors"
              >
                Our Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-red-500/20 to-blue-500/20 p-1">
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-brand-start to-darkBrand overflow-hidden">
                  <img
                    src="/api/placeholder/600/600"
                    alt="Brick Extreme founders"
                    className="w-full h-full object-cover mix-blend-overlay opacity-75"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] rounded-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            These principles guide everything we do, from our design process to
            our customer service
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-12 h-12 text-red-500" />,
                title: "Innovation First",
                description:
                  "Pushing the boundaries of what's possible with LEGO® bricks, constantly exploring new techniques and designs.",
              },
              {
                icon: <Users className="w-12 h-12 text-red-500" />,
                title: "Community Driven",
                description:
                  "Building connections through shared passion for creativity and supporting LEGO® enthusiasts worldwide.",
              },
              {
                icon: <Shield className="w-12 h-12 text-red-500" />,
                title: "Quality Assured",
                description:
                  "Every piece meets our highest standards of excellence, with rigorous testing and meticulous attention to detail.",
              },
            ].map((value, index) => (
              <Card
                key={index}
                className="bg-darkBrand/50 border-gray-800 hover:border-red-500/50 transition-colors group"
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6 transform group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl mb-4 text-gray-100">
                    {value.title}
                  </CardTitle>
                  <p className="text-gray-400">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">
            Our Creation Process
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            From concept to completion, here's how we bring your vision to life
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <MessageSquare className="w-8 h-8 text-red-500" />,
                title: "Consultation",
                description:
                  "We start with a detailed discussion to understand your vision and requirements.",
              },
              {
                icon: <Rocket className="w-8 h-8 text-red-500" />,
                title: "Design & Planning",
                description:
                  "Our designers create detailed renderings and plans for your approval.",
              },
              {
                icon: <Package className="w-8 h-8 text-red-500" />,
                title: "Building",
                description:
                  "Our expert Brick Artisans bring your design to life, brick by brick.",
              },
              {
                icon: <Truck className="w-8 h-8 text-red-500" />,
                title: "Delivery",
                description:
                  "We carefully package and deliver your creation, ready for display.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-darkBrand border-2 border-red-500 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-100">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform -translate-x-8" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-darkBrand/50 border-gray-800 hover:border-red-500/50 transition-colors"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-700 mr-3" />
                    <div>
                      <p className="font-bold text-gray-100">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 transition-colors text-white"
            >
              Read More Testimonials
            </Button>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            The creative minds behind Brick Extreme
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Mark Storey", role: "Co-Founder & Lead Designer" },
              { name: "Derik Storey", role: "Co-Founder & Creative Director" },
              { name: "Emma Lewis", role: "Senior Brick Artisan" },
              { name: "Jason Chen", role: "Custom Solution Specialist" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square rounded-xl overflow-hidden bg-darkBrand/50 border border-gray-800 mb-4">
                  <img
                    src="/api/placeholder/300/300"
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-100">
                  {member.name}
                </h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 transition-colors text-white"
            >
              Join Our Team
            </Button>
          </div>
        </motion.div>

        {/* Featured Clients */}
        <motion.div variants={contentVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">
            Featured Clients
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Trusted by leading organizations and individuals
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-12 w-32 bg-gray-700/50 rounded-lg opacity-50 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-100">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Have questions? We've got answers
          </p>
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How much does a custom LEGO® project cost?",
                answer:
                  "Pricing varies based on project complexity, size, and timeline. We provide detailed quotes after an initial consultation to understand your specific needs.",
              },
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines range from 2-12 weeks depending on complexity. We'll provide a realistic timeline during our consultation and keep you updated throughout the process.",
              },
              {
                question: "Do you ship internationally?",
                answer:
                  "Yes! We ship our custom LEGO® creations worldwide with specialized packaging to ensure they arrive safely no matter the destination.",
              },
              {
                question: "Do you offer warranties on your creations?",
                answer:
                  "All our creations come with a 12-month warranty covering structural integrity. We also offer maintenance services for long-term installations.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="mb-6 bg-darkBrand/50 border border-gray-800 rounded-lg p-6"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-100">
                  {faq.question}
                </h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10 transition-colors text-white"
            >
              View All FAQs
            </Button>
          </div>
        </motion.div>

        {/* Featured In Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">
            As Featured In
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center justify-center">
                <div className="h-16 w-48 bg-gray-700/50 rounded-lg opacity-50 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sustainability Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-100">
                Our Commitment to Sustainability
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                At Brick Extreme, we're not just passionate about building with
                bricks—we're dedicated to building a better future. We're
                committed to sustainable practices throughout our process:
              </p>
              <ul className="space-y-4">
                {[
                  "Recycling all unused bricks and packaging materials",
                  "Using eco-friendly shipping materials and practices",
                  "Supporting the LEGO Group's environmental initiatives",
                  "Participating in community clean-up efforts",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mt-1 mr-3 text-red-500">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6 group bg-red-600 hover:bg-red-700 transition-colors">
                Learn About Our Initiatives
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 p-1">
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-green-700/20 to-blue-700/20 overflow-hidden">
                  <img
                    src="/api/placeholder/600/400"
                    alt="Sustainability efforts"
                    className="w-full h-full object-cover mix-blend-overlay opacity-75"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div variants={contentVariants} className="mb-24">
          <div className="rounded-2xl bg-gradient-to-r from-red-500/10 to-blue-500/10 p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-100">
                Stay in the Loop
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Subscribe to our newsletter for exclusive content,
                behind-the-scenes looks, and special offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-darkBrand border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Button className="bg-red-600 hover:bg-red-700 transition-colors whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          variants={contentVariants}
          className="rounded-2xl bg-gradient-to-r from-red-500/10 to-blue-500/10 p-12 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-100">
              Ready to Bring Your Vision to Life?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              From personal collections to corporate installations, let's build
              something extraordinary together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-red-600 hover:bg-red-700 transition-colors"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 transition-colors text-white"
              >
                Browse Our Gallery
              </Button>
            </div>
            <div className="mt-8 flex justify-center gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-darkBrand border border-gray-700 flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-300">Chat Live</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-darkBrand border border-gray-700 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-300">Book a Consultation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-darkBrand border border-gray-700 flex items-center justify-center mx-auto mb-2">
                  <Package className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-300">Request a Sample</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Social Media Bar */}
      <div className="bg-darkBrand border-t border-gray-800">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400">Follow us on social media</p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, label: "Instagram" },
                { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-darkBrand border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-red-500 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div> 
        </div>
      </div>
    </>
  );
};

export default About;
