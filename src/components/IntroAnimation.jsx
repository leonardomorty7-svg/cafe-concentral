import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const IntroAnimation = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const subtitleRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
      }
    });

    // Initial state
    gsap.set([textRef.current, subtitleRef.current, lineRef.current], { opacity: 0, y: 20 });

    tl.to(containerRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'expo.out'
    }, '+=0.2')
    .to(lineRef.current, {
      opacity: 1,
      width: '60px',
      duration: 1,
      ease: 'expo.out'
    }, '-=0.8')
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')
    .to([textRef.current, subtitleRef.current, lineRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'expo.in',
      delay: 1.5
    })
    .to(containerRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'expo.inOut'
    }, '-=0.2');

    return () => tl.kill();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0B0B0B] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="text-center space-y-6">
        <h1 
          ref={textRef}
          className="text-white text-3xl md:text-5xl font-serif tracking-[0.2em] font-light"
        >
          CAFÉ <span className="text-[#C6A77D]">CONCENTRAL</span>
        </h1>
        
        <div 
          ref={lineRef}
          className="h-[1px] bg-[#C6A77D]/30 w-0 mx-auto"
        />
        
        <p 
          ref={subtitleRef}
          className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-light"
        >
          Architectural Coffee Experience
        </p>
      </div>
    </div>
  );
};

export default IntroAnimation;
