import React from 'react';
import PricingCard from "../Components/PricingCard";

const plans = [
  {
    title: "Basic Pack",
    price: "7000 DA",
    duration: "3 Month",
    features: [
      { text: "Diet: Customized nutrition plan adapted to your goals", included: true },
      { text: "Plan Workout: Structured training program designed for you", included: true },
      { text: "Answer Basic Questions: Direct support for your essential queries", included: true }
    ],
    isPopular: false
  },
  {
    title: "Premium Pack",
    price: "13000 DA",
    duration: "3 Month",
    features: [
      { text: "24/7 Service: Round-the-clock support for all your needs", included: true },
      { text: "Guiding supplements vitamins: Expert advice on supplementation", included: true },
      { text: "Nutrition: Comprehensive nutritional guidance", included: true },
      { text: "Answer questions every day at any time: Unlimited consulting access", included: true },
      { text: "Planing workout: Evolving customized training schedules", included: true },
      { text: "Planing diet every week: Weekly adjustments to your meal plan", included: true }
    ],
    isPopular: true
  },
  {
    title: "Elite Pack",
    price: "25000 DA",
    duration: "3 Month",
    features: [
      { text: "All Features of Premium Included: Everything from the Premium Pack plus premium services", included: true },
      { text: "Daily Coaching: Personalized daily support to keep you motivated and on track", included: true },
      { text: "Competition Program & In-Person Sessions: Exclusive face-to-face consultations", included: true },
      { text: "Ultimate Support: Designed for individuals committed to exceptional results", included: true },
    ],
    isPopular: false
  }
];

const Subscribe = () => {
  return (
    <div className="relative min-h-screen bg-black py-16 px-4 overflow-hidden">
      {/* Background violet glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-64 bg-violet-900/20 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 relative z-10">
        <span className="inline-block px-4 py-1 rounded-full border border-violet-400/30 text-violet-400 text-sm font-semibold tracking-widest uppercase bg-violet-900/20 mb-4">
          Pricing Plans
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          CHOOSE YOUR PLAN
        </h1>
        <p className="text-gray-400 text-base">Select the plan that fits your goals and budget</p>
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default Subscribe;