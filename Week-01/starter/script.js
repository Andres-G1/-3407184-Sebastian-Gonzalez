/* ============================================
   WEEK 01 PROJECT - INTERACTIVE INFORMATION CARD
   Starter file for the learner
   ============================================

   INSTRUCTIONS:
   1. Read the project README.md to understand requirements
   2. Adapt ALL TODOs to your domain assigned by the instructor
   3. Use ONLY ES2023 features learned this week:
      - const/let (never var)
      - Template literals
      - Arrow functions
      - Destructuring
   4. Test your code frequently in the browser
   5. Comments in English
   6. Technical nomenclature (variables, functions) in English

   IMPORTANT NOTE:
   This file is a GENERIC TEMPLATE.
   You must adapt it completely to your assigned domain.
   DO NOT copy the implementation of another classmate.

   ============================================ */

// ============================================
// TODO 1: Create your domain data object
// ============================================
// Create a constant object with data of the main entity in your domain.
// Check with your instructor what your assigned domain is.
//
// Your object must include:
// - Basic properties (strings, numbers, booleans)
// - Related items array (each with name/level or similar)
// - Statistics object or counters
//
// EXAMPLE (Planetarium - NOT assignable):
// const exhibitData = {
//   name: 'Interactive Solar System',
//   description: 'Immersive exhibition of the solar system',
//   code: 'EXH-001',
//   location: { room: 'Main Room', floor: 2 },
//   features: [
//     { name: '360° Projection', level: 95 },
//     { name: 'Surround Sound', level: 88 }
//   ],
//   stats: { visitors: 15000, rating: 4.8, duration: 45 }
// };

const mentalhealthData = {
  // TODO: Replace 'entity' with the name of your entity in English
  // TODO: Add specific properties from your domain

  // Basic properties (adapt to your domain)
  name: 'Vitalis Health Center',
  bio: 'health center',
  description: 'A center dedicated to providing mental health support and services.',
  identifier: 'MHC-001', 
  img: 'Img/vital.png',

  // Contact or location property (if applicable)
  contact: {
     email: 'vitaliscenter@gmail.com',
     phone: '+57 324 270 9797',
     location: 'calle 42 a sur #17 a 24 este, Colombia, Bogota.DC'
   },

  // Array of related items (adapt to your domain)
  // Examples: skills, ingredients, services, features, amenities
  items: [
     { name: 'Counseling Services', level: 90, category: 'therapy' },
     { name: 'Group Therapy Sessions', level: 85, category: 'therapy' },
     { name: 'Psychological Assessments', level: 75, category: 'diagnostic' },
     { name: 'Mental Health Workshops', level: 80, category: 'education' }
  ],

  // Array of links or references (if applicable) The links work, but the website doesn't exist
  links: [
     { platform: 'Website', url: 'https://www.vitaliscentercolombia.com', icon: '🌐' },
     { platform: 'Facebook', url: 'https://www.facebook.com/vitaliscentercolombia', icon: '📘' },
     { platform: 'Instagram', url: 'https://www.instagram.com/vitaliscentercolombia', icon: '📸' }
  ],

  // Statistics or counters (adapt to your domain)
  stats: {
     totalclients: 1500,
     rating: 4.8,
     professionals: 50,
     articlesPublished: 20
  }
};

// ============================================
// TODO 2: DOM element references
// ============================================
// Get references to all necessary DOM elements using const.
// Use document.getElementById() or document.querySelector()
//
// You will need references to:
// - Main information elements (name, description, etc.)
// - Items list container
// - Statistics container
// - Interaction buttons (theme, copy, show/hide)
// - Notification elements (toast)

// TODO: Add your DOM references here

const entityName = document.getElementById('entity-name');
const headerImg = document.getElementById('avatarimg');
const entitybio = document.getElementById('entity-bio');
const entityDescription = document.getElementById('entity-description');
const description = document.getElementById('description');
const entityCode = document.getElementById('code');
const itemsList = document.getElementById('items-list');
const linksContainer = document.getElementById('links-container');
const statsContainer = document.getElementById('stats');
const contactEmail = document.getElementById('contact-email');
const contactPhone = document.getElementById('contact-phone');
const contactLocation = document.getElementById('contact-location');
const themeToggle = document.getElementById('theme-toggle');
const copyBtn = document.getElementById('copy-btn');
const toggleItemsBtn = document.getElementById('toggle-items');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// ============================================
// TODO 3: Render basic information
// ============================================
// Create an arrow function called 'renderBasicInfo' that:
// 1. Uses destructuring to extract properties from entityData
// 2. Updates DOM elements with template literals
// 3. Shows main entity information

