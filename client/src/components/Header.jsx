

import { AppBar, Toolbar, Box, InputBase, styled } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material'

import { gmailLogo } from '../constants/constant';

const StyledAppBar = styled(AppBar)`
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border-bottom: 1px solid #e5e7eb;
`;

const SearchWrapper = styled(Box)`
    background: #F8FAFC;
    margin-left: 80px;
    border-radius: 12px;
    min-width: 690px;
    max-width: 720px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    & > div {
        width: 100%
    }
`

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: end;
    & > svg {
        margin-left: 20px;
    }
`

const Header = ({ toggleDrawer }) => {

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer} />
                <Box
    sx={{
        width: 110,
        marginLeft: 2,
        fontSize: "28px",
        fontWeight: "bold",
        color: "#2563EB",
        fontFamily: "Poppins, sans-serif"
    }}
>
    MailHub
</Box>
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase />
                    <Tune  color="action"/>
                </SearchWrapper>

                <OptionsWrapper>
                    <HelpOutlineOutlined sx={{ color: "#2563EB" }} />
                    <SettingsOutlined sx={{ color: "#2563EB" }} />
                    <AppsOutlined sx={{ color: "#2563EB" }} />
                    <AccountCircleOutlined sx={{ color: "#2563EB" }} />
               </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;