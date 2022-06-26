import React, { useState, useEffect } from "react";
import {Link as ReachLink, useHistory, useParams} from "react-router-dom";
import AppNavbar from "./AppNavBar";
import bookService from "../service/book.service";
import {
    FormControl,
    Chip,
    Input,
    Select,
    MenuItem,
    useTheme,
    makeStyles,
    TextareaAutosize
} from "@material-ui/core";
import { faTrash,faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import genreService from "../service/genre.service";

const BookEdit = () => {
    // const user = JSON.parse(localStorage.getItem("user"));
/*
    const authorModel = {
        email:user.email
    }

 */
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    //const [authors, setAuthors] = useState([authorModel]);
    const [description, setDescription] = useState('');
    const [imageNames, setImageNames] = useState('');
    const [allGenres, setAllGenres] = useState([]);
    const [file, setFile] = useState('');
    const history = useHistory();
    const {id} = useParams();
    let f;//file name

    const [chipDataGenres,setChipDataGenres] = useState([]);
    // const [chipDataAuthors,setChipDataAuthors] = useState([]);

    // const theme = useTheme();

    const log = () => {
        console.log(title);
        console.log("----------");
        console.log(isbn);
        console.log("----------");
        console.log(description);
        console.log("----------");
        console.log(chipDataGenres);
        console.log("----------");
        console.log(imageNames);
    }

    const useStyles = makeStyles((theme) => ({
        formControl: {
            minWidth: 120,
            width: "100%",
            backgroundColor:"#1a1a1a",
            border:"1px solid #38383a",
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
            marginRight: 0,
            backgroundColor: "#ffa332",
            borderRadius: 3,
        },
        noLabel: {
            marginTop: theme.spacing(3)
        }
    }));

    const classes = useStyles();
    const ITEM_HEIGHT = 42;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                top:"408px",
                marginTop:"50px",
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
                backgroundColor:"#1a1a1a",
                border:"1px solid #3838a",
                color:"#ddd",
                fontSize:"14px"
            }
        }
    };

    // const authors = [
    //     { key: 0, value: "A1" },
    //     { key: 1, value: "A2" },
    //     { key: 2, value: "A3" },
    //     { key: 3, value: "A4" },
    // ];

    const handleChangeGenres = (event) => {
        setChipDataGenres(event.target.value);
    };

    // const handleChangeAuthors = (event) => {
    //     setChipDataAuthors(event.target.value);
    // };

    const handleDeleteGenres = (chipToDelete) => () => {
        console.log("Chips: ",chipToDelete);
        setChipDataGenres( chipDataGenres.filter((chip) => chip !== chipToDelete));
    };
    // const handleDeleteAuthors = (chipToDelete) => () => {
    //     setChipDataAuthors((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    // };

    const saveBook = (e) => {
        e.preventDefault();
        let imgFile = file.split(",")[1];
        let genres = chipDataGenres;
        const bookCreate = {title, isbn, description, genres, imageNames, imgFile};
        const bookUpdate = {title, isbn, description, id, genres, imageNames, imgFile};
        if (id) {
            //update
            bookService.update(bookUpdate)
                .then(response => {
                    console.log('Book data updated successfully', response.data);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        } else {
            //create
            bookService.create(bookCreate)
                .then(response => {
                    console.log('Book added successfully', response.data);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }

    const getGenres = () => {
        genreService.getAll()
            .then(genres => {
                console.log("GENRES: ",genres.data);
                setAllGenres(genres.data);
            })
            .catch(error => {
                console.log('Something went wrong', error)
            })
    }

    const getBook = () => {
        if (!id) {
            return;
        }
        bookService.getById(id)
            .then(book => {
                console.log("Book: ", book);
                setTitle(book.data.title);
                setIsbn(book.data.isbn);
                setChipDataGenres(book.data.genres.map((genre) => (genre.genre)));
                setImageNames(book.data.imageNames);
                //setAuthors(book.data.author);
                setDescription(book.data.description);
            })
            .catch(error => {
                console.log('Something went wrong', error)
            })
    }

    function CustomMenuItem(props) {
        const {data,key,value,d, ...other} = props;
        return (
            <MenuItem
            style={{display:`${d}`}}
            key={key}
            value={value}
            {...other}
            >
                {data}
            </MenuItem>
        );
    }

    useEffect(() => {
        getBook();
        getGenres();
    },[])

    const handleChangeImg = (e) => {
        f = e.target.files[0];
        setImageNames(f.name);
        let reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onloadend = function (e) {
            setFile(reader.result);
        }
    }


    return (
        <div>
            <AppNavbar />
            <div className="page">
                <div className="page__inner">
                    <div className="custom-container container-offset container_center">
                        <div className="section paper">
                            <div className="section__header">
                                <strong>Create book</strong>
                            </div>
                            <div className="media-edit-uploader">
                                <div className="uploader uploader_cover">
                                    <div className="uploader-title">
                                        Cover
                                    </div>
                                    <div className="uploader-wrap">
                                        <label className="uploader-trigger">
                                            <div className="uploader-trigger__caption">
                                                <div className="uploader-trigger__icon">
                                                    <FontAwesomeIcon icon={faCloudUpload}/>
                                                </div>
                                                <div>
                                                    Click or drag an image to upload
                                                </div>
                                            </div>
                                            <input type="file" hidden="true" accept="image/*" onChange={handleChangeImg}/>
                                        </label>
                                        <div className="uploader-preview">
                                            <div className="uploader-preview__img" style={{backgroundImage:`url(${file})`,backgroundSize:"contain"}}>
                                            </div>
                                            <button className="uploader-preview__remove tooltip" aria-label="Delete">
                                                <FontAwesomeIcon icon={faTrash}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <form>
                                <div className="book-edit__form">
                                    <div className="form__field">
                                        <label className="form__label">
                                            Title
                                        </label>
                                        <input className="form__input" type="text" onChange={(e) => setTitle(e.target.value)} value={title}/>
                                    </div>
                                    <div className="form__field">
                                        <label className="form__label">
                                            Isbn
                                        </label>
                                        <input className="form__input" type="text" onChange={(e) => setIsbn(e.target.value)} value={isbn}/>
                                    </div>
                                    {/*<div className="form__field">*/}
                                    {/*    <label className="form__label">*/}
                                    {/*        Authors*/}
                                    {/*    </label>*/}
                                    {/*    <FormControl className={classes.formControl}>*/}
                                    {/*        <Select*/}
                                    {/*            id="demo-mutiple-chip"*/}
                                    {/*            multiple*/}
                                    {/*            value={chipDataAuthors}*/}
                                    {/*            onChange={handleChangeAuthors}*/}
                                    {/*            input={<Input id="select-multiple-chip" />}*/}
                                    {/*            MenuProps={MenuProps}*/}
                                    {/*            renderValue={(selected) => (*/}
                                    {/*                <div className={classes.chips}>*/}
                                    {/*                    {selected.map((data) => (*/}
                                    {/*                        <Chip key={data} label={data} className={classes.chip} onDelete={handleDeleteAuthors(data)}/>*/}
                                    {/*                    ))}*/}
                                    {/*                </div>*/}
                                    {/*            )}*/}
                                    {/*        >*/}
                                    {/*            {authors.map((author) => (*/}
                                    {/*                <MenuItem*/}
                                    {/*                    key={author.key}*/}
                                    {/*                    value={author.value}*/}
                                    {/*                >*/}
                                    {/*                    {author.value}*/}
                                    {/*                </MenuItem>*/}
                                    {/*            ))}*/}
                                    {/*        </Select>*/}
                                    {/*    </FormControl>*/}
                                    {/*</div>*/}
                                    <div className="custom-row">
                                        <div className="custom-col">
                                            <div className="form__field">
                                                <label className="form__label">
                                                    Type
                                                </label>
                                                <FormControl className={classes.formControl}>
                                                    <Select style={{color:"#ddd",paddingLeft:"10px"}} MenuProps={MenuProps} defaultValue={1}>
                                                        <MenuItem value="1">Book</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="custom-col">
                                            <div className="form__field">
                                                <label className="form__label">
                                                    Release year
                                                </label>
                                                <input className="form__input" type="text"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form__field">
                                        <label className="form__label">
                                            Genres
                                        </label>
                                        <FormControl className={classes.formControl}>
                                            <Select
                                                id="demo-mutiple-chip"
                                                multiple
                                                value={chipDataGenres}
                                                onChange={handleChangeGenres}
                                                input={<Input id="select-multiple-chip" />}
                                                MenuProps={MenuProps}
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {
                                                            selected.map((data,index) => (
                                                                <Chip
                                                                      style={{zIndex:"9999"}}
                                                                      key={index} label={data}
                                                                      className={classes.chip}
                                                                      onDelete={handleDeleteGenres(data)}/>
                                                            ))
                                                        }
                                                    </div>
                                                )}
                                            >
                                                {allGenres.map((g) => (
                                                    <CustomMenuItem
                                                        key={g.id}
                                                        value={g.genre}
                                                        data={g.genre}
                                                    >
                                                    </CustomMenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="form__field">
                                        <label className="form__label">
                                            Description
                                        </label>
                                        <TextareaAutosize
                                            className="form__input"
                                            style={{backgroundColor:"#1a1a1a"}}
                                            maxRows={4}
                                            aria-label="maximum height"
                                            onChange={(e) => setDescription(e.target.value)} value={description}
                                        />
                                    </div>
                                </div>
                                <div className="section__footer">
                                    <div className="">
                                        <button className="button button_green button_md" type="submit" onClick={saveBook}>
                                            Create
                                        </button>
                                        <ReachLink className="button button_md" to="">Back</ReachLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookEdit;