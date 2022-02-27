import { useState, useEffect} from "react";
import {Link as ReachLink, useHistory, useParams} from "react-router-dom";
import {
    Link,
    Button,
    Container,
    Input,
    FormLabel,
    Box,
    Center,
    Circle,
    Avatar,
    FormControl,
    Editable,
    EditableInput,
    EditablePreview, useEditableControls, ButtonGroup, IconButton, Icon, Flex
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import AppNavbar from "./AppNavBar";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import authService from "../service/auth.service";
import authorService from "../service/author.service";



const Profile = () => {
    const user = authService.userInfo();
    //---------------------USER--------------------------
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const {id} = useParams();

    const updateUser = (e) => {
        e.preventDefault();
        const author = {firstName, lastName, email, id};

        if (id) {
            //update
            authService.updateUser(author)
                .then(response => {
                    console.log('Author/User data updated successfully',response.data);
                    history.push('/');
                })
                .catch(error => {
                    console.log('Something went wrong',error);
                })
        }
    }

    useEffect(() => {
        if(id) {
            authorService.get(id)
                .then(author => {
                    setFirstName(author.data.firstName);
                    setLastName(author.data.lastName);
                    setEmail(author.data.email);
                })
                .catch(error => {
                    console.log('Something went wrong',error)
                })
        }
    },[])

    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps
        } = useEditableControls()
        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton icon={<CheckIcon/>} {...getSubmitButtonProps()} onSubmit={(e) => updateUser(e)} />
                <IconButton icon={<CloseIcon/>} {...getCancelButtonProps()}/>
            </ButtonGroup>
        ) : (
            <IconButton marginLeft="10px" size="sm" icon={<EditIcon />} {...getEditButtonProps()}/>
        )
    }

    return (
        <div>
            <AppNavbar/>
            <Box bg="gray" h="250" w="100%" >
                <Center h="500">
                    <Circle bg="white">
                        <Avatar size="xl" icon={<AiOutlineUser fontSize="4rem"/>}></Avatar>
                    </Circle>
                </Center>
            </Box>
            <Container p="20">
                <form>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Editable
                            textAlign="center"
                            defaultValue={user.firstName}
                            isPreviewFocusable={false}>
                            <EditablePreview />
                            <EditableInput onChange={(e) => setFirstName(e.target.defaultValue)}/>
                            <EditableControls />
                        </Editable>

                        <FormLabel>Last Name</FormLabel>
                        <Editable
                            textAlign="center"
                            defaultValue={user.lastName}
                            isPreviewFocusable={false}
                        >
                            <EditablePreview />
                            <EditableInput onChange={(e) => setLastName(e.target.defaultValue)}/>
                            <EditableControls />
                        </Editable>

                        <FormLabel>Email</FormLabel>
                        <Editable
                            textAlign="center"
                            defaultValue={user.email}
                            isPreviewFocusable={false}
                        >
                            <EditablePreview />
                            <EditableInput onChange={(e) => setEmail(e.target.defaultValue)}/>
                            <EditableControls />
                        </Editable>

                        <FormLabel>Role : {user.role}</FormLabel>
                    </FormControl>
                </form>
            </Container>
    </div>)
}
export default Profile;