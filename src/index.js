import './style.css';
import pageLoad from './modules/pageLoad';
import {handleFormButtons} from './modules/createListForm';
import * as handleListItem from './modules/handleListItem';
import list_id from './modules/handleListItem';
import {populateList} from './modules/loadList';

// Load Content Page

const init = () => {
    var content = document.createElement("div");
    content.setAttribute("id", "content");
    // Load all DOM elements
    content = pageLoad(content); 
    document.body.appendChild(content);
}

let listPrime;
let objectString = "";

const updateListPrime = (superList) => {
    listPrime = superList;
}

const updateSave = () => {
    objectString = JSON.stringify(superList);
    localStorage.setItem("Main_List", objectString);
    console.log("Saved: " + objectString);
}

const loadSave = () => {
    let superList = JSON.parse(localStorage.getItem("Main_List"));
    if (superList) {
        objectString = JSON.stringify(superList);
        console.log("Loaded: " + objectString);
        return superList;
    }
    else {
        console.log("Loaded: Null");
        return;
    }
}

export {listPrime, updateListPrime, updateSave};

// Driver Code

init();

console.log("DOM created");

// Create Super List
let superList = loadSave();
if (superList) {
    superList = new handleListItem.item ("Main List", "", handleListItem.list_id, "", "", true);
}
listPrime = superList;
populateList(listPrime);

// Initialize handleListITem Module
handleListItem.init();
// Initialize SUBMIT and + Buttons in List Form
handleFormButtons();