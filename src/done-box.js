import { allToDos, currentProject, showAllItems } from './index.js';

function createDoneBox(index) {
    const returnSelection = document.createElement('span');
    
    const itemDone = document.createElement('input');
    itemDone.setAttribute('id', `done${index}`);
    itemDone.setAttribute('type', 'checkbox');
    itemDone.setAttribute('name', `done${index}`);
    itemDone.addEventListener('click', toggleDone.bind(this, index));
    
    const itemDoneLabel = document.createElement('label');
    itemDoneLabel.setAttribute('for', `done${index}`);
    itemDoneLabel.innerHTML = 'Done?';

    if (allToDos[index].getChecklist()) {
        itemDone.setAttribute('checked', 'true');
    }   

    returnSelection.appendChild(itemDone);
    returnSelection.appendChild(itemDoneLabel);
    
    return returnSelection; // Return to calling function -> showOneItem(element, index)
}

function toggleDone(index) {
    allToDos[index].setChecklist();
    showAllItems(currentProject);
}

export { createDoneBox };