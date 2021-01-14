const Contact = require("./Models/Contact");
const escapeStringRegexp = require("escape-string-regexp");

// The root provides a resolver function for each API endpoint
const root = {
  /*
  search for contacts by a given string
  if is not a number search for name, address and email 
  escaping special characters 
  otherwise search for a phone number
  */
  search: async ({ feed }) => {
    try {
      if (isNaN(feed)) {
        const escapedString = escapeStringRegexp(feed);
        const $regex = new RegExp(escapedString);

        const contact = await Contact.find({
          $or: [
            { name: { $regex, $options: "i" } },
            { address: { $regex, $options: "i" } },
            { email: { $regex, $options: "i" } },
          ],
        });
        return contact;
      } else {
        feed = parseInt(feed);
        const contact = await Contact.find({
          $where: "/" + feed + "/.test(this.phone)",
        });
        return contact;
      }
    } catch (err) {
      throw err.message;
    }
  },

  //get all the contacts from the db
  getAllContacts: async () => {
    try {
      const contacts = await Contact.find();
      return contacts;
    } catch (err) {
      throw err.message;
    }
  },

  //update a contact
  updateContact: async ({ _id, name, address, phone, email }) => {
    phone = parseInt(phone, 10);
    const contact = new Contact({
      _id: _id,
      name: name,
      address: address,
      phone: phone,
      email: email,
    });
    try {
      await Contact.updateOne({ _id: _id }, contact);
      return contact;
    } catch (err) {
      throw err.message;
    }
  },

  //remove a contact
  deleteContact: async ({ _id }) => {
    try {
      await Contact.deleteOne({ _id: _id });
      return _id;
    } catch (err) {
      throw err.message;
    }
  },
};

module.exports = root;
