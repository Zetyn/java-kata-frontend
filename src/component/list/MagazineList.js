import React, {useState, useEffect} from "react";
import {Container, Table} from "reactstrap";
import {Button, ButtonGroup, Input, InputGroup, InputLeftElement, Link, Text} from "@chakra-ui/react";
import AppNavbar from "../AppNavBar";
import {Link as ReachLink} from "react-router-dom";
import magazineService from "../../service/magazine.service";
import {SearchIcon} from "@chakra-ui/icons";

const MagazineList = () => {

    const [magazines, setMagazines] = useState([]);

    const init = () => {
        magazineService.getAll()
            .then(response => {
                console.log('Printing magazines data', response.data);
                setMagazines(response.data);
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
        magazineService.remove(id)
            .then(response => {
                console.log('magazine deleted successfully', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div>
            <AppNavbar/>
            <Container fluid>
                <div>
                    <div className="float-end">
                        <Link _hover={{color: "white"}} as={ReachLink} to="/library/magazines/add-magazine"><Button
                            colorScheme="teal">Add Magazine</Button></Link>
                    </div>

                    <Text fontSize="2xl">Magazines</Text>

                    <div style={{width: "20%"}}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<SearchIcon color="grey.400"/>}/>
                            <Input aria-autocomplete="list" autoComplete="off" autoCorrect="off" spellCheck="false"
                                   maxLength="64" placeholder="Search"/>
                        </InputGroup>
                    </div>
                </div>
                <Table className="mt-3">
                    <thead>
                    <tr>
                        <th width="30%">Title</th>
                        <th width="30%">Isbn</th>
                        <th width="30%">Author</th>
                        <th width="20%">PublishedAt</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        magazines.map(magazine => (
                            <tr key={magazine.id}>
                                <td>{magazine.title}</td>
                                <td>{magazine.isbn}</td>
                                <td>{magazine.authors.map(author => (author.email))}</td>
                                <td>{magazine.publishedAt}</td>
                                <td>
                                    <ButtonGroup>
                                        <Link _hover={{color: "white"}} as={ReachLink}
                                              to={`/library/magazines/edit/${magazine.id}`}>
                                            <Button size="sm" colorScheme="teal">Edit</Button>
                                        </Link>
                                        <Button size="sm" _hover={{bg: "#b52121"}} onClick={() =>
                                            handleDelete(magazine.id)}>Delete</Button>
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
export default MagazineList;