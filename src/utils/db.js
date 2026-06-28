// Database Utility Wrapper - Hybrid LocalStorage & PHP/MySQL Client
// Imports static assets as modules so Vite correctly compiles and hashes paths at runtime

import resProject from '../assets/project_residential.jpg';
import commProject from '../assets/project_commercial.jpg';
import waterBefore from '../assets/waterproof_before.jpg';
import waterAfter from '../assets/waterproof_after.jpg';

const PHP_API_BASE = "php-backend"; // Relative path for deployment inside htdocs/rgsn/

// Helper to check if PHP API is available dynamically
const checkPhpApi = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200); // Fail fast
    
    // Test fetch to projects.php
    const res = await fetch(`${PHP_API_BASE}/projects.php`, { 
      method: 'GET',
      signal: controller.signal 
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (e) {
    return false;
  }
};

// --- DEFAULT SEED DATA (Uses Compiled Hashed Image URLs) ---
const defaultProjects = [
  {
    id: 1,
    category: 'residential',
    name: 'Naveen Swarga Duplex Villa',
    location: 'Vijayanagar, Bengaluru',
    date: 'May 2025',
    description: 'Turnkey architectural planning and structural construction of a luxury 4-BHK duplex villa. Finished with premium steel railings, glass compounds, and marble flooring.',
    scope: 'Excavation & Footing,RCC Column Framing,Vaastu Architectural Plan,Italian Marble Laying',
    image: resProject
  },
  {
    id: 2,
    category: 'commercial',
    name: 'Prestige Corporate Hub',
    location: 'Whitefield, Bengaluru',
    date: 'November 2024',
    description: 'Fast-track structural RCC shell framing, office partitions, and vitrified tiles laying for a premium corporate IT park plaza building.',
    scope: 'Post-Tensioned Slabs,Glass Facade Framing,Level-Checking sub-floors,14-Month Fast Schedule',
    image: commProject
  },
  {
    id: 3,
    category: 'waterproofing',
    name: 'Golden Heights Terrace Sealing',
    location: 'Malleshwaram, Bengaluru',
    date: 'April 2025',
    description: 'Advanced polyurethane liquid membrane waterproofing of a leaking 5,000 sq ft concrete roof terrace slab. Completely sealed against heavy monsoons.',
    scope: 'Pressure Grouting Cracks,Polyurethane Emulsion Base,UV-Resistant Protective Coat,5-Year Sealing Warranty',
    image: waterAfter
  }
];

const defaultGallery = [
  {
    id: 1,
    category: 'completed',
    src: resProject,
    title: 'Luxury Duplex Elevation',
    description: 'Rear view of a completed high-end bungalow in Bengaluru.',
    is_before_after: 0
  },
  {
    id: 2,
    category: 'completed',
    src: commProject,
    title: 'Commercial Plaza Facade',
    description: 'Finished glass curtain wall exterior framing on a business plaza.',
    is_before_after: 0
  },
  {
    id: 3,
    category: 'waterproofing',
    src: waterAfter,
    title: 'Liquid Elastomeric Coat Application',
    description: 'Clean, light-gray liquid membrane coating applied to terrace roof slab.',
    is_before_after: 0
  },
  {
    id: 4,
    category: 'waterproofing',
    src: waterAfter,
    title: 'Terrace Waterproofing Slider',
    description: 'Waterproofing restoration comparison.',
    is_before_after: 1,
    before_src: waterBefore,
    after_src: waterAfter
  }
];

const defaultInquiries = [
  {
    id: 1,
    name: "Satish Kumar",
    phone: "9845012345",
    email: "satish.k@gmail.com",
    service: "Turnkey Duplex Villa (Vijayanagar)",
    message: "Interested in constructing a duplex house in a 30x40 site at Vijayanagar. Need plans and estimations.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 2,
    name: "Dr. Ananya Rao",
    phone: "9448098765",
    email: "ananya.rao@hospital.org",
    service: "Slab Waterproofing (Malleshwaram)",
    message: "Terrace roof has heavy dampness and leaks during rain. Need quick inspection.",
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

// --- DEFENSIVE MIGRATION (Clears old broken string paths if cached in browser) ---
const checkAndMigrateLocalStorage = () => {
  try {
    const localProjects = localStorage.getItem('rgsn_projects');
    const localGallery = localStorage.getItem('rgsn_gallery');
    
    if (localProjects && localProjects.includes('src/assets/')) {
      localStorage.removeItem('rgsn_projects');
    }
    if (localGallery && localGallery.includes('src/assets/')) {
      localStorage.removeItem('rgsn_gallery');
    }
  } catch (e) {
    console.error("Local storage migration error", e);
  }
};
checkAndMigrateLocalStorage();

// --- DATABASE FUNCTIONS ---

export const getProjects = async () => {
  const isPhpAvailable = await checkPhpApi();
  if (isPhpAvailable) {
    try {
      const res = await fetch(`${PHP_API_BASE}/projects.php`);
      const json = await res.json();
      return json.data;
    } catch(e) {
      console.warn("PHP projects fetch failed, using local storage", e);
    }
  }

  // LocalStorage Fallback
  let localProjects = localStorage.getItem('rgsn_projects');
  if (!localProjects) {
    localStorage.setItem('rgsn_projects', JSON.stringify(defaultProjects));
    return defaultProjects;
  }
  return JSON.parse(localProjects);
};

export const addProject = async (project) => {
  const isPhpAvailable = await checkPhpApi();
  if (isPhpAvailable) {
    try {
      const res = await fetch(`${PHP_API_BASE}/projects.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      return await res.json();
    } catch (e) {
      console.error("PHP projects post failed", e);
    }
  }

  // LocalStorage Fallback
  let localProjects = JSON.parse(localStorage.getItem('rgsn_projects') || JSON.stringify(defaultProjects));
  const newProject = {
    ...project,
    id: Date.now()
  };
  localProjects.unshift(newProject);
  localStorage.setItem('rgsn_projects', JSON.stringify(localProjects));
  return { status: "success", message: "Project saved in local browser memory!" };
};

export const deleteProject = async (id) => {
  let localProjects = JSON.parse(localStorage.getItem('rgsn_projects') || JSON.stringify(defaultProjects));
  localProjects = localProjects.filter(p => p.id !== id);
  localStorage.setItem('rgsn_projects', JSON.stringify(localProjects));
  return { status: "success", message: "Project deleted from browser memory!" };
};

export const getGallery = async () => {
  const isPhpAvailable = await checkPhpApi();
  if (isPhpAvailable) {
    try {
      const res = await fetch(`${PHP_API_BASE}/gallery.php`);
      const json = await res.json();
      return json.data;
    } catch(e) {
      console.warn("PHP gallery fetch failed, using local storage", e);
    }
  }

  // LocalStorage Fallback
  let localGallery = localStorage.getItem('rgsn_gallery');
  if (!localGallery) {
    localStorage.setItem('rgsn_gallery', JSON.stringify(defaultGallery));
    return defaultGallery;
  }
  return JSON.parse(localGallery);
};

export const addGalleryItem = async (item) => {
  const isPhpAvailable = await checkPhpApi();
  if (isPhpAvailable) {
    try {
      const res = await fetch(`${PHP_API_BASE}/gallery.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      return await res.json();
    } catch (e) {
      console.error("PHP gallery post failed", e);
    }
  }

  // LocalStorage Fallback
  let localGallery = JSON.parse(localStorage.getItem('rgsn_gallery') || JSON.stringify(defaultGallery));
  const newItem = {
    ...item,
    id: Date.now()
  };
  localGallery.unshift(newItem);
  localStorage.setItem('rgsn_gallery', JSON.stringify(localGallery));
  return { status: "success", message: "Gallery photo saved in local browser memory!" };
};

export const deleteGalleryItem = async (id) => {
  let localGallery = JSON.parse(localStorage.getItem('rgsn_gallery') || JSON.stringify(defaultGallery));
  localGallery = localGallery.filter(g => g.id !== id);
  localStorage.setItem('rgsn_gallery', JSON.stringify(localGallery));
  return { status: "success", message: "Gallery item deleted from browser memory!" };
};

export const getInquiries = async () => {
  let localInquiries = localStorage.getItem('rgsn_inquiries');
  if (!localInquiries) {
    localStorage.setItem('rgsn_inquiries', JSON.stringify(defaultInquiries));
    return defaultInquiries;
  }
  return JSON.parse(localInquiries);
};

export const addInquiry = async (inquiry) => {
  const isPhpAvailable = await checkPhpApi();
  if (isPhpAvailable) {
    try {
      const res = await fetch(`${PHP_API_BASE}/contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      const data = await res.json();
      if (data.status === "success") {
        saveInquiryLocally(inquiry);
        return data;
      }
    } catch(e) {
      console.warn("PHP contact post failed, using local storage fallback", e);
    }
  }

  saveInquiryLocally(inquiry);
  return { status: "success", message: "Inquiry saved in local browser memory!" };
};

const saveInquiryLocally = (inquiry) => {
  let localInquiries = JSON.parse(localStorage.getItem('rgsn_inquiries') || JSON.stringify(defaultInquiries));
  const newInquiry = {
    ...inquiry,
    id: Date.now(),
    created_at: new Date().toISOString()
  };
  localInquiries.unshift(newInquiry);
  localStorage.setItem('rgsn_inquiries', JSON.stringify(localInquiries));
};

export const deleteInquiry = async (id) => {
  let localInquiries = JSON.parse(localStorage.getItem('rgsn_inquiries') || JSON.stringify(defaultInquiries));
  localInquiries = localInquiries.filter(i => i.id !== id);
  localStorage.setItem('rgsn_inquiries', JSON.stringify(localInquiries));
  return { status: "success", message: "Inquiry removed from browser memory!" };
};
