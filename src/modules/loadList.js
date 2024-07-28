import add_svg from './Images/add-plus.svg';

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

const createHeader = () => {
    const header = document.createElement("div");
    header.setAttribute("class", "header");
        const button = document.createElement("button");
        button.setAttribute("id", "open_btn");
        button.innerHTML = add_svg;
    header.appendChild(button);
    
    return header;
}

const createFooter = () => {

}

const loadListPage = () => {
    const list_page = document.createElement("div");
    list_page.setAttribute("class", "list_page");

    list_page.append(createHeader(), loadList());

    return list_page;
}

export default loadListPage;