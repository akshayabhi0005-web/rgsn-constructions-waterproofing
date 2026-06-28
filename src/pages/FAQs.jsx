import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

const FAQs = ({ setActivePage }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      q: "What is your construction cost per square foot in Bengaluru?",
      a: "Our basic structural turnkey package starts at ₹1,800 per sq ft of built-up area. For luxury turnkey construction, costs vary from ₹2,200 to ₹2,800 per sq ft depending on the choice of finishing materials (such as Italian marble flooring, premium teak wood, custom elevation glazing, and smart-home wiring). We provide a detailed item-rate cost breakdown before signing any agreement."
    },
    {
      q: "Does your company handle BBMP/BDA building sanction plans?",
      a: "Yes. We offer building sanction drawing services. Our chief engineer, Naveen G, designs RERA-compliant 2D plans in full alignment with local municipal bylaws, setbacks, and floor area ratios (FAR) to ensure smooth approvals from the BBMP, BDA, or local panchayat boards."
    },
    {
      q: "How many years of warranty do you provide for waterproofing?",
      a: "We provide a 5 to 10-year certified warranty depending on the waterproofing chemical technology used. For our premium 5-stage polyurethane liquid membrane coatings and basement pressure-injections, we issue an official structural warranty certificate covering zero leakage."
    },
    {
      q: "Can you build according to Vaastu principles?",
      a: "Yes. Over 90% of our residential home plans are fully optimized for Vaastu. We align key structural spots: the master bedroom in Southwest (Nairutya), kitchen in Southeast (Agneya), main entrance in Northeast (Eshanya), and central open courtyards (Brahmasthan)."
    },
    {
      q: "What cement and steel brands do you use in structural casting?",
      a: "We never compromise on structural concrete. We use premium grade steel rebars (Tata Tiscon or Indus Fe-550 TMT bars) and high-performance cement brands (Ultratech, ACC, or Birla Super). All aggregate mixtures are checked on site for sand grain consistency."
    },
    {
      q: "Do you offer structural-only contracts or finishing-only contracts?",
      a: "We offer both. You can hire us for structural framework contract (footing, pillar framing, roof slab casting, and brickwork) or hire us for full-scope turnkey finishing contract (plumbing, electrical wiring, marble/granite laying, and weather-proof painting)."
    },
    {
      q: "How do you provide progress updates if I am living far away or abroad?",
      a: "We provide structured weekly project updates. Our engineer uploads site progress photos, material delivery invoices, and structural testing reports to a shared folder or directly via WhatsApp, keeping you informed at every step."
    },
    {
      q: "Are there any hidden costs or escalation rates in your contract?",
      a: "No. We work under strict 'no-escalation' contracts. The rates agreed upon signing remain locked throughout the project scope, unless the client introduces a change in the plan drawings or requests a different brand of premium finishing tiles/fixtures."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="font-sans dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <section className="bg-slate-100 dark:bg-brand-navy-light py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-orange dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
            Answers Regarding Costs, Timelines, & Warranties
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Get clear, honest information regarding building contracts, steel grades, waterproofing timelines, and Vaastu requirements.
          </p>
        </div>
      </section>

      {/* FAQs List Accordion */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          {faqData.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 dark:bg-brand-navy-light rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm"
            >
              {/* Accordion Trigger Row */}
              <button
                onClick={() => handleToggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors group"
              >
                <div className="flex items-start space-x-3.5">
                  <HelpCircle className="w-5.5 h-5.5 text-brand-orange group-hover:text-brand-orange flex-shrink-0 mt-0.5" />
                  <span className="font-bold text-sm sm:text-base text-brand-navy dark:text-white tracking-tight leading-tight">
                    {faq.q}
                  </span>
                </div>
                <div className="p-1 rounded-full bg-white dark:bg-brand-navy-dark shadow-sm flex-shrink-0">
                  <ChevronDown 
                    className={`w-4 h-4 text-slate-500 dark:text-slate-400 transition-transform duration-300 ${
                      openIndex === idx ? 'transform rotate-180 text-brand-orange' : ''
                    }`} 
                  />
                </div>
              </button>

              {/* Accordion Content Panel */}
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-1 text-slate-650 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pl-[44px]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}

        </div>
      </section>

      {/* Call Center Support Panel */}
      <section className="bg-slate-50 dark:bg-brand-navy-light py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy dark:text-white">
            Have a Specific Engineering or Waterproofing Question?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Get in touch directly with our engineer Naveen G. He is ready to analyze your drawings or suggest a waterproofing strategy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a
              href="tel:7022005017"
              className="btn-gradient text-white font-bold px-8 py-3.5 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Engineer: +91 7022005017</span>
            </a>
            <button
              onClick={() => setActivePage('contact')}
              className="bg-brand-navy hover:bg-brand-navy-dark dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs tracking-wider uppercase"
            >
              Send Online Inquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FAQs;
