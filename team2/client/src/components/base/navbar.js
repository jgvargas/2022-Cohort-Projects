class Navigation extends HTMLElement {
    constructor() {
        super();
    }

    mobileMenu() {
        /*------------------------- 
            Mobile menu
        --------------------------*/
        const mobileMenu = document.getElementById("mobile-menu");
        const navMenu = document.querySelector('.nav-list')
        const nav = document.querySelector('nav')

        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active')
            navMenu.classList.toggle('active')
        })

        // Add background to Navbar on scroll
        window.onscroll = (nav) => {
            if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
                nav.style.background = "rgba(123, 136, 209, .9)"
            }
            else {
                nav.style.background = "none"
            }
        }
    }

    async connectedCallback() {
        this.render();
        await this.mobileMenu();
    }
    
    render() {
        this.innerHTML = `
        <header>
            <nav>
                <div class="container">
                    <img id="nav-logo" src="./src/img/logo.png" alt="Idea jar logo">
                    <div id="mobile-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="./index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="./add-idea.html">Add Idea</a>
                        </li>
                        <li class="nav-item">
                            <a href="./get-idea.html">Get Idea</a>
                        </li>
                        <li>
                            <a class="nav-btn" href="./login-signup.html">Sign In</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        `;
    }
}


customElements.define('x-navbar', Navigation);
