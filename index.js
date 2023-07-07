const contactsServices = require("./contacts");
// const argv = require("yargs").argv;

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse();
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsServices.getContacts();
      return console.table(contacts);

    case "get":
      const contact = await contactsServices.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await contactsServices.addContact({
        name,
        email,
        phone,
      });
      return console.log(newContact);

    case "remove":
      const contactToRemove = await contactsServices.removeContact(id);
      return console.log(contactToRemove);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
