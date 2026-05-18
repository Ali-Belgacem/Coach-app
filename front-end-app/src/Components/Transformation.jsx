import React from "react";
import TransformationGrid from "./TransformationGrid";
import { useLanguage } from "../useLanguage";

const Transformation = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-black py-16 px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-72 bg-violet-900/15 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 rounded-full border border-violet-500/30 text-violet-400 text-xs font-semibold tracking-widest uppercase bg-violet-900/20 mb-4">
            {t("Real Results")}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t("CLIENT TRANSFORMATIONS")}
          </h1>
          <p className="text-lg text-gray-400">
            {t("More than ")}
            <span className="text-violet-400 font-bold">+100</span>{" "}
            {t("satisfied clients")}
          </p>
        </div>

        {/* Transformation Grid */}
        <TransformationGrid />

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm tracking-wider">
          www.coachfares.com
        </div>
      </div>
    </div>
  );
};

export default Transformation;
