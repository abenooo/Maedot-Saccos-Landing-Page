import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Building2, 
  Car, 
  ChevronRight, 
  CreditCard, 
  Home as HomeIcon, 
  Menu, 
  Phone, 
  PiggyBank, 
  X,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Import generated assets
import heroImage from "@assets/generated_images/modern_addis_ababa_cityscape_with_financial_growth_overlay.png";
import familyImage from "@assets/generated_images/happy_ethiopian_family_in_front_of_a_modern_home.png";
import carImage from "@assets/generated_images/modern_electric_car_on_the_road_in_ethiopia.png";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Vehicle Loan", href: "#vehicle-loan" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold text-xl leading-tight ${scrolled ? "text-primary" : "text-white"}`}>Maedot</span>
            <span className={`text-xs tracking-wider uppercase ${scrolled ? "text-foreground" : "text-white/80"}`}>Saccos</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-white/90"}`}
            >
              {link.name}
            </a>
          ))}
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
            Join Now
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={scrolled ? "text-foreground" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Button className="w-full bg-primary hover:bg-primary/90">Join Now</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Addis Ababa Cityscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <span className="text-primary font-bold text-sm tracking-wide uppercase">Transforming Together</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Building Your <span className="text-primary">Financial</span> Future.
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
            Maedot Saving & Credit Cooperatives Society LTD is your partner in growth. Secure savings, accessible loans, and a community dedicated to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base">
              Become a Member
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full px-8 h-12 text-base backdrop-blur-sm">
              Explore Services
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Abstract Shape */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-primary/20 blur-[100px] rounded-full" />
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <PiggyBank className="w-10 h-10 text-primary" />,
      title: "Smart Savings",
      description: "Secure your future with our competitive interest rates and flexible saving plans tailored to your goals."
    },
    {
      icon: <CreditCard className="w-10 h-10 text-primary" />,
      title: "Business Loans",
      description: "Fuel your business growth with our accessible credit facilities designed for entrepreneurs."
    },
    {
      icon: <Car className="w-10 h-10 text-primary" />,
      title: "Vehicle Financing",
      description: "Drive your dream car today with our specialized auto loan packages and insurance options."
    },
    {
      icon: <HomeIcon className="w-10 h-10 text-primary" />,
      title: "Housing Solutions",
      description: "Make home ownership a reality with our long-term housing finance strategies."
    }
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Our Services</h2>
          <h3 className="text-4xl font-heading font-bold text-foreground mb-4">Comprehensive Financial Solutions</h3>
          <p className="text-muted-foreground">
            We offer a wide range of services designed to meet the diverse needs of our members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-2xl mb-2">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{service.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <a href="#" className="mt-auto flex items-center text-primary font-medium hover:underline text-sm">
                    Learn more <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCar = () => {
  return (
    <section id="vehicle-loan" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img src={carImage} alt="Electric Vehicle" className="w-full h-auto" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
          </motion.div>

          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              Featured Product
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Drive the Future with Our Vehicle Loans
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Upgrade your lifestyle with our specialized vehicle financing. Whether it's for personal use or business logistics, we help you get behind the wheel faster.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                "Low down payment options",
                "Competitive interest rates",
                "Flexible repayment periods up to 5 years",
                "Quick approval process"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
              Apply for Auto Loan
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-foreground text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={familyImage} alt="Community" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 z-0" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">About Maedot</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Transforming Lives, <br/>Building Communities.</h3>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Maedot Saving & Credit Cooperatives Society LTD was founded with a simple yet powerful mission: to empower our members through financial inclusion. We believe that by pooling our resources, we can achieve individual dreams and collective prosperity.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">5K+</h4>
                <p className="text-white/60">Active Members</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-white mb-2">150M+</h4>
                <p className="text-white/60">Capital Mobilized</p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center md:justify-end">
             <Card className="w-full max-w-md bg-white/5 backdrop-blur-md border-white/10 p-2">
                <CardContent className="p-0">
                  <img src={familyImage} alt="Happy Family" className="w-full h-auto rounded-lg shadow-2xl" />
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Ready to start your financial journey? Contact us today or visit our office.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                  <p className="text-muted-foreground">+251-0903373727</p>
                  <p className="text-muted-foreground">+251-111111111</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Visit Us</h4>
                  <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                  <p className="text-muted-foreground">Maedot Saccos HQ</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-none">
            <CardContent className="p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="font-heading font-bold text-lg text-foreground">Maedot</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming Together. Your trusted partner for savings, credit, and financial growth in Ethiopia.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Savings Account</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Business Loans</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Car Loans</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Housing Finance</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-4">Newsletter</h4>
            <p className="text-muted-foreground text-sm mb-4">Subscribe to our newsletter for updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Email address" className="bg-white" />
              <Button size="icon" className="bg-primary hover:bg-primary/90 text-white shrink-0">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Maedot Saving & Credit Cooperatives Society LTD. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <Services />
      <FeatureCar />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
