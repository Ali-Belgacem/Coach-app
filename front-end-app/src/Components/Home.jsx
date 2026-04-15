import React from "react";
import { assets } from "../assets";

const Home = ({ onStartNow }) => {
  const handleStartNow = () => {
    if (onStartNow) {
      onStartNow();
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "213657495826";
    const message = "Hi, I'm interested in your services!✅";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="relative w-full min-h-screen h-[100dvh] overflow-hidden bg-black">
      {/* Background image */}
      <img
        src={assets.coach1}
        alt="Coach Fares"
        className="absolute inset-0 w-full h-full object-cover object-[center_15%] md:object-top lg:object-top opacity-80 animate-zoom-pulse"
      />

      {/* Gradient overlay — dark & purple-tinted */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-purple-950/50 to-black/90" />

      {/* Subtle violet glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-violet-700 rounded-full blur-3xl opacity-10 animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse-slower" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="space-y-4 mb-12">
          {/* Eyebrow label */}
          <span className="inline-block px-4 py-1 rounded-full border border-violet-400/40 text-violet-300 text-sm font-semibold tracking-widest uppercase bg-violet-900/30 mb-2 animate-fade-in-down">
            Professional Online Coaching
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white animate-fade-in-down leading-tight">
            TRANSFORM YOUR BODY
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent animate-text-glow">
            WITH COACH FARES
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mt-6 animate-fade-in-up delay-200 font-light tracking-wide">
            YOUR FUTURE STARTS TODAY
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-300">
          {/* START NOW button */}
          <button
            onClick={handleStartNow}
            className="btn-violet relative px-12 py-4 font-bold text-lg uppercase rounded-full shadow-lg hover:shadow-violet-500/50"
          >
            START NOW
          </button>

          {/* BOOK A SESSION button */}
          <button
            onClick={handleWhatsAppClick}
            className="relative px-12 py-4 bg-transparent text-white font-bold text-lg uppercase rounded-full
                        border-2 border-violet-500/60 hover:border-violet-400 transition-all duration-300 transform 
                        hover:scale-105 hover:text-violet-300 shadow-lg hover:shadow-violet-500/30 hover:bg-violet-950/30"
          >
            BOOK A SESSION
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-violet-300/60 animate-bounce-slow">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default Home;
