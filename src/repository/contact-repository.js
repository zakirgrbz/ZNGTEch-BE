import Contact from "../model/contact-model.js";



const createEmail = async (pContent) => {
    try {
        const newEmail = await Contact.create(pContent);
        return newEmail;
    } catch (err) {
        console.log(err);
    }
}

export default {
    createEmail
}