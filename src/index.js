import { createItem } from './item.js';

const allToDos = [];

function addItem(item) {
    allToDos.push(item);
}

// Demo data
const hobbit = createItem('The Hobbit', 'J.R.R. Tolkien', 310, 'medium', 'default');
const lotr = createItem('The Lord of the Rings (single-volume)', 'J.R.R. Tolkien', 1077, 'high', 'default');
const silmarillion = createItem('The Silmarillion', 'J.R.R. Tolkien', 365, 'low', 'default');

addItem(hobbit);
addItem(lotr);
addItem(silmarillion);

function showAllItems() {
    allToDos.forEach((each, index) => content.appendChild(showOneItem(each, index)));
}

const content = document.querySelector('#content');

showAllItems();

function showOneItem(element, index) {
    const box = document.createElement('div');
    const itemTitle = document.createElement('div');
    const itemDetails = document.createElement('div');
    const itemDueDate = document.createElement('div');
    const itemPriority = document.createElement('div');
    const itemProject = document.createElement('div');
    const itemChecklist = document.createElement('div');
    const selections = document.createElement('div');

    box.setAttribute('class', 'box');
    //box.setAttribute('id', index);
    
    itemTitle.innerHTML = element.getTitle();
    itemDetails.innerHTML = element.getDetails();
    itemDueDate.innerHTML = element.getDueDate();
    itemPriority.innerHTML = element.getPriority();
    itemProject.innerHTML = element.getProject();
    itemChecklist.innerHTML = element.getChecklist();

    selections.setAttribute('class', 'selections');
    selections.appendChild(createRemoveButton(index));
    selections.appendChild(createDoneButton(element, index));

    box.appendChild(itemTitle);
    box.appendChild(itemDetails);
    box.appendChild(itemDueDate);
    box.appendChild(itemPriority);
    box.appendChild(itemProject);
    box.appendChild(itemChecklist);
    box.appendChild(selections);

    return box; // Return to function in showAllItems()
}

function createRemoveButton(index) {
    const removeButton = document.createElement('button');

    removeButton.setAttribute('id', index);
    removeButton.innerHTML = 'x';
    removeButton.addEventListener('click', removeItem.bind(this, removeButton.id));

    return removeButton; // Return to function in showOneItem(element, index)
}

function removeItem(itemID) {
    allToDos.splice(itemID, 1); // Remove one element starting at itemID
    restartToDo();
}

function createDoneButton(element, index) {
    const returnSelection = document.createElement('span');
    const itemDone = document.createElement('input');
    const itemDoneLabel = document.createElement('label');
    
    itemDone.setAttribute('type', 'checkbox');
    itemDone.setAttribute('id', 'done');
    itemDone.setAttribute('name', index);
    itemDone.addEventListener('click', toggleDone.bind(this, index));
    itemDoneLabel.setAttribute('for', 'done');
    itemDoneLabel.innerHTML = 'Done?';

    if (allToDos[index].getChecklist() == true) {
        itemDone.setAttribute('checked', 'true');
    }   

    returnSelection.appendChild(itemDone);
    returnSelection.appendChild(itemDoneLabel);
    
    return returnSelection; // Return to function in showOneItem(element, index)
}

function toggleDone(index) {
    allToDos[index].setChecklist();
    restartToDo();
}

function restartToDo() {
    content.innerHTML = '';
    showAllItems();
}

const dialog = document.querySelector('dialog');
const newItemButton = document.querySelector('#new-item');
const form = document.querySelector('#form');
const closeButton = document.querySelector('#close');

newItemButton.addEventListener('click', () => dialog.showModal());
form.addEventListener('submit', submitForm);
closeButton.addEventListener('click', () => dialog.close());

function submitForm(event) {
    const title = document.querySelector('#title');
    const details = document.querySelector('#details');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('input[name=priority]:checked');
    const project = document.querySelector('input[name=project]:checked');

    addItem(createItem(title.value, details.value, dueDate.value, priority.value, project.value)); // Create object and add to allToDos array.
    dialog.close();
    content.appendChild(showOneItem(allToDos[allToDos.length - 1], allToDos.length - 1)); // showOneItem(element, index) - Access latest item in allToDos array and append it to #content in the DOM.
    event.preventDefault();
}