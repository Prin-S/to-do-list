import './styles.css';
import { createItem } from './item.js';
import { createProject } from './project.js';

const allToDos = [];
const projects = [];

let currentProject = false;

function addItem(item) {
    allToDos.push(item);
}

// Demo data
const hobbit = createItem('The Hobbit', 'J.R.R. Tolkien', '2024-07-02', 'Medium', 'Default 1');
const lotr = createItem('The Lord of the Rings (single-volume)', 'J.R.R. Tolkien', '2024-07-03', 'High', 'Default 1');
const silmarillion = createItem('The Silmarillion', 'J.R.R. Tolkien', '2024-07-04', 'Low', 'Default 2');

addItem(hobbit);
addItem(lotr);
addItem(silmarillion);

// Default projects
addProject(createProject('Default 1'));
addProject(createProject('Default 2'));
addProject(createProject('Default 3'));

const content = document.querySelector('#content');



function showOneItem(element, index) {
    const box = document.createElement('div');
    box.setAttribute('id', `box${index}`);
    
    const itemSummary = document.createElement('div');
    itemSummary.innerHTML = `<strong>Task:</strong> ${element.getTitle()} || <strong>Due Date:</strong> ${element.getDueDate()}`;

    if (element.getPriority() == 'High') {
        box.setAttribute('class', 'box box-bg-high');
    } else if (element.getPriority() == 'Medium') {
        box.setAttribute('class', 'box box-bg-medium');
    } else {
        box.setAttribute('class', 'box box-bg-low');
    }

    if (element.getChecklist()) {
        itemSummary.setAttribute('class', 'strike-through');
    }

    const selections = document.createElement('div');
    selections.setAttribute('class', 'selections');
    selections.appendChild(createDoneButton(element, index));
    selections.appendChild(createRemoveButton(index));
    selections.appendChild(createExpandButton(element, index));
    selections.appendChild(createEditButton(element, index));

    box.appendChild(itemSummary);
    box.appendChild(selections);

    return box; // Return to function in showAllItems()
}

function createDoneButton(element, index) {
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
    
    return returnSelection; // Return to function in showOneItem(element, index)
}

function toggleDone(index) {
    allToDos[index].setChecklist();
    showAllItems(currentProject);
}

function createRemoveButton(index) {
    const removeButton = document.createElement('button');

    removeButton.setAttribute('id', index);
    removeButton.setAttribute('class', 'box-button');
    removeButton.innerHTML = 'Delete';
    removeButton.addEventListener('click', removeItem.bind(this, removeButton.id));

    return removeButton; // Return to function in showOneItem(element, index)
}

function removeItem(itemID) {
    allToDos.splice(itemID, 1); // Remove one element starting at itemID
    showAllItems(currentProject);
}

function createExpandButton(element, index) {
    const expandButton = document.createElement('button');
    
    expandButton.setAttribute('id', `expand${index}`);
    expandButton.setAttribute('class', 'box-button');
    expandButton.innerHTML = 'More';
    expandButton.addEventListener('click', expandItem.bind(this, element, index));

    return expandButton; // Return to function in showOneItem(element, index)
}

function expandItem(element, index) {
    const expandedBox = document.querySelector(`#box${index}`);
    const expandedExpandButton = document.querySelector(`#expand${index}`);

    const itemDetails = document.createElement('div');
    itemDetails.innerHTML = `<strong>Details:</strong> ${element.getDetails()}`;

    const itemPriority = document.createElement('div');
    itemPriority.innerHTML = `<strong>Priority:</strong> ${element.getPriority()}`;

    const itemProject = document.createElement('div');
    itemProject.innerHTML = `<strong>Project:</strong> ${element.getProject()}`;

    const itemChecklist = document.createElement('div');

    if (element.getChecklist()) {
        itemChecklist.innerHTML = '<strong>Status:</strong> Done';
    } else {
        itemChecklist.innerHTML = '<strong>Status:</strong> Not done';
    }

    if (expandedExpandButton.innerHTML == 'More') {
        expandedExpandButton.innerHTML = 'Less';
        expandedBox.appendChild(itemDetails);
        expandedBox.appendChild(itemPriority);
        expandedBox.appendChild(itemProject);
        expandedBox.appendChild(itemChecklist);
    } else {
        expandedExpandButton.innerHTML = 'More';
        expandedBox.removeChild(expandedBox.lastElementChild);
        expandedBox.removeChild(expandedBox.lastElementChild);
        expandedBox.removeChild(expandedBox.lastElementChild);
        expandedBox.removeChild(expandedBox.lastElementChild);
    }
}

