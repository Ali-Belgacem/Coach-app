import React from "react";
import { CardsProgram } from "../mockData/data";
import { useLanguage } from "../useLanguage";

const Cards = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-xs sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CardsProgram.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="group glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-violet-700/30 
                       transition-all duration-400 hover:-translate-y-1 hover:border-violet-500/40"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 sm:h-52 lg:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            <div className="p-5 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                {t(item.title)}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {t(item.description)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
