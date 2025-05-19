import AIChat from '../components/AIChat';
import GeneratePlan from '../components/GeneratePlan';

export default function AIAssistant() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Trenér</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Chat s AI trenérem</h2>
          <p className="text-gray-600 mb-6">
            Zeptejte se na cokoliv ohledně tréninku, výživy nebo zdravého životního stylu.
            AI trenér vám poskytne odborné rady na základě vašeho profilu a cílů.
          </p>
          <AIChat />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Generování tréninkového plánu</h2>
          <p className="text-gray-600 mb-6">
            Nechte si vygenerovat personalizovaný tréninkový plán na míru vašim cílům a možnostem.
            Plán bude zohledňovat vaši úroveň, dostupné vybavení a zdravotní omezení.
          </p>
          <GeneratePlan />
        </div>
      </div>
    </div>
  );
} 