import React from 'react';
import { Star, Quote, ShieldCheck, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Satish Kumar",
      role: "Villas Owner",
      project: "Turnkey Duplex Villa (Vijayanagar)",
      rating: 5,
      quote: "Naveen G and his team constructed my 4-BHK duplex villa in Vijayanagar. Right from day one, Naveen provided absolute clarity on material quantities and column reinforcement. They completed the work on the exact date agreed, without any cost escalation demands. Highly recommended!",
      avatarColor: "bg-brand-navy text-brand-gold"
    },
    {
      name: "Dr. Ananya Rao",
      role: "Residential client",
      project: "Slab Waterproofing (Malleshwaram)",
      rating: 5,
      quote: "We were facing severe rain leakage in our older double-story house terrace. Two local contractors tried sealing it but the water came back in the next monsoon. R.G.S.N diagnosed the cracks, did chemical pressure injection, and laid down a polyurethane membrane coating. We had zero leakages this year!",
      avatarColor: "bg-brand-orange text-white"
    },
    {
      name: "Manjunath Gowda",
      role: "Developer",
      project: "G+3 Apartment Block (Basaveshwaranagar)",
      rating: 5,
      quote: "R.G.S.N handled the entire concrete framing and bricklaying for our basaveshwaranagar project. Naveen's civil engineering checks on aggregate quality, steel spacings, and concrete curing times were meticulous. The site was kept organized, and structural safety was top priority.",
      avatarColor: "bg-brand-gold text-brand-navy"
    },
    {
      name: "Renuka Prasad",
      role: "Commercial client",
      project: "Retail Showroom Flooring & Remodeling",
      rating: 4,
      quote: "Excellent finishing quality in flooring and layout modification. They laid down Italian marble tiles and vitrified tiles with complete slope checks. Their spacer-grouting finish is immaculate and looks extremely premium.",
      avatarColor: "bg-slate-800 text-white"
    },
    {
      name: "Srinivas Murthy",
      role: "Penthouse Owner",
      project: "Terrace Room Renovation (Rajajinagar)",
      rating: 5,
      quote: "We hired R.G.S.N to build a penthouse studio room on our terrace. The integration of steel rebars into our old slab using epoxy anchors was done with clean structural planning. The room is light, sturdy, and well-designed.",
      avatarColor: "bg-emerald-700 text-white"
    },
    {
      name: "Kiran & Priya",
      role: "Homeowners",
      project: "Building Plan & Vaastu Consultation",
      rating: 5,
      quote: "Naveen G drafted our 2D floor maps and stunning 3D compound wall animations. He took care of the municipal setbacks and matched our Vaastu requirements perfectly. His consult saved us from making structural changes later.",
      avatarColor: "bg-teal-700 text-white"
    }
  ];

  return (
    <div className="font-sans dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <section className="bg-slate-100 dark:bg-brand-navy-light py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy dark:text-white">
            Client Testimonials
          </h1>
          <p className="text-brand-orange dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
            What Homeowners Say About Our Civil Quality
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Read first-hand reviews from real clients in Bengaluru regarding our turnkey construction schedules and waterproofing warranties.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-brand-navy-light border border-slate-100 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-8 text-slate-200 dark:text-slate-800 pointer-events-none">
                  <Quote className="w-10 h-10 transform scale-x-[-1]" fill="currentColor" />
                </div>

                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, starIdx) => (
                      <Star 
                        key={starIdx} 
                        className={`w-4 h-4 ${
                          starIdx < rev.rating 
                            ? 'text-brand-gold fill-brand-gold' 
                            : 'text-slate-350 dark:text-slate-700'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed relative z-10">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Client Profile details */}
                <div className="flex items-center space-x-3.5 pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/80">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-inner flex-shrink-0 ${rev.avatarColor}`}>
                    {rev.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-brand-navy dark:text-white leading-tight">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block mt-0.5">
                      {rev.role}
                    </span>
                    <span className="inline-flex items-center text-[9px] text-brand-orange dark:text-brand-gold uppercase font-bold tracking-wider mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {rev.project}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Trusted Badges */}
          <div className="mt-20 border-t border-slate-100 dark:border-slate-800 pt-12 text-center space-y-4">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Engineering Commitments
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
                <span className="text-xs font-bold uppercase tracking-wider">100% Quality Audited Sand & Cement</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
                <span className="text-xs font-bold uppercase tracking-wider">Up to 10 Year Waterproofing Warranty</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-6 h-6 text-brand-orange" />
                <span className="text-xs font-bold uppercase tracking-wider">Zero Escalation Rate Agreement</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Testimonials;
