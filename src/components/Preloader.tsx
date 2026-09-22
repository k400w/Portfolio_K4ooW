import React, { useEffect, useState } from 'react';



const MINIMUM_DISPLAY_TIME = 1750;

const EXIT_DURATION = 800;



const logoFragments = [

  { character: 'K', className: 'preloader__fragment--k' },

  { character: '4', className: 'preloader__fragment--four' },

  { character: 'o', className: 'preloader__fragment--o' },

  { character: 'o', className: 'preloader__fragment--o2' },

  { character: 'W', className: 'preloader__fragment--w' },

];



export const Preloader: React.FC = () => {

  const [isVisible, setIsVisible] = useState(true);

  const [isExiting, setIsExiting] = useState(false);



  useEffect(() => {

    const exitTimer = window.setTimeout(() => setIsExiting(true), MINIMUM_DISPLAY_TIME);

    const removeTimer = window.setTimeout(() => setIsVisible(false), MINIMUM_DISPLAY_TIME + EXIT_DURATION);



    return () => {

      window.clearTimeout(exitTimer);

      window.clearTimeout(removeTimer);

    };

  }, []);



  if (!isVisible) {

    return null;

  }



  return (

    <div

      className={`preloader ${isExiting ? 'preloader--exit' : ''}`}

      role="status"

      aria-label="Loading K4ooW portfolio"

      aria-live="polite"

    >

      <div className="preloader__coordinates" aria-hidden="true">

        <span className="preloader__coordinate preloader__coordinate--top">48.4620° N / 35.0462° E</span>

        <span className="preloader__coordinate preloader__coordinate--left">SIGNAL // 04</span>

        <span className="preloader__coordinate preloader__coordinate--right">LOCK // 100%</span>

        <span className="preloader__coordinate preloader__coordinate--bottom">K4ooW / DIGITAL FREQUENCY</span>

      </div>

      <div className="preloader__scan preloader__scan--horizontal" aria-hidden="true" />

      <div className="preloader__scan preloader__scan--vertical" aria-hidden="true" />

      <div className="preloader__pulse" aria-hidden="true">

        <span className="preloader__pulse-ring preloader__pulse-ring--outer" />

        <span className="preloader__pulse-ring preloader__pulse-ring--inner" />

        <span className="preloader__pulse-core" />

      </div>



      <div className="preloader__content">

        <p className="preloader__eyebrow" aria-hidden="true">ACQUIRING SIGNAL</p>

        <div className="preloader__brand" aria-label="K4ooW">

          {logoFragments.map(({ character, className }) => (

            <span key={`${character}-${className}`} className={`preloader__fragment ${className}`}>

              {character}

            </span>

          ))}

        </div>

        <div className="preloader__lock-status" aria-hidden="true">

          <span className="preloader__lock-dot" />

          <span>SIGNAL LOCK</span>

        </div>

      </div>



      <div className="preloader__cut" aria-hidden="true" />

      <div className="preloader__shutter preloader__shutter--left" aria-hidden="true" />

      <div className="preloader__shutter preloader__shutter--right" aria-hidden="true" />

    </div>

  );

};