function createEditButton(element, index) {
    const editButton = document.createElement('button');

    editButton.setAttribute('id', `expand${index}`);
    editButton.setAttribute('class', 'box-button');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', editItem.bind(this, element, index));

    return editButton; // Return to function in showOneItem(element, index)
}

function editItem(element, index) {
    const lineBreak = document.createElement('br');

    const itemTitleLabel = document.createElement('label');
    itemTitleLabel.setAttribute('class', 'label');
    itemTitleLabel.setAttribute('for', `title${index}`);
    itemTitleLabel.innerHTML = 'Task: ';

    const itemTitle = document.createElement('input');
    itemTitle.setAttribute('id', `title${index}`);
    itemTitle.setAttribute('type', 'text');
    itemTitle.setAttribute('name', `title${index}`);
    itemTitle.setAttribute('required', '');
    itemTitle.setAttribute('value', element.getTitle());
    
    const itemDetailsLabel = document.createElement('label');
    itemDetailsLabel.setAttribute('class', 'label');
    itemDetailsLabel.setAttribute('for', `details${index}`);
    itemDetailsLabel.innerHTML = 'Details: ';

    const itemDetails = document.createElement('input');
    itemDetails.setAttribute('id', `details${index}`);
    itemDetails.setAttribute('type', 'text');
    itemDetails.setAttribute('name', `details${index}`);
    itemDetails.setAttribute('required', '');
    itemDetails.setAttribute('value', element.getDetails());

    const itemDueDateLabel = document.createElement('label');
    itemDueDateLabel.setAttribute('class', 'label');
    itemDueDateLabel.setAttribute('for', `due-date${index}`);
    itemDueDateLabel.innerHTML = 'Due Date: ';

    const itemDueDate = document.createElement('input');
    itemDueDate.setAttribute('id', `due-date${index}`);
    itemDueDate.setAttribute('type', 'date');
    itemDueDate.setAttribute('name', `due-date${index}`);
    itemDueDate.setAttribute('required', '');
    itemDueDate.setAttribute('value', element.getDueDate());

    const itemPriorityLabel = document.createElement('label');
    itemPriorityLabel.setAttribute('class', 'label');
    itemPriorityLabel.innerHTML = 'Priority: ';

    const itemPriorityHigh = document.createElement('input');
    const itemPriorityHighLabel = document.createElement('label');

    itemPriorityHigh.setAttribute('id', 'high');
    itemPriorityHigh.setAttribute('type', 'radio');
    itemPriorityHigh.setAttribute('name', `priority${index}`);
    itemPriorityHigh.setAttribute('required', '');
    itemPriorityHigh.setAttribute('value', 'High');

    itemPriorityHighLabel.setAttribute('for', 'high');
    itemPriorityHighLabel.innerHTML = 'High';
    
    const itemPriorityMedium = document.createElement('input');
    const itemPriorityMediumLabel = document.createElement('label');

    itemPriorityMedium.setAttribute('id', 'medium');
    itemPriorityMedium.setAttribute('type', 'radio');
    itemPriorityMedium.setAttribute('name', `priority${index}`);
    itemPriorityMedium.setAttribute('value', 'Medium');

    itemPriorityMediumLabel.setAttribute('for', 'medium');
    itemPriorityMediumLabel.innerHTML = 'Medium';

    const itemPriorityLow = document.createElement('input');
    const itemPriorityLowLabel = document.createElement('label');

    itemPriorityLow.setAttribute('id', 'low');
    itemPriorityLow.setAttribute('type', 'radio');
    itemPriorityLow.setAttribute('name', `priority${index}`);
    itemPriorityLow.setAttribute('value', 'Low');

    itemPriorityLowLabel.setAttribute('for', 'low');
    itemPriorityLowLabel.innerHTML = 'Low';

    const itemPriority = document.createElement('div');
    itemPriority.appendChild(itemPriorityLabel);
    itemPriority.appendChild(itemPriorityHigh);
    itemPriority.appendChild(itemPriorityHighLabel);
    itemPriority.appendChild(itemPriorityMedium);
    itemPriority.appendChild(itemPriorityMediumLabel);
    itemPriority.appendChild(itemPriorityLow);
    itemPriority.appendChild(itemPriorityLowLabel);

    if (element.getPriority() == 'High') {
        itemPriorityHigh.setAttribute('checked', '');
    } else if (element.getPriority() == 'Medium') {
        itemPriorityMedium.setAttribute('checked', '');
    } else {
        itemPriorityLow.setAttribute('checked', '');
    }

    const itemProjectLabel = document.createElement('label');
    itemProjectLabel.setAttribute('class', 'label');
    itemProjectLabel.innerHTML = 'Project: ';

    const itemProject = document.createElement('div');
    itemProject.appendChild(itemProjectLabel);
    addProjectsToForm(itemProject, element, index);

    const editItemDetailsDialog = document.createElement('dialog');
    editItemDetailsDialog.setAttribute('id', 'edit-item-details-dialog');

    const editItemDetailsForm = document.createElement('form');
    editItemDetailsForm.setAttribute('id', 'edit-item-details-form');

    const submitEditItemDetails = document.createElement('button');
    submitEditItemDetails.setAttribute('class', 'dialog-button');
    submitEditItemDetails.setAttribute('type', 'submit');
    submitEditItemDetails.innerHTML = 'Submit';
    editItemDetailsForm.addEventListener('submit', submitEditItemDetailsForm);

    function submitEditItemDetailsForm() {
        const editedItemTitle = document.querySelector(`#title${index}`);
        const editedItemDetails = document.querySelector(`#details${index}`);
        const editedItemDueDate = document.querySelector(`#due-date${index}`);
        const editedItemPriority = document.querySelector(`input[name=priority${index}]:checked`);
        const editedItemProject = document.querySelector(`input[name=project${index}]:checked`);

        element.setTitle(editedItemTitle.value);
        element.setDetails(editedItemDetails.value);
        element.setDueDate(editedItemDueDate.value);
        element.setPriority(editedItemPriority.value);
        element.setProject(editedItemProject.value);

        showAllItems(currentProject);
        editItemDetailsDialog.close();
    }

    const resetEditItemDetails = document.createElement('button');
    resetEditItemDetails.setAttribute('class', 'dialog-button');
    resetEditItemDetails.setAttribute('type', 'reset');
    resetEditItemDetails.innerHTML = 'Reset';

    const closeEditItemDetails = document.createElement('button');
    closeEditItemDetails.setAttribute('class', 'dialog-button');
    closeEditItemDetails.innerHTML = 'Close';
    closeEditItemDetails.addEventListener('click', () => editItemDetailsDialog.close());

    editItemDetailsForm.appendChild(itemTitleLabel);
    editItemDetailsForm.appendChild(itemTitle);
    editItemDetailsForm.appendChild(lineBreak);
    editItemDetailsForm.appendChild(itemDetailsLabel);
    editItemDetailsForm.appendChild(itemDetails);
    editItemDetailsForm.appendChild(lineBreak.cloneNode());
    editItemDetailsForm.appendChild(itemDueDateLabel);
    editItemDetailsForm.appendChild(itemDueDate);
    editItemDetailsForm.appendChild(lineBreak.cloneNode());
    editItemDetailsForm.appendChild(itemPriority);
    editItemDetailsForm.appendChild(itemProject);
    editItemDetailsForm.appendChild(submitEditItemDetails);
    editItemDetailsForm.appendChild(resetEditItemDetails);
    editItemDetailsForm.appendChild(closeEditItemDetails);

    editItemDetailsDialog.appendChild(editItemDetailsForm);
    content.appendChild(editItemDetailsDialog);

    editItemDetailsDialog.showModal();
}

