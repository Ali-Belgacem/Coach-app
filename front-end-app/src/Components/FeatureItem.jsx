const FeatureItem = ({ included, children }) => {
  return (
    <li className={`flex items-start gap-2 text-sm ${included ? 'text-gray-300' : 'text-gray-500 line-through'}`}>
      {included ? (
        <span className="text-violet-400 mt-0.5">✓</span>
      ) : (
        <span className="text-gray-500 mt-0.5">✗</span>
      )}
      {children}
    </li>
  );
}
export default FeatureItem