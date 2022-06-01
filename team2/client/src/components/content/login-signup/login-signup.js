class LoginSignUpPage extends HTMLElement {
    constructor() {
        super();

        this.loginProps = {
            username: "",
            password: "",
        };

        this.signupProps = {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
    }

    loginLogic() {
        const loginForm = document.querySelector('#login')
        const createAccountForm = document.querySelector('#createAccount')
        // In "Login", the link to go to "Create Account" form
        document.querySelector('#linkCreateAccount').addEventListener('click', (event) => {
            event.preventDefault()
            loginForm.classList.add('hide-element')
            createAccountForm.classList.remove('hide-element')
        })
        // In "Create Account", the link to go to "Login" form
        document.querySelector('#linkLogin').addEventListener('click', (event) => {
            event.preventDefault()
            loginForm.classList.remove('hide-element')
            createAccountForm.classList.add('hide-element')
        })
        
        // Submit from "Login" form
        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            // Perform login

            // If sucess
            setFormMessage(loginForm, "success", "You're logged in")
            document.cookie = "isLoggedIn=true"
            document.cookie = "SameSite=Strict"

            // If failed
            //setFormMessage(loginForm, "error", "Invalid username password combination")
        })

        // Submit from "Create Account" form
        createAccountForm.addEventListener('submit', (event)=> {
            event.preventDefault()
            const createUsername = createAccountForm.querySelector('#createUsername').value
            const createPassword = createAccountForm.querySelector('#createPassword').value
            const createPasswordConfirm = createAccountForm.querySelector('#createPasswordConfirm').value

            // Valid pattern regex
            let validUsername = /^[a-zA-Z0-9]+$/
            let validPassword = /^[a-zA-Z0-9!@#$]+$/

            if(createUsername.length < 3) {
                setFormMessage(createAccountForm, "error", "Please enter a Username of 3 or more characters")
            }
            else if ( !validUsername.test(createUsername)) {
                setFormMessage(createAccountForm, "error", "Invalid characters in Username")
            }
            else {
                // Password validation, must be greater than 8 char with and 1 symbol

                // Check passwords match
                if(createPassword !== createPasswordConfirm)
                    setFormMessage(createAccountForm, "error", "Passwords do not match")
                else {
                    setFormMessage(createAccountForm, "success", "Account created")
                    // Set Username and password
                }
            }
        })

        function setFormMessage(formElement, type, message) {
            const messageElement = formElement.querySelector('.form-message')
            messageElement.textContent = message
            messageElement.classList.remove('form-message-error', 'form-message-success')
            messageElement.classList.add(`form-message-${type}`)
        }
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
            .then(response => console.log(response.json()))
            .catch(error => console.log(error));
        })
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
            <a href="">Forgot your password?</a>
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
                id="createUsername">
            <div class="form-message"></div>
        </div>
        <!--Create password-->
        <div class="form-input-group">
            <div class="text-center form-message">Use at least one number and symbol @ # ! $</div>
            <input 
                class="form-input" 
                placeholder="Password" 
                type="password" 
                name="" 
                id="createPassword">
            
        </div>
        <div class="form-input-group">
            <input 
                class="form-input" 
                placeholder="Confirm password" 
                type="password" 
                name="" 
                id="createPasswordConfirm">
            <div class="form-message"></div>
        </div>
        <!--Submit-->
        <button type="submit" class="form-btn ">Continue</button>
        
        <p class="form-text text-center">
            <a id="linkLogin" href="">Already have an account? Sign in</a>
        </p>
    </form>
    `;
    
    connectedCallback() {
        this.render();

        this.login();
        this.loginLogic();
    }

    render() {
        this.innerHTML = `
        <main id="login-page" class="container">
        <section class="card card-login">
            ${this.#loginForm}

            ${this.#signupForm}
            
        </section>
    </main>
        `;
    }
}

customElements.define('x-login-signup-page', LoginSignUpPage);

