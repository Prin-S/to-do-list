function createItem(title, details, dueDate, priority, project) {
    let checklist = false;
    const getChecklist = () => checklist;
    
    const switchChecklist = () => {
        if (checklist == false) {
            checklist = true;
        } else {
            checklist = false;
        }
    }

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

    return { getChecklist, switchChecklist, getTitle, setTitle, getDetails, setDetails, getDueDate, setDueDate, getPriority, setPriority, getProject, setProject }
}

export { createItem };