import React from "react";
import Cards from "./Cards";
import { useLanguage } from "../useLanguage";

const Programme = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-black w-full min-h-screen">
      {/* Top feature bar */}
      <div className="bg-gradient-to-r from-violet-950 via-purple-950 to-violet-950 border-t border-b border-violet-800/40 h-10 w-full flex items-center justify-center sticky top-0 z-10 backdrop-blur-sm">
        <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex justify-between items-center h-full gap-1 sm:gap-2">
            {[
              "Daily planning train",
              "Cardio programme",
              "Diet of your choice",
              "Daily follow-up via WhatsApp",
              "Crossfit planning",
            ].map((item, index) => (
              <p
                key={index}
                className="text-violet-200 font-semibold text-[8px] xs:text-[10px] sm:text-xs md:text-sm text-center flex-1 leading-tight tracking-wide"
              >
                {t(item)}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Programme heading */}
      <div className="py-10 text-center">
        <span className="inline-block px-4 py-1 rounded-full border border-violet-500/30 text-violet-400 text-xs font-semibold tracking-widest uppercase bg-violet-900/20 mb-4">
          {t("Our Training Plans")}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
          {t("TRAINING PROGRAMMES")}
        </h2>
      </div>

      {/* Cards section */}
      <div className="pb-12 w-full">
        <Cards />
      </div>
    </div>
  );
};

export default Programme;
