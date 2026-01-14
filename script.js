
// ==========================================
// WEBSITE INTERACTIVITY SCRIPT
// Handles navigation, themes, gallery, and modals
// ==========================================

// Get DOM elements for interactive components
const burger = document.getElementById("burger"); // Hamburger menu button
const nav = document.getElementById("nav-menu"); // Navigation menu container
const themeToggle = document.getElementById("theme-toggle"); // Dark/light theme toggle checkbox

document.querySelectorAll("#nav-menu a").forEach(link => { // Select all navigation links
  link.addEventListener("click", () => {nav.classList.remove("active");}); // Close mobile menu on link click
});

// ==========================================
// BURGER MENU FUNCTIONALITY
// Toggles mobile navigation menu visibility
// ==========================================
burger.addEventListener("click", () => {
    // Toggle 'active' class to show/hide mobile menu
    nav.classList.toggle("active");
});

// ==========================================
// THEME TOGGLE FUNCTIONALITY
// Switches between dark and light themes
// Saves user preference to localStorage
// ==========================================
themeToggle.addEventListener("click", () => {
    // Toggle 'dark' class on body and return boolean result
    const isDark = document.body.classList.toggle("dark");

    // Save theme preference to browser storage
    if (isDark) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// ==========================================
// GALLERY MANAGEMENT
// Controls gallery item visibility and "Show More" functionality
// ==========================================

// Get gallery control elements
const addButton = document.querySelector('.ewan-button'); // Button to add new gallery items
const showMoreBtn = document.getElementById('show-more'); // "Show More" button

/**
 * Updates gallery visibility based on item count
 * Shows only first 12 items initially, hides the rest
 * Shows "Show More" button if there are more than 12 items
 */
function updateGalleryVisibility() {
    // Get all gallery items except the button container
    const items = Array.from(document.querySelectorAll('.gallery-item')).filter(item => !item.classList.contains('button-div'));

    if (items.length > 12) {
        // Hide items beyond the first 12
        items.forEach((item, index) => {
            if (index >= 12) {
                item.style.display = 'none';
            } else {
                item.style.display = 'block';
            }
        });
        // Show "Show More" button
        showMoreBtn.style.display = 'block';
    } else {
        // Show all items if 12 or fewer
        items.forEach(item => item.style.display = 'block');
        // Hide "Show More" button
        showMoreBtn.style.display = 'none';
    }
}

// Handle "Show More" button click
showMoreBtn.addEventListener('click', () => {
    // Get all gallery items except button container
    const items = Array.from(document.querySelectorAll('.gallery-item')).filter(item => !item.classList.contains('button-div'));
    // Show all items
    items.forEach(item => item.style.display = 'block');
    // Hide "Show More" button
    showMoreBtn.style.display = 'none';
});

// Initialize gallery visibility on page load
updateGalleryVisibility();

// ==========================================
// MODAL FUNCTIONALITY
// Handles project and profile popup modals
// ==========================================

/**
 * Opens the project modal and loads content from project-bank.html
 * Dynamically fetches and displays project details in a modal
 */
function openModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = modal.querySelector('.modal-content');

    // Fetch project content from external HTML file
    fetch('project-bank.html')
        .then(response => response.text())
        .then(html => {
            // Parse the fetched HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const projectDetail = doc.querySelector('.project-detail');

            if (projectDetail) {
                // Remove back button since we're in a modal
                const backBtn = projectDetail.querySelector('a[href="index.html"]');
                if (backBtn) backBtn.style.display = 'none';

                // Clear existing modal content and add close button back
                const closeBtn = modalContent.querySelector('.close');
                modalContent.innerHTML = '';
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(projectDetail);
            }
            // Show the modal
            modal.classList.add('show');
        })
        .catch(error => console.error('Error loading project:', error));
}

/**
 * Closes the project modal and clears its content
 */
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');

    // Clear content but keep close button
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modalContent.querySelector('.close');
    modalContent.innerHTML = '';
    modalContent.appendChild(closeBtn);
}

/**
 * Closes the profile modal and clears its content
 */
function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.remove('show');

    // Clear content but keep close button
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modalContent.querySelector('.close');
    modalContent.innerHTML = '';
    modalContent.appendChild(closeBtn);
}

// ==========================================
// MODAL EVENT HANDLERS
// Handle clicking outside modals to close them
// ==========================================
window.onclick = function(event) {
    const projectModal = document.getElementById('projectModal');
    const profileModal = document.getElementById('profileModal');

    // Close project modal if clicked outside content area
    if (event.target == projectModal) {
        closeModal();
    }
    // Close profile modal if clicked outside content area
    if (event.target == profileModal) {
        closeProfileModal();
    }
}

