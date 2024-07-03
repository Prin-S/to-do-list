function createItem(title, details, dueDate, priority, project) {
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

    let checklist = false;
    const getChecklist = () => checklist;
    const setChecklist = () => checklist = switchChecklist(checklist);

    return { getTitle, setTitle, getDetails, setDetails, getDueDate, setDueDate, getPriority, setPriority, getProject, setProject, getChecklist, setChecklist }
}

function switchChecklist(checklist) {
    if (checklist == false) {
        return true;
    }
    
    return false;
}

export { createItem };