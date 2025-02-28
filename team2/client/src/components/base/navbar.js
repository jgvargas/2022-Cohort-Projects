class Navigation extends HTMLElement {
    constructor() {
        super();
        this.loggedIn = this.getCookie("X-Access-Token") == undefined ? "" : this.getCookie("X-Access-Token");
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



    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    parseUserName() {
        var base64Url = this.loggedIn.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        var json = JSON.parse(jsonPayload);

        return json.UserName[0].toUpperCase();
    };


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
        if (this.loggedIn.length != 0) {
            const profileIcon = document.getElementById('profile-icon')
            const profileMenu = document.getElementById('profile-menu')
            profileIcon.addEventListener('click', () => {
                profileMenu.classList.toggle('active')
            })
        }
    }


    logOut() {
        var logout = document.getElementById('logout');

        logout.addEventListener('click', function(e) {
            e.preventDefault();
            document.cookie = "X-Access-Token=;SameSite=strict";
            window.location.assign("/index.html");
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
            <li class="profile-content">
                <a class="nav-btn" id="profile-icon">${this.parseUserName()}</a>
                <ul id="profile-menu">
                        <li class="nav-item">
                            <a href="./reset-password.html">Reset Password</a>
                        </li>
                        <li>
                            <a class="nav-btn" id="logout">Logout</a>
                        </li>
                    </ul>
            </li>
        `
        return result;
    }

    connectedCallback() {
        this.render();
        this.navLogic();
        if (this.loggedIn.length > 0) this.logOut();
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
