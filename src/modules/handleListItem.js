import {form} from './createListForm';
import { updateSave } from '../index';
import { format, parse } from 'date-fns';

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
  this.superList = item;
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
  updateSave();
  return listItem;
};

const getDate = (due_date) => {
  if (due_date) {
    due_date = parse(due_date, "dd-MM-yyyy", new Date());
    due_date = format(due_date, "dd-MM-yyyy");
    console.log(due_date);
  }
}

//Add Item to list
const addToList = (listItem, superList) => {
  console.log("Current item: " + listItem.name + "Being added to: " + superList.name);
  listItem.superList = superList;  
  superList.subList.push(listItem);
  console.log(superList.subList);  
};



export {init, createNewListItem, addToList, item, list_id};
