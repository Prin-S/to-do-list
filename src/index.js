import './styles.css';
import { createItem } from './item.js';
import { getProjectIDCount, resetProjectIDCount, createProject } from './project.js';
import { addItem, showAllItems } from './item-functions.js';
import { itemProjects, retrieveProjectsFromStorage, addProject, showAllProjects, addProjectsToForm } from './project-functions.js';

// Demo data
addItem(createItem('The Hobbit', 'J.R.R. Tolkien', '2024-07-02', 'Medium', 'Default'));
addItem(createItem('The Lord of the Rings (single-volume)', 'J.R.R. Tolkien', '2024-07-03', 'High', 'Default'));
addItem(createItem('The Silmarillion', 'J.R.R. Tolkien', '2024-07-04', 'Low', 'Default'));

if (getProjectIDCount() < 1) {
    addProject(createProject('Default')); // Create a default project.
}

retrieveProjectsFromStorage();
showAllItems();
showAllProjects();
addProjectsToForm(itemProjects);

const clearStorageButton = document.querySelector('#clear-storage-button');
clearStorageButton.addEventListener('click', () => {
    resetProjectIDCount();
    localStorage.clear();
    addProject(createProject('Default')); // Recreate a default project.
});