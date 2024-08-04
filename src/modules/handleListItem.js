import {form} from './createListForm';

let list_panel;
let list_id = 0;

const init = () => {
    list_panel = document.querySelector(".list");
}

// New List item Constructor
function item(name, id, difficulty, isPermanent) {
  this.name = name;
  this.id = id;
  this.difficulty = difficulty;
  this.isPermanent = isPermanent;
  this.subList = [];
  this.superList = item;
  this.taskState = false;
}

// Create new List Item Object
const createNewListItem = () => {
  const listData = new FormData(form);

  const name = listData.get("task_name");
  const difficulty = listData.get("difficulty");
  const isPermanent = listData.get("permanenet_task");
  const id = list_id + 1;

  let listItem = new item(name, id, difficulty, isPermanent);
  return listItem;
};

//Add Item to list
const addToList = (listItem, superList) => {
  console.log("Current item: " + listItem.name + "Being added to: " + superList.name);
  listItem.superList = superList;  
  superList.subList.push(listItem);
  console.log(superList.subList);  
};



export {init, createNewListItem, addToList, item, list_id};
