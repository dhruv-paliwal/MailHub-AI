import { useState } from 'react';
import { Box, Typography, styled, Button, TextField } from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constant';
import { ArrowBack, Delete } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const IconWrapper = styled(Box)({
    padding: 15
});

const Subject = styled(Typography)({
    fontSize: 22,
    margin: '10px 0 20px 75px',
    display: 'flex'
});

const Indicator = styled(Box)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-left: 6px;
    padding: 2px 4px;
    align-self: center;
`;

const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    backgroundColor: '#cccccc'
});

const Container = styled(Box)({
    marginLeft: 15,
    width: '100%',
    '& > div': {
        display: 'flex',
        '& > p > span': {
            fontSize: 12,
            color: '#5E5E5E'
        }
    }
});

const EmailDate = styled(Typography)({
    margin: '0 50px 0 auto',
    fontSize: 12,
    color: '#5E5E5E'
});


const ViewEmail = () => {

    const { openDrawer } = useOutletContext();

    const { state } = useLocation();
    const { email } = state;

    const [reply, setReply] = useState("");

    const [summary, setSummary] = useState("");

    const generateReplyService = useApi(API_URLS.generateReply);

    const summarizeEmailService = useApi(API_URLS.summarizeEmail);

    const saveSentEmailsService = useApi(API_URLS.saveSentEmails);


    const handleGenerateReply = async () => {

        console.log("Generate Reply clicked");
        console.log("Email body:", email.body);

        const response = await generateReplyService.call({
            body: email.body
        });

        console.log("AI Response:", response);

        if (response?.reply) {
            setReply(response.reply);
        }

    };

    const handleSummarizeEmail = async () => {

    const response = await summarizeEmailService.call({
        body: email.body
    });

    if (response?.summary) {
        setSummary(response.summary);
    }
};

    const handleSendReply = async () => {

    const emailData = {
        to: email.from,
        from: email.to,
        subject: "Re: " + email.subject,
        body: reply,
        date: new Date(),
        image: "",
        name: email.to.split('@')[0],
        starred: false,
        bin: false,
        type: "sent"
        };

        const response = await saveSentEmailsService.call(emailData);

        if (response) {
        alert("Reply sent successfully!");
        }
    };


    return (
        <Box 
            style={
                openDrawer 
                ? { marginLeft: 250, width: '100%' } 
                : { width: '100%' }
            }
        >

            <IconWrapper>
                <ArrowBack 
                    fontSize="small" 
                    color="action" 
                    onClick={() => window.history.back()} 
                />

                <Delete 
                    fontSize="small" 
                    color="action" 
                    style={{ marginLeft: 40 }} 
                />
            </IconWrapper>


            <Subject>
                {email.subject}
                <Indicator component="span">
                    Inbox
                </Indicator>
            </Subject>


            <Box style={{ display: 'flex' }}>

                <Image 
                    src={emptyProfilePic} 
                    alt="profile" 
                />


                <Container>

                    <Box>

                        <Typography>
                            {email.to.split('@')[0]}
                            <Box component="span">
                                &nbsp;&#60;{email.to}&#62;
                            </Box>
                        </Typography>


                        <EmailDate>
                            {(new window.Date(email.date)).getDate()}&nbsp;
                            {(new window.Date(email.date))
                                .toLocaleString('default', { month: 'long' })
                            }&nbsp;
                            {(new window.Date(email.date)).getFullYear()}
                        </EmailDate>

                    </Box>


                    <Typography style={{ marginTop: 20 }}>
                        {email.body}
                    </Typography>


                    {summary && (
    <Box
        sx={{
            mt: 2,
            p: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            border: "1px solid #ddd"
        }}
    >
        <Typography fontWeight="bold">
            AI Summary
        </Typography>

        <Typography sx={{ mt: 1 }}>
            {summary}
        </Typography>
    </Box>
)}



                    <Button
    variant="outlined"
    onClick={handleSummarizeEmail}
    sx={{
        mt: 2,
        mr: 2,
        textTransform: "none",
        borderRadius: "18px"
    }}
>
    ✨ Summarize
</Button>


                    <Button
                        variant="outlined"
                        onClick={handleGenerateReply}
                        sx={{
                            marginTop: 3,
                            textTransform: "none",
                            borderRadius: "18px"
                        }}
                    >
                        ✨ Generate AI Reply
                    </Button>


                    {reply && (
    <>
        <TextField
            multiline
            rows={5}
            fullWidth
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            sx={{
                marginTop: 3
            }}
        />

        <Button
            variant="contained"
            onClick={handleSendReply}
            sx={{
                mt: 2,
                width: 160,
                borderRadius: "18px",
                textTransform: "none"
            }}
        >
            Send Reply
        </Button>
    </>
)}
                    

                </Container>

            </Box>

        </Box>
    );
};


export default ViewEmail;