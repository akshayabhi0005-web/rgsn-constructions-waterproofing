import React, { useState } from 'react';

import { 
  Building2, Home, Landmark, Compass, DraftingCompass, Layers, 
  Ruler, Paintbrush, Hammer, Droplets, Grid3X3, Layers3, 
  FileCheck2, ChevronDown, Check, PhoneCall 
} from 'lucide-react';

const Services = ({ setActivePage }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const servicesData = [
    {
      id: "building-construction",
      icon: <Building2 className="w-7 h-7 text-brand-orange" />,
      title: "Building Construction",
      desc: "Turnkey structural construction contracts for G+1 to G+4 multi-residential framing and foundation structures.",
      benefits: ["Seismic-resistant framing", "Premium aggregate cement mix", "Strict soil compaction standards"],
      details: "Our building construction includes everything from footing excavation to bricklaying and beam reinforcement. We follow IS codes for reinforcement bar bending schedules and concrete grades."
    },
    {
      id: "residential-construction",
      icon: <Home className="w-7 h-7 text-brand-orange" />,
      title: "Residential Construction",
      desc: "End-to-end custom villa construction, luxury duplexes, and independent houses built to high-end design layouts.",
      benefits: ["Custom layout planning", "High-quality premium materials", "Supervised structural safety"],
      details: "Turnkey residential packages feature elegant bathroom designs, electrical piping, plumbing layouts, and paint finishes. We coordinate on-site execution with architects daily."
    },
    {
      id: "commercial-construction",
      icon: <Landmark className="w-7 h-7 text-brand-orange" />,
      title: "Commercial Construction",
      desc: "Construction of retail spaces, corporate plazas, office structures, and load-bearing framing structures.",
      benefits: ["High durability layouts", "Optimized pillar spans", "RERA-compliant engineering"],
      details: "We build commercial spaces with large open spans using post-tensioned slabs and high-strength concrete mixes. All works are scheduled for rapid project delivery."
    },
    {
      id: "building-planning",
      icon: <Compass className="w-7 h-7 text-brand-orange" />,
      title: "Building Planning",
      desc: "Drafting building structures compliant with BBMP/BDA bylaws and Vaastu principles to secure structural sanctions.",
      benefits: ["BBMP sanction support", "Optimal space planning", "Vaastu compliance integration"],
      details: "We produce detailed planning grids showing offsets, setbacks, ventilation, and staircase arrangements required to get standard structural sanctions."
    },
    {
      id: "2d-plans",
      icon: <Ruler className="w-7 h-7 text-brand-orange" />,
      title: "2D Plans",
      desc: "Accurate architectural line drawings, floor plans, electrical layouts, plumbing maps, and cross-section details.",
      benefits: ["High dimensional accuracy", "Detailed section views", "Clear layout labeling"],
      details: "Our 2D plans are drafted using CAD software, showing column markings, brickwork thickness, door/window schedules, and electrical switches."
    },
    {
      id: "3d-plans",
      icon: <DraftingCompass className="w-7 h-7 text-brand-orange" />,
      title: "3D Plans & Renderings",
      desc: "Photorealistic 3D elevations, interior design perspectives, and walkthrough renders showing exterior elements.",
      benefits: ["Visual realism preview", "Material mapping preview", "Lighting effect simulations"],
      details: "Preview your building layout in high fidelity before laying a single brick. Visualize color combinations, lighting, textures, glass work, and compound wall configurations."
    },
    {
      id: "structural-drawings",
      icon: <Layers className="w-7 h-7 text-brand-orange" />,
      title: "Structural Drawings",
      desc: "Detailed drawings detailing column reinforcement, beam sizes, slab thickness, and foundation design calculations.",
      benefits: ["Engineered load safety", "Bar Bending Schedules (BBS)", "Accurate steel quantity calculations"],
      details: "Structural analysis determines safe concrete column sizes and rebar weights. Prepared in compliance with structural loading and safety requirements (IS 456)."
    },
    {
      id: "renovation",
      icon: <Hammer className="w-7 h-7 text-brand-orange" />,
      title: "Renovation & Extension",
      desc: "Structural remodeling, terrace room additions, floor extensions, structural repairs, and wall removal.",
      benefits: ["Preserved structural integrity", "Modernized layout upgrades", "Fast on-site cleanup"],
      details: "We expand existing structures safely by joining beams and columns using high-performance epoxy chemical anchors and dowel bars."
    },
    {
      id: "painting",
      icon: <Paintbrush className="w-7 h-7 text-brand-orange" />,
      title: "Painting Services",
      desc: "Premium exterior emulsion weatherproofing coats and interior premium smooth putties & emulsion finishes.",
      benefits: ["Fungal-resistant compounds", "Washable interior walls", "Long-lasting color retention"],
      details: "We use premium paint systems including damp-proof base primers, wall putties, and dual topcoats to ensure visual elegance and protection against rain dampness."
    },
    {
      id: "waterproofing",
      icon: <Droplets className="w-7 h-7 text-brand-orange" />,
      title: "Advanced Waterproofing",
      desc: "Specialist chemical injection grouting, crystalline membrane laying, polyurethane coatings, and bathroom sealing.",
      benefits: ["5 to 10 Year Warranty", "Deep chemical injection", "UV-resistant coatings"],
      details: "We solve leakage issues by cleaning slabs, filling cracks, and applying specialized coatings (acrylic/polyurethane) for terrace, basements, and sump tanks."
    },
    {
      id: "tiles-laying",
      icon: <Grid3X3 className="w-7 h-7 text-brand-orange" />,
      title: "Tiles Laying",
      desc: "Accurate alignment of premium ceramic and vitrified floor/wall tiles in bathrooms, kitchens, and corridors.",
      benefits: ["Perfect slope checks", "Zero hollow space sound", "Stain-resistant spacers & grouts"],
      details: "We lay tiles using premium adhesive compounds rather than traditional sand-cement mixes. This prevents hollow spaces and tile pops over time."
    },
    {
      id: "granite-flooring",
      icon: <Layers3 className="w-7 h-7 text-brand-orange" />,
      title: "Granite Flooring",
      desc: "Installation and mirror polishing of premium granite slabs for staircases, lobby floorings, and kitchen countertops.",
      benefits: ["High scratch resistance", "Seamless chamfer edges", "Elegant joint grouting"],
      details: "We source premium South Indian granites, offering smooth layout cutting, double-nose moulding for stairs, and mirror polishing on site."
    },
    {
      id: "marble-flooring",
      icon: <Layers3 className="w-7 h-7 text-brand-orange" />,
      title: "Marble Flooring",
      desc: "Laying, polishing, and sealing of luxurious Italian and Indian marbles for premium home interiors.",
      benefits: ["Luxury mirror-gloss polish", "Perfect stone match patterns", "Epoxy sealing protections"],
      details: "Italian marble requires specialist grid laying, diamond-disk grinding, diamond polishing, and stone sealers to prevent tea/oil stains."
    },
    {
      id: "vitrified-tiles",
      icon: <Grid3X3 className="w-7 h-7 text-brand-orange" />,
      title: "Vitrified Tiles",
      desc: "Laying of large-format double-charged vitrified floor tiles (2x2, 4x2, 6x4 feet) with minimal spacer joints.",
      benefits: ["Extremely flat finishes", "Acid & wear resistant", "Budget-friendly luxury look"],
      details: "We ensure sub-base leveling and apply premium epoxy grouts to provide long-lasting, stain-resistant flooring."
    },
    {
      id: "civil-consultancy",
      icon: <FileCheck2 className="w-7 h-7 text-brand-orange" />,
      title: "Civil Consultancy",
      desc: "Expert building audits, valuation calculations, structural health checks, and site safety audits.",
      benefits: ["Detailed audit reports", "Cost optimization studies", "Material quality testing"],
      details: "Consultancy includes concrete core compression test audits, steel reinforcement checking, foundation settlement analysis, and site safety audits."
    }
  ];

  const toggleExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  return (
    <div className="font-sans dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <section className="bg-slate-100 dark:bg-brand-navy-light py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy dark:text-white">
            Engineering & Construction Services
          </h1>
          <p className="text-brand-orange dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
            Detailed Structural & Finishing Capabilities
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            From 2D CAD architectural plans to heavy structural concreting and specialist waterproofing warranties, explore our 15 core expertise areas.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <div 
                key={service.id}
                className={`bg-slate-50 dark:bg-brand-navy-light border rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 ${
                  expandedCard === service.id 
                    ? 'border-brand-orange/40 dark:border-brand-gold/40 shadow-md ring-1 ring-brand-orange/10' 
                    : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-brand-orange/5 dark:bg-brand-orange/10 rounded-xl">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy dark:text-white leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                        <Check className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Collapsible Details Drawer */}
                  {expandedCard === service.id && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-4 border-t border-slate-100 dark:border-slate-800 mb-6 bg-slate-100/50 dark:bg-brand-navy-dark/40 p-4 rounded-xl">
                      <h4 className="font-bold text-brand-navy dark:text-white mb-1.5 uppercase tracking-wide">Methodology & Scope</h4>
                      {service.details}
                    </div>
                  )}
                </div>

                {/* Card Button */}
                <button
                  onClick={() => toggleExpand(service.id)}
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-brand-navy dark:text-white hover:border-brand-orange dark:hover:border-brand-gold hover:text-brand-orange dark:hover:text-brand-gold transition-colors flex items-center justify-center space-x-1"
                >
                  <span>{expandedCard === service.id ? "Show Less" : "Read Methodology"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expandedCard === service.id ? 'transform rotate-180' : ''}`} />
                </button>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-slate-50 dark:bg-brand-navy-light py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">
            Need Custom Plan Drawings or Materials Estimations?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Our Chief Engineer will schedule a site visit and design custom structural options based on your site size and soil parameters.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <button
              onClick={() => setActivePage('contact')}
              className="btn-gradient text-white font-bold px-8 py-3.5 rounded-xl text-xs tracking-wider uppercase shadow-md"
            >
              Consult Naveen G
            </button>
            <a
              href="tel:7022005017"
              className="bg-brand-navy hover:bg-brand-navy-dark dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center space-x-2"
            >
              <PhoneCall className="w-4 h-4 text-brand-orange" />
              <span>Call +91 7022005017</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
