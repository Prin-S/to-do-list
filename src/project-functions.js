import { createProject } from './project.js';
import { showAllItems } from './item-functions.js';

const allProjects = [];
const nav = document.querySelector('nav');

const showAll = document.querySelector('#show-all');
showAll.addEventListener('click', showAllItems.bind(this, false));

const itemProjects = document.querySelector('#item-projects');

function addProject(item) { // Add a project to the allProjects array.
    allProjects.push(item);
}

function showAllProjects() { // Show all projects in the allProjects array.
    allProjects.forEach((element, index) => nav.appendChild(showOneProject(element, index))); // Attach to the nav element in index.html.
}

function showOneProject(element, index) { // Create a button for each project.
    const button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.innerHTML = element.getTitle();
    button.addEventListener('click', showAllItems.bind(this, button.innerHTML));

    return button; // Return to calling function -> showAllProjects()
}

function addProjectsToForm(form, selected = false, elementID = false) { // Add each project to the #item-projects div in index.html.
    // This is shown when the Add To-Do Item button is clicked.
    allProjects.forEach((element, index) => {
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

const projectDialog = document.querySelector('#new-project-dialog');

const newProjectButton = document.querySelector('#new-project');
newProjectButton.addEventListener('click', () => projectDialog.showModal());

const projectForm = document.querySelector('#project-form');
projectForm.addEventListener('submit', submitProjectForm);

const closeProjectButton = document.querySelector('#project-close');
closeProjectButton.addEventListener('click', () => projectDialog.close());

function submitProjectForm(event) {
    const projectTitle = document.querySelector('#project-title');

    addProject(createProject(projectTitle.value)); // Create object and add to the allProjects array.
    projectDialog.close();
    nav.appendChild(showOneProject(allProjects[allProjects.length - 1], allProjects.length - 1)); // showOneProject(element, index) - Access latest item in the allProjects array and append it to #content in the DOM.
    
    itemProjects.innerHTML = 'Project:';
    addProjectsToForm(itemProjects);
    
    event.preventDefault();
}

export { itemProjects, addProject, showAllProjects, addProjectsToForm };