const renderBasicInfo = () => {
  // Destructure properties from data object
  const { name, bio, img, description: desc, identifier, contact: { email, phone, location } } = mentalhealthData;

  // Update DOM elements with extracted data
  if (entityName) entityName.textContent = name;
  if (entitybio) entitybio.textContent = bio;
  if (headerImg) headerImg.src = img;
  if (entityDescription) entityDescription.textContent = identifier;
  if (description) description.textContent = desc;
  if (entityCode) entityCode.textContent = identifier;
  if (contactEmail) contactEmail.textContent = email;
  if (contactPhone) contactPhone.textContent = phone;
  if (contactLocation) contactLocation.textContent = `📍 ${location}`;
};

// ============================================
// TODO 4: Render items list
// ============================================
// Create an arrow function called 'renderItems' that:
// 1. Receives a 'showAll' parameter (default false)
// 2. Filters items to show only first 4 if showAll is false
// 3. Uses map() to create HTML for each item
// 4. Uses template literals to generate HTML structure
// 5. Updates items container innerHTML
//
// Suggested HTML structure for each item:
// <div class="item">
//   <div class="item-name">{name}</div>
//   <div class="item-level">
//     <span>{level}%</span>
//     <div class="level-bar">
//       <div class="level-fill" style="width: {level}%"></div>
//     </div>
//   </div>
// </div>

const renderItems = (showAll = false) => {
  // Destructure items array from data
  const { items } = mentalhealthData;

  // Filter items based on showAll parameter
  const itemsToShow = showAll ? items : items.slice(0, 0);

  // Generate HTML using map() with template literals
  const itemsHtml = itemsToShow.map(({ name, level }) => `
    <div class="item">
      <div class="item-name">${name}</div>
      <div class="item-level">
        <span>${level}%</span>
        <div class="level-bar">
          <div class="level-fill" style="width: ${level}%"></div>
        </div>
      </div>
    </div>
  `).join('');

  // Update container with generated HTML
  itemsList.innerHTML = itemsHtml || '';
};

// ============================================
// TODO 5: Render links/references
// ============================================
// Create an arrow function called 'renderLinks' that:
// 1. Uses destructuring to extract links array from entityData
// 2. Uses map() to create HTML for each link
// 3. Uses template literals to generate anchor tags
// 4. Updates links container

const renderLinks = () => {
  // Destructure links array from data
  const { links } = mentalhealthData;

  // Generate HTML for each link using map()
  const linksHtml = links.map(({ platform, url, icon }) => `
    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-item">
      <span class="link-icon">${icon}</span>
      <span class="link-text">${platform}</span>
    </a>
  `).join('');

  // Update container with generated HTML
  linksContainer.innerHTML = linksHtml || '<p>No links available</p>';
};

// ============================================
// TODO 6: Calculate and render statistics
// ============================================
// Create an arrow function called 'renderStats' that:
// 1. Uses destructuring to extract stats object from entityData
// 2. Creates array of objects with label and value for each statistic
// 3. Uses map() to generate HTML for each statistic
// 4. Uses template literals for HTML structure
// 5. Updates stats container
//
// Suggested HTML structure for each stat:
// <div class="stat-item">
//   <span class="stat-value">{value}</span>
//   <span class="stat-label">{label}</span>
// </div>

const renderStats = () => {
  // Destructure statistics from data
  const { stats } = mentalhealthData;

  // Create array with labels and values for rendering
  const statsArray = [
    { label: 'Clients', value: stats.totalclients.toLocaleString('en-US') },
    { label: 'Professionals', value: stats.professionals },
    { label: 'Rating', value: `${stats.rating}⭐` },
    { label: 'Articles', value: stats.articlesPublished }
  ];

  // Generate HTML for each statistic using map()
  const statsHtml = statsArray.map(({ label, value }) => `
    <div class="stat-item">
      <span class="stat-value">${value}</span>
      <span class="stat-label">${label}</span>
    </div>
  `).join('');

  // Update container with generated HTML
  statsContainer.innerHTML = statsHtml || '<p>No statistics available</p>';
};

