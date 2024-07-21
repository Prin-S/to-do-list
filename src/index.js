import './styles.css';
import { getItemIDCount, resetItemIDCount, createItem } from './item.js';
import { getProjectIDCount, resetProjectIDCount, createProject } from './project.js';
import { retrieveItemsFromStorage, addItem, showAllItems } from './item-functions.js';
import { itemProjects, retrieveProjectsFromStorage, addProject, showAllProjects, addProjectsToForm } from './project-functions.js';

retrieveItemsFromStorage();
retrieveProjectsFromStorage();

if (getItemIDCount() < 1 && getProjectIDCount() < 1) {
    addItem(createItem('The Hobbit', 'J.R.R. Tolkien', '2024-07-02', 'Medium', 'Default')); // Create a sample item.
    addProject(createProject('Default')); // Create a default project.
}

showAllItems();
showAllProjects();
addProjectsToForm(itemProjects);

const clearStorageButton = document.querySelector('#clear-storage-button');
clearStorageButton.addEventListener('click', () => {
    resetItemIDCount();
    resetProjectIDCount();
    
    localStorage.clear();

    addItem(createItem('The Hobbit', 'J.R.R. Tolkien', '2024-07-02', 'Medium', 'Default')); // Recreate the sample item.
    addProject(createProject('Default')); // Recreate the default project.
});