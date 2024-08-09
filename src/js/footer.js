function loadFooter() {
    const footerHTML = `
    <footer class="footerNav">
    <div class="logo footerLogo">
        <img src="src/assets/super-logo/Super-white-colour.svg" alt="The Super Design Company logo">
    </div>
    <nav>
        <ul>
            <li class="body-s-light"><a href="portfolio.html">Work</a></li>
            <li class="body-s-light"><a href="about.html">About</a></li>
            <li class="body-s-light"><a href="contact.html">Contact</a></li>
        </ul>
    </nav>
    <div class="footerText">
        <p class="body-s-light">© 2024 The Super Design Company</p>
        </div>
</footer>
    `;
    document.getElementById('footerNav').innerHTML = footerHTML;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadFooter();
}