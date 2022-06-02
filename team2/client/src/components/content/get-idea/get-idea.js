class GetIdeaPage extends HTMLElement {
    constructor() {
        super();
        this.ideas = [];
    }

    setActiveTab(){
        // Nav tab underline on current page
        const navItems = document.querySelectorAll('.nav-item')
        
        navItems.forEach( navItem => {
            if(navItem.firstElementChild.innerHTML === 'Get Idea')
                navItem.firstElementChild.classList.add('active')
        })
    }

    startGetIdea() {
        const popupOverlay = document.querySelector(".popup-overlay");
        const popupContent = document.querySelector(".popup-content");

        /* modal on get idea */
        Array.from(document.querySelectorAll(".open")).forEach(button => {
            button.addEventListener("click", (event) => {
                let chosenCategory = event.target.classList[0]

                //adds shake animation to the jar via class, and then removes and brings up popup
                const jar = document.querySelector("#jar");
                jar.classList.add("jarShake")
                setTimeout(() => {
                    jar.classList.remove("jarShake")
                    popupOverlay.classList.add("active")
                    popupContent.classList.add("active")
                }, 1500)

                getIdea(chosenCategory)
            });
        });

        //closes popup via close btn or overlay
        [document.querySelector(".close"), popupOverlay].forEach(btn => {
            btn.addEventListener("click", () => {
                popupOverlay.classList.remove("active");
                popupContent.classList.remove("active");

            })
        })

        userData = JSON.parse(localStorage.getItem('myIdeaList'));
        popUpWindow = document.querySelector(".popup-content > h2");


        function getIdea(chosenCategory) {
            //reset optional data fields
            document.querySelector(".popup-url").innerText = "";
            document.querySelector(".popup-date").innerText = "";

            if (!userData || !userData.ideas.length) {
                popUpWindow.innerText = "You have no activities in your idea jar!";
                return
            }

            let ideasInCategory = userData.ideas.filter(idea => idea.category == chosenCategory);


            if (chosenCategory == "other") {
                ideasInCategory = userData.ideas;
            }

            //validates user choice and provides feedback
            if (!ideasInCategory.length) {
                popUpWindow.innerText = "You have no activities in this category";
                return
            }

            //stores random idea data so it can be used to delete idea
            let randomIdea = generateRandomIdea(ideasInCategory);

            //button to remove idea from jar
            document.querySelector(".removeIdea").addEventListener("click", () => removeIdeaFromJar(randomIdea));
        }

        //removes the chosen idea from the idea jar user data
        function removeIdeaFromJar(chosenIdea) {
            //Revises idea list and Adds updated userData to localstorage
            let revisedIdeaList = userData.ideas.filter(idea => idea.id !== chosenIdea.id)
            userData.ideas = revisedIdeaList
            localStorage.setItem('myIdeaList', JSON.stringify(userData))
        }

        //generates a random index and uses it to pick a random idea
        function generateRandomIdea(ideasInCategory) {
            let randomIdeaIndex = Math.floor(Math.random() * ideasInCategory.length);
            let randomIdea = ideasInCategory[randomIdeaIndex];


            popUpWindow.innerText = randomIdea.name;
            if (randomIdea.URL) {
                document.querySelector(".popup-url").innerText = randomIdea.URL;
            }
            if (randomIdea.date) {
                document.querySelector(".popup-date").innerText = `Date: ${randomIdea.date}`;
            }
            return randomIdea
        }
    }

    async GetIdeas() {
        var requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await fetch(`https://idea-jar-api.herokuapp.com/Api/Idea/GetAll`, requestOptions)
        .then(response => response.json())
        .then(data => {
            data.forEach(idea => this.ideas.push(idea));  
        })
        .catch(error => console.log(error));
    }

    renderIdeas() {
        var result = "";

        this.ideas.forEach(x => {
            // class needs to be dynamic
            result += `<button class="road-trip open shake">${x}</button>`;
        });
        
        return result;
    }

    async connectedCallback() {
        this.render();
        await this.GetIdeas();
        this.render();
        this.setActiveTab();
        this.startGetIdea();
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
                        ${this.ideas.length == 0 ? `<h1>Loading</h1>` : this.renderIdeas()}
                    </section>
                </div>
                <!--Creates the popup body-->
                <div class="containerModal">
                    <div class="popup-overlay">
                        <!--Creates the popup content-->
                        <div class="popup-content">
                            <h2>I'M SO EXCITED THE POP-UP WORKS!!!!</h2>
                            <h3 class="popup-url"></h3>
                            <h3 class="popup-date"></h3>
                            <!--popup's close button-->
                            <div class="popup-btn-container">
                            <button class="close mdlBtn">Keep Idea in Jar</button>
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