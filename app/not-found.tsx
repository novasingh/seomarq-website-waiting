import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#110c1f] text-gray-200 min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved or doesn't exist.
        </p>
        <Link 
          href="/"
          className="inline-block bg-purple-700 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
