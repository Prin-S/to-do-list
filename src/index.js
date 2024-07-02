import { createItem } from './item.js';

const content = document.querySelector('#content');

const testText = document.createElement('p');
testText.innerHTML = 'Testing';
content.appendChild(testText);

const allToDos = [];

function addItem(item) {
    allToDos.push(item);
}

function showAllItems() {
    allToDos.forEach((each, index) => content.appendChild(showItem(each, index)));
}

function showItem(element, index) {
    const box = document.createElement('div');
    const itemTitle = document.createElement('div');
    const itemDetails = document.createElement('div');
    const itemDueDate = document.createElement('div');
    const itemPriority = document.createElement('div');
    const itemProject = document.createElement('div');
    //const selections = document.createElement('div');

    box.setAttribute('class', 'box');
    box.setAttribute('id', index);
    
    itemTitle.innerHTML = element.getTitle();
    itemDetails.innerHTML = element.getDetails();
    itemDueDate.innerHTML = element.getDueDate();
    itemPriority.innerHTML = element.getPriority();
    itemProject.innerHTML = element.getProject();

    /*selections.setAttribute('class', 'selections');
    selections.appendChild(createRemoveButton(index));
    selections.appendChild(createReadToggle(element, index));*/

    box.appendChild(itemTitle);
    box.appendChild(itemDetails);
    box.appendChild(itemDueDate);
    box.appendChild(itemPriority);
    box.appendChild(itemProject);
    //box.appendChild(selections);

    return box; // Return to function in showAllItems()
}

const form = document.querySelector('#form');
form.addEventListener('submit', submitForm);

function submitForm(event) {
    const title = document.querySelector('#title');
    const details = document.querySelector('#details');
    const dueDate = document.querySelector('#due-date');
    const priority = document.querySelector('input[name=priority]:checked');
    const project = document.querySelector('input[name=project]:checked');

    addItem(createItem(title.value, details.value, dueDate.value, priority.value, project.value)); // Create object and add to allToDos array.
    content.appendChild(showItem(allToDos[allToDos.length - 1], allToDos.length - 1)); // Access latest item in allToDos array and append it to #content in the DOM.
    event.preventDefault();
}