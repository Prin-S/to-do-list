let projectIDCount = 0;
const getProjectIDCount = () => projectIDCount;
const resetProjectIDCount = () => projectIDCount = 0;

function createProject(title, storedProjectID = false) {
    let projectID;
    
    if (!storedProjectID) {
        projectID = projectIDCount;
        projectIDCount++;
    } else {
        projectID = storedProjectID;
        projectIDCount = storedProjectID + 1;
    }

    const getProjectID = () => projectID;
    const getProjectTitle = () => title;
    const setProjectTitle = newTitle => title = newTitle;

    return { getProjectID, getProjectTitle, setProjectTitle };
}

export { getProjectIDCount, resetProjectIDCount, createProject };