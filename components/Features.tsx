import { AnalysisIcon, SuggestionsIcon, TrackingIcon } from './Icons';

const features = [
  {
    icon: AnalysisIcon,
    title: 'AI-Powered Analysis',
    description: 'Our advanced AI dives deep into your website to uncover technical SEO issues, content gaps, and backlink opportunities you might have missed.',
  },
  {
    icon: SuggestionsIcon,
    title: 'Actionable Suggestions',
    description: 'Get clear, prioritized, and easy-to-implement recommendations. We tell you not just what\'s wrong, but exactly how to fix it for maximum impact.',
  },
  {
    icon: TrackingIcon,
    title: 'Competitor Tracking',
    description: 'Monitor your competitors\' SEO strategies. See what keywords they rank for, their backlink profiles, and stay one step ahead of the competition.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32" aria-labelledby="features-heading">
      <div className="text-center">
        <h2 id="features-heading" className="text-3xl md:text-4xl font-extrabold text-white">
          Powerful Features to Boost Your Ranking
        </h2>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          SEOMARQ is packed with AI-powered tools designed to give you a competitive edge and simplify your SEO workflow. Improve your search engine visibility today.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <article
            key={index}
            className="group bg-[#1a1429] p-8 rounded-2xl border border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
          >
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2" aria-hidden="true">
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-white">{feature.title}</h3>
            <p className="mt-2 text-gray-400">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
