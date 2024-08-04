'use client';
import gsap from 'gsap';
import React from 'react';

export const NameAnimationHome = () => {
  const primary = {
    first_name: 'Muhammad',
    middle_name: 'Naufal',
    last_name: 'Rafianto',
  };
  const component = React.useRef(null);

  const renderLetters = (name: string, key: string) => {
    if (!name) return;
    return name.split('').map((letter, index) => (
      <span key={index} className={`name-animation name-animation-${key}-index inline-block opacity-0`}>
        {letter}
      </span>
    ));
  };

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline().fromTo(
        '.name-animation',
        { x: -100, opacity: 0, rotate: -10 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          delay: 0.5,
          ease: 'elastic.out(1,0.3)',
          duration: 1,
          transformOrigin: 'left top',
          stagger: { each: 0.1, from: 'random' },
        }
      );
    }, component);
    return () => ctx.revert(); // cleanup!
  }, []);
  return (
    <div className="col-start-1 md:row-start-1" data-speed=".1" ref={component}>
      <h1
        className="mb-8 whitespace-nowrap text-[clamp(3rem,10vmin,8rem)] font-extrabold leading-[1] tracking-tighter max-lg:flex max-lg:flex-col max-lg:items-center"
        aria-label={primary.first_name + ' ' + primary.last_name}
      >
        <span className="text-slate-500/50">{renderLetters(primary.first_name, 'first')} </span>
        <span className="text-slate-300">{renderLetters(primary.middle_name, 'middle')} </span>
        <span className="text-slate-500/50">{renderLetters(primary.last_name, 'last')}</span>
      </h1>
    </div>
  );
};
