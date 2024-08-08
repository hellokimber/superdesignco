// Define your component
class headerNav {
    constructor(element) {
        this.element = element;
        // Initialize your component
    }

    // Add methods as needed
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize your component
    const componentElement = document.querySelector('#headerNav');
    if (componentElement) {
        new headerNav(componentElement);
    }
});
