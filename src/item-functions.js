import { format } from 'date-fns';
import { createDoneBox } from './done-box.js';
import { createRemoveButton } from './remove-button.js';
import { createExpandButton } from './expand-button.js';
import { createEditButton } from './edit-button.js';
import { createItem } from './item.js';

const allToDos = [];
let currentProject = false; // The selected project
const content = document.querySelector('#content');

function retrieveItemsFromStorage() { // Called in index.js 
    const localStorageKeys = Object.keys(localStorage); // Get only keys from localStorage.
    const onlyItemKeys = [];
    
    localStorageKeys.forEach(element => {
        if (element.slice(0, 4) == 'item') { // If element name starts with item,
            onlyItemKeys.push(Number(element.slice(4))); // Push only the number that comes after the word item.
        }
    });

    onlyItemKeys.sort((a, b) => a - b); // Sort from the smallest to the largest number so that newer items are at the bottom.

    for (const element of onlyItemKeys) {
        if (localStorage.getItem(`item${element}`)) {
            const fromStorage = localStorage.getItem(`item${element}`);
            const parsedTitle = JSON.parse(fromStorage).title;
            const parsedDetails = JSON.parse(fromStorage).details;
            const parsedDueDate = JSON.parse(fromStorage).dueDate;
            const parsedPriority = JSON.parse(fromStorage).priority;
            const parsedProject = JSON.parse(fromStorage).project;
            const parsedChecklist = JSON.parse(fromStorage).checklist;
            const parsedItemID = JSON.parse(fromStorage).itemID;

            addItem(createItem(parsedTitle, parsedDetails, parsedDueDate, parsedPriority, parsedProject, parsedChecklist, parsedItemID), false); // Add the item to the allToDos array, but don't add it to localStorage.
        }
    }
}

function addItem(item, newItem = true) { // Add an item to the allToDos array.
    allToDos.push(item);

    if (newItem) { // Only add new items to localStorage (newItem must be true).
        const itemToJSON = JSON.stringify({
            itemID: item.getItemID(),
            title: item.getTitle(),
            details: item.getDetails(),
            dueDate: item.getDueDate(),
            priority: item.getPriority(),
            project: item.getProject(),
            checklist: item.getChecklist()
        });

        localStorage.setItem(`item${item.getItemID()}`, itemToJSON);
    }
}

function showAllItems(selectedProject = false) { // Show all items in the allToDos array.
    content.innerHTML = '';

    allToDos.forEach((element, index) => {
        if (!selectedProject) { // When the page first loads or the Show All button is clicked, show all items.
            currentProject = false;
            content.appendChild(showOneItem(element, index));
        } else { // If a project button is clicked, show items under that project only.
            currentProject = selectedProject;
            if (element.getProject() == selectedProject) { // If the item's project is the same as that of the clicked button,
                content.appendChild(showOneItem(element, index)); // Add it to #content.
            }
        }
    });
}

function showOneItem(element, index) { // Create an entry for each item.
    const box = document.createElement('div');
    box.setAttribute('id', `box${element.getItemID()}`);

    if (localStorage.getItem(`item${element.getItemID()}`)) { // If `item${element.getItemID()}` is found in localStorage,
        const itemSummary = document.createElement('div');
        itemSummary.setAttribute('id', `item${element.getItemID()}`);
        itemSummary.innerHTML = `<strong>Task:</strong> ${element.getTitle()} || <strong>Due Date:</strong> ${format(element.getDueDate(), 'd MMMM yyyy')}`;

        if (element.getPriority() == 'High') { // Background color depending on task priority
            box.setAttribute('class', 'box box-bg-high');
        } else if (element.getPriority() == 'Medium') {
            box.setAttribute('class', 'box box-bg-medium');
        } else {
            box.setAttribute('class', 'box box-bg-low');
        }

        const selections = document.createElement('div');
        selections.setAttribute('class', 'selections');

        const fromStorage = localStorage.getItem(`item${element.getItemID()}`); // Get the current item from localStorage.
        const parsedChecklist = JSON.parse(fromStorage).checklist; // Is the item marked as done or not?

        if (parsedChecklist) { // If the item is marked as done,
            itemSummary.setAttribute('class', 'strike-through'); // Strike through the task name and due date.
            selections.appendChild(createDoneBox(element, parsedChecklist)); // Check the Done? box.
        } else { // The element's Done? box is not checked.
            selections.appendChild(createDoneBox(element));
        }

        selections.appendChild(createRemoveButton(element.getItemID()));
        selections.appendChild(createExpandButton(element));
        selections.appendChild(createEditButton(element));

        box.appendChild(itemSummary);
        box.appendChild(selections);
    }

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

export { allToDos, currentProject, content, retrieveItemsFromStorage, addItem, showAllItems };