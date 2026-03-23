import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ShoppingBag, Menu, X, Droplets, ShieldCheck, Sparkles, Heart, ArrowRight, ArrowDown, Instagram, Wind, Clock, Leaf } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "Midnight Oud",
    price: "$85",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Velvet Rose",
    price: "$75",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Santal Aura",
    price: "$90",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    name: "Amber Glow",
    price: "$80",
    image: "https://images.unsplash.com/photo-1615397323712-401348633748?auto=format&fit=crop&q=80&w=800",
  }
];

const IG_FEED = [
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="min-h-screen bg-nami-bg text-nami-text selection:bg-nami-gold selection:text-nami-bg overflow-x-hidden font-sans cursor-none relative">
      
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none z-0"></div>

      {/* Custom Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-nami-gold mix-blend-difference pointer-events-none z-[100] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-nami-gold/30 pointer-events-none z-[99] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? 'bg-nami-bg/70 backdrop-blur-xl py-4 border-b border-nami-border shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <button 
            className="md:hidden text-nami-text"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1} />
          </button>

          <nav className="hidden md:flex items-center gap-10 text-[10px] tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-nami-gold transition-colors">Shop</a>
            <a href="#" className="hover:text-nami-gold transition-colors">Collections</a>
            <a href="#" className="hover:text-nami-gold transition-colors">About</a>
          </nav>

          <a href="#" className="text-3xl md:text-4xl font-serif italic tracking-tight text-center absolute left-1/2 -translate-x-1/2 text-nami-text hover:text-nami-gold transition-colors duration-500">
            Scentara
          </a>

          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[10px] tracking-[0.2em] uppercase hover:text-nami-gold transition-colors">
              Log In
            </button>
            <button className="relative group p-2">
              <ShoppingBag size={20} strokeWidth={1} className="text-nami-text group-hover:text-nami-gold transition-colors" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-nami-gold text-nami-bg text-[9px] flex items-center justify-center rounded-full font-medium">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-nami-bg p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-3xl font-serif italic">Scentara</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} strokeWidth={1} />
              </button>
            </div>
            <nav className="flex flex-col gap-8 text-4xl font-serif font-light">
              <a href="#" className="hover:text-nami-gold transition-colors">Shop All</a>
              <a href="#" className="hover:text-nami-gold transition-colors">New Arrivals</a>
              <a href="#" className="hover:text-nami-gold transition-colors">Signature Scents</a>
              <a href="#" className="hover:text-nami-gold transition-colors">Best Sellers</a>
              <a href="#" className="hover:text-nami-gold transition-colors">Discovery Set</a>
              <a href="#" className="hover:text-nami-gold transition-colors mt-8 text-2xl italic text-nami-text/60">Our Story</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0 bg-[#0A0A0A]">
          <motion.img 
            style={{ y: y1 }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-[120%] object-cover opacity-60 -top-[10%] relative"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Overlays for perfect text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#000000]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        </div>

        {/* Inner Frame (Editorial Touch) */}
        <div className="absolute inset-6 md:inset-10 border border-white/10 z-10 pointer-events-none hidden md:block"></div>

        <motion.div 
          style={{ y: y2 }}
          className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-6 mb-8 md:mb-12"
          >
            <div className="w-12 h-[1px] bg-nami-gold/60"></div>
            <span className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-nami-gold">The World of Scents</span>
            <div className="w-12 h-[1px] bg-nami-gold/60"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] font-light uppercase tracking-tighter text-white drop-shadow-2xl"
          >
            Liquid <br/>
            <span className="font-serif italic lowercase text-nami-gold tracking-normal pr-4 md:pr-8">emotion</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 md:mt-14 max-w-lg text-[10px] md:text-xs font-light leading-relaxed text-white/70 uppercase tracking-[0.3em]"
          >
            An olfactory journey through memories and desires. Crafted for the modern connoisseur.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 md:mt-16"
          >
            <a href="#collection" className="relative overflow-hidden group px-12 py-5 border border-white/20 text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 bg-black/20 backdrop-blur-sm hover:border-nami-gold inline-block">
              <span className="relative z-10 group-hover:text-nami-bg transition-colors duration-500 text-white">Discover Collection</span>
              <div className="absolute inset-0 bg-nami-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
        >
          <span className="text-[8px] tracking-[0.4em] uppercase text-white/40">Scroll</span>
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 64] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-full h-1/2 bg-nami-gold absolute top-0 left-0"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Bar */}
      <section className="relative border-y border-nami-border bg-nami-bg overflow-hidden py-8 md:py-10">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
          {[
            { icon: Sparkles, text: "Luxury Inspired" },
            { icon: Clock, text: "Long Lasting" },
            { icon: Droplets, text: "Premium Ingredients" },
            { icon: Leaf, text: "Cruelty Free" }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <feature.icon size={16} strokeWidth={1} className="text-nami-gold/60 group-hover:text-nami-gold transition-colors duration-500" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-nami-text/60 group-hover:text-nami-text transition-colors duration-500">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* The Collection */}
      <section id="collection" className="relative py-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[1000px] bg-nami-gold/[0.03] blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto">
          <div className="flex flex-col items-center text-center mb-32 gap-6">
            <span className="text-[9px] tracking-[0.4em] uppercase text-nami-gold">Curated Selection</span>
            <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-serif font-light tracking-tight leading-none">
              Signature <span className="italic text-nami-gold">Scents</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24">
            {PRODUCTS.map((product, idx) => (
              <div key={product.id} className={`group cursor-pointer ${idx % 2 !== 0 ? 'lg:mt-24' : ''}`}>
                <div className="relative aspect-[2/3] overflow-hidden mb-8 bg-[#0A0A0A] border border-nami-border/30">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1] grayscale-[30%] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] flex justify-center">
                    <span className="bg-white/10 backdrop-blur-md text-white text-[9px] tracking-[0.3em] uppercase px-8 py-4 border border-white/20 hover:bg-white hover:text-black transition-colors duration-500">
                      Discover
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <h3 className="font-serif text-2xl md:text-3xl font-light text-nami-text/90">{product.name}</h3>
                  <span className="text-[10px] tracking-[0.3em] text-nami-gold/80">{product.price}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-32 flex justify-center">
            <a href="#" className="text-[9px] tracking-[0.3em] uppercase border-b border-nami-border pb-2 hover:text-nami-gold hover:border-nami-gold transition-colors duration-500">
              View Complete Collection
            </a>
          </div>
        </div>
      </section>

      {/* Editorial Story Section */}
      <section className="py-40 relative overflow-hidden border-t border-nami-border">
        <div className="absolute top-1/2 left-0 w-[1000px] h-[1000px] bg-nami-gold/[0.03] blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-12">
              <div className="w-8 h-[1px] bg-nami-gold/60"></div>
              <span className="text-[9px] tracking-[0.4em] uppercase text-nami-gold">Our Philosophy</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-light leading-[1.1] mb-12">
              Scents that <br/>
              <span className="italic text-nami-gold/90">define you.</span>
            </h2>
            <p className="text-xs md:text-sm font-light leading-relaxed text-nami-text/50 max-w-md mb-14 uppercase tracking-[0.1em]">
              We believe a fragrance is more than just a scent—it's an extension of your identity. Luxury-inspired fragrances crafted to leave a lasting impression wherever you go.
            </p>
            <a 
              href="https://instagram.com/scentaratheworldofscents" 
              target="_blank"
              rel="noreferrer"
              className="relative overflow-hidden group w-fit px-10 py-4 border border-nami-border text-[9px] tracking-[0.3em] uppercase transition-colors duration-500"
            >
              <span className="relative z-10 group-hover:text-nami-bg transition-colors duration-500">DM to Order</span>
              <div className="absolute inset-0 bg-nami-text translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 relative aspect-[3/4] w-full max-w-2xl mx-auto md:ml-auto"
          >
             <div className="absolute inset-0 border border-nami-gold/20 translate-x-4 translate-y-4"></div>
             <div className="w-full h-full overflow-hidden relative z-10 bg-[#0A0A0A]">
               <motion.img 
                 whileHover={{ scale: 1.05 }}
                 transition={{ duration: 2, ease: "easeOut" }}
                 src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=1200" 
                 alt="Luxury Perfume Bottle"
                 className="w-full h-full object-cover opacity-80 grayscale-[20%]"
                 referrerPolicy="no-referrer"
               />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-32 relative border-t border-nami-border overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-nami-gold/[0.04] blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 text-center mb-16 px-6">
          <a href="https://instagram.com/scentaratheworldofscents" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-nami-gold hover:text-nami-text transition-colors mb-6">
            <Instagram size={24} strokeWidth={1} />
          </a>
          <h2 className="text-4xl font-serif font-light mb-4">@scentaratheworldofscents</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-nami-text/60">Tag us to be featured</p>
        </div>
        
        <div className="relative z-10 flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          <div className="flex gap-1 px-6 md:px-12 min-w-max">
            {IG_FEED.map((img, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="relative w-72 h-72 md:w-96 md:h-96 snap-center group overflow-hidden block bg-[#111]"
              >
                <img 
                  src={img} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                  <Instagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" size={32} strokeWidth={1} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#020202] pt-32 pb-12 border-t border-nami-border overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-nami-gold/30 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-nami-gold/[0.03] blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12">
          
          {/* Newsletter Section */}
          <div className="flex flex-col items-center text-center mb-32">
            <h3 className="text-3xl md:text-5xl font-serif italic mb-6 text-nami-text">Join the Atelier</h3>
            <p className="text-xs md:text-sm font-light text-nami-text/50 max-w-md mb-10 uppercase tracking-[0.2em]">
              Subscribe to receive exclusive offers, early access to new releases, and olfactory inspiration.
            </p>
            <div className="flex w-full max-w-md border-b border-nami-border pb-2 group focus-within:border-nami-gold transition-colors duration-500">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-transparent text-[10px] tracking-[0.3em] uppercase text-nami-text placeholder:text-nami-text/30 outline-none"
              />
              <button className="text-[10px] tracking-[0.3em] uppercase text-nami-gold hover:text-nami-text transition-colors duration-500">
                Subscribe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-4">
              <h3 className="text-3xl font-serif italic mb-8 text-nami-text/90">Scentara</h3>
              <p className="text-xs font-light leading-relaxed text-nami-text/50 max-w-xs mb-10 uppercase tracking-[0.1em]">
                The World of Scents. Luxury-inspired fragrances where elegance meets identity. Crafted for the modern connoisseur.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/scentaratheworldofscents" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-nami-border flex items-center justify-center hover:bg-nami-gold hover:border-nami-gold hover:text-[#020202] transition-colors duration-500">
                  <Instagram size={16} strokeWidth={1} />
                </a>
              </div>
            </div>
            
            <div className="md:col-span-2 md:col-start-7">
              <h4 className="text-[9px] tracking-[0.4em] uppercase mb-8 text-nami-gold">Shop</h4>
              <ul className="space-y-5 text-[11px] tracking-[0.1em] uppercase font-light text-nami-text/50">
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">All Fragrances</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Best Sellers</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Discovery Set</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Gift Cards</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-[9px] tracking-[0.4em] uppercase mb-8 text-nami-gold">About</h4>
              <ul className="space-y-5 text-[11px] tracking-[0.1em] uppercase font-light text-nami-text/50">
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Our Story</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Ingredients</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Sustainability</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Journal</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[9px] tracking-[0.4em] uppercase mb-8 text-nami-gold">Help</h4>
              <ul className="space-y-5 text-[11px] tracking-[0.1em] uppercase font-light text-nami-text/50">
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">FAQ</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Shipping</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Returns</a></li>
                <li><a href="#" className="hover:text-nami-text transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-nami-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] tracking-[0.3em] uppercase text-nami-text/30">
            <p>&copy; {new Date().getFullYear()} Scentara. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-nami-text transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-nami-text transition-colors duration-300">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
