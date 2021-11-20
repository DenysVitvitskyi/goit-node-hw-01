const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async contactId => {
  if (!contactId) {
    console.warn('Enter user ID');
    return;
  }
  try {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async contactId => {
  if (!contactId) {
    console.warn('Id is not passed');
    return;
  }
  try {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    if (!contact) {
      return null;
    }
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contact;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    console.warn('Valid values are not passed');
    return;
  }
  try {
    const id = crypto.randomUUID();
    const contacts = await listContacts();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };