class Navigation extends HTMLElement {
    constructor() {
        super();
        this.loggedIn = true;
        this.signInOptions = [
            {
                name: "Add Idea",
                location: "./add-idea.html",
                class: "nav-item"
            },
            {
                name: "Get Idea",
                location: "./get-idea.html",
                class: "nav-item"
            },
        ];
    }

    mobileMenu() {
        const mobileMenu = document.getElementById("mobile-menu");
        const navMenu = document.querySelector('.nav-list')
        const nav = document.querySelector('nav')
        // Hamburger menu
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

    // TODO: Ariel--Work in progress
    // -----------------------------
    // Need to finish connecting this
    // once we get the users JWT stored
    // in the browser.
    logOut() {
        var logout = document.getElementById('logout');

        logout.addEventListener('click', function(e) {
            this.loggedIn = false;
        })
    }

    navBarOptions() {
        var result = ``;

        if (!this.loggedIn){
            result += `
                <li>
                    <a class="nav-btn" href="./login-signup.html">Login</a>
                </li>
            `
            return result;
        }

        this.signInOptions.map(item => {
            result += `
            <li class="${item.class}">
                <a href="${item.location}">${item.name}</a>
            </li>
            `
        })

        result += `
            <li>
                <a class="nav-btn" href="./login-signup.html" id="logout">Logout</a>
            </li>
        `
        return result;
    }

    connectedCallback() {
        this.render();
        this.mobileMenu();

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
                        ${this.navBarOptions()}
                    </ul>
                </div>
            </nav>
        </header>
        `;
    }
}


customElements.define('x-navbar', Navigation);
