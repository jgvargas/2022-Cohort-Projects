// This function was designed to get the name of the page
// and add it to the components array (below) in order to
// render the page dynamically.
function addPageToComponentsArray() {
    var path = window.location.pathname
    var pageName = path.substring(0, path.lastIndexOf(".html")).substring(path.lastIndexOf("/")+1);
    
    if (pageName == null || pageName == "") pageName = "index";

    components.push(`content/${pageName}/${pageName}.js`);
}

// This is a generic function to load a js
// file that the page is required to inherit.
function loadScript(location, fileName) {
    var script = document.createElement("script")

    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", location + fileName);
    script.setAttribute("async", "");
    document.getElementsByTagName("head")[0].appendChild(script).async;
}

function loadCSS() {
    var link = document.createElement("link");

    link.href = "./src/project.css"
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function loadFontAwesome() {
    var script = document.createElement("script");

    script.setAttribute("type", "text/javascript");
    script.src = "https://kit.fontawesome.com/d828ae233c.js";
    script.type = "text/javascript";
    script.crossOrigin = "anonymous"
    document.getElementsByTagName("head")[0].appendChild(script).async;
}

// List of components required to be loaded to render
// the page
const components = [
    "base/head.js",
    "base/navbar.js",
    "base/footer.js"
];

loadCSS();
loadFontAwesome();
// Add the current page to the components array
addPageToComponentsArray();
// Load components
components.map(async file => await loadScript("./src/components/", file));