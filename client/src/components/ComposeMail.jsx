import { useState } from 'react';

import {
    Dialog,
    styled,
    Typography,
    Box,
    InputBase,
    TextField,
    Button,
    Menu,
    MenuItem
} from '@mui/material';

import { Close, DeleteOutline } from '@mui/icons-material';

import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';


const dialogStyle = {
    height: '90%',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    boxShadow: 'none',
    borderRadius: '10px 10px 0 0',
}


const Header = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    background: #f2f6fc;

    & > p {
        font-size: 14px;
        font-weight: 500;
    }
`;


const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;

    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;


const Footer = styled(Box)`
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    align-items: center;
`;


const SendButton = styled(Button)`
    background: #0B57D0;
    color: #fff;
    font-weight: 500;
    text-transform: none;
    border-radius: 18px;
    width: 100px;
`;


const ComposeMail = ({ open, setOpenDrawer }) => {

    const [data, setData] = useState({});

    const [anchorEl, setAnchorEl] = useState(null);


    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const closeMenu = () => {
        setAnchorEl(null);
    };


    const sentEmailService = useApi(API_URLS.saveSentEmails);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const generateSubjectService = useApi(API_URLS.generateSubject);
    const improveWritingService = useApi(API_URLS.improveWriting);
    const changeToneService = useApi(API_URLS.changeTone);



    const config = {
        Username: process.env.REACT_APP_USERNAME,
        Password: process.env.REACT_APP_PASSWORD,
        Host: 'smtp.elasticemail.com',
        Port: 2525,
    }



    const onValueChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }



    // AI Improve Writing
    const handleImproveWriting = async () => {

        if (!data.body) {
            alert("Please write something first.");
            return;
        }


        const response = await improveWritingService.call({
            body: data.body
        });


        if (response?.body) {
            setData(prev => ({
                ...prev,
                body: response.body
            }));
        }


        closeMenu();
    }



    // AI Generate Subject
    const handleGenerateSubject = async () => {

        if (!data.body) {
            alert("Please write the email body first.");
            return;
        }


        const response = await generateSubjectService.call({
            body: data.body
        });


        if (response?.subject) {
            setData(prev => ({
                ...prev,
                subject: response.subject
            }));
        }


        closeMenu();
    }


    const handleToneChange = async (tone) => {

        if (!data.body) {
        alert("Please write something first.");
        return;
        }


        const response = await changeToneService.call({
        body: data.body,
        tone: tone
        });


        if(response?.body){

            setData(prev => ({
                ...prev,
                body: response.body
            }));

        }


        closeMenu();

        };



    const sendEmail = async (e) => {

        e.preventDefault();


        if (window.Email) {

            window.Email.send({

                ...config,
                To: data.to,
                From: "codeforinterview03@gmail.com",
                Subject: data.subject,
                Body: data.body

            }).then(
                message => alert(message)
            );
        }



        const payload = {

            to: data.to,
            from: "codeforinterview03@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Code for Interview',
            starred: false,
            type: 'sent'

        }



        sentEmailService.call(payload);


        if (!sentEmailService.error) {

            setOpenDrawer(false);
            setData({});

        }

    }




    const closeComposeMail = (e) => {

        e.preventDefault();


        const payload = {

            to: data.to,
            from: "codeforinterview03@gmail.com",
            subject: data.subject,
            body: data.body,
            date: new Date(),
            image: '',
            name: 'Code for Interview',
            starred: false,
            type: 'drafts'

        }



        saveDraftService.call(payload);


        if (!saveDraftService.error) {

            setOpenDrawer(false);
            setData({});

        }

    }



    return (

        <Dialog
            open={open}
            PaperProps={{ sx: dialogStyle }}
        >

            <Header>

                <Typography>
                    New Message
                </Typography>


                <Close
                    fontSize="small"
                    onClick={(e)=>closeComposeMail(e)}
                />

            </Header>



            <RecipientWrapper>

                <InputBase
                    placeholder="Recipients"
                    name="to"
                    onChange={onValueChange}
                    value={data.to || ""}
                />


                <InputBase
                    placeholder="Subject"
                    name="subject"
                    onChange={onValueChange}
                    value={data.subject || ""}
                />

            </RecipientWrapper>



            <TextField

                multiline
                rows={20}

                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        border:'none'
                    }
                }}

                name="body"

                onChange={onValueChange}

                value={data.body || ""}

            />



            <Footer>


                <Box display="flex" gap={2}>


                    <SendButton
                        onClick={sendEmail}
                    >
                        Send
                    </SendButton>



                    <Button

                        variant="outlined"

                        onClick={openMenu}

                        sx={{
                            borderRadius:"18px",
                            textTransform:"none"
                        }}

                    >
                        ✨ AI Assist

                    </Button>



                    <Menu

                        anchorEl={anchorEl}

                        open={Boolean(anchorEl)}

                        onClose={closeMenu}

                    >


                        <MenuItem onClick={handleImproveWriting}>
                            📝 Improve Writing
                        </MenuItem>


                        <MenuItem onClick={handleGenerateSubject}>
                            📌 Generate Subject
                        </MenuItem>


                        <MenuItem onClick={closeMenu}>
                            📄 Summarize
                        </MenuItem>


                        <MenuItem onClick={() => handleToneChange("friendly")}>
                            😊 Friendly Tone
                        </MenuItem>


                        <MenuItem onClick={() => handleToneChange("professional")}>
                            💼 Professional Tone
                        </MenuItem>


                    </Menu>


                </Box>



                <DeleteOutline
                    onClick={()=>setOpenDrawer(false)}
                />


            </Footer>


        </Dialog>

    )
}


export default ComposeMail;