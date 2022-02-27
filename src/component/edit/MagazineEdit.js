import React, { useState, useEffect } from "react";
import {Link, useHistory, useParams } from "react-router-dom";
import { Button,Container,Form,FormGroup,Input,Label } from "reactstrap";
import { Text } from "@chakra-ui/react";
import AppNavbar from "../AppNavBar";
import magazineService from "../../service/magazine.service";


const MagazineEdit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const authorModel = {
        email:user.email
    }

    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [authors, setAuthors] = useState([authorModel]);
    const [publishedAt, setPublishedAt] = useState('');
    const history = useHistory();
    const {id} = useParams();

    const saveMagazine = (e) => {
        e.preventDefault();
        const magazineCreate = {title, isbn, authors, publishedAt, id};
        const magazineUpdate = {title, isbn, publishedAt, id};

        if (id) {
            //update
            magazineService.update(magazineUpdate.id,magazineUpdate)
                .then(response => {
                    console.log('Magazine data updated successfully',response.data);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong',error);
                })
        }  else {
            //create
            magazineService.create(magazineCreate)
                .then(response => {
                    console.log('Magazine added successfully',response.data);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong',error);
                })
        }
    }

    useEffect(() => {
        if(id) {
            magazineService.get(id)
                .then(magazine => {
                    setTitle(magazine.data.title);
                    setIsbn(magazine.data.isbn);
                    setAuthors(magazine.data.author);
                    setPublishedAt(magazine.data.publishedAt);
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
                <Text fontSize="3xl">Add Magazine</Text>
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
                        <span style={{color:"red"}}>{/*this.state.errors["lastName"]*/}</span>
                    </FormGroup>
                    <FormGroup>
                        <Label for="publishedAt">PublishedAt</Label>
                        <Input type="date" name="publishedAt" id="publishedAt" value={publishedAt}
                               onChange={(e) => setPublishedAt(e.target.value)} autoComplete="description"/>
                        <span style={{color:"red"}}>{/*this.state.errors["publishedAt"]*/}</span>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" onClick={(e) => saveMagazine(e)}>Save</Button>{' '}
                        <Button color="secondary" onClick={history.goBack}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}
export default MagazineEdit;