let itemIDCount = 0;
const getItemIDCount = () => itemIDCount;
const resetItemIDCount = () => itemIDCount = 0;

function createItem(title, details, dueDate, priority, project, storedChecklist = false, storedItemID = false) {
    let itemID;
    
    if (!storedItemID) {
        itemID = itemIDCount;
        itemIDCount++;
    } else {
        itemID = storedItemID;
        itemIDCount = storedItemID + 1;
    }

    const getItemID = () => itemID;
    const getTitle = () => title;
    const setTitle = newTitle => title = newTitle;
    const getDetails = () => details;
    const setDetails = newDetails => details = newDetails;
    const getDueDate = () => dueDate;
    const setDueDate = newDueDate => dueDate = newDueDate;
    const getPriority = () => priority;
    const setPriority = newPriority => priority = newPriority;
    const getProject = () => project;
    const setProject = newProject => project = newProject;

    let checklist = storedChecklist;
    const getChecklist = () => checklist;
    const setChecklist = () => checklist = switchChecklist(checklist);

    return { getItemID, getTitle, setTitle, getDetails, setDetails, getDueDate, setDueDate, getPriority, setPriority, getProject, setProject, getChecklist, setChecklist };
}

function switchChecklist(checklist) {
    if (!checklist) {
        return true;
    }
    
    return false;
}

export { getItemIDCount, resetItemIDCount, createItem };