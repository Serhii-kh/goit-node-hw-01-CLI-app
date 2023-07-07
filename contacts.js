const fs = require("fs").promises;
const path = require("node:path");
const shortId = require("shortid");

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getContacts = async () => {
  const buffer = await fs.readFile(contactsPath);

  return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();

  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContacts();
  const id = shortId.generate();
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};
