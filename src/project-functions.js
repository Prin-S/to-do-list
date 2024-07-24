import { getProjectIDCount, createProject } from './project.js';
import { showAllItems } from './item-functions.js';

const allProjects = [];
const nav = document.querySelector('nav');

const showAll = document.querySelector('#show-all'); // The Show All button for showing all projects
showAll.addEventListener('click', showAllItems.bind(this, false));

const itemProjects = document.querySelector('#item-projects'); // The project list in the Add To-Do Item form

function retrieveProjectsFromStorage() { // Called in index.js
    for (let i = 0; i <= getProjectIDCount(); i++) { // getProjectIDCount() is in project.js.
        if (localStorage.getItem(`project${i}`)) {
            const fromStorage = localStorage.getItem(`project${i}`);
            const parsedTitle = JSON.parse(fromStorage).title;

            addProject(createProject(parsedTitle), false); // Add the project to the allProjects array, but don't add it to localStorage.
        }
    }
}

function addProject(item, newProject = true) { // Add a project to the allProjects array.
    allProjects.push(item);
    
    if (newProject) { // Only add new projects to localStorage (newProject must be true).
        const projectToJSON = JSON.stringify({ projectID: item.projectID, title: item.getTitle() });

        localStorage.setItem(`project${item.projectID}`, projectToJSON);
    }
}

function showAllProjects() { // Show all projects in the allProjects array. / Called in index.js
    allProjects.forEach((element, index) => nav.appendChild(showOneProject(element, index))); // Attach to the nav element.
}

function showOneProject(element, index) { // Create a button for each project.
    const button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.innerHTML = element.getTitle();
    button.addEventListener('click', showAllItems.bind(this, button.innerHTML)); // Call showAllItems() in item-functions.js.

    return button; // Return to calling function -> showAllProjects()
}

function addProjectsToForm(form, selectedElement = false, selectedIndex = false) { // Add each project in the allProjects array to the #item-projects div.
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

        if (selectedElement) { // When the function is called in editItem(element, index), the edited item's element and index are passed in.
            projectChoice.setAttribute('name', `project${selectedIndex}`); // selectedIndex is the index of the edited item.

            if (selectedElement.getProject() == element.getTitle()) {
                projectChoice.setAttribute('checked', ''); // Check the box of the project that the edited item belongs to.
            }
        }
    });
}

const projectDialog = document.querySelector('#new-project-dialog');

const newProjectButton = document.querySelector('#new-project-button');
newProjectButton.addEventListener('click', () => projectDialog.showModal());

const projectForm = document.querySelector('#project-form');
projectForm.addEventListener('submit', submitProjectForm);

const closeProjectButton = document.querySelector('#new-project-close-button');
closeProjectButton.addEventListener('click', () => projectDialog.close());

function submitProjectForm(event) {
    const projectTitle = document.querySelector('#project-title');

    addProject(createProject(projectTitle.value)); // Create an object and add to the allProjects array.
    projectDialog.close();
    nav.appendChild(showOneProject(allProjects[allProjects.length - 1], allProjects.length - 1)); // showOneProject(element, index) - Access latest item in the allProjects array and append it to #content.
    
    itemProjects.innerHTML = 'Project:'; // Clear the project list in the Add To-Do Item form.
    addProjectsToForm(itemProjects); // Repopulate the project list so that the newly added project is included too.
    
    event.preventDefault();
}

export { itemProjects, retrieveProjectsFromStorage, addProject, showAllProjects, addProjectsToForm };