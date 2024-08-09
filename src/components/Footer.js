// Reusable Footer component
const Footer = () => {
    // HTML template for the footer section
    const footerHTML = `
      
        <div class="footerLogo">
          <img src="src/assets/super-logo/Super-white-colour.svg" alt="The Super Design Company logo" />
        </div>
        <nav>
          <ul>
            <li class="body-s-light"><a href="portfolio.html">Work footer</a></li>
            <li class="body-s-light"><a href="about.html">About</a></li>
            <li class="body-s-light"><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
      
          <div class="footerText">
        <p class="body-s-light">© 2024 The Super Design Company</p>
        </div>

    `
  
    // Create a footer element and set its inner HTML to the template HTML
    const footerElement = document.createElement("footer")
    footerElement.innerHTML = footerHTML.trim()
  
    // Return the footer element
    return footerElement
  }
  
  // Export the Footer component so it can be imported in other files as an ES6 module
  export default Footer
  