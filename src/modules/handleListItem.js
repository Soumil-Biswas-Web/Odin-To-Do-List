import {form} from './createListForm';
import { updateSave } from '../index';
import { format, parse } from 'date-fns';
import { saveItem } from './localSave';

let list_panel;
let list_id = 0;

const init = () => {
    list_panel = document.querySelector(".list");
}

// New List item Constructor
function item(name, desc, id, priority, due_date,/* difficulty,*/ isPermanent) {
  this.name = name;
  this.desc = desc;
  this.id = id;
  this.priority = priority;
  this.due_date = due_date;
  // this.difficulty = difficulty;
  this.isPermanent = isPermanent;
  this.subList = [];
  this.superList = "";
  this.taskState = false;
}

// Create new List Item Object
const createNewListItem = () => {
  const listData = new FormData(form);

  const name = listData.get("task_name");
  const desc = listData.get("task_description");
  const priority = listData.get("priority");
  const due_date = getDate(listData.get("task_due_date_2"));
  // const difficulty = listData.get("difficulty");
  const isPermanent = listData.get("permanenet_task");
  const id = list_id + 1;

  let listItem = new item(name, desc, id, priority, due_date, /*difficulty, */isPermanent);
  return listItem;
};

const getDate = (due_date) => {
  if (due_date) {
    due_date = parse(due_date, "dd-MM-yyyy", new Date());
    due_date = format(due_date, "dd-MM-yyyy");
    console.log(due_date);
    return due_date;
  }
  else return "";
}

//Add Item to list
const addToList = (listItem, superList) => {
  console.log("Current item: " + listItem.name + " being added to: " + superList.name);
  listItem.superList = superList.name;  
  superList.subList.push(listItem.name);
  console.log(superList.subList);
  saveItem(listItem);
  saveItem(superList);
};

//Clear Item from List
const clearFromList = (listItem, superList) => {
  const findItem = (arr, itemName) => {
    for (let i in arr) {
      //console.log(arr[i] + " = " + itemName + "?");
      if (arr[i] === itemName) {
        let result = arr.splice(i, 1);
        console.log("Found " + result);
        return arr;
      }
    }
    console.log("Item " + itemName + " not found.");
    return arr;
  }

  console.log("Current item: " + listItem.name + " being removed from: " + superList.name);
  superList.subList = findItem(superList.subList, listItem.name);
  //console.log(superList.subList);
  saveItem(superList);  
}

export {init, createNewListItem, addToList, clearFromList, item, list_id};
