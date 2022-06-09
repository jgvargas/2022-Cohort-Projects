class ResetPassword extends HTMLElement {
    constructor() {
        super();
    }

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

