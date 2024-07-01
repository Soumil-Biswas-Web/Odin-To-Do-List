import './style.css';
import pageLoad from './modules/pageLoad';

// Load Content Page

const init = () => {
    var content = document.createElement("div");
    content.setAttribute("id", "content");
    content = pageLoad(content); 
    document.body.appendChild(content);
}

// Driver Code

init();

console.log("DOM created");