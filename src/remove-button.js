import { allToDos, currentProject, showAllItems } from './index.js';

function createRemoveButton(index) {
    const removeButton = document.createElement('button');

    removeButton.setAttribute('id', index);
    removeButton.setAttribute('class', 'box-button');
    removeButton.innerHTML = 'Delete';
    removeButton.addEventListener('click', removeItem.bind(this, removeButton.id));

    return removeButton; // Return to calling function -> showOneItem(element, index)
}

function removeItem(index) {
    allToDos.splice(index, 1); // Remove one element starting at index
    showAllItems(currentProject);
}

export { createRemoveButton };