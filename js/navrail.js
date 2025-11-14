function positionNavNodes() {
    // Select all nav nodes and the rail
    const navNodes = document.querySelectorAll('.scroll-nav-rail .nav-node');
    const rail = document.querySelector('.scroll-nav-rail');
    // Get total page height
    const totalPageHeight = document.documentElement.scrollHeight
    // Get usable rail height
    const railStyles = window.getComputedStyle(rail);
    const railHeight = rail.clientHeight;
    const railPaddingTop = parseFloat(railStyles.paddingTop);
    const railPaddingBottom = parseFloat(railStyles.paddingBottom);
    const usableRailHeight = railHeight - railPaddingTop - railPaddingBottom;
    // Handle zero or negative usable height
    if (usableRailHeight <= 0 || totalPageHeight <= 0) return;
    // Position each nav node
    navNodes.forEach(node => {
        const targetId = node.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Get the section's starting position
            const sectionTop = targetElement.offsetTop;
            const sectionHeight = targetElement.offsetHeight;
            // Calculate percentage down the page
            let percentDown = (sectionTop + (sectionHeight / 2)) / totalPageHeight;
            // Clamp percentDown between 0 and 1
            percentDown = Math.max(0, Math.min(percentDown, 1)); 
            // Calculate final pixel position
            const nodeTopPosition = (percentDown * usableRailHeight) + railPaddingTop;
            // Apply position
            node.style.top = `${nodeTopPosition}px`;
        }
    });
}


/* Update active nav node based on scroll position */
function selectNavNode() {
    const navNodes = document.querySelectorAll('.scroll-nav-rail .nav-node');
    const projectSections = document.querySelectorAll('.project-section');
    let currentSectionId = '';
    // Determine which section is currently in view
    projectSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        // Check if section is at least halfway on screen
        if (window.scrollY >= sectionTop - sectionHeight / 2) {
            currentSectionId = section.getAttribute('id');
        }
    });
    // update "active" class on nav nodes
    navNodes.forEach(node => {
        // Remove "active" class from all nodes
        node.classList.remove('active');
        // Add "active" class to matching node
        if (node.getAttribute('href') === `#${currentSectionId}`) {
            node.classList.add('active');
        }
    });
}


/* Smooth scrolling for navigation rail */
document.addEventListener('DOMContentLoaded', () => {
    // Position nav nodes on load
    positionNavNodes();
    // Reposition nav nodes on window resize
    window.addEventListener('resize', positionNavNodes);

    // Select active nav node on load
    selectNavNode();
    // Update active nav node on scroll
    window.addEventListener('scroll', selectNavNode);

    // Add click event listeners to nav nodes
    const navNodes = document.querySelectorAll('.scroll-nav-rail .nav-node');
    navNodes.forEach(node => {
        node.addEventListener('click', function(event) {
            // Prevent default jump behavior
            event.preventDefault(); 
            // Get target ID from link href
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            // Smooth scroll to target element
            if (targetElement) {
                targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
                });
            }
        });
    });
});
