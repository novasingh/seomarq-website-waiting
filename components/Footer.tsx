export const Footer = () => {
  return (
    <footer className="text-gray-400 py-12" role="contentinfo">
      <div className="border-t border-gray-800 pt-8 text-center">
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} SEOMARQ. All rights reserved.</p>
        <p className="text-xs text-gray-600 mt-2">AI-Powered SEO Analysis & Optimization Tool</p>
      </div>
    </footer>
  );
};
