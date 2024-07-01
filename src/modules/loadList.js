//Add list and it's items to the DOM after creation

const addListItem = () => {
    const listItem = document.createElement("div");
    listItem.setAttribute("id", "list_item");
    listItem.textContent = "Task Description";
    return listItem;
}

const loadList = () => {
    const list = document.createElement("div");
    list.setAttribute("id", "list");

    list.appendChild(addListItem());

    return list;
}

export default loadList;