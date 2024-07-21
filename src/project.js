let projectIDCount = 0;
const getProjectIDCount = () => projectIDCount;
const resetProjectIDCount = () => projectIDCount = 0;

function createProject(title) {
    const projectID = projectIDCount;
    projectIDCount++;
    
    const getTitle = () => title;
    const setTitle = newTitle => title = newTitle;

    return { projectID, getTitle, setTitle };
}

export { getProjectIDCount, resetProjectIDCount, createProject };