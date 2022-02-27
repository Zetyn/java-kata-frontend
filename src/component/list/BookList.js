import React, {useState, useEffect, useRef} from "react";
import AppNavbar from "../AppNavBar";
import {Link as ReachLink, useParams, useHistory} from "react-router-dom";
import bookService from "../../service/book.service";

const BookList = () => {
    let inputField = useRef();
    let params = useParams();
    const history = useHistory();
    const [totalPage, setTotalPage] = useState();

    let currentPage = params.page;
    const firstPage = 0;
    let lastPage = totalPage - 1;
    let nextPage = currentPage + 1;
    let previousPage = currentPage - 1;

    if (nextPage > totalPage) {
        nextPage = totalPage;
    }
    if (previousPage < firstPage) {
        previousPage = firstPage;
    }

    const hrefNextPage = "/library/books/" + nextPage + "/10";
    const hrefLastPage = "/library/books/" + lastPage + "/10";
    const hrefPreviousPage = "/library/books/" + previousPage + "/10";
    const [books, setBooks] = useState([]);

    const init = () => {
        setTimeout(function tick() {
            let link = window.location.href;
            let pageNumber = link.split('/').slice(5, 6).join('/');
            bookService.getAllPage(pageNumber)
                .then(response => {
                    console.log('Printing link', pageNumber);
                    console.log('Printing data', response.data);
                    setTotalPage(response.data.totalPages);
                    setBooks(response.data.content);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }, 100);
    }

    const initSearch = title => {
        bookService.getFound(title)
            .then(response => {
                console.log('Printing data', response.data);
                setBooks(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        init();
    }, []);

    const handleDelete = (id) => {
        console.log('Printing id', id);
        bookService.remove(id)
            .then(response => {
                console.log('author deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const fieldInputScan = () => {
        let data = inputField.current.value;
        history.push("/library/books/search=" + data);
        initSearch(data);
        console.log("String search = ", data);

    }

    return (
        <div>
            <AppNavbar/>
            <div className="page">
                <div className="page__inner">
                    <div className="custom-container container-offset container-responsive">
                        <div className="page__wrapper page-wrapper-left paper">
                            <div className="search__head">
                                <div className="search__header">
                                    <h2 className="search__title">
                                        <span>Books</span>
                                    </h2>
                                </div>
                                <input className="search-input form-input" type="text" placeholder="Search by title..." onChange={fieldInputScan} />
                            </div>
                            <div className="">
                                <div className="media-grid-wrap">
                                    <div className="media-cards-grid">
                                        {
                                           books.map(book => (
                                               <ReachLink className="media-card" to={`/library/books/${book.id}`}>
                                                   <div className="media-card__caption">
                                                       <h5 className="media-card__subtitle">Book</h5>
                                                       <h3 className="media-card__title line-camp">{book.title}</h3>
                                                   </div>
                                               </ReachLink>
                                           ))
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
                                            <div className="search-filter-submenu__name">Genres</div>
                                            <div className="search-filter-submenu__right">

                                            </div>
                                        </div>
                                        <div className="search-filter__checkbox-list">
                                            <div className="control search-filter__checkbox">
                                                <input className="control__input" type="checkbox" value="0"/>
                                                <span className="control__indicator control__indicator_checkbox"></span>
                                                <span className="control__text text-truncate">fantasy </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="search-filter__buttons buttons-stretch">
                                    <button className="button">Reset</button>
                                    <button className="button button_green">Show</button>
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