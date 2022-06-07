class GetIdeaPage extends HTMLElement {
    constructor() {
        super();
        this.categories = [];
    }

    setActiveTab(){
        // Nav tab underline on current page
        const navItems = document.querySelectorAll('.nav-item')
        
        navItems.forEach( navItem => {
            if(navItem.firstElementChild.innerHTML === 'Get Idea')
                navItem.firstElementChild.classList.add('active')
        })
    }



                //adds shake animation to the jar via class, and then removes and brings up popup
                /*
                const jar = document.querySelector("#jar");
                jar.classList.add("jar-shake")
                setTimeout(() => {
                    jar.classList.remove("jar-shake")
                    popupOverlay.classList.add("active")
                    popupContent.classList.add("active")
                }, 1500)
                */

    loadOpenModal() {
        var buttons = document.getElementsByClassName('open shake');

        for (var btn of buttons) {
            btn.addEventListener('click', async (event) => {
                var id = event.target.value;

        //closes popup via close btn or background click
        document.addEventListener("click", (event) => {
            if(!event.target.classList.contains("open") && !event.target.classList.contains("popup-btn-container") && !event.target.classList.contains("popup-inner-text"&& !event.target.classList.contains("popup-overlay"))) {
                popupOverlay.classList.remove("active");
                popupContent.classList.remove("active");
            }
        })

        //get userData from local storage
        //const userData = JSON.parse(localStorage.getItem('myIdeaList'));
        //const popUpWindow = document.querySelector(".popup-content > h2");

                const popupOverlay = document.querySelector(".popup-overlay");
                const popupContent = document.querySelector(".popup-content");
                const jar = document.querySelector('#jar');
                
                jar.classList.add('jarShake');


                var idea = await this.getIdea(id);
                this.setModalProps(idea);
                
                setTimeout(() => {
                    jar.classList.remove("jarShake");
                    popupOverlay.classList.add("active");
                    popupContent.classList.add("active");
                }, 250);

                [document.querySelector(".close"), popupOverlay].forEach(btn => {
                    btn.addEventListener("click", () => {
                        popupOverlay.classList.remove("active");
                        popupContent.classList.remove("active");
        
                    })
                });

        /*
        function getIdea(chosenCategory) {
            //reset optional data fields
            document.querySelector(".popup-date").innerText = "";
        */
            });
        }


    }


    async getIdea(id) {
        const randomIdeaUrl = `https://idea-jar-api.herokuapp.com/Api/Idea/GetRandomIdea`;
        const randomIdeaByCategory = `https://idea-jar-api.herokuapp.com/Api/Idea/GetRandomIdeaByCategory/${id}`;

            //validates user choice and provides feedback
            /*
            if (!ideasInCategory.length) {
                console.log(document.querySelector(".keepIdea").innerText)
                popUpWindow.innerText = "You have no activities in this category";
                return
            }
            */
        var result;


        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        async function fetchCall(url) {
            console.log(url)
            await fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                result = data
            })
            .catch(error => {
                console.log(error)
            });
        }

        if (id == 1) {
            await fetchCall(randomIdeaUrl);
        } else {
            await fetchCall(randomIdeaByCategory);
        }

        return result;
    }



    setModalProps(idea) {
        var name = idea.ideaName;
        var date = new Date(idea.date).toDateString();

        document.querySelector(".popup-content > h2").textContent = name;
        document.querySelector(".popup-content > .popup-date").textContent = date;
        
        console.log(idea)
    }


    async GetCategories() {
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await fetch(`https://idea-jar-api.herokuapp.com/Api/Category/GetAll`, requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(category => this.categories.push(category));  
        })
        .catch(error => console.log(error));
    }

    renderCategories() {
        var result = "";

        this.categories.forEach(x => {
            result += `
            <button 
                class="${x.categoryClassName} open shake" 
                value="${x.id}"
            >
                ${x.categoryName}
            </button>`;
        });
        
        return result;
    }

    async connectedCallback() {
        this.setActiveTab();
        this.render();
        await this.GetCategories();

        this.render();
        this.loadOpenModal();
    }

    render() {
        this.innerHTML = `
        <main>
            <section class="container">
                <h1 class="mainHeading text-center">What do you want to to today?</h1>
                <div class="containerGet">

                    <div class="containerJar">
                        <img src="./src/img/jar_2.png" id="jar" alt="jar with colored paper slips"></img>
                    </div>
                    <section class="activity-buttons">

                        ${this.categories.length == 0 ? `<h1>Loading</h1>` : this.renderCategories()}

                    </section>
                </div>
                <!--Creates the popup body-->
                <div class="containerModal">
                    <div class="popup-overlay">
                        <!--Creates the popup content-->

                            <div class="popup-content">
                            <h2 class="popup-inner-text"</h2>
                            <h3 class="popup-date popup-inner-text"></h3>

                            <!--popup's close button-->
                            <div class="popup-btn-container">
                            <button class="close mdlBtn keepIdea">Keep Idea in Jar</button>
                            <button class="close mdlBtn removeIdea">Remove Idea from Jar</button>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        `;
    }
}

customElements.define('x-get-idea-page', GetIdeaPage);