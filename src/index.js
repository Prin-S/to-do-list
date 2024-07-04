import './styles.css';
import { createItem } from './item.js';
import { createProject } from './project.js';

const allToDos = [];
const projects = [];

function addItem(item) {
    allToDos.push(item);
}

// Demo data
const hobbit = createItem('The Hobbit', 'J.R.R. Tolkien', 310, 'medium', 'Default 1');
const lotr = createItem('The Lord of the Rings (single-volume)', 'J.R.R. Tolkien', 1077, 'high', 'Default 1');
const silmarillion = createItem('The Silmarillion', 'J.R.R. Tolkien', 365, 'low', 'Default 2');

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
    showAllItems();
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
    showAllItems();
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

function addProjectsToForm() {
    projects.forEach((element, index) => {
        const projectChoice = document.createElement('input');
        const projectLabel = document.createElement('label');

        projectChoice.setAttribute('type', 'radio');
        projectChoice.setAttribute('id', index);
        projectChoice.setAttribute('name', 'project');
        projectChoice.setAttribute('value', element.getTitle());
        projectChoice.setAttribute('required', 'true');

        projectLabel.setAttribute('for', index);
        projectLabel.innerHTML = element.getTitle();
        
        itemProjects.appendChild(projectChoice);
        itemProjects.appendChild(projectLabel);
    });
}

addProjectsToForm();

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
    addProjectsToForm();
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
            content.appendChild(showOneItem(element, index));
        } else { // If a project button is clicked, show items under that project only.
            if (element.getProject() == selectedProject) { // If item's project is the same as that of the clicked button,
                content.appendChild(showOneItem(element, index)); // Add to content
            }
        }
    });
}

showAllItems();