import React, { useState, useEffect } from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { Button,Container,Form,FormGroup,Input,Label } from "reactstrap";
import AppNavbar from "../AppNavBar";
import bookService from "../../service/book.service";
import {Text} from "@chakra-ui/react";

const BookEdit = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const authorModel = {
        email:user.email
    }
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [authors, setAuthors] = useState([authorModel]);
    const [description, setDescription] = useState('');
    const history = useHistory();
    const {id} = useParams();

    const log = () => {
        console.log(title);
        console.log("----------");
        console.log(isbn);
        console.log("----------");
        console.log(authors);
        console.log("----------");
        console.log(description);
    }

    const saveBook = (e) => {
        e.preventDefault();
        const bookCreate = {title, isbn, authors, description, id};
        const bookUpdate = {title, isbn, description, id};
        if (id) {
            //update
            bookService.update(bookUpdate.id,bookUpdate)
                .then(response => {
                    console.log('Book data updated successfully',response.data);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong',error);
                })
        }  else {
            //create
            bookService.create(bookCreate)
                .then(response => {
                    console.log('Book added successfully',response.data);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong',error);
                })
        }
    }

    useEffect(() => {
        if(id) {
            bookService.get(id)
                .then(book => {
                    setTitle(book.data.title);
                    setIsbn(book.data.isbn);
                    setAuthors(book.data.author);
                    setDescription(book.data.description);
                })
                .catch(error => {
                    console.log('Something went wrong',error)
                })
        }
    },[])

    return (
        <div>
            <AppNavbar/>
            <Container>
                <Text fontSize="3xl">Add Book</Text>
                <Form>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type="text" name="title" id="title" placeholder="title" value={title}
                               onChange={(e) => setTitle(e.target.value)}/>
                        <span style={{color:"red"}}>{/*this.state.errors["title"]*/}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Isbn</Label>
                        <Input type="text" name="isbn" id="isbn" placeholder="isbn" value={isbn}
                               onChange={(e) => setIsbn(e.target.value)}/>
                        <span style={{color:"red"}}>{/*this.state.errors["isbn"]*/}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="textarea" name="description" id="description" placeholder="description" value={description}
                               onChange={(e) => setDescription(e.target.value)}/>
                        <span style={{color:"red"}}>{/*this.state.errors["decription"]*/}</span>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" onClick={(e) => saveBook(e)}>Save</Button>{' '}
                        <Button color="secondary" onClick={history.goBack}>Cancel</Button>
                        <Button color="secondary" onClick={log}>Log</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}
export default BookEdit;