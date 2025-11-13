document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle functionality
    const sidebar = document.getElementById('portfolio-sidebar');
    const toggleButton = document.getElementById('menu-toggle-button');
    
    if (sidebar && toggleButton) {
        // Toggle the sidebar
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('is-open');
            document.body.classList.toggle('sidebar-is-open');
        });
    }
});