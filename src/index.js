import './styles.css';
import { getItemIDCount, resetItemIDCount, createItem } from './item.js';
import { getProjectIDCount, resetProjectIDCount, createProject } from './project.js';
import { retrieveItemsFromStorage, addItem, showAllItems } from './item-functions.js';
import { itemProjects, retrieveProjectsFromStorage, addProject, showAllProjects, addProjectsToForm } from './project-functions.js';

function insertInitialData() {
    if (getItemIDCount() < 1 && getProjectIDCount() < 1) {
        addItem(createItem(
            'The Hobbit',
            `The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins,
            the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves
            of Thorin's Company, on a quest to reclaim the dwarves' home and treasure from
            the dragon Smaug. Bilbo's journey takes him from his peaceful rural surroundings
            into more sinister territory.`,
            '2024-07-02',
            'Medium',
            'Default'
        )); // Create a sample item.
        addProject(createProject('Default')); // Create a default project.
    }
}

retrieveItemsFromStorage();
retrieveProjectsFromStorage();
insertInitialData();
showAllItems();
showAllProjects();
addProjectsToForm(itemProjects);

const clearStorageButton = document.querySelector('#clear-storage-button');
clearStorageButton.addEventListener('click', () => {
    resetItemIDCount();
    resetProjectIDCount();
    localStorage.clear();
    insertInitialData(); // Recreate the sample item and the default project.
});