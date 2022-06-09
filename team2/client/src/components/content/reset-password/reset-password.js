class ResetPassword extends HTMLElement {
    constructor() {
        super();
        this.loggedIn = this.getCookie("X-Access-Token") == undefined ? "" : this.getCookie("X-Access-Token");
    }


    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

<<<<<<< HEAD
    
    parseEmail() {
        var base64Url = this.loggedIn.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        var json = JSON.parse(jsonPayload);

        return json.Email;
    };

=======
    resetPassword() {
        let newPasswordElement = document.getElementById('new-password')
        let confirmPasswordElement = document.getElementById('new-confirmPassword')
        let resetPasswordForm = document.getElementById('reset-password-form')

        resetPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault()

            let newPassword = newPasswordElement.value
            let newPasswordConfirm = confirmPasswordElement.value
            
            var requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            setFormMessage("success", "Password has been reset")

            /*
            await fetch(`https://idea-jar-api.herokuapp.com/Api/Auth/ForgotPassword?email=${email}`, requestOptions)
            .then(response => {
                if (response.ok){
                    response.json()
                    .then(data => {
                        console.log(data);
                        //window.location.assign("/index.html");
                    });
                } else {
                    response.json().then(data => {
                        // handle error response
                        console.log(data);
                    });
                }
            })
            .catch(error => console.log(error));
        */
        })

        // Form user feedback
        function setFormMessage( type, message) {
            const messageElement = document.querySelector('.form-message')
            messageElement.textContent = message
            messageElement.classList.remove('form-message-error', 'form-message-success')
            messageElement.classList.add(`form-message-${type}`) 
        }
    }
>>>>>>> f725fa09cf6aec1e1aa91af91e9c942b413adcfb

    connectedCallback() {
        this.render();
        this.resetPassword();
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
                id="new-password">
            
        </div>
        <div class="form-input-group">
            <input 
                class="form-input" 
                placeholder="Confirm password" 
                type="password" 
                name="" 
                id="new-confirmPassword">
            <div class="form-message"></div>
        </div> 
        <!--Submit-->
        <button type="submit" class="form-btn ">Continue</button>
        </form>
        </div>
        
        </main>
        `;
    }
}

customElements.define('x-reset-password-page', ResetPassword);

