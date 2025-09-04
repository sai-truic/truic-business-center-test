import Link from 'next/link';
import * as React from "react";

const HighlightedText = () => {
    return (
      <div>
        <img
          src="yellow_stroke.svg"
          alt="Brush Stroke"
          style={{
            position: 'absolute',
            top: '7%',
            left: '0',
            transform: 'translateY(-60%)',
            zIndex: '-10',
            maxWidth: '500px',
          }}
        />
        <h1 className='z-10 text-5xl' style={{fontFamily: 'PermanentMarker'}}>
          BUSINESS CENTER
          <span className={`ms-7 text-2xl font-extrabold`} style={{fontFamily: 'Karla'}}>
            BY TRUiC
          </span>
        </h1>
      </div>
    );
  };

function HeroSection() {
  return (
    <section className="flex relative flex-col items-center self-stretch px-20 pt-24 w-full min-h-[467px] max-md:px-5 max-md:max-w-full"
      style={{
        backgroundImage : `url('/grid_background.webp')`,
        backgroundPosition: 'top',
        backgroundSize: 'auto 500px',
        backgroundRepeat: 'repeat-x',
      }}
    >
      <div className="flex relative z-10 flex-col mb-0 max-w-full w-[957px] max-md:mb-2.5">
        <HighlightedText/>
        <div className="mt-20 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow text-xl text-black max-md:mt-10 max-md:max-w-full">
                <h2 className="font-extrabold leading-8 max-md:mr-0.5 max-md:max-w-full">
                  Empowering Entrepreneurs with Essential Tools and Resources
                </h2>
                <p className="mt-10 text-xl leading-8 max-md:max-w-full">
                  Your all-in-one solution for starting, managing, and growing
                  your business with confidence. Let's turn your vision into
                  reality.
                </p>
                <Link href="/sign-in" passHref>
                    <button
                        className="self-start px-9 py-5 mt-12 font-bold text-center bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 max-md:px-5 max-md:mt-10"
                        aria-label="Get Started"
                        >
                        Get Started
                    </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="landing_header.jpg"
                alt="Business Growth Illustration"
                className="object-contain w-full aspect-[1.78] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;