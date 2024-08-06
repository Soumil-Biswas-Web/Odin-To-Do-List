import add_svg from './Images/add-plus.svg';
import back_svg from './Images/arrow-left.svg';
import deselected_svg from './Images/deselected.svg';
import checkMark_svg from './Images/checkbox-outline.svg';
import {listPrime, updateListPrime} from '../index';

let currentID = 0;
let list_panel;

//Add list and it's items to the DOM after creation

// Create List DOM
const createListDOM = (listItem) => {
    let list_item = document.createElement("div");
    list_item.setAttribute("class", "list_item");
    const checkMark = document.createElement("div");
    list_item.appendChild(checkMark);
    updateCheckMark(checkMark, listItem.taskState);
    checkMark.addEventListener("click", () => {
      handleCheckMark(checkMark, listItem);
    });
    let p = document.createElement("p");
    p.textContent = listItem.name;
    list_item.appendChild(p);
    // let p2 = document.createElement("p");
    // p2.textContent = listItem.desc;
    // list_item.appendChild(p2);
    list_panel.appendChild(list_item);
    createSubList(p, listItem);
}

// Sub-List Add Event Listener
const createSubList = (p, listitem) => {
    p.addEventListener("click", () => {
      clearList();
      populateList(listitem);
    });
}
  
// Clear all List Panel Items
const clearList = () => {
    let list_items = list_panel.children;
    let len = list_items.length;
    // console.log(list_items);
    for (let i = 2; i < len; i++) {
        list_items[2].remove();
        // console.log("removed " + list_items[1]);
    }
}

// Populate List with items
const populateList = (superList) => {
    updateListPrime(superList);
    currentID = superList.id;
    console.log("Current ID: " + currentID);
    console.log("Current listPrime = " + listPrime.name);
    let subListHeading = document.querySelector(".list h3");
    subListHeading.textContent = superList.name;
    let subListDesc = document.querySelector(".list h5");
    subListDesc.textContent = superList.desc;  
    let subListDate = document.querySelector(".list h4");
    if (superList.due_date !== "" || superList.due_date){
        subListDate.textContent = ("Due Date: " + superList.due_date); 
    }
    else subListDate.textContent = ""; 
    console.log(superList.subList);
    for (let i in superList.subList) {
      createListDOM(superList.subList[i]);
    }
}

// Handle Go Back button
const handleBackButton = () => {
    if (listPrime.name !== "Main List") {
        clearList();
        populateList(listPrime.superList);
    }
}
  
// Handle task Check Mark
const handleCheckMark = (checkMark, listItem) => {
    listItem.taskState = listItem.taskState ? false : true;
    console.log(listItem.taskState);
    updateCheckMark(checkMark, listItem.taskState);
    
    if (listItem.subList) {
      if (listItem.taskState == true){
           for (let i in listItem.subList) listItem.sublist[i].taskState = true;
      }
    }
}

const updateCheckMark = (checkMark, taskState) => {
    if (taskState) {
        checkMark.innerHTML = checkMark_svg;
    }
    else {
        checkMark.innerHTML = deselected_svg;
    }
    // taskState ? checkMark.textContent = "✔" : checkMark.textContent = "[ ]"
};

const loadList = () => {
    const list = document.createElement("div");
    list.setAttribute("class", "list");
    const h3 = document.createElement("h3");
    list.appendChild(h3);
    const h2 = document.createElement("h5");
    list.appendChild(h2);
    const date = document.createElement("h4");
    list.appendChild(date);
    return list;
}

const createHeader = () => {
    const header = document.createElement("div");
    header.setAttribute("class", "header");
        const button = document.createElement("button");
        button.setAttribute("id", "open_btn");
        button.innerHTML = add_svg;
        const back_button = document.createElement("button");
        back_button.setAttribute("id", "back_btn");
        back_button.innerHTML = back_svg;
        const title = document.createElement("h1");
        title.textContent = "Odin To-Do List";
    header.append(back_button,title, button);
    
    return header;
}

const createFooter = () => {

}

const loadListPage = () => {
    list_panel = document.createElement("div");
    list_panel.setAttribute("class", "list_panel");

    list_panel.append(createHeader(), loadList());

    return list_panel;
}

export default loadListPage;
export {populateList, createListDOM, handleBackButton};