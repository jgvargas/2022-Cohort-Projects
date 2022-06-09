class ResetPassword extends HTMLElement {
    constructor() {
        super();
    }

    

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <main>
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
    
        </main>
        `;
    }
}

customElements.define('x-reset-password-page', ResetPassword);

