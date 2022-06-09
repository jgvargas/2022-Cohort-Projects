class Head extends HTMLElement {
    constructor() {
        super();
        this.token = this.getCookie("X-Access-Token") == undefined ? "" : this.getCookie("X-Access-Token");
    }



    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }


    isIndexPage() {
        var path = window.location.pathname
        var pageName = path.substring(0, path.lastIndexOf(".html")).substring(path.lastIndexOf("/")+1);

        return pageName == "index" || pageName == "login-signup" ? true : false;
    }


    async isValidToken() {
        if (this.token == "") return false;

        var requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
        };

        var response = await fetch(`https://idea-jar-api.herokuapp.com/Api/Auth/Ping`, requestOptions)
        .then(response => {
            if (response.ok){
                return true;
            } else {
                document.cookie = "X-Access-Token=;SameSite=strict";
                return false;
            }
        })
        .catch((error) => {
            console.log(error)
            return false;
        });

        return response;
    }


    async authorizeUser() {
        var onIndexPage = this.isIndexPage();
        await this.isValidToken().then(valid => {
            if (!onIndexPage && !valid) {
                window.location.assign("/index.html"); 
            }
        });

        this.render();
    }


    async connectedCallback() {
        await this.authorizeUser();
    }


    render() {
        this.innerHTML = `
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="shortcut icon" href="./src/img/jar_favicon.ico">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cambay:wght@400;700&family=Handlee&display=swap" rel="stylesheet">
            <title>Idea Jar</title>
        </head>
        `;
    }
}

customElements.define('x-head', Head);

