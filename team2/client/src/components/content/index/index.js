class IndexPage extends HTMLElement {
    constructor() {
        super();
    }

    indexLoad(){
        /*--------------------
            Scroll animations
        --------------------*/
        let reveals = document.querySelectorAll('.reveal')
        window.addEventListener('scroll', reveal)

        function reveal() {
            for(let i = 0; i< reveals.length; i++) {
                let windowheight = window.innerHeight;
                
                let revealTop = reveals[i].getBoundingClientRect().top;
                var revealPoint = 100;

                if( revealTop < windowheight - revealPoint) {
                    reveals[i].classList.add('active')
                }
                else {
                    reveals[i].classList.remove('active')
                }
            }
        }

        // Nav tab underline on current page
        const navItems = document.querySelectorAll('.nav-item')
        
        navItems.forEach( navItem => {
            if(navItem.firstElementChild.innerHTML === 'Home')
                navItem.firstElementChild.classList.add('active')
        })
    }

    connectedCallback() {
        this.render();
        this.indexLoad();
    }

    render() {
        this.innerHTML = `
        <main>
    
            <section id="home-first">
                <div class="container">

                        <div class="headerWrap">
                            <div class="headerText">
                            <h1 class="section-header">
                                What will you do today?
                            </h1>
                            <p class="section-text">
                                In a busy world full of possibilities it can be hard to choose. Let <a href="#sign-up" class="idea-jar-ref"><em>Idea Jar<em></a> help! 
                            </p>
                        </div>
                        
                        <div class="section-img">
                        </div>
                    </div>

                </div>
                <div class="wave-top">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                    </svg>
                </div>
            </section>
    
            <!--Second-->
            <section id="home-second">
                <div class="container split alt-split reveal">
                    <div class="polaroid-space">
                        <figure class="polaroid">
                            <img class="" src="./src/img/people-sitting-park.jpg" alt="">
                            <figcaption></figcaption>
                        </figure>
                        <figure class="polaroid">
                            <img class="" src="./src/img/people-on-river.jpg" alt="">
                            <figcaption></figcaption>
                        </figure>
                        
                    </div>
                        
                    <div class="section-space card">
                        <h1 class="section-header">
                            Explore your world
                        </h1>
                        <p class="section-text">
                        <a href="#sign-up" class="idea-jar-ref">Idea Jar</a> allows you to keep track of resturants you want to try and fun activities you'd like to do. 
                        </p>
                    </div>
                </div>
                <!--Bottom SVG wave-->
                <div class="wave-bottom">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                    </svg>
                </div>                
            </section>
    
            <section id="home-third">
                <div class="container reveal">

                        <div class="section-space">
                            <h1 class="section-header">
                                Try Idea Jar out!
                            </h1>
                            <p class="section-text">
                                <section class="containerExplain">

                                    <section>
                                        <div class="putIdeaExplain outdoors">Add an Idea</div>
                                        <p>Add resturants and fun activities when you learn about them.</p>
                                    </section>
                                    <section>
                                        <div class="takeIdeaExplain indoors">Get an Idea</div>
                                        <p>Have <a href="#sign-up" class="idea-jar-ref">Idea Jar</a> randomly select from the ideas
                                            you've entered</p>
                                    </section>
                                </section>
                            </p>
                            <button id="sign-up" class="form-btn stay-home" onclick="location.href='./login-signup.html'">
                                Sign Up
                            </button>
                        </div>
                        
                        <div class="section-img index-jar-shake">
                            <img src="./src/img/jar_2.png" alt="The Idea Jar">
                        </div>

                </div>
                
            </section>
    
        </main>
        `;
    }
}

customElements.define('x-index-page', IndexPage);

