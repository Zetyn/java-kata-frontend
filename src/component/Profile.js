import React, { useState, useEffect} from "react";
import {Link as ReachLink, useHistory, useParams} from "react-router-dom";
import AppNavbar from "./AppNavBar";
import authService from "../service/auth.service";
import authorService from "../service/author.service";
import {faUser, faCog, faTrash, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Box, makeStyles, Tab, Tabs, Typography, withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import bookmarkService from "../service/bookmark.service";



const Profile = () => {
    const user = authService.userInfo();
    //---------------------USER--------------------------
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const {id} = useParams();
    //------------------BOOK-----------------------------
    const [books,setBooks] = useState([]);

    const getUserBookmarks = () => {
      bookmarkService.getUserBookmarks()
          .then(response => {
              console.log('Printing genres', response.data);
              setBooks(response.data);
          })
          .catch(error => {
              console.log('Something went wrong', error);
          })
    }

    useEffect(() => {
        getUserBookmarks();
    },[])

    // const updateUser = (e) => {
    //     e.preventDefault();
    //     const author = {firstName, lastName, email, id};
    //
    //     if (id) {
    //         //update
    //         authService.updateUser(author)
    //             .then(response => {
    //                 console.log('Author/User data updated successfully',response.data);
    //                 history.push('/');
    //             })
    //             .catch(error => {
    //                 console.log('Something went wrong',error);
    //             })
    //     }
    // }

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    const StyledTabs = withStyles({
        indicator: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            '& > span': {
                width: '100%',
                backgroundColor: '#f28500',
            },
        },
    })((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>)

    const StyledTab = withStyles((theme) => ({
        root: {
            minWidth: '80px',
            textTransform: 'none',
            fontFamily:'-apple-system,BlinkMacSystemFont,Open Sans,Roboto,Helvetica Neue,Helvetica,sans-serif',
            color: '#fff',
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: theme.typography.pxToRem(14),
            marginRight: theme.spacing(1),
            '&:focus': {
                opacity: 1,
            },
        },
    }))((props) => <Tab disableRipple {...props} />);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // const useStyles = makeStyles((theme) => ({
    //     root: {
    //         flexGrow: 1,
    //         backgroundColor: theme.palette.background.paper,
    //     },
    // }));
    //
    // const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
            // authorService.get(id)
            //     .then(author => {
            //         setFirstName(author.data.firstName);
            //         setLastName(author.data.lastName);
            //         setEmail(author.data.email);
            //     })
            //     .catch(error => {
            //         console.log('Something went wrong',error)
            //     })
    },[])

    return (
        <div>
            <AppNavbar />
            <div className="page">
                <div className="page__inner">
                    <div className="profile custom-container container-responsive">
                        <div className="profile-header paper">
                            <div className="profile-background"></div>
                            <div className="profile-header__wrap section-body">
                                <div className="profile-user">
                                    <div className="profile-user__avatar-wrap">
                                        {/*<img src="" alt="" className="profile-user__avatar avatar avatar_round avatar_md shadow-sm"/>*/}
                                        <FontAwesomeIcon icon={faUser} size="3x" />
                                    </div>
                                    <div className="profile-header__body">
                                        <div className="profile-user__username">
                                            <span className="mr-10">{user.firstName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-actions">
                                    <ReachLink className="button button_sm" title="change settings" to="/user/profile/edit"><FontAwesomeIcon icon={faCog} /> Settings</ReachLink>
                                </div>
                            </div>
                            <div className="profile-nav">
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <StyledTabs value={value} onChange={handleChange}
                                                aria-label="basic tabs example" className="tabs__list">
                                        <StyledTab label="Lists" {...a11yProps(0)} className="tabs__item"/>
                                    </StyledTabs>
                                </Box>
                            </div>
                        </div>
                        <div className="bookmark-container">
                            <div className="bookmark-sidebar">
                                    <div className="bookmark-sidebar__panel">
                                        <div className="menu menu_page menu_sm bookmark-menu">
                                            <div className="menu__item link-hover">
                                                <span className="bookmark-menu__name">All</span>
                                                <span className="bookmark-menu__label"></span>
                                            </div>
                                            <div className="menu__item link-hover">
                                                <span className="bookmark-menu__name">I read</span>
                                                <span className="bookmark-menu__label"></span>
                                            </div>
                                            <div className="menu__item link-hover">
                                                <span className="bookmark-menu__name">In the plans</span>
                                                <span className="bookmark-menu__label"></span>
                                            </div>
                                            <div className="menu__item link-hover">
                                                <span className="bookmark-menu__name">Thrown</span>
                                                <span className="bookmark-menu__label"></span>
                                            </div>
                                            <div className="menu__item link-hover">
                                                <span className="bookmark-menu__name">Read</span>
                                                <span className="bookmark-menu__label"></span>
                                            </div>
                                            <div className="menu__item link-hover">
                                                <span className="bookmark-menu__name">Favorite</span>
                                                <span className="bookmark-menu__label"></span>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bookmark-wrapper">
                                <div className="bookmark-input">
                                    <input type="text" placeholder="Search by title..." className="form__input bookmark-input__filter"/>
                                </div>
                                <div className="flex justify_between align-items_center">
                                    <div className="menu menu_page menu_sm bookmark-menu">
                                        <div className="menu__item">
                                            <span className="bookmark-menu__name">All</span>
                                            <span className="bookmark-menu__label"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bookmark__list paper">
                                    <TabPanel value={value} index={0}>
                                        {
                                            books.map(bookmark => (
                                                bookmark.books.map(book => (
                                                    <div className="bookmark-item">
                                                        <div className="bookmark-item__body">
                                                            <div className="bookmark-item__cover-wrap">
                                                                <div className="bookmark-item__cover shadow-sm" style={{backgroundImage:`url(/img/bookImages/${book.images.map(image => (image.imageName))})`}}>
                                                                </div>
                                                            </div>
                                                            <div className="bookmark-item__content">
                                                                <div className="bookmark-item__info">
                                                                    <div className="line-clamp">
                                                                        <ReachLink className="bookmark-item__name" to={`/${book.id}`}>
                                                                            <span>{book.title}</span>
                                                                        </ReachLink>
                                                                    </div>
                                                                    {/*<div className="bookmark-item__info-subheader">*/}
                                                                    {/*    <a className="link-default">{}</a>*/}
                                                                    {/*</div>*/}
                                                                </div>
                                                                <div className="bookmark-item__actions" >
                                                                    <FontAwesomeIcon icon={faTrashCan} color="red"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ))
                                        }
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer paper">
                    <div className="footer__inner custom-container">

                    </div>
                </footer>
            </div>
        </div>
    )
}
export default Profile;