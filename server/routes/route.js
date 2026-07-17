import express from 'express';
import Email from '../model/email.js';

import { 
    saveSendEmails, 
    getEmails, 
    toggleStarredEmail, 
    deleteEmails, 
    moveEmailsToBin 
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


routes.post('/save', saveSendEmails);

routes.post('/save-draft', saveSendEmails);

routes.get('/emails/:type', getEmails);

routes.post('/starred', toggleStarredEmail);

routes.delete('/delete', deleteEmails);

routes.post('/bin', moveEmailsToBin);


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

export default routes;