const itemDialog = document.querySelector('#new-item-dialog');
const newItemButton = document.querySelector('#new-item');
const itemForm = document.querySelector('#item-form');
const closeItemButton = document.querySelector('#item-close');

newItemButton.addEventListener('click', () => itemDialog.showModal());
itemForm.addEventListener('submit', submitItemForm);
closeItemButton.addEventListener('click', () => itemDialog.close());

function submitItemForm(event) {
    const itemTitle = document.querySelector('#title');
    const itemDetails = document.querySelector('#details');
    const itemDueDate = document.querySelector('#due-date');
    const itemPriority = document.querySelector('input[name=priority]:checked');
    const itemProject = document.querySelector('input[name=project]:checked');

    addItem(createItem(itemTitle.value, itemDetails.value, itemDueDate.value, itemPriority.value, itemProject.value)); // Create object and add to allToDos array.
    itemDialog.close();
    content.appendChild(showOneItem(allToDos[allToDos.length - 1], allToDos.length - 1)); // showOneItem(element, index) - Access latest item in allToDos array and append it to #content in the DOM.
    event.preventDefault();
}

//----------

function addProject(item) {
    projects.push(item);
}

const showAll = document.querySelector('#show-all');
showAll.addEventListener('click', showAllItems.bind(this, false));

