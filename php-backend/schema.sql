-- R.G.S.N Constructions & Waterproofing Database Setup
-- Designed for MySQL / MariaDB (XAMPP phpMyAdmin)

CREATE DATABASE IF NOT EXISTS `rgsn_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `rgsn_db`;

-- 1. Table for Contact Form Submissions
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `service` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Table for Portfolio Projects
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(50) NOT NULL, -- residential, commercial, renovation, waterproofing
  `name` VARCHAR(150) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `date` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,
  `scope` TEXT NOT NULL, -- Saved as comma-separated values or JSON
  `image` TEXT NOT NULL, -- Stores base64 data string or file path
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Table for Gallery Items
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` VARCHAR(50) NOT NULL, -- progress, completed, waterproofing
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `src` TEXT NOT NULL, -- Stores base64 data string or file path
  `is_before_after` TINYINT(1) DEFAULT 0,
  `before_src` TEXT DEFAULT NULL, -- For before-after sliders
  `after_src` TEXT DEFAULT NULL,  -- For before-after sliders
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Preload Seed Data for Projects
INSERT INTO `projects` (`category`, `name`, `location`, `date`, `description`, `scope`, `image`) VALUES
('residential', 'Naveen Swarga Duplex Villa', 'Vijayanagar, Bengaluru', 'May 2025', 'Turnkey architectural planning and structural construction of a luxury 4-BHK duplex villa. Finished with premium steel railings, glass compounds, and marble flooring.', 'Excavation & Footing,RCC Column Framing,Vaastu Architectural Plan,Italian Marble Laying', 'assets/project_residential.jpg'),
('commercial', 'Prestige Corporate Hub', 'Whitefield, Bengaluru', 'November 2024', 'Fast-track structural RCC shell framing, office partitions, and vitrified tiles laying for a premium corporate IT park plaza building.', 'Post-Tensioned Slabs,Glass Facade Framing,Level-Checking sub-floors,14-Month Fast Schedule', 'assets/project_commercial.jpg'),
('waterproofing', 'Golden Heights Terrace Sealing', 'Malleshwaram, Bengaluru', 'April 2025', 'Advanced polyurethane liquid membrane waterproofing of a leaking 5,000 sq ft concrete roof terrace slab. Completely sealed against heavy monsoons.', 'Pressure Grouting Cracks,Polyurethane Emulsion Base,UV-Resistant Protective Coat,5-Year Sealing Warranty', 'assets/waterproof_after.jpg');

-- Preload Seed Data for Gallery
INSERT INTO `gallery` (`category`, `title`, `description`, `src`, `is_before_after`, `before_src`, `after_src`) VALUES
('completed', 'Luxury Duplex Elevation', 'Rear view of a completed high-end independent bungalow in Bengaluru featuring glass facade design.', 'assets/project_residential.jpg', 0, NULL, NULL),
('completed', 'Commercial Plaza Facade', 'Finished glass curtain wall exterior framing and paint coatings on a commercial business plaza.', 'assets/project_commercial.jpg', 0, NULL, NULL),
('waterproofing', 'Liquid Elastomeric Coat Application', 'Clean, light-gray liquid membrane coating applied to terrace concrete roof slab to seal against rainfall.', 'assets/waterproof_after.jpg', 0, NULL, NULL),
('waterproofing', 'Terrace Waterproofing Slider', 'Waterproofing restoration comparison.', 'assets/waterproof_after.jpg', 1, 'assets/waterproof_before.jpg', 'assets/waterproof_after.jpg');
