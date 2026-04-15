import FeatureItem from './FeatureItem';
import { useNavigate } from "react-router-dom";

const PricingCard = ({ title, price, duration, features, isPopular }) => {
  const navigate = useNavigate();
  const handleStartNow = () => navigate("/confirme");

  return (
    <div className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1
      ${isPopular
        ? 'glass-card border-violet-500/60 shadow-xl shadow-violet-700/30 animate-violet-glow'
        : 'glass-card border-gray-700/30 hover:border-violet-700/40'
      }
    `}>
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-md shadow-violet-700/40">
          POPULAIRE
        </div>
      )}

      <h2 className={`text-xl font-bold text-center mb-2 ${isPopular ? 'text-violet-300' : 'text-white'}`}>
        {title}
      </h2>

      <div className="text-center mb-6">
        <span className={`text-4xl font-extrabold ${isPopular ? 'text-violet-400' : 'text-white'}`}>
          {price}
        </span>
        <span className="text-gray-400 text-sm">/{duration}</span>
      </div>

      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <FeatureItem key={index} included={feature.included}>
            {feature.text}
          </FeatureItem>
        ))}
      </ul>

      <button
        onClick={handleStartNow}
        className={`w-full py-3 rounded-xl font-bold cursor-pointer transition-all duration-300 uppercase tracking-wider text-sm
          ${isPopular
            ? 'btn-violet shadow-md shadow-violet-700/40'
            : 'bg-gray-800 text-white hover:bg-violet-900/50 hover:text-violet-300 border border-gray-700 hover:border-violet-600/50'
          }
        `}
      >
        CHOOSE PLAN
      </button>
    </div>
  );
};

export default PricingCard;