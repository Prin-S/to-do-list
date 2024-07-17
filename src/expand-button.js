function createExpandButton(element, index) {
    const expandButton = document.createElement('button');
    expandButton.setAttribute('id', `expand${index}`);
    expandButton.setAttribute('class', 'box-button');
    expandButton.innerHTML = 'More';
    expandButton.addEventListener('click', expandItem.bind(this, element, index));

    return expandButton; // Return to calling function -> showOneItem(element, index)
}

function expandItem(element, index) {
    const expandedBox = document.querySelector(`#box${index}`);
    const expandedExpandButton = document.querySelector(`#expand${index}`);

    const itemDetails = document.createElement('div');
    itemDetails.innerHTML = `<strong>Details:</strong> ${element.getDetails()}`;

    const itemPriority = document.createElement('div');
    itemPriority.innerHTML = `<strong>Priority:</strong> ${element.getPriority()}`;

    const itemProject = document.createElement('div');
    itemProject.innerHTML = `<strong>Project:</strong> ${element.getProject()}`;

    const itemChecklist = document.createElement('div');

    if (element.getChecklist()) {
        itemChecklist.innerHTML = '<strong>Status:</strong> Done';
    } else {
        itemChecklist.innerHTML = '<strong>Status:</strong> Not done';
    }

    if (expandedExpandButton.innerHTML == 'More') {
        expandedExpandButton.innerHTML = 'Less';
        expandedBox.appendChild(itemDetails);
        expandedBox.appendChild(itemPriority);
        expandedBox.appendChild(itemProject);
        expandedBox.appendChild(itemChecklist);
    } else {
        expandedExpandButton.innerHTML = 'More';
        for (let i = 0; i < 4; i++) {
            expandedBox.removeChild(expandedBox.lastElementChild);
        }
    }
}

export { createExpandButton };