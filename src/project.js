function createProject(title) {
    const getTitle = () => title;
    const setTitle = newTitle => title = newTitle;

    return { getTitle, setTitle }
}

export { createProject };