// ============================================
// TODO 7: Theme toggle functionality
// ============================================
// Create an arrow function called 'toggleTheme' that:
// 1. Gets current theme from document.documentElement.dataset.theme
// 2. Calculates new theme (if 'dark' change to 'light' and vice versa)
// 3. Updates document.documentElement.dataset.theme
// 4. Updates button icon (🌙 for light mode, ☀️ for dark mode)
// 5. (Optional) Save preference to localStorage
//
// Also create 'loadTheme' to:
// 1. Get theme saved in localStorage
// 2. Apply it if it exists

const toggleTheme = () => {
  // Get current theme from document
  const currentTheme = document.documentElement.dataset.theme;
  // Toggle between dark and light
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  // Update theme in document
  document.documentElement.dataset.theme = newTheme;

  // Update button icon based on new theme
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';

  // Persist theme preference in localStorage
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  // Get saved theme from localStorage or use 'light' as default
  const savedTheme = localStorage.getItem('theme') ?? 'light';
  // Apply saved theme
  document.documentElement.dataset.theme = savedTheme;
  // Update button icon
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Copy information functionality
// ============================================
// Create an arrow function called 'copyInfo' that:
// 1. Builds a string with main information using template literals
// 2. Uses navigator.clipboard.writeText() to copy to clipboard
// 3. Shows success toast notification
// 4. Uses showToast auxiliary function

const showToast = (message) => {
  if (toast && toastMessage) {
    // Set the toast message content
    toastMessage.textContent = message;
    
    // Remove animation class to reset
    toast.classList.remove('show');
    
    // Trigger animation by re-adding class
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    console.log('Toast displayed:', message);

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  } else {
    console.error('Toast elements not found in HTML');
  }
};

// Function copyInfo - Copy contact information to clipboard
const copyInfo = () => {
  // Destructure contact information
  const { contact } = mentalhealthData;
  // Build text with email and phone
  const infoText = `Email: ${contact?.email ?? 'Not available'}\nPhone: ${contact?.phone ?? 'Not available'}`;

  // Copy to clipboard with error handling
  navigator.clipboard.writeText(infoText)
    .then(() => {
      showToast('Information copied to clipboard! 📋');
    })
    .catch((err) => {
      console.error('Error copying to clipboard:', err);
      showToast('Unable to copy information');
    });
};




// ============================================
// TODO 9: Show/hide items functionality
// ============================================
// Create an arrow function called 'handleToggleItems' that:
// 1. Uses a variable to track if all items are visible
// 2. Toggles visibility
// 3. Calls renderItems with appropriate parameter
// 4. Updates button text ("Show more" / "Show less")

let showingAllItems = false;

const handleToggleItems = () => {
  // Toggle the showing all items state
  showingAllItems = !showingAllItems;
  // Re-render items with new state
  renderItems(showingAllItems);
  // Update button text based on state
  toggleItemsBtn.textContent = showingAllItems ? 'Show less' : 'Show more';
};

// ============================================
// TODO 10: Event Listeners
// ============================================
// Add event listeners for:
// 1. Click on theme button -> toggleTheme
// 2. Click on copy button -> copyInfo
// 3. Click on toggle items button -> handleToggleItems

// Attach click event listeners to buttons
themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Initialize application
// ============================================
// Create an arrow function called 'init' that:
// 1. Calls loadTheme()
// 2. Calls renderBasicInfo()
// 3. Calls renderItems()
// 4. Calls renderLinks()
// 5. Calls renderStats()
// 6. Shows success message to console

const init = () => {
  // Initialize application by calling all render functions
  try {
    loadTheme();
    renderBasicInfo();
    renderItems();
    renderLinks();
    renderStats();
    console.log('Application initialized successfully!');
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

// Execute init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// VERIFICATION CHECKLIST
// ============================================
// After completing all TODOs, verify:
// ✓ Your domain information displays correctly
// ✓ Items show levels/percentages with bars
// ✓ Links/references work and open in new tab
// ✓ Statistics display correctly
// ✓ Theme toggle works (light/dark)
// ✓ Copy button works and shows notification
// ✓ Show more/less button works
// ✓ All code uses ES2023 syntax (no var, no traditional functions)
// ✓ Template literals for all string interpolation
// ✓ Arrow functions throughout code
// ✓ Destructuring used where applicable
// ✓ Comments in English
// ✓ Technical nomenclature in English
