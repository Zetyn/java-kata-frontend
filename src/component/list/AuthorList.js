import React,{ useEffect,useState } from "react";
import authorService from "../../service/author.service";

import { Container,Table } from "reactstrap";
import { Button, ButtonGroup, Text, Link } from "@chakra-ui/react";
import { Link as ReachLink} from "react-router-dom";
import AppNavbar from "../AppNavBar";

const AuthorList = () => {

    const [authors, setAuthors] = useState([]);

    const init = () => {
        authorService.getAll()
            .then(response => {
                console.log('Printing authors data',response.data);
                setAuthors(response.data);
            })
            .catch(error => {
                console.log('Something went wrong',error);
            })
    }

    useEffect(() => {
        init();
    },[]);

    const handleDelete = (id) => {
        console.log('Printing id',id);
        authorService.remove(id)
            .then(response => {
                console.log('author deleted successfully',response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong',error);
            })
    }

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Link _hover={{color:"white"}} as={ReachLink} to="/library/authors/add-author"><Button colorScheme="teal">Add Author</Button></Link>
                </div>
                <Text fontSize="2xl">Authors</Text>
                <Table className="mt-3">
                    <thead>
                    <tr>
                        <th width="30%">FirstName</th>
                        <th width="30%">LastName</th>
                        <th width="30%">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        authors.map(author => (
                         <tr key={author.id}>
                            <td>{author.firstName}</td>
                            <td>{author.lastName}</td>
                            <td>{author.email}</td>
                            <td>
                                <ButtonGroup>
                                    <Link _hover={{color:"white"}} as={ReachLink} to={`/library/authors/edit/${author.id}`}><Button size="sm" colorScheme="teal">Edit</Button></Link>
                                    <Button size="sm" _hover={{bg: "#b52121"}} onClick={ () =>
                                        handleDelete(author.id)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>))
                    }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
export default AuthorList;