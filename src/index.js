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

let listPrime

const updateListPrime = (superList) => {
    listPrime = superList;
}

export {listPrime, updateListPrime};

// Driver Code

init();

console.log("DOM created");

// Create Super List
const superList = new handleListItem.item ("Main List", handleListItem.list_id, 0, true);
listPrime = superList;
populateList(listPrime);

// Initialize handleListITem Module
handleListItem.init();
// Initialize SUBMIT and + Buttons in List Form
handleFormButtons();