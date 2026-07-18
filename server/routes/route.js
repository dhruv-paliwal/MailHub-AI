import express from 'express';
import auth from "../middleware/auth.js";
import Email from '../model/email.js';

import {
    signup,
    login
} from "../controller/auth-controller.js";

import {
    saveSendEmails,
    getEmails,
    toggleStarredEmail,
    deleteEmails,
    moveEmailsToBin,
    searchEmails
} from '../controller/email-controller.js';

import {
    generateSubject,
    improveWriting,
    changeTone,
    summarizeEmail,
    generateReply,
    generateSmartReplies
} from '../controller/ai-controller.js';


const routes = express.Router();

routes.get("/test", (req, res) => {
    res.json({
        message: "Backend is working!"
    });
});

routes.post("/signup", signup);

routes.post("/login", login);


routes.post('/save', auth, saveSendEmails);

routes.post('/save-draft', auth, saveSendEmails);

routes.get('/emails/:type', auth, getEmails);

routes.get('/search', auth, searchEmails);

routes.post('/starred', auth, toggleStarredEmail);

routes.delete('/delete', auth, deleteEmails);

routes.post('/bin', auth, moveEmailsToBin);


// AI Routes
routes.post('/ai/generate-subject', generateSubject);

routes.post('/ai/improve-writing', improveWriting);

routes.post('/ai/change-tone', changeTone);

routes.post('/ai/summarize', summarizeEmail);

routes.post('/ai/generate-reply', generateReply);

routes.post('/ai/smart-replies', generateSmartReplies);

routes.get('/create-test-email', async (req, res) => {
    try {
        const testEmail = new Email({
            to: "dhruv@gmail.com",
            from: "john@gmail.com",
            subject: "Project Report",
            body: "Hi Dhruv, Can you please send me the project report by tomorrow?",
            date: new Date(),
            image: "",
            name: "John",
            starred: false,
            bin: false,
            type: "inbox"
        });

        await testEmail.save();

        res.send("Test email created successfully");

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

console.log("✅ Auth routes loaded");

export default routes;