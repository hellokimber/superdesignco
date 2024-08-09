function loadHeader() {
    const headerHTML = `
    <header>
    <div class="logo">
        <img src="src/assets/super-logo/SuperDesCo_colour_transparent-bg.svg" alt="The Super Design Company logo">
    </div>
    <nav>
        <ul>
            <li class="nav-item body-s-light"><a href="portfolio.html">Work</a></li>
            <li class="nav-item body-s-light"><a href="about.html">About</a></li>
            <li class="nav-item body-s-light"><a href="contact.html">Contact</a></li>
        </ul>
    </nav>
</header>
    `;
    document.getElementById('headerNav').innerHTML = headerHTML;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}