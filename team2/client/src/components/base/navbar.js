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

    navLogic() {
        const mobileMenu = document.getElementById("mobile-menu");
        const navMenu = document.querySelector('.nav-list')
        
        // Hamburger menu
        mobileMenu.addEventListener('click', (event) => {
            console.log(event.target)
            mobileMenu.classList.toggle('active')
            navMenu.classList.toggle('active')
        })

        // Profile menu toggle
        const profileIcon = document.getElementById('profile-icon')
        const profileMenu = document.getElementById('profile-menu')
        profileIcon.addEventListener('click', () => {
            profileMenu.classList.toggle('active')
        })

        // Add background to Navbar on scroll
        const nav = document.querySelector('nav')
        window.onscroll = () => {
            if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
                nav.style.background = "rgba(123, 136, 209, .9)"
                profileMenu.style.background = "rgba(123, 136, 209, .9)"
            }
            else {
                nav.style.background = "none"
                profileMenu.style.background = 'none'
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
                <a class="nav-btn" id="profile-icon">J</a>
            </li>
        `
        return result;
    }

    connectedCallback() {
        this.render();
        this.navLogic();
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
                    <ul id="profile-menu">
                        <li>
                            Settings
                        </li>
                        <li>
                            <a class="nav-btn" href="./login-signup.html" id="logout">Logout</a>
                        </li>
                    </ul>
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
