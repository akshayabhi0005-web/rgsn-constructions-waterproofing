import React, { useState, useEffect } from 'react';
import { 
  getProjects, addProject, deleteProject,
  getGallery, addGalleryItem, deleteGalleryItem,
  getInquiries, deleteInquiry 
} from '../utils/db';
import { 
  Lock, Eye, Trash2, Plus, LogOut, FileText, 
  Layers, Image, CheckCircle, AlertTriangle, Sparkles 
} from 'lucide-react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  const [activeTab, setActiveTab] = useState('inquiries');
  
  // Database States
  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [gallery, setGallery] = useState([]);
  
  // Feedback Messages
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  
  // Form States - Project
  const [projForm, setProjForm] = useState({
    category: 'residential',
    name: '',
    location: '',
    date: '',
    description: '',
    scope: '',
    image: ''
  });
  
  // Form States - Gallery
  const [galForm, setGalForm] = useState({
    category: 'completed',
    title: '',
    description: '',
    src: '',
    is_before_after: false,
    before_src: '',
    after_src: ''
  });

  // Fetch db items on mount/login
  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  const loadData = async () => {
    try {
      const inqs = await getInquiries();
      const projs = await getProjects();
      const gals = await getGallery();
      setInquiries(inqs);
      setProjects(projs);
      setGallery(gals);
    } catch(e) {
      console.error("Failed to load admin data", e);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'rgsn2018') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password. (Hint: admin / rgsn2018)');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: '', password: '' });
  };

  const showFeedback = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

  // Helper: Convert File to Base64 String
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Project Form Handlers
  const handleProjFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertFileToBase64(file);
        setProjForm(prev => ({ ...prev, image: base64 }));
      } catch (err) {
        showFeedback('error', 'Failed to read image file.');
      }
    }
  };

  const handleProjSubmit = async (e) => {
    e.preventDefault();
    if (!projForm.image) {
      showFeedback('error', 'Please choose a project photo.');
      return;
    }
    
    try {
      const res = await addProject(projForm);
      if (res.status === 'success') {
        showFeedback('success', res.message);
        setProjForm({
          category: 'residential',
          name: '',
          location: '',
          date: '',
          description: '',
          scope: '',
          image: ''
        });
        // Reset file input
        document.getElementById('project_img_input').value = '';
        loadData();
      }
    } catch(e) {
      showFeedback('error', 'Failed to save project.');
    }
  };

  // Gallery Form Handlers
  const handleGalFile = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertFileToBase64(file);
        setGalForm(prev => ({ ...prev, [field]: base64 }));
      } catch(err) {
        showFeedback('error', 'Failed to read image.');
      }
    }
  };

  const handleGalSubmit = async (e) => {
    e.preventDefault();
    
    if (galForm.is_before_after) {
      if (!galForm.before_src || !galForm.after_src) {
        showFeedback('error', 'Both Before and After images are required.');
        return;
      }
    } else {
      if (!galForm.src) {
        showFeedback('error', 'Image file is required.');
        return;
      }
    }

    try {
      // If before/after, use after_src as primary src representation
      const payload = {
        ...galForm,
        src: galForm.is_before_after ? galForm.after_src : galForm.src,
        is_before_after: galForm.is_before_after ? 1 : 0
      };

      const res = await addGalleryItem(payload);
      if (res.status === 'success') {
        showFeedback('success', res.message);
        setGalForm({
          category: 'completed',
          title: '',
          description: '',
          src: '',
          is_before_after: false,
          before_src: '',
          after_src: ''
        });
        
        // Reset inputs
        const s = document.getElementById('gallery_src_input');
        const b = document.getElementById('gallery_before_input');
        const a = document.getElementById('gallery_after_input');
        if (s) s.value = '';
        if (b) b.value = '';
        if (a) a.value = '';
        
        loadData();
      }
    } catch(e) {
      showFeedback('error', 'Failed to save gallery item.');
    }
  };

  // Delete Handlers
  const handleDeleteInquiry = async (id) => {
    if (confirm('Are you sure you want to remove this inquiry?')) {
      const res = await deleteInquiry(id);
      if (res.status === 'success') {
        showFeedback('success', 'Inquiry deleted.');
        loadData();
      }
    }
  };

  const handleDeleteProject = async (id) => {
    if (confirm('Are you sure you want to delete this project card?')) {
      const res = await deleteProject(id);
      if (res.status === 'success') {
        showFeedback('success', 'Project card deleted.');
        loadData();
      }
    }
  };

  const handleDeleteGallery = async (id) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      const res = await deleteGalleryItem(id);
      if (res.status === 'success') {
        showFeedback('success', 'Gallery item deleted.');
        loadData();
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-brand-navy-dark px-4 py-12 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full space-y-8 bg-white dark:bg-brand-navy-light p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl text-center"
        >
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-xl btn-gradient flex items-center justify-center text-white font-black text-2xl shadow-md">
              R
            </div>
            <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">
              Admin Login Panel
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              R.G.S.N Constructions Database Administration
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange rounded-xl text-xs flex items-center justify-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Username</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/45"
                placeholder="admin"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/45"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>

            <button
              type="submit"
              className="w-full btn-gradient text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center space-x-2 shadow hover:shadow-lg transition-transform transform active:scale-95"
            >
              <Lock className="w-4 h-4" />
              <span>Verify Access</span>
            </button>
          </form>
          
          <div className="text-[10px] text-slate-400 dark:text-slate-500">
            Secure browser session. Port defaults: LocalStorage caching activated.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-navy-dark font-sans text-slate-800 dark:text-slate-200 pb-20">
      
      {/* Admin Header */}
      <section className="bg-brand-navy text-white py-6 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg btn-gradient flex items-center justify-center text-white font-black text-xl">
              R
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold leading-none">RGSN Database Console</h1>
              <span className="text-[9px] text-brand-gold font-bold uppercase tracking-wider">Super Administrator</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-brand-orange text-white text-xs font-bold rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </section>

      {/* Main Admin layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Feedback Banner */}
        {statusMsg.text && (
          <div className={`mb-6 p-4 rounded-xl border text-sm flex items-start space-x-3 ${
            statusMsg.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' 
              : 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange'
          }`}>
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span className="font-semibold">{statusMsg.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Menu / Tabs Column */}
          <div className="lg:col-span-3 space-y-2 text-left">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full px-5 py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-3.5 transition-all ${
                activeTab === 'inquiries' 
                  ? 'btn-gradient text-white shadow-md' 
                  : 'bg-white dark:bg-brand-navy-light text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4.5 h-4.5" />
              <span>Quotes & Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full px-5 py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-3.5 transition-all ${
                activeTab === 'projects' 
                  ? 'btn-gradient text-white shadow-md' 
                  : 'bg-white dark:bg-brand-navy-light text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4.5 h-4.5" />
              <span>Project Manager ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full px-5 py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center space-x-3.5 transition-all ${
                activeTab === 'gallery' 
                  ? 'btn-gradient text-white shadow-md' 
                  : 'bg-white dark:bg-brand-navy-light text-slate-650 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Image className="w-4.5 h-4.5" />
              <span>Gallery Manager ({gallery.length})</span>
            </button>
          </div>

          {/* Right Workspaces Column */}
          <div className="lg:col-span-9 bg-white dark:bg-brand-navy-light rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm text-left">
            
            {/* TAB 1: INQUIRIES LIST */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                  Received Customer Quotes
                </h3>
                
                {inquiries.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-8 text-center">No customer inquiries found.</p>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div 
                        key={inq.id}
                        className="bg-slate-50 dark:bg-brand-navy-dark p-5 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-3 relative group"
                      >
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="absolute top-4 right-4 p-2 text-slate-450 hover:text-brand-orange bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-750 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Delete quote"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                          <span className="bg-brand-orange/10 text-brand-orange px-2.5 py-0.5 rounded uppercase text-[9px] font-extrabold tracking-wider">
                            {inq.service}
                          </span>
                          <span className="text-slate-400">
                            {new Date(inq.created_at).toLocaleString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-xs">
                          <div><span className="font-bold text-slate-400">Client:</span> {inq.name}</div>
                          <div><span className="font-bold text-slate-400">Phone:</span> <a href={`tel:${inq.phone}`} className="hover:text-brand-orange underline">{inq.phone}</a></div>
                          {inq.email && <div><span className="font-bold text-slate-400">Email:</span> <a href={`mailto:${inq.email}`} className="hover:text-brand-orange underline">{inq.email}</a></div>}
                        </div>

                        <div className="text-xs bg-white dark:bg-brand-navy-light/45 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-550 dark:text-slate-350 leading-relaxed">
                          <span className="block font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-1">Message</span>
                          "{inq.message}"
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div className="space-y-10">
                <div className="space-y-5">
                  <h3 className="text-xl font-extrabold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                    Add Portfolio Project
                  </h3>
                  
                  <form onSubmit={handleProjSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                        <select
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs focus:ring-1 focus:ring-brand-orange"
                          value={projForm.category}
                          onChange={(e) => setProjForm(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="renovation">Renovation</option>
                          <option value="waterproofing">Waterproofing</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Name</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs"
                          placeholder="e.g. Satish Luxury Villa"
                          value={projForm.name}
                          onChange={(e) => setProjForm(prev => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs"
                          placeholder="e.g. Vijayanagar, Bengaluru"
                          value={projForm.location}
                          onChange={(e) => setProjForm(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Completion Date</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs"
                          placeholder="e.g. May 2025"
                          value={projForm.date}
                          onChange={(e) => setProjForm(prev => ({ ...prev, date: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scope (Comma-separated)</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs"
                          placeholder="e.g. Foundation Excavation, Marble flooring, Painting"
                          value={projForm.scope}
                          onChange={(e) => setProjForm(prev => ({ ...prev, scope: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          id="project_img_input"
                          className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
                          onChange={handleProjFile}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Scope Description</label>
                      <textarea
                        required
                        rows="3"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs"
                        placeholder="Detail the project construction steps..."
                        value={projForm.description}
                        onChange={(e) => setProjForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 btn-gradient text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center space-x-1 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish Project</span>
                    </button>
                  </form>
                </div>

                {/* Projects Catalog Grid list */}
                <div className="space-y-4">
                  <h4 className="text-base font-extrabold text-brand-navy dark:text-white border-t border-slate-100 dark:border-slate-800 pt-6">
                    Active Projects Catalog
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div 
                        key={proj.id}
                        className="flex items-center space-x-4 bg-slate-50 dark:bg-brand-navy-dark p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850 justify-between group"
                      >
                        <div className="flex items-center space-x-3.5">
                          <img 
                            src={proj.image} 
                            alt={proj.name} 
                            className="w-12 h-12 object-cover rounded-lg border border-white shadow-sm flex-shrink-0"
                          />
                          <div className="text-left leading-tight">
                            <span className="text-[8px] bg-brand-orange/10 text-brand-orange font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                              {proj.category}
                            </span>
                            <h5 className="font-bold text-xs text-brand-navy dark:text-white mt-1 line-clamp-1">{proj.name}</h5>
                            <span className="text-[10px] text-slate-400">{proj.location}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-2 text-slate-400 hover:text-brand-orange hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-750 transition-all flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: GALLERY MANAGER */}
            {activeTab === 'gallery' && (
              <div className="space-y-10">
                
                <div className="space-y-5">
                  <h3 className="text-xl font-extrabold text-brand-navy dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                    Add Gallery Item
                  </h3>

                  <form onSubmit={handleGalSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                        <select
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs focus:ring-1 focus:ring-brand-orange"
                          value={galForm.category}
                          onChange={(e) => setGalForm(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="completed">Completed Projects</option>
                          <option value="progress">Construction Progress</option>
                          <option value="waterproofing">Waterproofing Works</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Image Title</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs"
                          placeholder="e.g. Foundation Concrete Curing"
                          value={galForm.title}
                          onChange={(e) => setGalForm(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Photo Description</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-brand-navy-dark text-xs"
                        placeholder="Detail of the work shown in the photo..."
                        value={galForm.description}
                        onChange={(e) => setGalForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>

                    {/* Before/After Toggle Checkbox */}
                    <div className="flex items-center space-x-2.5 py-1 text-xs">
                      <input
                        type="checkbox"
                        id="is_before_after"
                        checked={galForm.is_before_after}
                        className="w-4 h-4 text-brand-orange rounded border-slate-350 bg-white"
                        onChange={(e) => setGalForm(prev => ({ ...prev, is_before_after: e.target.checked }))}
                      />
                      <label htmlFor="is_before_after" className="font-semibold text-slate-650 dark:text-slate-300 flex items-center space-x-1 cursor-pointer">
                        <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Is this a Before & After comparison set?</span>
                      </label>
                    </div>

                    {/* Standard Image upload fields vs Before/After image upload fields */}
                    {!galForm.is_before_after ? (
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Image File</label>
                        <input
                          type="file"
                          accept="image/*"
                          id="gallery_src_input"
                          className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
                          onChange={(e) => handleGalFile(e, 'src')}
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-wider text-brand-navy dark:text-slate-400">Before Image *</label>
                          <input
                            type="file"
                            accept="image/*"
                            id="gallery_before_input"
                            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
                            onChange={(e) => handleGalFile(e, 'before_src')}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-550 uppercase tracking-wider text-brand-orange">After Image *</label>
                          <input
                            type="file"
                            accept="image/*"
                            id="gallery_after_input"
                            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-3 file:rounded-xl file:border-0 file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
                            onChange={(e) => handleGalFile(e, 'after_src')}
                          />
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="px-6 py-3 btn-gradient text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center space-x-1 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Publish to Gallery</span>
                    </button>
                  </form>
                </div>

                {/* Gallery List Previews */}
                <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                  <h4 className="text-base font-extrabold text-brand-navy dark:text-white">
                    Current Gallery Items
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gallery.map((item) => (
                      <div 
                        key={item.id}
                        className="flex items-center space-x-4 bg-slate-50 dark:bg-brand-navy-dark p-3.5 rounded-2xl border border-slate-100 dark:border-slate-850 justify-between group"
                      >
                        <div className="flex items-center space-x-3.5">
                          <img 
                            src={item.src} 
                            alt={item.title} 
                            className="w-12 h-12 object-cover rounded-lg border border-white shadow-sm flex-shrink-0"
                          />
                          <div className="text-left leading-tight">
                            <span className="text-[8px] bg-slate-850 dark:bg-slate-700 text-white font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                              {item.category}
                            </span>
                            {item.is_before_after ? (
                              <span className="text-[8px] bg-brand-orange text-white font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ml-1.5">
                                Before/After
                              </span>
                            ) : null}
                            <h5 className="font-bold text-xs text-brand-navy dark:text-white mt-1 line-clamp-1">{item.title}</h5>
                            <span className="text-[10px] text-slate-400 line-clamp-1">{item.description}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteGallery(item.id)}
                          className="p-2 text-slate-400 hover:text-brand-orange hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-sm border border-transparent hover:border-slate-100 dark:hover:border-slate-750 transition-all flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Admin;
