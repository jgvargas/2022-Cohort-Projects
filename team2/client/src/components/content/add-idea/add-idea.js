class AddIdeaPage extends HTMLElement {
    constructor() {
        super();
    }

    setActiveTab() {
        // Nav tab underline on current page
        const navItems = document.querySelectorAll('.nav-item')
        
        navItems.forEach( navItem => {
            if(navItem.firstElementChild.innerHTML === 'Add Idea')
                navItem.firstElementChild.classList.add('active')
        })
    }

    /* ----------------------------------------
    AddIdeaLogic() overview
    - Checks for existing userData in displayIdeas() with localStorage
        - If present populate table with AddIdea() and createRow()
    - User submits idea and calls addIdea()
        - Jar is animated startJar()

    TODO: 
    - Validate form data before storing
    - Change date to dd-mm-yy
    --------------------------------------------*/
    addIdeaLogic() {
        // Import user data if previously submitted
        let userData = {}
        userData = JSON.parse(localStorage.getItem('myIdeaList'))

        if (!userData) {
            userData = {
                userId: 1,
                userName: 'Default',
                ideas: []
            }
        }

        // Populate data on page if data is present
        displayIdeas()

        // Call function addIdea on form-btn submit
        let addIdeaForm = document.getElementById('add-idea-form');
        console.log('test', addIdeaForm)


        addIdeaForm.addEventListener('submit', (event) =>  {
            event.preventDefault() // Stops form reload on submit
            
            // Get radio input
            let checkedRadio = ''
            let radioElements = document.getElementsByName('category')
        
            for (let i = 0; i < radioElements.length; i++) {
                if (radioElements[i].checked) {
                    // incomplete
                    console.log(radioElements[i].value)
                    checkedRadio = radioElements[i].value
                }
            }
        
            // Validate input 
            if (document.getElementById('event-name').value && checkedRadio != "") {
                let idea = {
                    id: Date.now(),
                    name: document.getElementById('event-name').value,
                    date: document.getElementById('event-date').value,
                    category: checkedRadio
                }
                userData.ideas.push(idea)
            
                document.querySelector('form').reset()
            
                // Add updated userData to localstorage
                localStorage.setItem('myIdeaList', JSON.stringify(userData))
            
                // Update idea table
                createRow(idea.name, idea.date, idea.category)
            
                // Animate jar shake
                let jar = document.querySelector('.jar')
                jar.classList.add('jar-shake')
            }
            else {
                console.log("Add an idea first")
                setFormMessage( "error", "Add an idea first")
            }
        })
        function setFormMessage( type, message) {
            const messageElement = document.querySelector('.form-message')
            messageElement.textContent = message
            messageElement.classList.remove('form-message-error', 'form-message-success')
            messageElement.classList.add(`form-message-${type}`)
        }

        function displayIdeas() {
            let ideaArray = userData.ideas

            // Creates a table row for every existing idea entry
            for (let i = 0; i < ideaArray.length; i++) {
                createRow(ideaArray[i].name, ideaArray[i].date, ideaArray[i].category)
            }
        }

        function createRow(name, date, category) {
            let ideaTable = document.querySelector('.idea-table')
            let row = document.createElement('tr')

            let cell1 = row.insertCell(0)
            let cell2 = row.insertCell(1)
            let cell3 = row.insertCell(2)
            let cell4 = row.insertCell(3)
            cell4.innerHTML = `<div class="delete-idea-btn">x</div>`
            cell1.innerHTML = name
            cell2.innerHTML = date
            cell3.innerHTML = `<label class="${category} category-options">${category}</label>`
            ideaTable.appendChild(row)
        }
    }

    connectedCallback() {
        this.render();
        this.setActiveTab();
        this.addIdeaLogic();
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

                                    <input type="radio" id="stay-home-btn" name="category" value="stay-home" />
                                    <label class="stay-home category-options" for="stay-home-btn">Stay Home</label>

                                    <input type="radio" id="restaurant-btn" name="category" value="restaurant" />
                                    <label class="restaurant category-options" for="restaurant-btn">Restaurant</label>

                                    <input type="radio" id="road-trip-btn" name="category" value="road-trip" />
                                    <label class="road-trip category-options" for="road-trip-btn">Road Trip</label>

                                    <input type="radio" id="indoors-btn" name="category" value="indoor" />
                                    <label class="indoor category-options" for="indoors-btn">Indoors</label>

                                    <input type="radio" id="outdoors-btn" name="category" value="outdoor" />
                                    <label class="outdoor category-options" for="outdoors-btn">Outdoors</label>

                                    <input type="radio" id="other-btn" name="category" value="other" />
                                    <label class="other category-options" for="other-btn">Other</label>
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
                    <div>
                        <h2 class="text-center">Your ideas:</h2>
                        <h2 class="text-center">Filter by category<h2>
                    </div>
                    

                    <table class="idea-table">
                        <tr>
                            <th>Idea</th>
                            <th>Date</th>
                            <th>Category</th>
                        </tr>

                    </table>

                </section>

            </div>
        </main>
        `;
    }
}

customElements.define('x-add-idea-page', AddIdeaPage);

