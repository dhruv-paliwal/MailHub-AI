import axios from 'axios';

const API_URI = 'http://localhost:8000';

const API_GMAIL = async (serviceUrlObject, requestData = {}, type = '') => {

    const url = type
        ? `${API_URI}/${serviceUrlObject.endpoint}/${type}`
        : `${API_URI}/${serviceUrlObject.endpoint}`;

    const token = localStorage.getItem("token");

    return await axios({
        method: serviceUrlObject.method,
        url,
        data: requestData,
        headers: {
            Authorization: token ? `Bearer ${token}` : ""
        }
    });
}

export default API_GMAIL;