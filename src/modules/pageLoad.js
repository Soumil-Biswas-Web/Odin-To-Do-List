import {newListItemForm} from "./createListForm";
import loadListPage from "./loadList";

// Runs functions to create header, main, and footer elements
const pageLoad = (content) => {
    // Create Header, List Display Page
    content.appendChild(loadListPage());
    // Create New List Item Form
    content.appendChild(newListItemForm());

    return content;
}

export default pageLoad;