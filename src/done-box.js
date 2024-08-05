import { currentProject, showAllItems } from './item-functions.js';

function createDoneBox(element, parsedChecklist = false) {
    const returnSelection = document.createElement('span');

    const itemDone = document.createElement('input');
    itemDone.setAttribute('id', `done${element.getItemID()}`);
    itemDone.setAttribute('type', 'checkbox');
    itemDone.setAttribute('name', `done${element.getItemID()}`);
    itemDone.addEventListener('click', toggleDone.bind(this, element));
    
    const itemDoneLabel = document.createElement('label');
    itemDoneLabel.setAttribute('for', `done${element.getItemID()}`);
    itemDoneLabel.innerHTML = 'Done?';

    if (parsedChecklist) {
        itemDone.setAttribute('checked', 'true');
    }

    returnSelection.appendChild(itemDone);
    returnSelection.appendChild(itemDoneLabel);
    
    return returnSelection; // Return to calling function -> showOneItem(element, index)
}

function toggleDone(element) {
    element.setChecklist(); // Toggle the Done? box for the element.

    const doneToJSON = JSON.stringify({
        itemID: element.getItemID(),
        title: element.getTitle(),
        details: element.getDetails(),
        dueDate: element.getDueDate(),
        priority: element.getPriority(),
        project: element.getProject(),
        checklist: element.getChecklist()
    });

    localStorage.setItem(`item${element.getItemID()}`, doneToJSON); // Update the item in localStorage.

    showAllItems(currentProject);
}

export { createDoneBox };