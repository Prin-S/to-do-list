import { currentProject, content, showAllItems } from './item-functions.js';
import { addProjectsToForm } from './project-functions.js';

function createEditButton(element) {
    const editButton = document.createElement('button');
    editButton.setAttribute('id', `edit${element.getItemID()}`);
    editButton.setAttribute('class', 'box-button');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', editItem.bind(this, element));

    return editButton; // Return to calling function -> showOneItem(element, index)
}

function editItem(element) {
    const editItemDetailsDiv = document.createElement('div');
    editItemDetailsDiv.setAttribute('id', 'edit-item-details-div');

    const editItemDetailsDialog = document.createElement('dialog');
    editItemDetailsDialog.setAttribute('id', 'edit-item-details-dialog');

    const editItemDetailsForm = document.createElement('form');
    editItemDetailsForm.setAttribute('id', 'edit-item-details-form');
    editItemDetailsForm.addEventListener('submit', submitEditItemDetailsForm); // When the Submit button in the edit item form is clicked,

    function submitEditItemDetailsForm() {
        const editedItemTitle = document.querySelector(`#title${element.getItemID()}`);
        const editedItemDetails = document.querySelector(`#details${element.getItemID()}`);
        const editedItemDueDate = document.querySelector(`#due-date${element.getItemID()}`);
        const editedItemPriority = document.querySelector(`input[name=priority${element.getItemID()}]:checked`);
        const editedItemProject = document.querySelector(`input[name=project${element.getItemID()}]:checked`);

        // Set the value of each property of the edited object in the allToDos array.
        element.setTitle(editedItemTitle.value);
        element.setDetails(editedItemDetails.value);
        element.setDueDate(editedItemDueDate.value);
        element.setPriority(editedItemPriority.value);
        element.setProject(editedItemProject.value);

        const editedToJSON = JSON.stringify({
            itemID: element.getItemID(),
            title: element.getTitle(),
            details: element.getDetails(),
            dueDate: element.getDueDate(),
            priority: element.getPriority(),
            project: element.getProject(),
            checklist: element.getChecklist()
        });
    
        localStorage.setItem(`item${element.getItemID()}`, editedToJSON); // Update the item in localStorage.

        showAllItems(currentProject);
        editItemDetailsDialog.close();
    }

    const submitEditItemDetails = document.createElement('button');
    submitEditItemDetails.setAttribute('class', 'dialog-button');
    submitEditItemDetails.setAttribute('type', 'submit');
    submitEditItemDetails.innerHTML = 'Submit';

    const resetEditItemDetails = document.createElement('button');
    resetEditItemDetails.setAttribute('class', 'dialog-button');
    resetEditItemDetails.setAttribute('type', 'reset');
    resetEditItemDetails.innerHTML = 'Reset';

    const closeEditItemDetails = document.createElement('button');
    closeEditItemDetails.setAttribute('class', 'dialog-button');
    closeEditItemDetails.innerHTML = 'Close';
    closeEditItemDetails.addEventListener('click', () => {
        editItemDetailsForm.reset(); // Reset the form before closing so that nothing is saved.
        editItemDetailsDialog.close();
    });

    const lineBreak = document.createElement('br');

    const itemTitleLabel = document.createElement('label');
    itemTitleLabel.setAttribute('class', 'label');
    itemTitleLabel.setAttribute('for', `title${element.getItemID()}`);
    itemTitleLabel.innerHTML = 'Task: ';

    const itemTitle = document.createElement('input');
    itemTitle.setAttribute('id', `title${element.getItemID()}`);
    itemTitle.setAttribute('type', 'text');
    itemTitle.setAttribute('name', `title${element.getItemID()}`);
    itemTitle.setAttribute('required', '');
    itemTitle.setAttribute('value', element.getTitle());

    const itemDetailsLabel = document.createElement('label');
    itemDetailsLabel.setAttribute('class', 'label');
    itemDetailsLabel.setAttribute('for', `details${element.getItemID()}`);
    itemDetailsLabel.innerHTML = 'Details: ';

    const itemDetails = document.createElement('textarea');
    itemDetails.setAttribute('id', `details${element.getItemID()}`);
    itemDetails.setAttribute('name', `details${element.getItemID()}`);
    itemDetails.setAttribute('rows', '4');
    itemDetails.setAttribute('cols', '20');
    itemDetails.setAttribute('required', '');
    itemDetails.setAttribute('value', element.getDetails());
    itemDetails.innerHTML = element.getDetails(); // Show the item's details in the textarea element.

    const itemDueDateLabel = document.createElement('label');
    itemDueDateLabel.setAttribute('class', 'label');
    itemDueDateLabel.setAttribute('for', `due-date${element.getItemID()}`);
    itemDueDateLabel.innerHTML = 'Due Date: ';

    const itemDueDate = document.createElement('input');
    itemDueDate.setAttribute('id', `due-date${element.getItemID()}`);
    itemDueDate.setAttribute('type', 'date');
    itemDueDate.setAttribute('name', `due-date${element.getItemID()}`);
    itemDueDate.setAttribute('required', '');
    itemDueDate.setAttribute('value', element.getDueDate());

    const itemPriorityLabel = document.createElement('label');
    itemPriorityLabel.setAttribute('class', 'label');
    itemPriorityLabel.innerHTML = 'Priority: ';

    const itemPriorityHigh = document.createElement('input');
    const itemPriorityHighLabel = document.createElement('label');

    itemPriorityHigh.setAttribute('id', 'high');
    itemPriorityHigh.setAttribute('type', 'radio');
    itemPriorityHigh.setAttribute('name', `priority${element.getItemID()}`);
    itemPriorityHigh.setAttribute('required', '');
    itemPriorityHigh.setAttribute('value', 'High');

    itemPriorityHighLabel.setAttribute('for', 'high');
    itemPriorityHighLabel.innerHTML = 'High';
    
    const itemPriorityMedium = document.createElement('input');
    const itemPriorityMediumLabel = document.createElement('label');

    itemPriorityMedium.setAttribute('id', 'medium');
    itemPriorityMedium.setAttribute('type', 'radio');
    itemPriorityMedium.setAttribute('name', `priority${element.getItemID()}`);
    itemPriorityMedium.setAttribute('value', 'Medium');

    itemPriorityMediumLabel.setAttribute('for', 'medium');
    itemPriorityMediumLabel.innerHTML = 'Medium';

    const itemPriorityLow = document.createElement('input');
    const itemPriorityLowLabel = document.createElement('label');

    itemPriorityLow.setAttribute('id', 'low');
    itemPriorityLow.setAttribute('type', 'radio');
    itemPriorityLow.setAttribute('name', `priority${element.getItemID()}`);
    itemPriorityLow.setAttribute('value', 'Low');

    itemPriorityLowLabel.setAttribute('for', 'low');
    itemPriorityLowLabel.innerHTML = 'Low';

    const itemPriority = document.createElement('div');
    itemPriority.appendChild(itemPriorityLabel);
    itemPriority.appendChild(itemPriorityHigh);
    itemPriority.appendChild(itemPriorityHighLabel);
    itemPriority.appendChild(itemPriorityMedium);
    itemPriority.appendChild(itemPriorityMediumLabel);
    itemPriority.appendChild(itemPriorityLow);
    itemPriority.appendChild(itemPriorityLowLabel);

    if (element.getPriority() == 'High') { // Check the priority box depending on task priority
        itemPriorityHigh.setAttribute('checked', '');
    } else if (element.getPriority() == 'Medium') {
        itemPriorityMedium.setAttribute('checked', '');
    } else {
        itemPriorityLow.setAttribute('checked', '');
    }

    const itemProjectLabel = document.createElement('label');
    itemProjectLabel.setAttribute('class', 'label');
    itemProjectLabel.innerHTML = 'Project: ';

    const itemProject = document.createElement('div');
    itemProject.appendChild(itemProjectLabel);
    addProjectsToForm(itemProject, element, element.getItemID()); // Populate the project list and check the box of the project that the edited item belongs to.

    editItemDetailsForm.appendChild(itemTitleLabel);
    editItemDetailsForm.appendChild(itemTitle);
    editItemDetailsForm.appendChild(lineBreak);
    editItemDetailsForm.appendChild(itemDetailsLabel);
    editItemDetailsForm.appendChild(itemDetails);
    editItemDetailsForm.appendChild(lineBreak.cloneNode());
    editItemDetailsForm.appendChild(itemDueDateLabel);
    editItemDetailsForm.appendChild(itemDueDate);
    editItemDetailsForm.appendChild(lineBreak.cloneNode());
    editItemDetailsForm.appendChild(itemPriority);
    editItemDetailsForm.appendChild(itemProject);
    editItemDetailsForm.appendChild(submitEditItemDetails);
    editItemDetailsForm.appendChild(resetEditItemDetails);
    editItemDetailsForm.appendChild(closeEditItemDetails);

    editItemDetailsDialog.appendChild(editItemDetailsForm);
    editItemDetailsDiv.appendChild(editItemDetailsDialog);
    content.appendChild(editItemDetailsDiv);

    editItemDetailsDialog.showModal();
}

export { createEditButton };