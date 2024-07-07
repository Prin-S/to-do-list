import './styles.css';
import { createItem } from './item.js';
import { createProject } from './project.js';
import { createDoneBox } from './done-box.js';
import { createRemoveButton } from './remove-button.js';
import { createExpandButton } from './expand-button.js';
import { createEditButton } from './edit-button.js';

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

function showOneItem(element, index) {
    const box = document.createElement('div');
    box.setAttribute('id', `box${index}`);
    
    const itemSummary = document.createElement('div');
    itemSummary.innerHTML = `<strong>Task:</strong> ${element.getTitle()} || <strong>Due Date:</strong> ${element.getDueDate()}`;

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

    return box; // Return to function in showAllItems()
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
    projects.forEach((element, index) => {
        const projectChoice = document.createElement('input');
        projectChoice.setAttribute('id', index);
        projectChoice.setAttribute('type', 'radio');
        projectChoice.setAttribute('name', 'project');
        projectChoice.setAttribute('required', '');
        projectChoice.setAttribute('value', element.getTitle());

        const projectLabel = document.createElement('label');
        projectLabel.setAttribute('for', index);
        projectLabel.innerHTML = element.getTitle();
        
        form.appendChild(projectChoice);
        form.appendChild(projectLabel);

        if (selected) { // When the function is called in editItem(element, index), element and index are passed in.
            projectChoice.setAttribute('name', `project${elementID}`); // elementID is the element of the project being edited.

            if (selected.getProject() == element.getTitle()) {
                projectChoice.setAttribute('checked', ''); // Check the selected box.
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

    return button; // Return to calling function -> showAllProjects()
}

export { allToDos, currentProject, addProjectsToForm, showAllItems };