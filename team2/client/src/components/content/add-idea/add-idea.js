class AddIdeaPage extends HTMLElement {
    constructor() {
        super();
        this.categories = [],
        this.ideas = []
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

        // Delete row functionality
        let deleteBtnGroup = document.querySelectorAll('.delete-idea-btn')
        deleteBtnGroup.forEach (deleteBtn => {
            deleteBtn.addEventListener('click', (event) =>{
                console.log("deleteButton was clicked")
                // Select whole row of selected
                let td = event.target.parentNode
                let tr = td.parentNode

                // Get string of deleted idea
                let deletedIdea = tr.firstElementChild.innerHTML

                // Deletes table row
                tr.parentNode.removeChild(tr)

                // Deletes entry in localStorage
                let indexFound = 0
                for(let i = 0; i < userData.ideas.length; i++) {
                    if( deletedIdea === userData.ideas[i].name)
                        indexFound = i
                }
                let newUserData = userData.ideas.splice(indexFound, 1)
                console.log(newUserData)
                console.log(userData)
                // Push new userData to localStorage
                localStorage.setItem('myIdeaList', JSON.stringify(userData) )
            })
        })


        // Form submit handler, call function addIdea on form-btn submit
        let addIdeaForm = document.getElementById('add-idea-form');
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
                    date: formatDateString(document.getElementById('event-date').value),
                    category: checkedRadio
                }
                userData.ideas.push(idea)
            
                document.querySelector('form').reset()
            
                // Add updated userData to localstorage
                localStorage.setItem('myIdeaList', JSON.stringify(userData))
            
                // Update idea table
                createRow(idea.name, idea.date, idea.category)

                // User Feedback
                setFormMessage( "success", "Idea added")
            
                // Animate jar shake
                let jar = document.querySelector('.jar')
                jar.classList.add('jar-shake')

                // Update the deleteBtnGroup for the new entry
                deleteBtnGroup = document.querySelectorAll('.delete-idea-btn')
                console.log(deleteBtnGroup)
            }
            else {
                if(checkedRadio === "")
                    setFormMessage( "error", "Select a category")
                else
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

        function formatDateString(oldDateString) {
            // Changes string date from YYYY-DD-MM to Month DD, YYYY
            let tokens = oldDateString.split('-')
            let newString = ''
            if(tokens[1] === '01')
                newString = "January"
            else if(tokens[1] === '02')
                newString = 'February'
            else if(tokens[1] === '03')
                newString = 'March'
            else if(tokens[1] === '04')
                newString = 'April'
            else if(tokens[1] === '05')
                newString = 'May'
            else if(tokens[1] === '06')
                newString = 'June'
            else if(tokens[1] === '07')
                newString = 'July'
            else if(tokens[1] === '08')
                newString = 'August'
            else if(tokens[1] === '09')
                newString = 'September'
            else if(tokens[1] === '10')
                newString = 'October'
            else if(tokens[1] === '11')
                newString = 'November'
            else
                newString = 'December'
            
            newString += ` ${tokens[2]}, ${tokens[0]}`
            return newString
        } 
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
            console.log(data)
            data.forEach(category => this.categories.push(category));  
        })
        .catch(error => console.log(error));

        this.render();
    }


    renderCategories() {
        var result = "";

        this.categories.forEach(x => {
            result += `
            <input type="radio" id="${x.categoryClassName}-btn" name="${x.categoryName}" value="${x.categoryClassName}" />
            <label class="${x.categoryClassName} category-options" for="${x.categoryClassName}-btn">${x.categoryName}</label>
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
            data.forEach(idea => this.ideas.push(idea));  
        })
        .catch(error => console.log(error));

        this.render();
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
            var category;

            for (var i = 0; i < this.categories.length; i++){
                if (this.categories[i].id == idea.categoryId){
                    category = this.categories[i].categoryName;
                    break;
                }
            }

            result += `
            <tr>
                <td>${idea.ideaName}</td>
                <td>${date}</td>
                <td>${category}</td>
            </tr>
            `;
        });

        return result
    }


    async connectedCallback() {
        this.render();
        await this.GetCategories();
        await this.GetIdeas();
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
                        <h2 class="text-center">Filter by category<h2>
                    </div>
                    

                    <table class="idea-table">
                        ${this.ideas.length == 0 ? `<h1>Loading</h1>` : this.renderIdeas()}
                    </table>

                </section>

            </div>
        </main>
        `;
    }
}

customElements.define('x-add-idea-page', AddIdeaPage);

