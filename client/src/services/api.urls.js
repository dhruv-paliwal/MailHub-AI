export const API_URLS = {
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
}
}