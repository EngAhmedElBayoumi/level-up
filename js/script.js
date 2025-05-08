// 3D Animation with Three.js
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    // Check if container exists before proceeding
    if (!container) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 5000;
    
    const posArray = new Float32Array(particlesCnt * 3);
    
    for(let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0x6C63FF, // Use CSS variable or direct hex
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(newWidth, newHeight);
    });
};

// Page Navigation (Modified for separate pages - this logic might be removed or adapted)
/* 
const showPage = (pageId) => {
    // This function was for single-page navigation, may not be needed for multi-page setup
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('text-primary'); // Use CSS variable or direct class
        } else {
            link.classList.remove('text-primary');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
};
*/

// Mobile Menu Toggle
const toggleMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
};

// Dark Mode Toggle
const toggleDarkMode = () => {
    const body = document.body;
    const darkToggle = document.getElementById('dark-toggle');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        if(darkToggle) darkToggle.innerHTML = '<i class="fas fa-sun"></i>';
        // Update CSS variables for light mode
        document.documentElement.style.setProperty('--dark', '#f5f5f5');
        document.documentElement.style.setProperty('--darker', '#e5e5e5');
        document.documentElement.style.setProperty('--light', '#121212');
        document.documentElement.style.setProperty('--gray', '#e2e8f0'); // Adjusted gray for light mode
        // Update particle color if needed
        // Note: Accessing Three.js variables directly might be complex; consider CSS classes
    } else {
        if(darkToggle) darkToggle.innerHTML = '<i class="fas fa-moon"></i>';
        // Reset CSS variables to dark mode
        document.documentElement.style.setProperty('--dark', '#121212');
        document.documentElement.style.setProperty('--darker', '#0a0a0a');
        document.documentElement.style.setProperty('--light', '#f5f5f5');
        document.documentElement.style.setProperty('--gray', '#374151');
        // Reset particle color if needed
    }
};

// Portfolio Filtering (Specific to portfolio page)
const setupPortfolioFilter = () => {
    const filters = document.querySelectorAll('.portfolio-filter');
    const items = document.querySelectorAll('.portfolio-item');

    if (!filters.length || !items.length) return; // Only run if elements exist

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-filter');
            
            // Update active filter button style
            filters.forEach(f => {
                f.classList.remove('active', 'bg-primary'); // Use CSS variable or direct class
                f.classList.add('bg-gray-800');
            });
            filter.classList.add('active', 'bg-primary');
            filter.classList.remove('bg-gray-800');
            
            // Filter portfolio items
            items.forEach(item => {
                const itemCategories = item.getAttribute('data-category');
                
                if (category === 'all' || (itemCategories && itemCategories.includes(category))) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
};

// Preloader Hiding
const hidePreloader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        // Wait a bit for initial rendering/animation
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 500); // Reduced delay
    }
};

// Initialize relevant functions on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D Animation (if canvas exists)
    initThreeJS();
    
    // Setup mobile menu button (if exists)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
    
    // Setup dark mode toggle (if exists)
    const darkToggleButton = document.getElementById('dark-toggle');
    if (darkToggleButton) {
        darkToggleButton.addEventListener('click', toggleDarkMode);
    }

    // Setup navigation links for mobile menu closure (if exists)
    const navLinks = document.querySelectorAll('#mobile-menu .nav-link');
    const mobileMenu = document.getElementById('mobile-menu');
    if (navLinks.length && mobileMenu) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                 mobileMenu.classList.add('hidden');
            });
        });
    }

    // Setup portfolio filtering (if on portfolio page)
    if (document.getElementById('portfolio')) { // Check if portfolio container exists
        setupPortfolioFilter();
    }
    
    // Hide preloader
    hidePreloader();
});


// About section 3D animation
// Add after existing code

// Accordion functionality
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('i');
        
        // Toggle active class
        button.classList.toggle('active');
        content.classList.toggle('active');
        
        // Toggle icon
        if (content.classList.contains('active')) {
            icon.classList.replace('fa-plus', 'fa-minus');
        } else {
            icon.classList.replace('fa-minus', 'fa-plus');
        }
    });
});

// Enhanced About section 3D animation
function initAbout3D() {
    const container = document.getElementById('about-3d-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    // Create an icosahedron geometry
    const geometry = new THREE.IcosahedronGeometry(5, 0);
    const material = new THREE.MeshPhongMaterial({
        color: 0x6C63FF,
        wireframe: true,
        wireframeLinewidth: 2
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 15;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

// Initialize the about section 3D animation
document.addEventListener('DOMContentLoaded', initAbout3D);

// Create your 3D object here
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x6C63FF,
    wireframe: true
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Call this function after the page loads
document.addEventListener('DOMContentLoaded', initAbout3D);

