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
  const t = translations[lang].nav;

  // Add scroll listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }

  const navLinks = [
    { name: t.home, href: "#" },
    { name: t.services, href: "#services" },
    { name: t.benefits, href: "#benefits" },
    { name: t.stories, href: "#stories" },
    { name: t.faq, href: "#faq" },
    { name: t.contact, href: "#contact" },
  ];

  const languageNames = {
    en: "English",
    am: "አማርኛ",
    om: "Afaan Oromoo"
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold text-xl leading-tight ${scrolled ? "text-primary" : "text-white"}`}>Maedot</span>
            <span className={`text-xs tracking-wider uppercase ${scrolled ? "text-foreground" : "text-white/80"}`}>{t.saccos}</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-white/90"}`}
            >
              {link.name}
            </a>
          ))}
          
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
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
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
  
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Addis Ababa Cityscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary-foreground font-bold text-sm tracking-wide uppercase">{t.tagline}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight text-white">
            {t.title}<br/>
            <span className="text-primary">{t.subtitle}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105">
              {t.cta_primary}
            </Button>
            <Button variant="outline" size="lg" className="bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-full px-8 h-14 text-lg font-medium backdrop-blur-sm transition-all">
              {t.cta_secondary}
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 text-white/60 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>{t.licensed}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span>{t.members}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = ({ lang }: { lang: Language }) => {
  const t = translations[lang].services;
  
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

  return (
    <section id="services" className="py-24 bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{t.title}</h2>
          <h3 className="text-4xl font-heading font-bold text-foreground mb-4">{t.heading}</h3>
          <p className="text-muted-foreground text-lg">
            {t.subheading}
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
              <Card className="h-full border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden bg-card dark:bg-card">
                <CardContent className="p-8 flex flex-col items-start gap-4 h-full relative z-10">
                  <div className={`p-4 rounded-2xl mb-2 shadow-lg ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = ({ lang }: { lang: Language }) => {
  const t = translations[lang].why;
  
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
    <section id="benefits" className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{t.title}</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              {t.heading}
            </h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4 items-start p-4 rounded-xl hover:bg-secondary/50 transition-colors border border-transparent hover:border-border">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white dark:border-white/10">
              <img src={mobileBankingImage} alt="Mobile Banking Convenience" className="w-full h-auto transform hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-xl">Digital Access</p>
                  <p className="text-white/80 text-sm">Manage finances from your phone</p>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <ThumbsUp className="w-5 h-5 text-primary fill-primary" />
                <span className="font-bold text-foreground">{t.badge_title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t.badge_desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SignupSteps = ({ lang }: { lang: Language }) => {
  const t = translations[lang].steps;
  
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

  return (
    <section className="py-24 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{t.title}</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-background">{t.heading}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) - Curved SVG */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-24 z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <path 
                d="M 166 50 C 333 50, 333 80, 500 50 C 666 20, 666 50, 833 50" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="8 8" 
                className="text-primary/30"
              />
            </svg>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-secondary/10 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-3xl font-bold text-primary mb-6 shadow-lg shadow-black/20">
                {step.num}
              </div>
              <h4 className="text-xl font-bold mb-3 text-background">{step.title}</h4>
              <p className="text-background/60 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg">
            {t.download}
          </Button>
          <p className="mt-4 text-sm text-background/40">
            {t.question} <span className="text-primary cursor-pointer hover:underline">+251-0903373727</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ lang }: { lang: Language }) => {
  const t = translations[lang].stories;
  
  return (
    <section id="stories" className="py-24 bg-secondary/30 dark:bg-secondary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{t.title}</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">{t.heading}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-none shadow-lg bg-card dark:bg-card">
            <CardContent className="p-8">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <ThumbsUp key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-muted-foreground text-lg italic mb-6">
                {t.story1}
              </p>
              <div className="flex items-center gap-4">
                <img src={shopOwnerImage} alt="Shop Owner" className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
                <div>
                  <h4 className="font-bold text-foreground">Tigist Alemu</h4>
                  <p className="text-xs text-muted-foreground">{t.role1}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-card dark:bg-card">
            <CardContent className="p-8">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <ThumbsUp key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-muted-foreground text-lg italic mb-6">
                {t.story2}
              </p>
              <div className="flex items-center gap-4">
                <img src={fatherDaughterImage} alt="Parent" className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
                <div>
                  <h4 className="font-bold text-foreground">Abebe Kebede</h4>
                  <p className="text-xs text-muted-foreground">{t.role2}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const FAQ = ({ lang }: { lang: Language }) => {
  const t = translations[lang].nav;
  
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{t.faq}</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">Frequently Asked Questions</h3>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">How do I become a member?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              To become a member, simply visit our office with a valid ID and passport-sized photos. Fill out the application form, pay the registration fee, and make your initial deposit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">What is the minimum saving amount?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              We have flexible saving plans. Our regular savings account requires a minimum monthly contribution of 500 ETB, but you can save more as your capacity grows.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">How long does loan processing take?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              For emergency loans, processing can be done within 24 hours. Business and other larger loans typically take 3-5 working days after all documentation is submitted.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">Can I access my money online?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base">
              Yes! We offer USSD mobile banking and a mobile app where you can check your balance, transfer funds, and even apply for small loans.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const t = translations[lang].contact;
  
  return (
    <section id="contact" className="py-24 bg-secondary/20 dark:bg-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6">{t.title}</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t.subtitle}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-lg">{t.phone}</h4>
                  <p className="text-muted-foreground">+251-0903373727</p>
                  <p className="text-muted-foreground">+251-111111111</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-lg">{t.location}</h4>
                  <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
                  <p className="text-muted-foreground">Maedot Saccos HQ, Bole Road</p>
                </div>
              </div>

               <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white dark:bg-card rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-lg">{t.hours}</h4>
                  <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
                  <p className="text-muted-foreground">Sat: 8:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="shadow-2xl border-none bg-card dark:bg-card">
            <div className="h-2 bg-primary w-full"></div>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">{t.form_title}</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.name_first}</label>
                    <Input placeholder="John" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">{t.name_last}</label>
                    <Input placeholder="Doe" className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.email}</label>
                  <Input type="tel" placeholder="+251..." className="h-11" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">{t.message}</label>
                  <Textarea placeholder="" className="min-h-[120px]" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base font-semibold">
                  {t.send}
                </Button>
              </form>
            </CardContent>
          </Card>
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
              <li><a href="#" className="hover:text-primary transition-colors">Fixed Deposits</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Business Loans</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Emergency Loans</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-background mb-6">{t.savings_types}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Voluntary Savings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Compulsory Savings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Child Savings</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Time Deposit</a></li>
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

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-300">
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
