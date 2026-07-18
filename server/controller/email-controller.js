import mongoose from "mongoose";
import Email from "../model/email.js";


export const saveSendEmails = async (request, response) => {
    try {

        const email = new Email({
            ...request.body,
            owner: new mongoose.Types.ObjectId(request.user.id)
        });

        await email.save();

        response.status(200).json('email saved successfully');

    } catch (error) {
        response.status(500).json(error.message);
    }
};


export const getEmails = async (request, response) => {

    try {

        let emails;

        if (request.params.type === 'starred') {

            emails = await Email.find({
                starred: true,
                bin: false
            }).sort({ date: -1 });

        } 
        
        else if (request.params.type === 'bin') {

            emails = await Email.find({
                bin: true
            }).sort({ date: -1 });

        } 
        
        else if (request.params.type === 'allmail') {

            emails = await Email.find({})
                .sort({ date: -1 });

        } 
        
        else if (request.params.type === 'inbox') {

            emails = await Email.find({
                type: 'inbox',
                bin: false
            }).sort({ date: -1 });

        } 
        
        else {

            emails = await Email.find({
                type: request.params.type
            }).sort({ date: -1 });

        }

        response.status(200).json(emails);

    } catch(error) {

        response.status(500).json(error.message);

    }
};

export const toggleStarredEmail = async (request, response) => {

    try {

        await Email.updateOne(
            {
                _id: request.body.id
            },
            {
                $set: {
                    starred: request.body.value
                }
            }
        );

        response.status(201).json('Value is updated');

    } catch(error) {

        response.status(500).json(error.message);

    }
};


export const deleteEmails = async (request, response) => {

    try {

        await Email.deleteMany({
            _id: {
                $in: request.body
            }
        });

        response.status(200).json('emails deleted successfully');

    } catch(error) {

        response.status(500).json(error.message);

    }
};


export const moveEmailsToBin = async (request, response) => {

    try {

        await Email.updateMany(
            {
                _id: {
                    $in: request.body
                }
            },
            {
                $set: {
                    bin: true,
                    starred: false,
                    type: ''
                }
            }
        );

        response.status(200).json("Emails moved to bin");

    } catch(error) {

        response.status(500).json(error.message);

    }
};


export const searchEmails = async (request, response) => {

    try {

        const { query } = request.query;

        const emails = await Email.find({

            $or: [

                { subject: { $regex: query, $options: "i" } },

                { body: { $regex: query, $options: "i" } },

                { from: { $regex: query, $options: "i" } },

                { to: { $regex: query, $options: "i" } },

                { name: { $regex: query, $options: "i" } }

            ]

        });

        response.status(200).json(emails);

    } catch(error) {

        response.status(500).json(error.message);

    }
};