import { allToDos, currentProject, showAllItems } from './item-functions.js';

function createDoneBox(index, parsedChecklist = false) {
    const returnSelection = document.createElement('span');
    
    const itemDone = document.createElement('input');
    itemDone.setAttribute('id', `done${index}`);
    itemDone.setAttribute('type', 'checkbox');
    itemDone.setAttribute('name', `done${index}`);
    itemDone.addEventListener('click', toggleDone.bind(this, index));
    
    const itemDoneLabel = document.createElement('label');
    itemDoneLabel.setAttribute('for', `done${index}`);
    itemDoneLabel.innerHTML = 'Done?';

    if (allToDos[index].getChecklist() || parsedChecklist) {
        itemDone.setAttribute('checked', 'true');
    }

    returnSelection.appendChild(itemDone);
    returnSelection.appendChild(itemDoneLabel);
    
    return returnSelection; // Return to calling function -> showOneItem(element, index)
}

function toggleDone(index) {
    allToDos[index].setChecklist(); // Toggle the Done? box for the item at index.

    const doneToJSON = JSON.stringify({
        itemID: allToDos[index].itemID,
        title: allToDos[index].getTitle(),
        details: allToDos[index].getDetails(),
        dueDate: allToDos[index].getDueDate(),
        priority: allToDos[index].getPriority(),
        project: allToDos[index].getProject(),
        checklist: allToDos[index].getChecklist()
    });

    localStorage.setItem(`item${allToDos[index].itemID}`, doneToJSON); // Update the item in localStorage.

    showAllItems(currentProject);
}

export { createDoneBox };