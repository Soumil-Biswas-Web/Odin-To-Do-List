let objectString = "";

const retrieveItem = (itemName) => {
    let listItem = JSON.parse(localStorage.getItem(itemName));
    if (listItem) {
        objectString = JSON.stringify(listItem);
        //console.log("Loaded: " + objectString);
        return listItem;
    }
    else {
        console.log("Loaded: Null");
        return;
    }
}

const saveItem = (listItem) => {
    objectString = JSON.stringify(listItem);
    localStorage.setItem(listItem.name, objectString);
    //console.log("Saved: " + objectString);
}

const removeItem = (itemName) => {
    localStorage.removeItem(itemName);
    console.log("Removed: " + itemName);    
}

export {retrieveItem, saveItem, removeItem};