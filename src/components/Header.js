// Reusable Header component
const Header = () => {
  // HTML template for the header section
  const headerHTML = `
    
      <div class="logo">
        <img src="src/assets/super-logo/SuperDesCo_colour_transparent-bg.svg" alt="The Super Design Company logo" />
      </div>
      <nav>
        <ul>
          <li class="body-s-light"><a href="portfolio.html">Work</a></li>
          <li class="body-s-light"><a href="about.html">About</a></li>
          <li class="body-s-light"><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    
  `

  // Create a header element and set its inner HTML to the template HTML
  const headerElement = document.createElement("header")
  headerElement.innerHTML = headerHTML.trim()

  // Return the header element
  return headerElement
}

// Export the Header component so it can be imported in other files as an ES6 module
export default Header