const itemProjects = document.querySelector('#item-projects');

function addProjectsToForm(form, selected = false, elementID = false) {
    console.log(projects);
    projects.forEach((element, index) => {
        const projectChoice = document.createElement('input');
        const projectLabel = document.createElement('label');

        projectChoice.setAttribute('id', index);
        projectChoice.setAttribute('type', 'radio');
        projectChoice.setAttribute('name', 'project');
        projectChoice.setAttribute('required', '');
        projectChoice.setAttribute('value', element.getTitle());

        projectLabel.setAttribute('for', index);
        projectLabel.innerHTML = element.getTitle();
        
        form.appendChild(projectChoice);
        form.appendChild(projectLabel);

        if (selected) {
            projectChoice.setAttribute('name', `project${elementID}`);

            if (selected.getProject() == element.getTitle()) {
                projectChoice.setAttribute('checked', '');
            }
        }
    });
}

addProjectsToForm(itemProjects);

const projectDialog = document.querySelector('#new-project-dialog');
const newProjectButton = document.querySelector('#new-project');
const projectForm = document.querySelector('#project-form');
const closeProjectButton = document.querySelector('#project-close');

newProjectButton.addEventListener('click', () => projectDialog.showModal());
projectForm.addEventListener('submit', submitProjectForm);
closeProjectButton.addEventListener('click', () => projectDialog.close());

function submitProjectForm(event) {
    const projectTitle = document.querySelector('#project-title');

    addProject(createProject(projectTitle.value)); // Create object and add to projects array.
    projectDialog.close();
    nav.appendChild(showOneProject(projects[projects.length - 1], projects.length - 1)); // showOneProject(element, index) - Access latest item in projects array and append it to #content in the DOM.
    itemProjects.innerHTML = 'Project:';
    addProjectsToForm(itemProjects);
    event.preventDefault();
}

const nav = document.querySelector('nav');

function showAllProjects() {
    projects.forEach((element, index) => nav.appendChild(showOneProject(element, index)));
}

showAllProjects();

function showOneProject(element, index) {
    const button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.innerHTML = element.getTitle();
    button.addEventListener('click', showAllItems.bind(this, button.innerHTML));

    return button; // Return to function in showAllProjects()
}

function showAllItems(selectedProject = false) {
    content.innerHTML = '';

    allToDos.forEach((element, index) => {
        if (!selectedProject) { // When the page first loads or the Show All button is clicked, show all items.
            currentProject = false;
            content.appendChild(showOneItem(element, index));
        } else { // If a project button is clicked, show items under that project only.
            currentProject = selectedProject;
            if (element.getProject() == selectedProject) { // If item's project is the same as that of the clicked button,
                content.appendChild(showOneItem(element, index)); // Add to content
            }
        }
    });
}

showAllItems();