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
    improveWriting
} from '../controller/ai-controller.js';

const routes = express.Router();

routes.post('/save', saveSendEmails);
routes.post('/save-draft', saveSendEmails);
routes.get('/emails/:type', getEmails);
routes.post('/starred', toggleStarredEmail);
routes.delete('/delete', deleteEmails);
routes.post('/bin', moveEmailsToBin);

routes.post('/ai/generate-subject', generateSubject);
routes.post('/ai/improve-writing', improveWriting);

export default routes;