import React from "react";
import { assets } from "../assets";

const Aboutus = () => {
  return (
    <div className="relative bg-black w-full min-h-screen p-6">
      {/* Decorative top separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent mb-10" />

      {/* Section Who is Coach Fares */}
      <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
        
        {/* Photo */}
        <div className="lg:w-1/3 flex justify-center">
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-800 blur opacity-60 animate-violet-glow" />
            <img
              className="relative w-full max-w-xs h-auto object-cover rounded-2xl shadow-2xl"
              src={assets.Ifbb1}
              alt="Coach Fares IFBB Pro"
            />
          </div>
        </div>

        {/* Description */}
        <div className="lg:w-2/3 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-8 uppercase tracking-wider bg-gradient-to-r from-violet-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            WHO IS COACH FARES?
          </h1>

          {/* Glass card info box */}
          <div className="glass-card w-full md:w-3/4 lg:w-2/3 p-6 md:p-8 rounded-2xl">
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                <span className="text-lg md:text-xl font-bold text-violet-300">IFBB PRO COACH</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                <p className="text-base md:text-lg">Internationally Certified Nutritionist</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                <p className="text-base md:text-lg">Helped 200+ clients achieve their fitness goals</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                <p className="text-base md:text-lg">Specialist in lifestyle transformation programs</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                <p className="text-base md:text-lg">Personal trainer for competitive athletes</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Certifications */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 uppercase tracking-wider text-white">
          My Certificates
        </h2>
        <p className="text-violet-400 text-sm mb-8 tracking-widest uppercase">Official Credentials</p>
        <div className="flex flex-wrap justify-center gap-8">
          {[assets.Certafict1, assets.Certaficat2].map((src, i) => (
            <div key={i} className="group relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 blur opacity-40 group-hover:opacity-70 transition duration-500" />
              <img
                className="relative w-56 h-auto object-contain rounded-xl shadow-xl"
                src={src}
                alt={`Certification ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent mt-10" />
    </div>
  );
};

export default Aboutus;
