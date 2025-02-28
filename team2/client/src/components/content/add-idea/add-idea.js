class AddIdeaPage extends HTMLElement {
    constructor() {
        super();
        this.categories = [];
        this.ideas = null;
    }


    setActiveTab() {
        // Nav tab underline on current page
        const navItems = document.querySelectorAll('.nav-item')
        
        navItems.forEach( navItem => {
            if(navItem.firstElementChild.innerHTML === 'Add Idea')
                navItem.firstElementChild.classList.add('active')
        })
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
        .then(response => { 
            response.json().then(data => { data.forEach(category => this.categories.push(category));  
            })
        })
        
        .catch(error => console.log(error));
    }


    renderCategories() {
        var result = "";

        this.categories.forEach(x => {
            result += `
            <input 
                type="radio" 
                id="${x.categoryClassName}-btn" 
                name="category-selection" 
                value="${x.id}"
            />
            <label 
                class="${x.categoryClassName} category-options" 
                for="${x.categoryClassName}-btn"
            >
                ${x.categoryName}
            </label>
            `;
        });
        
        return result;
    }


    async GetIdeas(){
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
            this.ideas = data;
        })
        .catch(error => console.log(error));
    }


    renderIdeas() {
        var result = `
        <tr>
            <th>Idea</th>
            <th>Date</th>
            <th>Category</th>
        </tr>`;

        this.ideas.forEach(idea => {
            var date = new Date(idea.date).toDateString();
            var categoryName;
            let categoryLabel;

            for (var category of this.categories){
                if (category.id == idea.categoryId){
                    categoryName = category.categoryName;
                    categoryLabel = categoryName.toLowerCase().replace(" ", "-");

                    break;
                }
            }

            result += `
            <tr>
                <td>${idea.ideaName}</td>
                <td>${date}</td>
                <td><label class="${categoryLabel} category-options">${categoryName}</label></td>
                <td><span class="delete-idea-btn">x</span></td>
            </tr>
            `;
        });

        return result
    }

    async DeleteIdea() {
        /* Delete idea section 
        */
        let deleteBtns = document.querySelectorAll('.delete-idea-btn')

        deleteBtns.forEach( btn => {
            btn.addEventListener('click', async (event) => {
                // Select whole row of delete btn
                let td = event.target.parentNode
                let tr = td.parentNode

                // Get string of deleted idea
                let deletedIdea = tr.firstElementChild.innerHTML
                let deletedId = ''

                // Match string to ID of idea
                this.ideas.forEach( idea => {
                    if (idea.ideaName === deletedIdea){
                        deletedId = idea.id
                        console.log("Match was found with ID:", idea.id)
                    }
                })

                // build request for removal
                var requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "id": deletedId
                        }
                    )
                }

                console.log(requestOptions)

                await fetch(`https://idea-jar-api.herokuapp.com/Api/Idea/DeleteIdea`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    window.location.reload()
                })
                .catch(error => console.log(error));
            })
        })
    }
    
    async AddIdea() {

        var form = document.getElementById('add-idea-form');

        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            var idea = document.getElementById('event-name').value;
            var date = document.getElementById('event-date').value;
            var categoryId = document.querySelector('input[name="category-selection"]:checked');
            
            if (idea != null && categoryId !== null) {
                console.log('All good');

                var requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(
                        {
                            "ideaName": idea,
                            "date": new Date(date),
                            "categoryId": categoryId.value
                        }
                    )
                };
    
                await fetch(`https://idea-jar-api.herokuapp.com/Api/Idea/AddIdea`, requestOptions)
                .then(response => {
                    // handle json response
                    console.log(response.json())
                    setFormMessage("success", "Idea added")
                    window.location.reload();
                })
                .catch(error => {
                    // handle json response
                    console.log(error)
                });
            } else {
                console.log("No input", categoryId, idea)
                setFormMessage("error", "Please enter an Idea and a category");

                return;
            }

            
        })

        

        // Form user feedback
        function setFormMessage( type, message) {
            const messageElement = document.querySelector('.form-message')
            messageElement.textContent = message
            messageElement.classList.remove('form-message-error', 'form-message-success')
            messageElement.classList.add(`form-message-${type}`)
            
        }
    }


    async connectedCallback() {
        this.setActiveTab();
        this.render();
        await this.GetCategories();
        this.render();
        await this.GetIdeas();
        this.render();
        await this.DeleteIdea();
        await this.AddIdea();
    }
    

    render() {
        this.innerHTML = `
        <main id="add-item">
            <div class="container">
                <!--Form and image-->
                <section class="split idea-form">
                    <div class="card">
                        <!--User submission form-->
                        <form id="add-idea-form">
                            <div class="split">
                                <div class="form-space">
                                    <h3>
                                        <label for="event-name">Idea:</label>
                                    </h3>

                                    <input autofocus class="form-input" type="text" name="event-name" id="event-name"
                                        placeholder="'FCC Dallas Meetup'" 
                                    />
                                    <div class="form-message"></div>
                                    <br>

                                    <h3>
                                        <label for="event-date">Date:</label>
                                    </h3>

                                    <input class="form-input" type="date" name="event-date" id="event-date" />

                                </div>

                                <div class="category-space">
                                    <h3>
                                        <label for="category">Category:</label>
                                    </h3>

                                    ${this.categories.length == 0 ? `<h1>Loading</h1>` : this.renderCategories()}
                                </div>
                            </div>
                            <input type="submit" value="Submit" class="form-btn" />
                        </form>
                    </div>

                    <div class="img-container">
                        <img class="jar" src="./src/img/jar_2.png" alt="Idea jar">
                    </div>
                </section>

                <!--Stored Ideas-->
                <section class="card idea-container">
                    <div class="table-header">
                        <h2 class="text-center">Your ideas:</h2>
                    </div>
                    

                    <table class="idea-table">
                        ${this.ideas == null ? `<h1>Loading</h1>` : this.renderIdeas()}
                    </table>

                </section>

            </div>
        </main>
        `;
    }
}

customElements.define('x-add-idea-page', AddIdeaPage);

