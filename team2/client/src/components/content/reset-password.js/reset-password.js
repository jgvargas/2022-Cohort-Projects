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
        <div class="card">
        <form id="reset-password" class="">

        <h2 class="text-center">Reset Password</h2>

        
        <!--Create new password-->
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
        </form>
        </div>
        </main>
        `;
    }
}

customElements.define('x-reset-password-page', ResetPassword);

