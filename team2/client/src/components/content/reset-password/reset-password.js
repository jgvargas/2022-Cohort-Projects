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


    resetPassword() {
        let resetPasswordForm = document.getElementById('reset-password-form');
        
        var email = this.parseEmail();

        resetPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault()

            var requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            await fetch(`https://idea-jar-api.herokuapp.com/Api/Auth/ForgotPassword?email=${email}`, requestOptions)
            .then(response => {
                if (response.ok){
                    response.json()
                    .then(data => {
                        console.log(data);
                        setFormMessage("success", data.message);
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

        // Form user feedback
        function setFormMessage( type, message) {
            const messageElement = document.querySelector('.form-message')
            messageElement.textContent = message
            messageElement.classList.remove('form-message-error', 'form-message-success')
            messageElement.classList.add(`form-message-${type}`) 
        }
    }

    connectedCallback() {
        this.render();
        this.resetPassword();
        this.parseEmail();
    }

    render() {
        this.innerHTML = `
        <main>
        <div >
        <form class="card card-login" id="reset-password-form" class="">

        <h2 class="text-center">Reset Password</h2>
        
        <!--Create new password-->
        <div class="form-input-group">
            <div class="text-center form-message">
                <br/>
                Click below to send reset password instructions to your email
                <br/>
            </div>
        </div>
        <div class="form-input-group">
            <div class="form-message"></div>
        </div> 
        <!--Submit-->
        <button type="submit" class="form-btn ">Confirm</button>
        </form>
        </div>
        
        </main>
        `;
    }
}

customElements.define('x-reset-password-page', ResetPassword);

