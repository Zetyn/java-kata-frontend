import React, {useState, useEffect, useRef} from "react";
import AppNavbar from "./AppNavBar";
import {Link as ReachLink, useHistory} from "react-router-dom";
import bookService from "../service/book.service";
import { makeStyles,Checkbox,FormControlLabel } from "@material-ui/core";
import clsx from "clsx";
import genreService from "../service/genre.service";

let linkArray = [];
let searchString;

const BookList = () => {
    let inputField = useRef();
    // let params = useParams();
    const history = useHistory();
    const [totalPage, setTotalPage] = useState();
    const [checkedArray, setCheckedArray] = useState([]);

    // let currentPage = params.page;
    // const firstPage = 0;
    // let lastPage = totalPage - 1;
    // let nextPage = currentPage + 1;
    // let previousPage = currentPage - 1;

    // if (nextPage > totalPage) {
    //     nextPage = totalPage;
    // }
    // if (previousPage < firstPage) {
    //     previousPage = firstPage;
    // }

    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);

    const useStyles = makeStyles({
        icon: {
            borderRadius: 3,
            width: 16,
            height: 16,
            transition: ".15s ease",
            boxShadow: 'inset 0 0 0 1px #3b3d45, inset 0 -1px 0 #3b3d45',
            backgroundColor: "#1a1a1a",
            "input:hover ~ &": {
                borderColor: "#4b4d4b"
            }
        },
        checkedIcon: {
            backgroundColor: "orange",
            "&:before": {
                display: "block",
                width: 16,
                height: 16,
                backgroundImage:
                    "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
                    " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
                    "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
                content: '""'
            }
        }
    });

    function StyledCheckbox(props) {
        const classes = useStyles();
        return (
            <Checkbox
                disableRipple
                color="default"
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                inputProps={{ "aria-label": "decorative checkbox" }}
                {...props}
            />
        );
    }

    const init = () => {
        setTimeout(function tick() {
            // let link = window.location.href;
            let pageNumber = 0;
            bookService.getAllPage(pageNumber)
                .then(response => {
                    // console.log('Printing link', pageNumber);
                    // console.log('Printing data', response.data);
                    setTotalPage(response.data.totalPages);
                    setBooks(response.data.content);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
            genreService.getAll()
                .then(response => {
                    setGenres(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }, 100);
    }

    const initSearch = title => {
        bookService.getFound(title)
            .then(response => {
                // console.log('Printing data', response.data);
                setBooks(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const initSearchFilter = genres => {
        bookService.getByGenres(genres)
            .then(response => {
                setBooks(response.data);
                // console.log('Printing data by genres', response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    // const initSearchAndSearchFilter = (title,genres) => {
    //     bookService.getByTitleAndGenres(title,genres)
    //         .then(response => {
    //             setBooks(response.data);
    //             console.log("SearchAndFilter ",response.data);
    //         })
    //         .catch(error => {
    //             console.log('Something went wrong', error);
    //         })
    // }

    useEffect(() => {
        init();
        return () => {
            setBooks({});
        };
    }, []);

    // const handleDelete = (id) => {
    //     console.log('Printing id', id);
    //     bookService.remove(id)
    //         .then(response => {
    //             console.log('author deleted successfully', response.data);
    //             init();
    //         })
    //         .catch(error => {
    //             console.log('Something went wrong', error);
    //         })
    // }

    const fieldInputScan = () => {
        searchString = inputField.current.value;
        if (searchString != null) {
            // if (linkArray.length > 0) {
            //     history.push("/library/book?search="+searchString+"&genres="+linkArray);
            // } else {
                history.push("/books?search=" + searchString);
                initSearch(searchString);
            // }
        }
        console.log("String search = ", searchString);
    }

    const checkboxScan = (e) => {
        const index = checkedArray.indexOf(e.target.value);
        if (index === -1) {
            setCheckedArray([...checkedArray,e.target.value]);

        } else {
            setCheckedArray(checkedArray.filter((c) => c !== e.target.value));
        }

        if (linkArray.includes(e.target.value)) {
            let myIndex = linkArray.indexOf(e.target.value);
            linkArray.splice(myIndex,1);
        } else {
            linkArray.push(e.target.value);
        }

        if (linkArray.length > 0) {
            // if (searchString != null) {
            //     history.push("/library/books?search="+searchString+"&genres="+linkArray);
            // } else {
                history.push("/books?genres=" + linkArray);
                initSearchFilter(linkArray);
            // }
        } else {
            history.push("/books");
            init();
        }
    }

    return (
        <div>
            <AppNavbar/>
            <div className="page">
                <div className="page__inner">
                    <div className="custom-container container-offset container-responsive">
                        <div className="page__wrapper page-wrapper-left paper book-search">
                            <div className="search__head">
                                <div className="search__header">
                                    <h2 className="search__title">
                                        <span>Books</span>
                                    </h2>
                                </div>
                                <input className="search-input form-input" type="text" placeholder="Search by title..." onChange={fieldInputScan} ref={inputField}/>
                            </div>
                            <div>
                                <div className="media-grid-wrap">
                                    <div className="media-cards-grid">
                                        {
                                            books ?
                                           books.map(book => (
                                               <ReachLink className="media-card" to={`/${book.id}`} style={{backgroundImage:`url(/img/bookImages/${book.images.map(image => (image.imageName))})`}}>
                                                   <div className="media-card__caption">
                                                       <h5 className="media-card__subtitle">Book</h5>
                                                       <h3 className="media-card__title line-camp">{book.title} </h3>
                                                   </div>
                                               </ReachLink>
                                           ))
                                               : <h2>Books not founded</h2>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="paper search-filter">
                            <div className="search-filter-layout">
                                <div className="search-filter-wrap">
                                    <div className="search-filter__filters">
                                        <div className="search-filter-submenu">
                                            <div className="search-filter-submenu__name" style={{borderBottom: "1px solid #38383a",fontWeight: "500",paddingLeft: "40%"}}>Genres</div>
                                            <div className="search-filter-submenu__right">

                                            </div>
                                        </div>
                                        <div className="search-filter__checkbox-list" style={{maxWidth:"100px"}}>
                                            {
                                                genres.map(genre => (
                                                    <FormControlLabel
                                                        control={<StyledCheckbox
                                                            onChange={checkboxScan}
                                                            value={genre.id}
                                                            checked={checkedArray.includes(genre.id.toString())}
                                                        />
                                                        }
                                                        label={genre.genre}
                                                        labelPlacement="end"
                                                    />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookList;