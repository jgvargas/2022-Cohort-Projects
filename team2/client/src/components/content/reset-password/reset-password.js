class ResetPassword extends HTMLElement {
    constructor() {
        super();
        this.loggedIn = this.getCookie("X-Access-Token") == undefined ? "" : this.getCookie("X-Access-Token");
    }


    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    
    parseEmail() {
        var base64Url = this.loggedIn.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        var json = JSON.parse(jsonPayload);

        return json.Email;
    };


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

