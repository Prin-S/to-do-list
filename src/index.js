import './styles.css';
import { createItem } from './item.js';
import { createProject } from './project.js';
import { addItem, showAllItems } from './item-functions.js';
import { itemProjects, addProject, showAllProjects, addProjectsToForm } from './project-functions.js';

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

showAllItems();
showAllProjects();
addProjectsToForm(itemProjects);