// ==========================================
// GALLERY ITEM ADDITION
// Allows users to dynamically add new gallery items
// ==========================================
if (addButton) {
    addButton.addEventListener('click', () => {
        const galleryGrid = document.querySelector('.gallery-grid');
        const buttonDiv = document.querySelector('.button-div');

        // Create new gallery item
        const newItem = document.createElement('div');
        newItem.className = 'gallery-item';
        newItem.innerHTML = '<a href="project-new.html"><img src="images/computer-program-coding-screen_53876-138060.avif" style="width: 250px; height: 200px;" alt="New Gallery Image"></a>';

        // Insert new item before the button container
        galleryGrid.insertBefore(newItem, buttonDiv);
        // Update visibility to handle the new item
        updateGalleryVisibility();
    });
}

// ==========================================
// PROFILE MODAL SYSTEM
// Displays team member profiles in popup modals
// Uses dynamic content generation instead of static HTML
// ==========================================

/**
 * Opens a profile modal for a specific team member
 * @param {string} targetId - The ID of the team member (jondie, billy, yanmar, nero)
 */
function openProfileModal(targetId) {
    console.log('Opening modal for target:', targetId);
    const modal = document.getElementById('profileModal');
    const modalContent = modal.querySelector('.modal-content');

    // Clear existing content but preserve close button
    const closeBtn = modalContent.querySelector('.close');
    modalContent.innerHTML = '';
    modalContent.appendChild(closeBtn);

    // Generate profile content dynamically
    const profileData = getProfileData(targetId);
    if (profileData) {
        const profileContent = document.createElement('div');
        profileContent.className = 'profile-content';

        // Create HTML structure for profile
        profileContent.innerHTML = `
            <div class="profile-image">
                <img src="${profileData.image}" alt="${profileData.name}">
            </div>
            <div class="profile-text">
                <h1>Hello, I'm <br>${profileData.name}</h1>
                <p>${profileData.description}</p>
            </div>
        `;
        modalContent.appendChild(profileContent);
    }

    // Show the modal
    modal.classList.add('show');
}

/**
 * Retrieves profile data for a specific team member
 * @param {string} id - The team member ID
 * @returns {Object|null} Profile data object or null if not found
 */
function getProfileData(id) {
    // Database of team member profiles
    const profiles = {
        jondie: {
            name: 'Jondie Caguioa',
            image: 'images/jondie.png',
            description: 'Elite frontend IT developer forged in Apex-level secure environments, crafting pixel-perfect, mission-critical interfaces with extreme precision, performance, and resilience, engineered to operate flawlessly under pressure, complexity, and zero-failure conditions.'
        },
        billy: {
            name: 'Billy Jay A. Lorenzo',
            image: 'images/billy.png',
            description: 'Elite backend IT developer forged in Apex-level secure environments, architecting mission-critical, zero-failure systems, hardened APIs, and ultra-scalable infrastructure built to survive extreme loads, precision demands, and unforgiving real-world conditions.'
        },
        yanmar: {
            name: 'Yanmar J. Lachica Jr.',
            image: 'images/yanmar.png',
            description: 'Elite software tester and debugger, trained to detect even the most elusive bugs, ensuring mission-critical systems remain stable under extreme conditions. Expert in stress-testing, automation, and precision validation to guarantee flawless performance in real-world environments.'
        },
        nero: {
            name: 'Nero Marron Elazegui',
            image: 'images/nero.png',
            description: 'Elite technical documenter, skilled in creating clear, precise, and comprehensive documentation for complex IT systems. Adept at translating intricate processes into user-friendly guides, ensuring teams and clients can operate software efficiently and accurately under demanding conditions.'
        }
    };
    return profiles[id];
}

// ==========================================
// INITIALIZATION
// Set up event listeners when DOM is fully loaded
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Get all team member card links
    const cardLinks = document.querySelectorAll('.card-link');

    console.log('Found card links:', cardLinks.length);

    // Add click event listeners to each team member card
    cardLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Card clicked');
            e.preventDefault(); // Prevent default link behavior

            // Extract team member ID from href attribute
            const targetId = link.getAttribute('href').substring(1);
            console.log('Target ID:', targetId);

            // Open profile modal for this team member
            openProfileModal(targetId);
            console.log('Modal opened');
        });
    });
});
