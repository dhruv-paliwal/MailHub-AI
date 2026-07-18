export const API_URLS = {


    signup: {
    endpoint: 'signup',
    method: 'POST'
},

login: {
    endpoint: 'login',
    method: 'POST'
},

    saveSentEmails: {
        endpoint: 'save',
        method: 'POST'
    },
    saveDraftEmails: {
        endpoint: 'save-draft',
        method: 'POST'
    },
    getEmailFromType: {
        endpoint: 'emails',
        method: 'GET'
    },
    toggleStarredMails: {
        endpoint: 'starred',
        method: 'POST'
    },
    deleteEmails: {
        endpoint: 'delete',
        method: 'DELETE'
    },
    moveEmailsToBin: {
        endpoint: 'bin',
        method: 'POST'
    },

    generateSubject: {
        endpoint: 'ai/generate-subject',
        method: 'POST'
    },

    improveWriting: {
        endpoint: 'ai/improve-writing',
        method: 'POST'
    },

    changeTone: {
    endpoint: 'ai/change-tone',
    method: 'POST'
},

summarizeEmail: {
    endpoint: 'ai/summarize',
    method: 'POST'
},

generateReply: {
    endpoint: 'ai/generate-reply',
    method: 'POST'
},

smartReplies: {
    endpoint: 'ai/smart-replies',
    method: 'POST'
},

searchEmails: {
    endpoint: "search",
    method: "GET"
}
}