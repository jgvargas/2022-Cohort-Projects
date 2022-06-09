class LoginSignUpPage extends HTMLElement {
    constructor() {
        super();
    }


    register() {
        var form = document.getElementById('createAccount');

        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            var username = document.getElementById('signup-username').value;
            var email = document.getElementById('signup-email').value;
            var password = document.getElementById('signup-password').value;
            var confirmPassword = document.getElementById('signup-confirmPassword').value;

            var requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "username": username,
                        "email": email,
                        "password": password,
                        "confirmPassword": confirmPassword
                    }
                )
            };

            await fetch(`https://idea-jar-api.herokuapp.com/Api/Auth/Register`, requestOptions)
            .then(response => {
                if (response.ok){
                    response.json()
                    .then(data => {
                        console.log(data);
                        window.location.assign("/login-signup.html");
                    });
                } else {
                    response.json().then(data => {
                        // handle error response
                        console.log(data);
                    });
                }
            })
            .catch(error => {
                console.log(error)
            });
        });
    }


    login() {
        var form = document.getElementById('login');

        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            var requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "username": username,
                        "password": password
                    }
                )
            };

            await fetch(`https://idea-jar-api.herokuapp.com/Api/Auth/Login`, requestOptions)
            .then(response => {
                if (response.ok){
                    response.json()
                    .then(data => {
                        document.cookie = `X-Access-Token=${data.message};SameSite=strict;Secure=true`;
                        window.location.assign("/index.html")
                    });
                } else {
                    response.json().then(data => {
                        // handle error response
                        console.log(data);
                    });
                }
            })
            .catch(error => console.log(error));
        })
    }


    forgotPassword() {
        var form = document.getElementById('forgotPassword');

        var 
    }

    #loginForm = `
    <form id="login" class="">

        <h2 class="text-center">Login</h2>

        <div class="text-center form-message form-message-error form-message-success"></div>
        <!--Username/email-->
        <div class="form-input-group">
            <input class="form-input" placeholder="Username or email" autofocus required type="text" id="username">
            <div class="form-message"></div>
        </div>
        <!--Password-->
        <div class="form-input-group">
            <input class="form-input" placeholder="Password" type="password" required id="password">
            <div class="form-message"></div>
        </div>
        <!--Submit-->
        <button type="submit" class="form-btn">Continue</button>
        <p class="form-text text-center">
            <a id="linkForgotPassword">Forgot your password?</a>
        </p>
        <p class="form-text text-center">
            <a id="linkCreateAccount" href="">Don't have an account? Create account</a>
        </p>
    </form>
    `;

    #signupForm = `
    <form id="createAccount" class="hide-element" action="" method="">

        <h2 class="text-center">Create Account</h2>

        <div class="text-center form-message form-message-error"></div>
        <div class="form-input-group">
            <input 
                autocomplete="off" 
                class="form-input" 
                placeholder="Username" 
                autofocus 
                type="text" 
                name="" 
                id="signup-username">
            <br/>
            <input 
                autocomplete="off" 
                class="form-input" 
                placeholder="Email" 
                autofocus 
                type="text" 
                name="" 
                id="signup-email">
            <div class="form-message"></div>
        </div>
        <!--Create password-->
        <div class="form-input-group">
            <div class="text-center form-message">
                <p><strong>Password requirements: </strong></p>
                <br/>
                One upper & lower case letter, one number, and one special character
                <br/>
            </div>
            <br/>
            <input 
                class="form-input" 
                placeholder="Password" 
                type="password" 
                name="" 
                id="signup-password">
            
        </div>
        <div class="form-input-group">
            <input 
                class="form-input" 
                placeholder="Confirm password" 
                type="password" 
                name="" 
                id="signup-confirmPassword">
            <div class="form-message"></div>
        </div>
        <!--Submit-->
        <button type="submit" class="form-btn ">Continue</button>
        
        <p class="form-text text-center">
            <a id="linkLogin" href="">Already have an account? Sign in</a>
        </p>
    </form>
    `;


    #forgotPassword = `
    <form id="forgotPassword" class="hide-element" action="" method="">

        <h2 class="text-center">Forgot Password</h2>

        <div class="text-center form-message form-message-error"></div>
        <div class="form-input-group">
            <input 
                autocomplete="off" 
                class="form-input" 
                placeholder="Email Address" 
                autofocus 
                type="text" 
                name="" 
                id="forgotpassword-email">
        </div>
        <!--Submit-->
        <button type="submit" class="form-btn">Submit</button>
    </form>
    `


    swapForm() {
        // Swap form logic
        const loginForm = document.querySelector('#login');
        const createAccountForm = document.querySelector('#createAccount');
        const forgotPasswordForm = document.querySelector('#forgotPassword');

        document.querySelector('#linkCreateAccount').addEventListener('click', (event) => {
            event.preventDefault()
            loginForm.classList.add('hide-element');
            createAccountForm.classList.remove('hide-element');
            forgotPasswordForm.classList.add('hide-element');
        });

        // In "Create Account", the link to go to "Login" form
        document.querySelector('#linkLogin').addEventListener('click', (event) => {
            event.preventDefault()
            loginForm.classList.remove('hide-element')
            createAccountForm.classList.add('hide-element')
            forgotPasswordForm.classList.add('hide-element');
        });


        document.querySelector('#linkForgotPassword').addEventListener('click', (event) => {
            event.preventDefault()
            loginForm.classList.add('hide-element')
            createAccountForm.classList.add('hide-element')
            forgotPasswordForm.classList.remove('hide-element');
        });
    }
    
    connectedCallback() {
        this.render();
        this.login();
        this.register();
        this.swapForm();
    }

    render() {
        this.innerHTML = `
        <main id="login-page" class="container">
        <section class="card card-login">
            ${this.#loginForm}

            ${this.#signupForm}

            ${this.#forgotPassword}
            
        </section>
    </main>
        `;
    }
}

customElements.define('x-login-signup-page', LoginSignUpPage);

