import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const IntroAnimation = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const brandGroupRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    });

    // Initial state
    gsap.set(brandGroupRef.current, { opacity: 0, scale: 0.98 });
    gsap.set([textRef.current, subtitleRef.current], { opacity: 0, y: 10 });

    tl.to(containerRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    })
    // 1. Logo & Group Reveal (Fade + Scale)
    .to(brandGroupRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.4,
      ease: 'expo.out'
    }, '+=0.1')
    // 2. Text Content Reveal
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.8')
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')
    // 3. Exit Sequence
    .to([brandGroupRef.current, textRef.current, subtitleRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 1.2
    })
    .to(containerRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'expo.inOut'
    }, '-=0.3');

    return () => tl.kill();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0B0B0B] flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      <div ref={brandGroupRef} className="flex flex-col items-center space-y-8">
        {/* Main Logo focal point */}
        <div ref={logoRef} className="w-24 md:w-32 h-auto">
          <img 
            src="/assets/brand/logo-primary-gold.svg" 
            alt="Café Concentral Logo" 
            className="w-full h-auto"
          />
        </div>

        <div className="text-center space-y-4">
          <h1 
            ref={textRef}
            className="text-white text-2xl md:text-3xl font-serif tracking-[0.4em] font-light"
          >
            CAFÉ <span className="text-[#C6A77D]">CONCENTRAL</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-white/30 text-[9px] uppercase tracking-[0.6em] font-light"
          >
            Architectural Coffee Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
