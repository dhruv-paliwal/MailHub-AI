import { useState } from 'react';
import {
    Box,
    Typography,
    styled,
    Button,
    TextField,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constant';
import { ArrowBack, Delete, ContentCopy } from '@mui/icons-material';
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

    const [smartReplies, setSmartReplies] = useState([]);

    const [summary, setSummary] = useState("");

    const [replyLoading, setReplyLoading] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);

    const generateReplyService = useApi(API_URLS.generateReply);

    const smartRepliesService = useApi(API_URLS.smartReplies);

    const summarizeEmailService = useApi(API_URLS.summarizeEmail);

    const saveSentEmailsService = useApi(API_URLS.saveSentEmails);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleGenerateReply = async () => {

    setReplyLoading(true);

    try {

        const response = await generateReplyService.call({
            body: email.body
        });

        if (response?.reply) {
            setReply(response.reply);
        }

    } finally {

        setReplyLoading(false);

    }
};

const handleSmartReplies = async () => {

    const response = await smartRepliesService.call({
        body: email.body
    });

    if (response?.replies) {
        setSmartReplies(response.replies);
    }

};

    const handleSummarizeEmail = async () => {

    setSummaryLoading(true);

    try {

        const response = await summarizeEmailService.call({
            body: email.body
        });

        if (response?.summary) {
            setSummary(response.summary);
        }

    } finally {

        setSummaryLoading(false);

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
    setSnackbarMessage("Reply sent successfully!");
setSnackbarOpen(true);
}
    };


    const handleCopyReply = async () => {

    try {
        await navigator.clipboard.writeText(reply);
        setSnackbarMessage("Reply copied to clipboard!");
setSnackbarOpen(true);
    } catch (error) {
        console.log(error);
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
    disabled={summaryLoading}
    sx={{
        mt: 2,
        mr: 2,
        textTransform: "none",
        borderRadius: "18px"
    }}
>
    {summaryLoading ? (
        <CircularProgress size={20} />
    ) : (
        "✨ Summarize"
    )}
</Button>


                   <Button
    variant="outlined"
    onClick={handleGenerateReply}
    disabled={replyLoading}
    sx={{
        marginTop: 3,
        textTransform: "none",
        borderRadius: "18px"
    }}
>
    {replyLoading ? (
        <CircularProgress size={20} />
    ) : (
        "✨ Generate AI Reply"
    )}
</Button>


<Button
    variant="outlined"
    onClick={handleSmartReplies}
    sx={{
        mt: 2,
        textTransform: "none",
        borderRadius: "18px"
    }}
>
    ✨ Smart Replies
</Button>
{smartReplies.length > 0 && (

    <Box sx={{ mt: 3 }}>

        <Typography
            variant="h6"
            sx={{ mb: 2 }}
        >
            AI Smart Replies
        </Typography>

        {smartReplies.map((item, index) => (

            <Box
                key={index}
                sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 2,
                    mb: 2
                }}
            >

                <Typography>
                    {item}
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        mt: 2,
                        textTransform: "none"
                    }}
                    onClick={() => setReply(item)}
                >
                    Use this Reply
                </Button>

            </Box>

        ))}

    </Box>

)}


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

        <Box
    sx={{
        display: "flex",
        gap: 2,
        mt: 2
    }}
>
    <Button
        variant="contained"
        onClick={handleSendReply}
        sx={{
            width: 160,
            borderRadius: "18px",
            textTransform: "none"
        }}
    >
        Send Reply
    </Button>

    <Button
        variant="outlined"
        startIcon={<ContentCopy />}
        onClick={handleCopyReply}
        sx={{
            borderRadius: "18px",
            textTransform: "none"
        }}
    >
        Copy Reply
    </Button>
</Box>
    </>
)}
                    

                </Container>

            </Box>

            <Snackbar
    open={snackbarOpen}
    autoHideDuration={3000}
    onClose={() => setSnackbarOpen(false)}
    anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
    }}
>
    <Alert
    severity="success"
    onClose={() => setSnackbarOpen(false)}
    sx={{ width: "100%" }}
>
    {snackbarMessage}
</Alert>
</Snackbar>

        </Box>
    );
};


export default ViewEmail;