import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { 
  Building2, 
  Car, 
  ChevronRight,
  ChevronDown,
  CreditCard, 
  Home as HomeIcon, 
  Menu, 
  Phone, 
  PiggyBank, 
  X,
  ArrowRight,
  CheckCircle2,
  Users,
  Smartphone,
  Heart,
  Briefcase,
  GraduationCap,
  ShieldAlert,
  Clock,
  ThumbsUp,
  Percent,
  Plus,
  Globe
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModeToggle } from "@/components/mode-toggle";
import { translations } from "@/lib/translations";

// Import generated assets
import heroImage from "@assets/generated_images/modern_addis_ababa_cityscape_with_financial_growth_overlay.png";
import familyImage from "@assets/generated_images/happy_ethiopian_family_in_front_of_a_modern_home.png";
import shopOwnerImage from "@assets/generated_images/portrait_of_a_successful_ethiopian_female_shop_owner.png";
import fatherDaughterImage from "@assets/generated_images/portrait_of_a_happy_ethiopian_father_and_daughter.png";
import mobileBankingImage from "@assets/generated_images/close_up_of_hands_using_mobile_banking_app_on_smartphone.png";

type Language = "en" | "am" | "om";

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Define sections with their IDs and offset
      const sections = [
        { id: "home", offset: 0 },
        { id: "services", element: document.getElementById("services") },
        { id: "benefits", element: document.getElementById("benefits") },
        { id: "stories", element: document.getElementById("stories") },
        { id: "faq", element: document.getElementById("faq") },
        { id: "contact", element: document.getElementById("contact") }
      ];

      // Get current scroll position
      const scrollPosition = window.scrollY + 100; // offset for better UX

      // Check if we're at the top (home)
      if (window.scrollY < 300) {
        setActiveSection("home");
        return;
      }

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: "#", id: "home" },
    { name: t.services, href: "#services", id: "services" },
    { name: t.benefits, href: "#benefits", id: "benefits" },
    { name: t.stories, href: "#stories", id: "stories" },
    { name: t.faq, href: "#faq", id: "faq" },
    { name: t.contact, href: "#contact", id: "contact" },
  ];

  const languageNames = {
    en: "English",
    am: "አማርኛ",
    om: "Afaan Oromoo"
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // navbar height offset
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" onClick={(e) => handleNavClick(e, "#", "home")} className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold text-xl leading-tight ${scrolled ? "text-primary" : "text-white"}`}>Maedot</span>
            <span className={`text-xs tracking-wider uppercase ${scrolled ? "text-foreground" : "text-white/80"}`}>{t.saccos}</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`text-sm font-medium transition-all relative group ${
                  isActive 
                    ? "text-primary" 
                    : scrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                {/* Active indicator */}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </a>
            );
          })}
          
          <div className="h-6 w-px bg-border/50 mx-2"></div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className={`gap-2 ${scrolled ? "text-foreground" : "text-white hover:text-white hover:bg-white/20"}`}>
                <Globe className="h-4 w-4" />
                {languageNames[lang]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("am")}>አማርኛ</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang("om")}>Afaan Oromoo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
            {t.join}
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
           <ModeToggle />
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={scrolled ? "text-foreground" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <div className="flex gap-2 justify-center mb-4">
                  <Button variant={lang === "en" ? "default" : "outline"} size="sm" onClick={() => setLang("en")}>EN</Button>
                  <Button variant={lang === "am" ? "default" : "outline"} size="sm" onClick={() => setLang("am")}>አማ</Button>
                  <Button variant={lang === "om" ? "default" : "outline"} size="sm" onClick={() => setLang("om")}>OM</Button>
                </div>
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a 
                      key={link.name} 
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.id)}
                      className={`text-lg font-medium transition-colors relative ${
                        isActive ? "text-primary font-bold" : "text-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                      {isActive && <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></span>}
                    </a>
                  );
                })}
                <Button className="w-full bg-primary hover:bg-primary/90">{t.join}</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang].hero;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  
  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Addis Ababa Cityscape" 
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
      </motion.div>

      <motion.div style={{ opacity }} className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight text-white"
          >
            {t.title}<br/>
            <span className="text-primary">{t.subtitle}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl"
          >
            {t.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105">
              {t.cta_primary}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-full px-8 h-14 text-lg font-medium backdrop-blur-sm transition-all">
              {t.cta_secondary}
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex items-center gap-8 text-white/60 text-sm font-medium"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>{t.licensed}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>{t.members}</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Services = ({ lang }: { lang: Language }) => {
  const t = translations[lang].services;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const services = [
    {
      icon: <PiggyBank className="w-10 h-10 text-white" />,
      title: t.savings,
      description: t.savings_desc,
      color: "bg-blue-500"
    },
    {
      icon: <Briefcase className="w-10 h-10 text-white" />,
      title: t.loans,
      description: t.loans_desc,
      color: "bg-primary"
    },
    {
      icon: <Heart className="w-10 h-10 text-white" />,
      title: t.welfare,
      description: t.welfare_desc,
      color: "bg-green-500"
    },
    {
      icon: <Smartphone className="w-10 h-10 text-white" />,
      title: t.mobile,
      description: t.mobile_desc,
      color: "bg-purple-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div ref={ref} className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-3"
          >
            {t.title}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl font-heading font-bold text-foreground mb-4"
          >
            {t.heading}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-muted-foreground text-lg"
          >
            {t.subheading}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Card className="h-full border-none shadow-md hover:shadow-2xl transition-all duration-300 group overflow-hidden bg-card dark:bg-card">
                <CardContent className="p-8 flex flex-col items-start gap-4 h-full relative z-10">
                  <motion.div 
                    className={`p-4 rounded-2xl mb-2 shadow-lg ${service.color}`}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                    animate={{
                      rotate: [0, -3, 3, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const WhyChooseUs = ({ lang }: { lang: Language }) => {
  const t = translations[lang].why;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);
  
  const benefits = [
    {
      icon: <Percent className="w-6 h-6 text-primary" />,
      title: t.rate,
      description: t.rate_desc
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: t.approval,
      description: t.approval_desc
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: t.community,
      description: t.community_desc
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      title: t.secure,
      description: t.secure_desc
    }
  ];

  return (
    <section id="benefits" ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-primary font-bold tracking-wider uppercase text-sm mb-3"
            >
              {t.title}
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
            >
              {t.heading}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              {t.description}
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="flex gap-4 items-start p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border cursor-pointer"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 bg-primary/10 rounded-lg shrink-0"
                  >
                    {benefit.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative"
          >
            <motion.div 
              style={{ y: imageY, scale: imageScale }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-white/10"
            >
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                src={mobileBankingImage} 
                alt="Mobile Banking Convenience" 
                className="w-full h-auto" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-white"
                >
                  <p className="font-bold text-xl">Digital Access</p>
                  <p className="text-white/80 text-sm">Manage finances from your phone</p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.6, delay: 1, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="w-5 h-5 text-primary fill-primary" />
                <span className="font-bold text-foreground">{t.badge_title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.badge_desc}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SignupSteps = ({ lang }: { lang: Language }) => {
  const t = translations[lang].steps;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const steps = [
    {
      num: "01",
      title: t.step1,
      description: t.step1_desc
    },
    {
      num: "02",
      title: t.step2,
      description: t.step2_desc
    },
    {
      num: "03",
      title: t.step3,
      description: t.step3_desc
    }
  ];

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="py-24 bg-primary dark:bg-primary/95 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-white/5 dark:bg-black/10 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 font-bold tracking-wider uppercase text-sm mb-3"
          >
            {t.title}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white"
          >
            {t.heading}
          </motion.h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) - Curved SVG */}
          <motion.div 
            initial={{ opacity: 0, pathLength: 0 }}
            animate={isInView ? { opacity: 1, pathLength: 1 } : { opacity: 0, pathLength: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hidden md:block absolute top-12 left-0 w-full h-24 z-0 pointer-events-none"
          >
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <motion.path 
                d="M 166 50 C 333 50, 333 80, 500 50 C 666 20, 666 50, 833 50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="8 8" 
                className="text-white/30"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, delay: 0.6 }}
              />
            </svg>
          </motion.div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + index * 0.2,
                type: "spring",
                bounce: 0.4
              }}
              onClick={handleContactClick}
              className="relative z-10 flex flex-col items-center text-center cursor-pointer group"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 60px rgba(255, 255, 255, 0.2)"
                }}
                transition={{ duration: 0.3 }}
                className="w-24 h-24 bg-white/20 dark:bg-white/10 backdrop-blur-sm border-2 border-white/40 group-hover:border-white/60 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-6 shadow-lg transition-all"
              >
                {step.num}
              </motion.div>
              <h4 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors">{step.title}</h4>
              <p className="text-white/80 max-w-xs group-hover:text-white/90 transition-colors">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              onClick={handleContactClick}
              className="bg-white hover:bg-white/90 text-primary rounded-full px-10 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              {t.download}
            </Button>
          </motion.div>
          <p className="mt-4 text-sm text-white/70">
            {t.question} <a href="tel:+251903373727" className="text-white font-semibold cursor-pointer hover:underline transition-all">+251-0903373727</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = ({ lang }: { lang: Language }) => {
  const t = translations[lang].stories;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const testimonials = [
    {
      story: t.story1,
      name: "Tigist Alemu",
      role: t.role1,
      image: shopOwnerImage
    },
    {
      story: t.story2,
      name: "Abebe Kebede",
      role: t.role2,
      image: fatherDaughterImage
    }
  ];

  return (
    <section id="stories" ref={ref} className="py-24 bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -100, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-3"
          >
            {t.title}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
          >
            {t.heading}
          </motion.h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4 + index * 0.2,
                type: "spring",
                bounce: 0.3
              }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="border-none shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-card dark:bg-card h-full">
                <CardContent className="p-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                    className="flex gap-1 mb-4"
                  >
                    {[1,2,3,4,5].map(i => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: 0.7 + index * 0.2 + i * 0.05,
                          type: "spring",
                          bounce: 0.6
                        }}
                      >
                        <ThumbsUp className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                    className="text-muted-foreground text-lg italic mb-6"
                  >
                    "{testimonial.story}"
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <motion.img 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary" 
                    />
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ lang }: { lang: Language }) => {
  const t = translations[lang].faq;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const faqs = [
    {
      question: t.q1,
      answer: t.a1
    },
    {
      question: t.q2,
      answer: t.a2
    },
    {
      question: t.q3,
      answer: t.a3
    },
    {
      question: t.q4,
      answer: t.a4
    }
  ];
  
  return (
    <section id="faq" ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary font-bold tracking-wider uppercase text-sm mb-3"
          >
            {t.title}
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-heading font-bold mb-4"
          >
            {t.heading}
          </motion.h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const t = translations[lang].contact;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: t.phone,
      lines: ["+251-0903373727", "+251-111111111"]
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      title: t.location,
      lines: ["Addis Ababa, Ethiopia", "Maedot Saccos HQ, Bole Road"]
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: t.hours,
      lines: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 8:00 AM - 12:00 PM"]
    }
  ];
  
  return (
    <section id="contact" ref={ref} className="py-24 bg-secondary/20 dark:bg-secondary/5 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -180, 0],
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-heading font-bold text-foreground mb-6"
            >
              {t.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground mb-8 text-lg"
            >
              {t.subtitle}
            </motion.p>
            
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  className="flex items-start gap-4"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0"
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 text-lg">{info.title}</h4>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground">{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="shadow-2xl border-none bg-card dark:bg-card hover:shadow-3xl transition-shadow duration-300">
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-2 bg-primary w-full origin-left"
              />
              <CardContent className="p-8">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-2xl font-bold mb-6"
                >
                  {t.form_title}
                </motion.h3>
                <form className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t.name_first}</label>
                      <Input placeholder="John" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">{t.name_last}</label>
                      <Input placeholder="Doe" className="h-11" />
                    </div>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-foreground">{t.email}</label>
                    <Input type="tel" placeholder="+251..." className="h-11" />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-foreground">{t.message}</label>
                    <Textarea placeholder="" className="min-h-[120px]" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold">
                        {t.send}
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  const tNav = translations[lang].nav;
  
  return (
    <footer className="bg-foreground text-background/80 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-none text-background">Maedot</span>
                <span className="text-[10px] uppercase tracking-widest text-background/60">Saccos</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              {t.desc}
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </div>
              <div className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                <span className="sr-only">Telegram</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M21.928 2.522c-0.198-0.088-0.418-0.108-0.628-0.054-0.128 0.032-0.254 0.088-0.372 0.166l-18.428 12.022c-0.284 0.186-0.456 0.496-0.456 0.836 0 0.342 0.174 0.654 0.458 0.84l4.472 2.924c0.186 0.122 0.404 0.186 0.626 0.186 0.136 0 0.27-0.024 0.4-0.074l13.928-5.572c0.23-0.092 0.384-0.316 0.384-0.564s-0.154-0.472-0.384-0.564l-12.028-4.812c-0.286-0.114-0.61-0.028-0.796 0.214s-0.15 0.584 0.086 0.82l6.028 6.028c0.116 0.116 0.182 0.274 0.182 0.438v3.428c0 0.34-0.172 0.65-0.454 0.836-0.284 0.186-0.636 0.186-0.92 0-0.282-0.186-0.454-0.496-0.454-0.836v-2.028l-2.028-2.028c-0.236-0.236-0.618-0.236-0.854 0s-0.236 0.618 0 0.854l3.428 3.428c0.236 0.236 0.618 0.236 0.854 0s0.236-0.618 0-0.854v-3.428c0-0.164-0.066-0.322-0.182-0.438l-4.606-4.606 9.606-3.842 2.924-1.168z"></path></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-background mb-6">{t.company}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">{tNav.home}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{tNav.contact}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-background mb-6">{t.solutions}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">{t.fixed_deposits}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.business_loans}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.emergency_loans}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-background mb-6">{t.savings_types}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">{t.voluntary_savings}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.compulsory_savings}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.child_savings}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t.time_deposit}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-center md:text-left opacity-60">
            © {new Date().getFullYear()} {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

// Scroll Progress Indicator Component
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

// Scroll Indicator / Back to Top Button Component
const ScrollIndicator = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const offset = 80;
      const elementPosition = servicesSection.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Down Indicator - Shows at hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        style={{ display: scrolled ? 'none' : 'block' }}
      >
        <motion.button
          onClick={scrollToNextSection}
          className="pointer-events-auto flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors group"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm font-medium tracking-wider">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1 group-hover:border-white/60 transition-colors">
            <motion.div
              className="w-1.5 h-1.5 bg-white/80 rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Back to Top Button - Shows after scrolling */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: scrolled ? 1 : 0, 
          scale: scrolled ? 1 : 0.8,
          y: scrolled ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all group"
        style={{ display: scrolled ? 'flex' : 'none' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronDown className="w-6 h-6 rotate-180 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </>
  );
};

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <ScrollProgress />
      <ScrollIndicator />
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <WhyChooseUs lang={lang} />
      <SignupSteps lang={lang} />
      <Testimonials lang={lang} />
      <FAQ lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
