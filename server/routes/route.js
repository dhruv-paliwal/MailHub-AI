import express from 'express';

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
    generateReply
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

export default routes;