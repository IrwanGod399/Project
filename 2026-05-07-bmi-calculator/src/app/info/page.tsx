import Link from "next/link";
import { CATEGORIES } from "@/lib/bmi";

const faqs = [
  {
    q: "What is BMI?",
    a: "Body Mass Index (BMI) is a simple measure using your weight and height to work out if your weight is healthy. It is calculated as weight (kg) divided by height (m) squared.",
  },
  {
    q: "Is BMI accurate for everyone?",
    a: "BMI is a useful screening tool but is not diagnostic. It may overestimate body fat in athletes with high muscle mass and underestimate it in older adults who have lost muscle. Consult a healthcare professional for a full assessment.",
  },
  {
    q: "How is BMI calculated?",
    a: "Metric: BMI = weight(kg) ÷ height(m)². Imperial: BMI = 703 × weight(lbs) ÷ height(in)².",
  },
  {
    q: "What is a healthy BMI?",
    a: "For most adults, a BMI between 18.5 and 24.9 is considered healthy. However, healthy weight ranges can differ for different ethnicities.",
  },
  {
    q: "Does BMI apply to children?",
    a: "BMI for children and teens is interpreted differently — it is plotted on age- and sex-specific growth charts as a percentile. This calculator is designed for adults.",
  },
];

export default function InfoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">BMI Information</h1>
      <p className="text-slate-400 mb-10">
        Everything you need to know about Body Mass Index.
      </p>

      {/* Category detail cards */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-slate-200">BMI Categories</h2>
        <div className="space-y-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.label} className={`rounded-xl border p-5 ${cat.bg}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-bold text-lg ${cat.color}`}>{cat.label}</h3>
                <span className="text-slate-400 text-sm font-mono">BMI {cat.range}</span>
              </div>
              <p className="text-slate-300 text-sm mb-3">{cat.description}</p>
              <ul className="space-y-1">
                {cat.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-slate-400 text-xs">
                    <span className={`mt-0.5 ${cat.color}`}>→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="mb-10 bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-slate-200">The Formula</h2>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-slate-400 mb-1">Metric</div>
            <code className="block bg-slate-900 rounded-lg px-4 py-3 text-emerald-400 text-sm">
              BMI = weight (kg) ÷ [height (m)]²
            </code>
          </div>
          <div>
            <div className="text-sm text-slate-400 mb-1">Imperial</div>
            <code className="block bg-slate-900 rounded-lg px-4 py-3 text-emerald-400 text-sm">
              BMI = 703 × weight (lbs) ÷ [height (in)]²
            </code>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-slate-200">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-slate-200 list-none hover:bg-slate-700/40 transition-colors">
                {faq.q}
                <span className="text-slate-400 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
              </summary>
              <p className="px-5 pb-4 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/"
          className="inline-block px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-colors text-lg"
        >
          ⚖️ Calculate Your BMI
        </Link>
      </div>
    </div>
  );
}
