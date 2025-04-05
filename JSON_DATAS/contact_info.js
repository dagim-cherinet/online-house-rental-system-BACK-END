const fs = require('fs');
const contacts = require('./contact_info.json');
const branches = require('./branch_info.json');

// Example: Log the imported data
//console.log('Contacts:', contacts);
//console.log('Branches:', branches);

// Function to add foreign key to contacts
function addForeignKeyToContacts(contacts, branches) {
    return contacts.map(contact => {
        // Find the branch that matches the contact's branch name
        const matchingBranch = branches.find(branch => branch.b_name === contact.branch);

        // If a match is found, use its b_id; otherwise, set branch_id to null
        const branchId = matchingBranch ? matchingBranch.b_id : null;

        // Return a new object with branch_id added
        return {
            ...contact,
            branch_id: branchId
        };
    });
}

// Apply the transformation
const updatedContacts = addForeignKeyToContacts(contacts, branches);

fs.writeFileSync(
    'contact_with_foreignkey.json',
    JSON.stringify(updatedContacts, null, 2)
);

console.log('add_foreigkey to contacts');