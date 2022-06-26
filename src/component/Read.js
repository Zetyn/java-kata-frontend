import React, {useState, useEffect} from "react";
import {Link as ReachLink, useParams, useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faAngleLeft, faAngleRight, faCog, faBookmark, faList, faUser} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {Drawer, ListItem, List, Button, ListItemText} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import bookService from "../service/book.service";

const Read = () => {

    const history = useHistory();
    const [chapter,setChapter] = useState();
    const [allChapters,setAllChapters] = useState();
    const [chapterText,setChapterText] = useState();
    const {id} = useParams();
    let bookId = id;
    let nextChapter;
    let chapterNumber = chapter?.chapterNumber;
    let chapterCount = allChapters?.length;
    let previousChapter;

    const skipToNextChapter = () => {
        if (chapterCount > chapterNumber) {
            nextChapter = chapter?.chapterNumber + 1;
            return "/" + bookId + "/v" + chapter?.volumeNumber + "/c" + nextChapter;
        } else if (chapterCount <= chapterNumber) {
            return "/"+bookId;
        }
    }
    const skipToPreviousChapter = () => {
        if (chapterNumber > 1) {
            previousChapter = chapterNumber - 1;
            return "/" + bookId + "/v" + chapter?.volumeNumber + "/c" + previousChapter;
        } else if (chapterNumber <= 1) {
            return "/" + bookId + "/v" + chapter?.volumeNumber + "/c" + chapterNumber;
        }
    }

    (function (history) {
        var pushState = history.pushState;
        history.pushState = function (state) {
            setTimeout(function () {
                window.location.reload();
            }, 50);
            return pushState.apply(history, arguments);
        };
    })(window.history);

    const init = () => {
        let volumeNum = 1;
        let chapterNum = history.location.pathname.split("c")[1];
        let chapter = {bookId,volumeNum,chapterNum};
        bookService.getChapter(chapter)
            .then(response => {
                setChapter(response.data);
                console.log('Printing chapter', response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        bookService.getChapterText(chapter)
            .then(response => {
                setChapterText(response.data);
                console.log('Print chapter text', response.data);
            })
            .catch(error => {
                console.log('Something went wrong',error);
            })
        bookService.getAllChaptersNameAndNumber(id)
            .then(response => {
                setAllChapters(response.data);
            })
            .catch(error => {
                console.log('Something went wrong',error);
            })
    }

    useEffect(() => {
        init();
    }, []);

    const useStyles = makeStyles({
        list: {
            width: 400,
            backgroundColor:"#1c1c1e",
            height:"100%",
        },
    });

    const classes = useStyles();
    const [openMenuList, setOpenMenuList] = useState(false);
    const [openChaptersList, setOpenChaptersList] = useState(false);

    const toggleDrawerMenu = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setOpenMenuList(open);
    };
    const toggleDrawerChapters = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setOpenChaptersList(open);
    };

    const menuList = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawerMenu(false)}
            onKeyDown={toggleDrawerMenu(false)}
        >
            <List style={{paddingTop:0}}>
                <ReachLink to="/" style={{padding:0}} className="m-menu__link">
                    <ListItem button>
                        <ListItemText primary="Home" />
                    </ListItem>
                </ReachLink>
                <ReachLink to="/" style={{padding:0}} className="m-menu__link">
                    <ListItem button>
                        <ListItemText primary="Home" />
                    </ListItem>
                </ReachLink>
            </List>
        </div>
    );
    const chaptersList = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawerChapters(false)}
            onKeyDown={toggleDrawerChapters(false)}
        >
            <List style={{paddingTop:0}}>
                <div className="modal__header__reader">
                    <div className="modal__title">Table of contents</div>
                </div>
                {allChapters?.map(c => (
                    <ReachLink style={{padding:0}} to={"/"+bookId+"/v"+c.volumeNumber+"/c"+c.chapterNumber}>
                        <ListItem button>
                            <ListItemText primary={"Volume " + c.volumeNumber + " Chapter " + c.chapterNumber + " - " + c.name} />
                        </ListItem>
                    </ReachLink>
                ))}
            </List>
        </div>
    );

    const menuHeader = () => {
      if (localStorage.getItem("user")) {
          return (
              <div className="m-menu__profile" style={{backgroundColor:"#1c1c1e"}}>
                  <ReachLink className="m-menu__user-info" to="/user/profile">
                      <FontAwesomeIcon icon={faUser} size={"3x"}/>
                      <span className="m-menu__name">User{}</span>
                  </ReachLink>
              </div>
          )
      } else {
          return (
              <div className="m-menu__sign" style={{backgroundColor:"#1c1c1e"}}>
                  <ReachLink className="button">Sign up</ReachLink>
                  <ReachLink className="button" style={{float:"right"}}>Sign in</ReachLink>
              </div>
          )
      }
    }

    return (
        <div>
            <div className="reader">
                <div>
                    <Drawer
                        open={openMenuList}
                        onClose={toggleDrawerMenu(false)}
                    >
                        {menuHeader()}
                        {menuList()}
                    </Drawer>
                </div>
                <div>
                    <Drawer
                        anchor="right"
                        open={openChaptersList}
                        onClose={toggleDrawerChapters(false)}
                    >
                        {chaptersList()}
                    </Drawer>
                </div>
                <div className="header header_reader headroom">
                    <div className="reader-header__wrapper">
                        <div className="reader-header-action reader-header-action_icon" style={{marginRight:"20px"}} onClick={toggleDrawerMenu(true)}>
                            <FontAwesomeIcon icon={faBars}/>
                        </div>
                        <ReachLink to={"/"+bookId}>
                            <div className="reader-header-action reader-header-action_full link-hover" style={{flexDirection: "column",marginRight:"20px"}}>
                                <div className="reader-header-action__title text-truncate">
                                    Title
                                </div>
                                <div className="reader-header-action__text text-truncate">
                                    {chapter?.book.title}
                                </div>
                            </div>
                        </ReachLink>
                        <div className="reader-header-action">
                            <ReachLink className="reader-header-action reader-header-action_icon" to={skipToPreviousChapter}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </ReachLink>
                            <div className="reader-header-action link-hover" style={{flexDirection: "column"}} onClick={toggleDrawerChapters(true)}>
                                <div className="reader-header-action__title">
                                    Table of contents
                                </div>
                                <div className="reader-header-action__text">
                                    Volume {chapter?.volumeNumber} Chapter {chapter?.chapterNumber}
                                </div>
                            </div>
                            <ReachLink className="reader-header-action reader-header-action_icon" to={skipToNextChapter}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </ReachLink>
                        </div>
                        <div className="reader-header-actions reader-header-actions_right">
                            <div className="reader-header-action reader-header-action_icon reader-bookmark">
                                <span className="">
                                    <FontAwesomeIcon icon={faBookmark} size="sm"/>
                                </span>
                            </div>
                            <div className="reader-header-action reader-header-action_icon" onClick={toggleDrawerChapters(true)}>
                                <span className="">
                                    <FontAwesomeIcon icon={faList} size="sm"/>
                                </span>
                            </div>
                            <div className="reader-header-action reader-header-action_icon">
                                <span className="">
                                    <FontAwesomeIcon icon={faCog} size="sm"/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="reader-container custom-container container_center">
                    {chapterText?.map(c => <p>{c.data.text}</p>)}

                </div>
                <div className="section ads">
                    <div className="ads__wrap">
                        <div className="ads__title">Advertising</div>
                    </div>
                </div>
                <div className="custom-container container_center">
                    <div className="reader-review">
                        <div className="reader-review-team">
                            <span className="reader-review-team__body">
                                <div className="text-muted small text-truncate">
                                    Chapter added
                                </div>
                                <div className="reader-review-team__name text-truncate">
                                    <span>
                                        <a className="link-default">
                                            {}
                                        </a>
                                    </span>
                                </div>
                            </span>
                        </div>
                        <div className="reader-review__right">
                            <div className="reader-review-btn is-full">
                                <div className="reader-review-btn__icon">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                <div className="reader-review-btn__text">
                                    <div className="reader-review-btn__text-up">
                                        Say thanks
                                    </div>
                                    <div className="reader-review-btn__stats reader-review-btn__stats_full">
                                        thanked:
                                        <span>
                                            {}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="custom-container container_center">
                        <div className="reader-next">
                            <div className="reader-next__buttons">
                                <ReachLink className="reader-next__btn button text-truncate button_label" to={skipToPreviousChapter}>
                                    <FontAwesomeIcon icon={faAngleLeft} className="icon" />
                                    <span>Previous chapter</span>
                                </ReachLink>
                                <ReachLink className="reader-next__btn button text-truncate button_label button_label_right" to={skipToNextChapter}>
                                    <span>Next chapter</span>
                                    <FontAwesomeIcon icon={faAngleRight} className="icon" />
                                </ReachLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Read;