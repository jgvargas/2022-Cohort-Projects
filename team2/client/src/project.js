/*  TABLE OF CONTENTS

    Mobile menu
    get-idea.html
    add-item.html
*/

/*------------------------- 
    Mobile menu
    - applies to all pages
--------------------------*/
const mobileMenu = document.getElementById('mobile-menu')
const navMenu = document.querySelector('.nav-list')
const nav = document.querySelector('nav')

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active')
    navMenu.classList.toggle('active')
})

// Add background to Navbar on scroll
window.onscroll = () => {
    if(document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        nav.style.background = "rgba(123, 136, 209, .9)"
    }
    else {
        nav.style.background = "none"
    }
}

/*----------------------------
    Logged in behaviours
    - Still in testing
----------------------------*/

let isLoggedIn = false

console.log(isLoggedIn)

if(isLoggedIn === true) {
    console.log(navMenu.children)
}

/*---------------------------------- 
    Get-idea.html
----------------------------------*/
//     function startGetIdea() {

//     /* modal on get idea */
//     $(".open").on("click", function () {
//         let chosenCategory = this.classList[0]

//         $("#jar").effect("shake", {
//             direction: "up",
//             times: 4,
//             distance: 10
//         }, 1000);

//         getIdea(chosenCategory)

//         setTimeout(() => {
//             $(".popup-overlay, .popup-content").addClass("active");
//         }, 1300)
//     });

//     $(".close, .popup-overlay").on("click", function () {
//         $(".popup-overlay, .popup-content").removeClass("active");
//     });


//     userData = JSON.parse(localStorage.getItem('myIdeaList'));
//     popUpWindow = document.querySelector(".popup-content > h2");


//     function getIdea(chosenCategory) {
//         //reset optional data fields
//         document.querySelector(".popup-url").innerText = "";
//         document.querySelector(".popup-date").innerText = "";

//         if (!userData || !userData.ideas.length) {
//             popUpWindow.innerText = "You have no activities in your idea jar!";
//             return
//         }

//         let ideasInCategory = userData.ideas.filter(idea => idea.category == chosenCategory);


//         if (chosenCategory == "other") {
//             ideasInCategory = userData.ideas;
//         }

//         //validates user choice and provides feedback
//         if (!ideasInCategory.length) {
//             popUpWindow.innerText = "You have no activities in this category";
//             return
//         }

//         //stores random idea data so it can be used to delete idea
//         let randomIdea = generateRandomIdea(ideasInCategory);
        
//         //button to remove idea from jar
//         document.querySelector(".removeIdea").addEventListener("click", () => removeIdeaFromJar(randomIdea));
//     }
// }
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
