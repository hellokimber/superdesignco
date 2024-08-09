import Header from "../components/Header.js"
import Footer from "../components/Footer.js" // Import the Footer component

document.addEventListener("DOMContentLoaded", function () {
  // event listener used so that Header() runs after the DOM has loaded
  const headerElement = document.querySelector("header")
  const headerContent = Header() // Check if Header() (Header.js) returns the expected content
  // console.log(headerContent) // Log the header content to verify it works
  headerElement.appendChild(headerContent) // Append the header content to the header element in index.html

  // Add the Footer component
  const footerElement = document.querySelector("footer")
  const footerContent = Footer() // Check if Footer() (Footer.js) returns the expected content
  // console.log(footerContent) // Log the footer content to verify it works
  footerElement.appendChild(footerContent) // Append the footer content to the footer element in index.html
})