import { format } from 'date-fns';
import { createDoneBox } from './done-box.js';
import { createRemoveButton } from './remove-button.js';
import { createExpandButton } from './expand-button.js';
import { createEditButton } from './edit-button.js';
import { createItem } from './item.js';

const allToDos = [];
let currentProject = false; // The selected project
const content = document.querySelector('#content');

function addItem(item) { // Add an item to the allToDos array.
    allToDos.push(item);
}

function showAllItems(selectedProject = false) { // Show all items in the allToDos array.
    content.innerHTML = '';

    allToDos.forEach((element, index) => {
        if (!selectedProject) { // When the page first loads or the Show All button is clicked, show all items.
            currentProject = false;
            content.appendChild(showOneItem(element, index));
        } else { // If a project button is clicked, show items under that project only.
            currentProject = selectedProject;
            if (element.getProject() == selectedProject) { // If item's project is the same as that of the clicked button,
                content.appendChild(showOneItem(element, index)); // Add it to #content.
            }
        }
    });
}

function showOneItem(element, index) { // Create an entry for each item.
    const box = document.createElement('div');
    box.setAttribute('id', `box${index}`);
    
    const itemSummary = document.createElement('div');
    itemSummary.innerHTML = `<strong>Task:</strong> ${element.getTitle()} || <strong>Due Date:</strong> ${format(element.getDueDate(), 'd MMMM yyyy')}`;

    if (element.getPriority() == 'High') { // Background color depending on task priority
        box.setAttribute('class', 'box box-bg-high');
    } else if (element.getPriority() == 'Medium') {
        box.setAttribute('class', 'box box-bg-medium');
    } else {
        box.setAttribute('class', 'box box-bg-low');
    }

    if (element.getChecklist()) { // Strike through done items
        itemSummary.setAttribute('class', 'strike-through');
    }

    const selections = document.createElement('div');
    selections.setAttribute('class', 'selections');
    selections.appendChild(createDoneBox(index));
    selections.appendChild(createRemoveButton(index));
    selections.appendChild(createExpandButton(element, index));
    selections.appendChild(createEditButton(element, index));

    box.appendChild(itemSummary);
    box.appendChild(selections);

    return box; // Return to calling function -> showAllItems()
}

const itemDialog = document.querySelector('#new-item-dialog');

const newItemButton = document.querySelector('#new-item-button');
newItemButton.addEventListener('click', () => itemDialog.showModal());

const itemForm = document.querySelector('#item-form');
itemForm.addEventListener('submit', submitItemForm);

const closeItemButton = document.querySelector('#new-item-close-button');
closeItemButton.addEventListener('click', () => itemDialog.close());

function submitItemForm(event) {
    const itemTitle = document.querySelector('#title');
    const itemDetails = document.querySelector('#details');
    const itemDueDate = document.querySelector('#due-date');
    const itemPriority = document.querySelector('input[name=priority]:checked');
    const itemProject = document.querySelector('input[name=project]:checked');

    addItem(createItem(itemTitle.value, itemDetails.value, itemDueDate.value, itemPriority.value, itemProject.value)); // Create an object and add to the allToDos array.
    itemDialog.close();
    content.appendChild(showOneItem(allToDos[allToDos.length - 1], allToDos.length - 1)); // showOneItem(element, index) - Access latest item in the allToDos array and append it to #content.
    
    event.preventDefault();
}

export { allToDos, currentProject, content, addItem, showAllItems };