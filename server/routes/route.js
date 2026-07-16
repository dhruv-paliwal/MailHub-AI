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
    changeTone
} from '../controller/ai-controller.js';


const routes = express.Router();


routes.post('/save', saveSendEmails);

routes.post('/save-draft', saveSendEmails);

routes.get('/emails/:type', getEmails);

routes.post('/starred', toggleStarredEmail);

routes.delete('/delete', deleteEmails);

routes.post('/bin', moveEmailsToBin);


// AI routes
routes.post('/ai/generate-subject', generateSubject);

routes.post('/ai/improve-writing', improveWriting);

routes.post('/ai/change-tone', changeTone);


export default routes;