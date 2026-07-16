import axios from 'axios';

const API_URI = 'http://localhost:8000';

const API_GMAIL = async (serviceUrlObject, requestData = {}, type = '') => {

    const url = type
        ? `${API_URI}/${serviceUrlObject.endpoint}/${type}`
        : `${API_URI}/${serviceUrlObject.endpoint}`;

    return await axios({
        method: serviceUrlObject.method,
        url,
        data: requestData
    });
}

export default API_GMAIL;