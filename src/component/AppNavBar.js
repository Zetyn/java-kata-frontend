import React,{useEffect,useState,useRef} from "react/cjs/react.development";
import {Link as ReachLink} from 'react-router-dom';
import authService from "../service/auth.service";
import {
    MenuItem,
    MenuList,
    Popper,
    Paper,
    Grow,
    ClickAwayListener,
    makeStyles,
    Button,
    withStyles, Menu, ListItemText
} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPencil,faPlus,faBookmark,faUser,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


const AppNavbar = () => {

    const [open, setOpen] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const anchorRef = useRef(null);
    const anchorRefUserMenu = useRef(null);
    const prevOpen = useRef(open);
    const prevOpenUserMenu = useRef(openUserMenu);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleToggleUserMenu = () => {
        setOpenUserMenu((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handleCloseUserMenu = (event) => {
        if (anchorRefUserMenu.current && anchorRefUserMenu.current.contains(event.target)) {
            return;
        }
        setOpenUserMenu(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    function handleListKeyDownUserMenu(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenUserMenu(false);
        }
    }

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
        if (prevOpenUserMenu.current === true && openUserMenu === false) {
            anchorRefUserMenu.current.focus();
        }
        prevOpenUserMenu.current = openUserMenu;
    }, [open,openUserMenu]);

    const StyledMenuItem = withStyles((theme) => ({
        root: {
            position: "relative",
            padding: "10px 14px",
            margin: "0 8px 1px",
            color: "#ddd",
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "1",
            whiteSpace: "nowrap",
            transition: "color .2s ease",
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#303032",
            },

        },
    }))(MenuItem);

    const authorization = () => {
        if (localStorage.getItem("user")) {
            return <div className="header-right-menu">
                <div className="header-right-menu__item header-button">
                    <a className="header-button__icon">
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        style={{background:"transparent",outline:"none",border:"0",minWidth:"0"}}
                    >
                        <FontAwesomeIcon icon={faPencil} color="white"/>
                    </Button>
                    </a>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' ,backgroundColor:"#252527",color:"white"}}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                            <ReachLink to="/add-book" style={{padding:"0"}}>
                                            <StyledMenuItem onClick={handleClose}>
                                                <FontAwesomeIcon icon={faPlus} style={{paddingRight:"5px"}}/>
                                                Add a book
                                            </StyledMenuItem>
                                            </ReachLink>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                    <ReachLink to="/user/profile"><FontAwesomeIcon icon={faBookmark}/></ReachLink>

                    <a className="header-button__icon">
                        <Button
                            ref={anchorRefUserMenu}
                            aria-controls={openUserMenu ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggleUserMenu}
                            style={{background:"transparent",outline:"none",border:"0",minWidth:"0"}}
                        >
                            <FontAwesomeIcon icon={faUser} color="white"/>
                        </Button>
                    </a>
                    <Popper open={openUserMenu} anchorEl={anchorRefUserMenu.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' ,backgroundColor:"#252527",color:"white"}}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleCloseUserMenu}>
                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDownUserMenu}>
                                            <ReachLink to="/user/profile" style={{padding:"0"}}>
                                                <StyledMenuItem onClick={handleCloseUserMenu}>
                                                    <FontAwesomeIcon icon={faUser} style={{paddingRight:"5px"}}/>
                                                    Profile
                                                </StyledMenuItem>
                                            </ReachLink>
                                            <ReachLink to="/user/profile" style={{padding:"0"}}>
                                                <StyledMenuItem onClick={handleCloseUserMenu}>
                                                    <FontAwesomeIcon icon={faBookmark} style={{paddingRight:"5px"}}/>
                                                    My bookmarks
                                                </StyledMenuItem>
                                            </ReachLink>
                                            <ReachLink style={{padding:"0"}}>
                                                <StyledMenuItem onClick={authService.logout}>
                                                    <FontAwesomeIcon icon={faRightFromBracket} style={{paddingRight:"5px"}}/>
                                                    Logout
                                                </StyledMenuItem>
                                            </ReachLink>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                </div>
            </div>
        } else {
            return <div className="header-right-menu">
                <div className="header-right-menu__item header-button">
                    <ReachLink to="/login/signIn"><button className="button header__sign header__sign-in">Sign
                        In</button></ReachLink>
                    <ReachLink to="/login/signUp"><button className="button header__sign header__sign-up">Sign
                        Up</button></ReachLink>
                </div>
            </div>
        }
    };

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__item header__left">
                    <ReachLink _focus={{boxShadow: "0 0 0 0px"}} _hover={{color: "white"}}
                          to="/">Library</ReachLink>
                </div>
                <div className="header__item header__menu">
                    <div className="header-menu">
                        <div className="header-menu__item">
                            <ReachLink to="/books">Books</ReachLink>
                        </div>
                        {/*<div className="header-menu__item">*/}
                        {/*    <ReachLink to="/magazines/0/10">Magazines</ReachLink>*/}
                        {/*</div>*/}
                        {/*<div className="header-menu__item">*/}
                        {/*    <ReachLink to="/authors">Authors</ReachLink>*/}
                        {/*</div>*/}
                    </div>
                </div>
                {authorization()}
            </div>
        </header>
    )
};

export default AppNavbar;