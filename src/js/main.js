
import Header from "../components/Header.js"

document.addEventListener("DOMContentLoaded", function () {
  // event listener used so that Header() runs after the DOM has loaded
  const headerElement = document.querySelector("header")
  const headerContent = Header() // Check if Header() (Header.js) returns the expected content
  // console.log(headerContent) // Log the header content to verify it works
  headerElement.appendChild(headerContent) // Append the header content to the header element in index.html
})
