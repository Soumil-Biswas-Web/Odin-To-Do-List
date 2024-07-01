import newListItem from "./createListItem";
import loadList from "./loadList";

// Runs functions to create header, main, and footer elements
const pageLoad = (content) => {
    content.appendChild(loadList());

    content.appendChild(newListItem());

    return content;
}

export default pageLoad;