import React, {useEffect, useState} from "react";
import AppNavBar from "./AppNavBar";
import bookService from "../service/book.service";
import {useParams, Link as ReachLink, useHistory} from "react-router-dom";
import {
    Tab,
    Tabs,
    Box,
    withStyles,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    Popper,
    MenuItem
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {Typography} from "@material-ui/core";
import {
    faPencil,
    faStar,
    faArrowDownShortWide,
    faEye,
    faEyeSlash,
    faChevronDown, faSquarePlus
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRef} from "react/cjs/react.development";
import authService from "../service/auth.service";
import bookmarkService from "../service/bookmark.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";

const Details = () => {
    //book
    const [book, setBooks] = useState([]);
    const [genres,setGenres] = useState([]);
    const [images, setImages] = useState([]);
    const [chapters, setChapter] = useState();
    const [bookmark,setBookmark] = useState('');
    const {id} = useParams();
    //add to the list menu
    const [openMenu, setOpenMenu] = useState(false);
    const anchorRefMenu = useRef(null);
    const prevOpenMenu = useRef(openMenu);
    //bookImage
    const bookImageName = images.map((image) => image.imageName);
    const bookImageURl = "/img/bookImages/" + bookImageName;

    const [textUpdate,setTextUpdate] = useState('');

    const history = useHistory();

    const init = () => {
        bookService.getById(id)
            .then(response => {
                setBooks(response.data);
                setImages(response.data.images);
                setGenres(response.data.genres);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
        bookmarkService.getBookmark(id)
            .then(response => {
                bookmarkName(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        bookService.getAllChaptersNameAndNumber(id)
            .then(response => {
                setChapter(response.data);
            })
            .catch(error => {
                console.log('Something went wrong',error);
            })
    }

    useEffect(() => {
        init();
        if (prevOpenMenu.current === true && openMenu === false) {
            anchorRefMenu.current.focus();
        }
        prevOpenMenu.current = openMenu;
    }, []);

    function TabPanel(props) {
        const {children, value, index, p, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                style={{padding: `${p}px`}}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography style={{
                            letterSpacing: "normal",
                            fontFamily: "-apple-system, BlinkMacSystemFont, Open Sans, Roboto, Helvetica Neue, Helvetica, sans-serif"
                        }}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
        p: PropTypes.any.isRequired,
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
            letterSpacing: "normal",
            minWidth: '80px',
            textTransform: 'none',
            fontFamily: '-apple-system,BlinkMacSystemFont,Open Sans,Roboto,Helvetica Neue,Helvetica,sans-serif',
            color: '#fff',
            fontWeight: "400",
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

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
        },
    }));

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //add to the list menu
    const handleToggleMenu = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleCloseMenu = (event) => {
        if (anchorRefMenu.current && anchorRefMenu.current.contains(event.target)) {
            return;
        }
        setOpenMenu(false);
    };

    function handleListKeyDownMenu(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

    const StyledMenuItem = withStyles((theme) => ({
        root: {
            position: "relative",
            padding: "10px 14px",
            margin: "0",
            color: "#ddd",
            fontWeight: "400",
            fontSize: "13px",
            lineHeight: "1",
            whiteSpace: "nowrap",
            transition: "color .2s ease",
            cursor: "pointer",
            '&:hover': {
                backgroundColor: "#303032",
            },

        },
    }))(MenuItem);

    const addBookmark = (e) => {
        let title = e.target.id;
        let user = authService.userInfo();
        let userId = user.id;
        let bookId = book.id;
        let data = {title,userId,bookId};
        bookmarkService.addBookmark(data);
        bookmarkName(title);
    }

    const bookmarkName = (title) => {
        if (title === "read") {
            return setTextUpdate("Read")
        } else if (title === "iRead") {
            return setTextUpdate("I read")
        } else if (title === "inThePlans") {
            return setTextUpdate("In the plans")
        } else if (title === "favorite") {
            return setTextUpdate("Favorite")
        } else if (title === "thrown") {
            return setTextUpdate("Thrown")
        } else {
            return setTextUpdate("Add to the list")
        }
    }

    const handleDelete = () => {
         bookService.remove(book.id)
            .then(response => {
                console.log('author deleted successfully', response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
         history.push("/books");
    }

    return (
        <div>
            <AppNavBar/>
            <div className="page">
                <div className="page__inner">
                    <div className="custom-container container-responsive">
                        <div className="media-container">
                            <div className="media-sidebar">
                                <div className="section">
                                    <div className="media-sidebar__cover paper">
                                        <img src={bookImageURl} alt="test" width="250px" height="350px"/>
                                        <div className="media-sidebar-actions">
                                            <div className="media-sidebar-actions__item" >
                                            </div>
                                            <ReachLink className="media-sidebar-actions__item" to={"/"+book.id+"/add-chapter"}>
                                                <FontAwesomeIcon icon={faSquarePlus} />
                                            </ReachLink>
                                            <ReachLink className="media-sidebar-actions__item" to={"/edit/"+book.id}>
                                                <FontAwesomeIcon icon={faPencil} />
                                            </ReachLink>
                                            <span className="media-sidebar-actions__item link-hover" onClick={handleDelete}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="media-sidebar__buttons section">
                                    <ReachLink className="button button_block button_primary" to={"/"+book.id+"/v1/c1"}>
                                        Start reading
                                    </ReachLink>
                                    <button className="button button_block button_primary"
                                            ref={anchorRefMenu}
                                            aria-controls={openMenu ? 'menu-list-grow' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggleMenu}
                                            style={{position:"relative"}}
                                    >
                                        <div className="text-truncate">
                                            {textUpdate}
                                            <Popper open={openMenu} anchorEl={anchorRefMenu.current} role={undefined} transition disablePortal>
                                                {({ TransitionProps, placement }) => (
                                                    <Grow
                                                        {...TransitionProps}
                                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' ,backgroundColor:"#252527",color:"white",width:"250px",marginTop:"5px"}}
                                                    >
                                                        <Paper>
                                                            <ClickAwayListener onClickAway={handleCloseMenu}>
                                                                <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDownMenu}>
                                                                    <StyledMenuItem onClick={addBookmark} id="iRead">
                                                                        I read
                                                                    </StyledMenuItem>
                                                                    <StyledMenuItem onClick={addBookmark} id="inThePlans">
                                                                        In the plans
                                                                    </StyledMenuItem>
                                                                    <StyledMenuItem onClick={addBookmark} id="read">
                                                                        Read
                                                                    </StyledMenuItem>
                                                                    <StyledMenuItem onClick={addBookmark} id="thrown">
                                                                        Thrown
                                                                    </StyledMenuItem>
                                                                    <StyledMenuItem onClick={addBookmark} id="favorite">
                                                                        Favorite
                                                                    </StyledMenuItem>
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronDown} style={{position:"absolute", top: "9px",right: "10px"}}/>
                                    </button>
                                </div>
                                <div className="media-info-list paper">
                                    <a className="media-info-list__item" href="#">
                                        <div className="media-info-list__title">Year of issue</div>
                                        <div className="media-info-list__value">{}</div>
                                    </a>
                                    <a className="media-info-list__item" href="#">
                                        <div className="media-info-list__title">Date added</div>
                                        <div className="media-info-list__value">{book.dateAdded}</div>
                                    </a>
                                    <a className="media-info-list__item" href="#">
                                        <div className="media-info-list__title">Author</div>
                                        <div className="media-info-list__value">{}</div>
                                    </a>
                                    <a className="media-info-list__item" href="#">
                                        <div className="media-info-list__title">Chapters</div>
                                        <div className="media-info-list__value">{}</div>
                                    </a>
                                </div>
                            </div>

                            <div className="media-content media-content_side">
                                <div className="media-name section">
                                    <div className="media-name__body">
                                        <div className="media-name__main">
                                            {
                                                book.title
                                            }
                                        </div>
                                    </div>
                                    <div className="media-rating-wrap">
                                        <div className="media-rating media-rating_lg">
                                            <FontAwesomeIcon icon={faStar} color="orange"/>
                                            <span style={{fontSize: "22px", paddingLeft: "5px"}}>{}4.5</span>
                                            <span style={{fontSize: "16px", paddingLeft: "5px"}}>{}4.5</span>
                                        </div>
                                        <div className="button button_sm button_white media-rating-wrap__btn">
                                            <span>
                                                <FontAwesomeIcon icon={faStar}/>
                                                <span style={{paddingLeft: "5px"}}>Rating</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="tabs paper">
                                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} style={{padding: "0px 18px"}}>
                                        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs__list">
                                            <StyledTab label="Info" {...a11yProps(0)} />
                                            <StyledTab label="Chapters" {...a11yProps(1)} />
                                        </StyledTabs>
                                    </Box>
                                    <TabPanel value={value} index={0} p={20}>
                                        {book.description}
                                        <div className="media-tags">
                                            {
                                                genres.map(genre => (
                                                    <ReachLink className="media-tag-item" to={"/books?genres="+ genre.id}>{genre.genre}</ReachLink>
                                                ))
                                            }
                                        </div>
                                        <div className="media-section media-section_stats">
                                            <div className="media-section__col">
                                                <div className="media-section__head">
                                                    <div className="media-section__title">
                                                        There are {} people on the lists
                                                    </div>
                                                </div>
                                                <div className="media-stats">
                                                    <div className="media-stats-item">
                                                        <div className="media-stats-item__column media-stats-item__title">
                                                            I read
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div className="media-stats-item__column media-stats-item__title">
                                                            In the plans
                                                        </div>
                                                        <div className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div className="media-stats-item__column media-stats-item__title">Thrown
                                                        </div>
                                                        <div className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div
                                                            className="media-stats-item__column media-stats-item__title">Read
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div
                                                            className="media-stats-item__column media-stats-item__title">Favorite
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="media-section__col">
                                                <div className="media-section__head">
                                                    <div className="media-section__title">User Ratings</div>
                                                </div>
                                                <div className="media-stats">
                                                    <div className="media-stats-item">
                                                        <div
                                                            className="media-stats-item__column media-stats-item__title">
                                                            <span>5</span>
                                                            <FontAwesomeIcon icon={faStar}
                                                                             style={{paddingLeft: "5px"}}/>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div
                                                            className="media-stats-item__column media-stats-item__title">
                                                            <span>4</span>
                                                            <FontAwesomeIcon icon={faStar}
                                                                             style={{paddingLeft: "5px"}}/>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div
                                                            className="media-stats-item__column media-stats-item__title">
                                                            <span>3</span>
                                                            <FontAwesomeIcon icon={faStar} style={{paddingLeft: "5px"}}/>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div
                                                            className="media-stats-item__column media-stats-item__title">
                                                            <span>2</span>
                                                            <FontAwesomeIcon icon={faStar}
                                                                             style={{paddingLeft: "5px"}}/>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                    <div className="media-stats-item">
                                                        <div
                                                            className="media-stats-item__column media-stats-item__title">
                                                            <span>1</span>
                                                            <FontAwesomeIcon icon={faStar}
                                                                             style={{paddingLeft: "5px"}}/>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__column_progress">
                                                            <div className="media-stats-item__progress progress">
                                                                <div className="media-stats-item__progress-bar progress__bar" style={{width: {}}}></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__percent">{}</div>
                                                        <div
                                                            className="media-stats-item__column media-stats-item__count">{}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} p={0}>
                                        <div className="section paper">
                                            <div className="media-chapters-head">
                                                <div className="media-section" style={{boxShadow: "inset 0 -1px 0 #38383a"}}>
                                                    <div className="button button_sm media-chapters-sort">
                                                        <FontAwesomeIcon icon={faArrowDownShortWide}/>
                                                        <span style={{paddingLeft: "5px"}}>Sort</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="media-section media-chapters-list">
                                                <div className="recycle-scroller">
                                                    <div className="recycle-scroller__item-wrapper">
                                                        <div className="recycle-scroller__item-view">
                                                            {chapters?.map(c => (
                                                                <div className="media-chapter">
                                                                    <div className="media-chapter__icon">
                                                                        <FontAwesomeIcon icon={faEye}/>
                                                                    </div>
                                                                    <div className="media-chapter__body">
                                                                        <div
                                                                            className="media-chapter__name text-truncate">
                                                                            <ReachLink className="link-default" to={"/"+book.id+"/v"+c.volumeNumber+"/c"+c.chapterNumber}>Volume {c.volumeNumber} Chapter {c.chapterNumber} - {c.name}</ReachLink>
                                                                        </div>
                                                                        <div
                                                                            className="media-chapter__username text-truncate">
                                                                            Test
                                                                        </div>
                                                                        <div className="media-chapter__date">
                                                                            {c.dateAdded}
                                                                        </div>
                                                                    </div>
                                                                    <div className="media-chapter__actions">
                                                                        <a className="media-chapter__icon">
                                                                            <FontAwesomeIcon icon={faPencil}/>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Details;