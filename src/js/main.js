// Function to dynamically load a script
function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load the header script first
    loadScript('src/js/header.js', () => {});
    loadScript('src/js/footer.js', () => {});
});
