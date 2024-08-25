import {createListDOM, handleBackButton} from './loadList';
import {createNewListItem, addToList, item} from './handleListItem';
import list_id from './handleListItem';
import { listPrime } from '../index';

//Create dialog window for creating a new List Item
const createRadioButton = (id, name, isChecked = true, hasLabel, labelText) => {
    let div = document.createElement("div");
        let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("id", id);
            input.setAttribute("name", name);
            input.setAttribute("value", id);
            if (!isChecked) input.setAttribute("checked", "");
    div.appendChild(input);

    if (hasLabel) {
        let label = document.createElement("label");
            label.setAttribute("for", id);
            label.textContent = labelText;
        div.appendChild(label);
    }
    return div;
}

const createCheckBox = (id, name, hasLabel, labelText) => {
    let div = document.createElement("div");
    if (hasLabel){
        let label = document.createElement("label");
            label.setAttribute("for", id);
            label.textContent = labelText;
        div.appendChild(label);
    }

        let input = document.createElement("Input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("id", id);
            input.setAttribute("name", name);
            input.setAttribute("value", "True");
    div.appendChild(input);

    return div;
}

const createTextInput = (id, name, placeholder, required, hasLabel, labelText) => {
    let label;
    if (hasLabel){
        label = document.createElement("label");
        label.setAttribute("for", id);
        label.textContent = labelText;
    }

        let input = document.createElement("Input");
            input.setAttribute("type", "text");
            input.setAttribute("id", id);
            input.setAttribute("name", name);
            if(placeholder != "") input.setAttribute("placeholder", placeholder);
            if(required) input.setAttribute("required");

    return [label, input];    
}

let form;

const newListItemForm = () => {
    const dialog = document.createElement("dialog");

        const h3 = document.createElement("h3");
        h3.textContent = "New Task";

        form = document.createElement("form");
            form.setAttribute("id", "new_task_form");
            form.setAttribute("method", "dialog");

                const task_name_Label = document.createElement("label");
                    task_name_Label.textContent = "Enter Task";

                const task_name_input = document.createElement("input");
                    task_name_input.setAttribute("type", "text");
                    task_name_input.setAttribute("id", "task_name");
                    task_name_input.setAttribute("name", "task_name");
                    task_name_input.setAttribute("placeholder", "Enter Task");
                    task_name_input.setAttribute("required", "");
                
                const task_description = createTextInput("task_description", "task_description", "Enter Task description", false, true, "Task Description");
                const task_description_label = task_description[0];
                const task_description_input = task_description[1];

                const task_difficultty = document.createElement("div");
                    task_difficultty.setAttribute("class", "task_difficulty");
                    const p = document.createElement("p");
                        p.textContent = "Task Difficuilty";
                    task_difficultty.appendChild(p);

                    task_difficultty.appendChild(createRadioButton("1", "difficulty", true, true, "1"));
                    task_difficultty.appendChild(createRadioButton("2", "difficulty", false, true, "2"));
                    task_difficultty.appendChild(createRadioButton("3", "difficulty", false, true, "3"));
                    task_difficultty.appendChild(createRadioButton("4", "difficulty", false, true, "4"));
                
                const task_priority = document.createElement("div");
                    task_priority.setAttribute("class", "task_priority");
                    const p2 = document.createElement("p");
                        p2.textContent = "Task Priority";
                    task_priority.appendChild(p2);

                    task_priority.appendChild(createRadioButton("01", "priority", true, true, "1"));
                    task_priority.appendChild(createRadioButton("02", "priority", false, true, "2"));
                    task_priority.appendChild(createRadioButton("03", "priority", false, true, "3"));
                    task_priority.appendChild(createRadioButton("04", "priority", false, true, "4"));                

                const task_due_date_2 = createTextInput("task_due_date_2", "task_due_date_2", "DD-MM-YYYY", false, true, "Due Date: ");
                const task_due_date_2_Label = task_due_date_2[0];
                const task_due_date_2_input = task_due_date_2[1];                    

                const permatask_bloc = createCheckBox("permanent_task", "permanent_task", true, "Permanent Task?");
                permatask_bloc.setAttribute("class", "permatask_bloc");

                const task_reset = createTextInput("task_reset", "task_reset", "2 Weeks", false, true, "Task Resets Every:");
                const task_reset_Label = task_reset[0];
                const task_reset_input = task_reset[1];

                const task_reset_2 = createTextInput("task_reset_2", "task_reset_2", "2 Days", false, true, "Task Resets Every:");
                const task_reset_2_Label = task_reset_2[0];
                const task_reset_2_input = task_reset_2[1];

                const buttons = document.createElement("div");
                    buttons.setAttribute("class", "buttons");
                        const submit_button = document.createElement("button");
                        submit_button.setAttribute("class", "submit_button");
                        submit_button.setAttribute("type", "submit");
                        submit_button.textContent = "Save";

                        const close_button = document.createElement("button");
                        close_button.setAttribute("class", "close_button");
                        close_button.setAttribute("value", "cancel");
                        close_button.setAttribute("formnovalidate", "true");
                        close_button.textContent = "Cancel";
                buttons.append(submit_button, close_button);
        form.append(task_name_Label, task_name_input, task_description_label, task_description_input, /*task_difficultty, permatask_bloc, */task_due_date_2_Label, task_due_date_2_input, task_priority, /*task_reset_Label, task_reset_input, task_reset_2_Label, task_reset_2_input,*/ buttons);
    dialog.append(h3, form);
    return dialog;
}

const handleFormButtons = () => {
    let dialog = document.querySelector("dialog");

    // Open New Task Form

    const newTask = document.querySelector("#open_btn");
    newTask.addEventListener("click", () => {
    let content = document.querySelector("#content");
    content.removeChild(dialog);
    dialog = content.appendChild(newListItemForm());
    dialog.showModal();
    });

    // Go back to previous List
    const goBack = document.querySelector("#back_btn");
    goBack.addEventListener("click", () => {
        handleBackButton();
    });

    // Handle Submit Button

    const form = document.querySelector("#new_task_form");
    form.addEventListener("submit", (e) => {
    //e.preventDefault();
    const newListItem = createNewListItem();
    console.log("Current item: " + newListItem.name + "Being added to: " + listPrime.name);
    addToList(newListItem, listPrime);
    createListDOM(newListItem);
    });

    const closeBtn = document.querySelector(".close_button");
    closeBtn.addEventListener("click", (e) => {
        dialog.close();
    });

    form.addEventListener("close", (e) => {
        e.preventDefault();
    })
}

export {newListItemForm, handleFormButtons, form};