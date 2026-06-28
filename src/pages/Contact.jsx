import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, MessageSquare, 
  CheckCircle, ShieldAlert 
} from 'lucide-react';
import { addInquiry } from '../utils/db';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const servicesOptions = [
    "Building Construction",
    "Residential Construction (Villa/Bungalow)",
    "Commercial Construction",
    "Building Plan & 2D/3D Elevations",
    "Structural Drawings",
    "Waterproofing Solutions",
    "Renovation & Extensions",
    "Flooring (Marble/Granite/Tiles)",
    "Civil Consultancy"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone Number is required";
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      tempErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!formData.service) tempErrors.service = "Please select a service area";
    if (!formData.message.trim()) tempErrors.message = "Message details are required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await addInquiry(formData);
      if (res.status === 'success') {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: ''
        });
        // Clear success alert after 6 seconds
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        setIsSubmitting(false);
        alert(res.message || "Failed to submit. Please try again.");
      }
    } catch(err) {
      setIsSubmitting(false);
      alert("Inquiry submission failed. Network error.");
    }
  };

  return (
    <div className="font-sans dark:bg-brand-navy-dark text-slate-800 dark:text-slate-200">
      
      {/* Page Header */}
      <section className="bg-slate-100 dark:bg-brand-navy-light py-16 md:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy dark:text-white">
            Contact R.G.S.N
          </h1>
          <p className="text-brand-orange dark:text-brand-gold font-bold text-xs uppercase tracking-widest">
            Request Site Inspections & Price Estimates
          </p>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Get in touch with Naveen G to schedule a structural consultancy, review blueprints, or fix dampness and leakages.
          </p>
        </div>
      </section>

      {/* Main Details & Form */}
      <section className="py-20 bg-white dark:bg-brand-navy-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact details Column */}
            <div className="lg:col-span-5 space-y-8 text-left">
              <h2 className="text-2xl font-bold text-brand-navy dark:text-white tracking-tight">
                Our Office Location
              </h2>
              
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-orange/5 dark:bg-brand-orange/10 text-brand-orange rounded-xl flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-550 dark:text-slate-400 uppercase tracking-wide">PHYSICAL ADDRESS</h4>
                    <p className="text-sm mt-1 leading-relaxed">
                      #1457, 3rd Cross,<br />
                      Govindaraja Nagar, Vijayanagar,<br />
                      Bengaluru, Karnataka - 560079
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-orange/5 dark:bg-brand-orange/10 text-brand-orange rounded-xl flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-550 dark:text-slate-400 uppercase tracking-wide">PHONE CHANNELS</h4>
                    <p className="text-sm mt-1">
                      <a href="tel:7022005017" className="hover:text-brand-orange font-bold text-brand-navy dark:text-white transition-colors">
                        +91 7022005017
                      </a>
                    </p>
                    <span className="text-[10px] text-slate-550 dark:text-slate-500">Available Mon-Sat for direct engineer calls.</span>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="p-3 bg-brand-orange/5 dark:bg-brand-orange/10 text-brand-orange rounded-xl flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-550 dark:text-slate-400 uppercase tracking-wide">EMAIL INQUIRIES</h4>
                    <p className="text-sm mt-1">
                      <a href="mailto:navee9980@gmail.com" className="hover:text-brand-orange font-bold text-brand-navy dark:text-white transition-colors">
                        navee9980@gmail.com
                      </a>
                    </p>
                  </div>
                </li>

                <li className="flex items-start space-x-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <div className="p-3 bg-brand-gold/5 dark:bg-brand-gold/10 text-brand-gold rounded-xl flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-550 dark:text-slate-400 uppercase tracking-wide">BUSINESS HOURS</h4>
                    <p className="text-sm mt-1">
                      Monday - Saturday: <span className="font-semibold text-slate-800 dark:text-slate-200">9:00 AM - 7:00 PM</span><br />
                      Sunday: <span className="text-brand-orange font-bold">Closed</span>
                    </p>
                  </div>
                </li>
              </ul>

              {/* Instant Social Channels */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                <a
                  href="tel:7022005017"
                  className="px-5 py-3 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl tracking-wider uppercase flex items-center space-x-2 transition-colors shadow"
                >
                  <Phone className="w-4 h-4 text-brand-orange" />
                  <span>Call: 7022005017</span>
                </a>
                
                <a
                  href="https://wa.me/917022005017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl tracking-wider uppercase flex items-center space-x-2 transition-colors shadow"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

            </div>

            {/* Interactive Form Column */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-brand-navy-light rounded-3xl p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm text-left">
              <h2 className="text-2xl font-bold text-brand-navy dark:text-white tracking-tight mb-6">
                Online Quotation Form
              </h2>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-xl flex items-start space-x-3 text-sm">
                  <CheckCircle className="w-5.5 h-5.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Inquiry Sent Successfully!</span>
                    <p className="text-xs text-emerald-600/90 dark:text-emerald-400/95 mt-0.5">Thank you. Engineer Naveen G will review your service request and call you back shortly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-brand-navy-dark text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/45 ${
                        errors.name ? 'border-brand-orange/50 ring-1 ring-brand-orange/20' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="e.g. Satish Kumar"
                    />
                    {errors.name && <p className="text-xs text-brand-orange flex items-center space-x-1"><ShieldAlert className="w-3.5 h-3.5 mr-0.5" /><span>{errors.name}</span></p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-brand-navy-dark text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/45 ${
                        errors.phone ? 'border-brand-orange/50 ring-1 ring-brand-orange/20' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="e.g. 7022005017"
                    />
                    {errors.phone && <p className="text-xs text-brand-orange flex items-center space-x-1"><ShieldAlert className="w-3.5 h-3.5 mr-0.5" /><span>{errors.phone}</span></p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email field */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Email Address (Optional)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-brand-navy-dark text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/45 ${
                        errors.email ? 'border-brand-orange/50' : 'border-slate-200 dark:border-slate-800'
                      }`}
                      placeholder="e.g. email@example.com"
                    />
                    {errors.email && <p className="text-xs text-brand-orange flex items-center space-x-1"><ShieldAlert className="w-3.5 h-3.5 mr-0.5" /><span>{errors.email}</span></p>}
                  </div>

                  {/* Service selector */}
                  <div className="space-y-1">
                    <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Service Required *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-brand-navy-dark text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/45 ${
                        errors.service ? 'border-brand-orange/50 ring-1 ring-brand-orange/20' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <option value="">-- Select Service --</option>
                      {servicesOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-xs text-brand-orange flex items-center space-x-1"><ShieldAlert className="w-3.5 h-3.5 mr-0.5" /><span>{errors.service}</span></p>}
                  </div>
                </div>

                {/* Message text area */}
                <div className="space-y-1">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">Message / Site Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-brand-navy-dark text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/45 ${
                      errors.message ? 'border-brand-orange/50 ring-1 ring-brand-orange/20' : 'border-slate-200 dark:border-slate-800'
                    }`}
                    placeholder="Provide site dimension, current dampness issues, or blueprint status..."
                  />
                  {errors.message && <p className="text-xs text-brand-orange flex items-center space-x-1"><ShieldAlert className="w-3.5 h-3.5 mr-0.5" /><span>{errors.message}</span></p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient text-white py-4 rounded-xl font-bold tracking-wider uppercase text-xs flex items-center justify-center space-x-2 transition-all shadow hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      <span>Sending inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4.5 h-4.5" />
                      <span>Request Inspection Quote</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* GOOGLE MAP SECTION */}
      <section className="h-[350px] sm:h-[450px] w-full border-t border-slate-200 dark:border-slate-800 relative bg-slate-100">
        {/* Mocking a beautiful Google Maps satellite overview of Govindaraja Nagar Bengaluru */}
        <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-center p-6 text-white space-y-4">
          <MapPin className="w-12 h-12 text-brand-orange animate-bounce" />
          <h3 className="text-xl font-bold tracking-wide font-sans">Govindaraja Nagar, Vijayanagar</h3>
          <p className="text-xs text-slate-400 max-w-sm">
            #1457, 3rd Cross, Govindaraja Nagar, Vijayanagar, Bengaluru - 560079
          </p>
          <a
            href="https://maps.google.com/?q=Govindaraja+Nagar+Vijayanagar+Bengaluru+560079"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-brand-orange text-white text-xs font-bold rounded-lg uppercase tracking-wider shadow hover:bg-brand-orange-light transition-all"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

    </div>
  );
};

export default Contact;
