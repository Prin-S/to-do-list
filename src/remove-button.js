import { allToDos, currentProject, showAllItems } from './item-functions.js';

function createRemoveButton(index) {
    const removeButton = document.createElement('button');
    removeButton.setAttribute('id', `remove${index}`);
    removeButton.setAttribute('class', 'box-button');
    removeButton.innerHTML = 'Delete';
    removeButton.addEventListener('click', removeItem.bind(this, index));

    return removeButton; // Return to calling function -> showOneItem(element, index)
}

function removeItem(index) {
    //console.log(index);
    //allToDos.splice(index, 1); // Remove one element starting at index
    localStorage.removeItem(`item${index}`);
    showAllItems(currentProject);
}

export { createRemoveButton };