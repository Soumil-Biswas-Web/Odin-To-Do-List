import newListItemForm from "./createListItem";
import loadListPage from "./loadList";

// Runs functions to create header, main, and footer elements
const pageLoad = (content) => {
    content.appendChild(loadListPage());

    content.appendChild(newListItemForm());

    return content;
}

export default pageLoad;