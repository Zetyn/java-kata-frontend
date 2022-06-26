// import React,{ useState } from "react";
// import {Link as ReachLink, Link, useHistory, useParams} from "react-router-dom";
// import { useEffect} from "react/cjs/react.development";
// import authorService from "../../service/author.service";
// import AppNavbar from "../AppNavBar";
// import * as Yup from "yup";
// import {useForm} from "react-hook-form";
// import {yupResolver} from "@hookform/resolvers/yup";
//
// const AuthorEdit = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const history = useHistory();
//     const {id} = useParams();
//
//
//     const validationSchema = Yup.object().shape({
//         firstName: Yup.string().required('Firstname is required'),
//         lastName: Yup.string().required('Lastname is required'),
//             email: Yup.string().required('Email is required').email('Email is invalid')
//     });
//
//     const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)});
//
//     const onSubmit = () => {
//         let data = {
//           firstName:firstName,
//           lastName:lastName,
//           email:email,
//         };
//
//         if (id) {
//             //update
//             authorService.update(id,data)
//                 .then(response => {
//                     console.log('Author data updated successfully',response.data);
//                     history.push('/');
//                 })
//                 .catch(error => {
//                     console.log('Something went wrong',error);
//                 })
//         } else {
//             //create
//             authorService.create(data)
//                 .then(response => {
//                     console.log('Author added successfully',response.data);
//                     history.push('/');
//                 })
//                 .catch(error => {
//                     console.log('Something went wrong',error);
//                 })
//         }
//     };
//
//
//     const saveAuthor = (e) => {
//         e.preventDefault();
//
//         const author = {firstName, lastName, email, id};
//         if (id) {
//             //update
//             authorService.update(author)
//                 .then(response => {
//                     console.log('Author data updated successfully',response.data);
//                     history.push('/');
//                 })
//                 .catch(error => {
//                     console.log('Something went wrong',error);
//                 })
//         }  else {
//             //create
//             authorService.create(author)
//                 .then(response => {
//                     console.log('Author added successfully',response.data);
//                     history.push('/');
//                 })
//                 .catch(error => {
//                     console.log('Something went wrong',error);
//                 })
//         }
//     }
//
//     useEffect(() => {
//         if(id) {
//             authorService.get(id)
//                 .then(author => {
//                     setFirstName(author.data.firstName);
//                     setLastName(author.data.lastName);
//                     setEmail(author.data.email);
//                 })
//                 .catch(error => {
//                     console.log('Something went wrong',error)
//                 })
//         }
//     },[])
//
//     // return (
//     //     <div>
//     //         <AppNavbar/>
//     //         <Container>
//     //             <Text fontSize="3xl">Add Author</Text>
//     //             <form onSubmit={handleSubmit(onSubmit)}>
//     //                 <FormControl isRequired>
//     //                     <FormLabel>First name</FormLabel>
//     //                     <Input isInvalid={errors.firstName} {...register('firstName')} type="text" name="firstName" id="firstName" defaultValue={firstName}/>
//     //                     <span style={{color:"red"}}>{errors.firstName?.message}</span>
//     //
//     //
//     //                     <FormLabel>Last name</FormLabel>
//     //                     <Input isInvalid={errors.lastName} {...register('lastName')} type="text" name="lastName" id="lastName"/>
//     //                     <span style={{color:"red"}}>{errors.lastName?.message}</span>
//     //
//     //
//     //                     <FormLabel>Email</FormLabel>
//     //                     <InputGroup>
//     //                         <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.400"/>}/>
//     //                         <Input isInvalid={errors.email} {...register('email')} type="text" name="email" id="email"/>
//     //                     </InputGroup>
//     //                     <span style={{color:"red"}}>{errors.email?.message}</span>
//     //
//     //                     <Button marginTop="10px" type="submit">Save</Button>{' '}
//     //                     <Link _hover={{color:"black"}} as={ReachLink} to="/"><Button color="secondary" marginTop="10px">Cancel</Button></Link>
//     //                 </FormControl>
//     //             </form>
//     //         </Container>
//     //     </div>
//     // )
//     // return (
//     // <div>
//     //     <AppNavbar/>
//     //     <Container>
//     //         <Text fontSize="3xl">Add Author</Text>
//     //         <form>
//     //             <FormGroup>
//     //                 <Label for="firstName">First name</Label>
//     //                 <Input type="text" name="firstName" id="firstName" placeholder="first name" value={firstName}
//     //                        onChange={(e) => setFirstName(e.target.value)}/>
//     //                 <span style={{color:"red"}}>{/*this.state.errors["firstName"]*/}</span>
//     //             </FormGroup>
//     //             <FormGroup>
//     //                 <Label for="lastName">Last name</Label>
//     //                 <Input type="text" name="lastName" id="lastName" placeholder="last name" value={lastName}
//     //                        onChange={(e) => setLastName(e.target.value)}/>
//     //                 <span style={{color:"red"}}>{/*this.state.errors["lastName"]*/}</span>
//     //             </FormGroup>
//     //             <FormGroup>
//     //                 <Label for="email">Email</Label>
//     //                 <Input type="text" name="email" id="email" placeholder="email" value={email}
//     //                        onChange={(e) => setEmail(e.target.value)}/>
//     //                 <span style={{color:"red"}}>{/*this.state.errors["email"]*/}</span>
//     //             </FormGroup>
//     //             <FormGroup>
//     //                 <Button color="primary" onSubmit={(e) => saveAuthor(e)}>Save</Button>{' '}
//     //                 <Button color="secondary" tag={Link} to="/library/authors">Cancel</Button>
//     //             </FormGroup>
//     //         </form>
//     //     </Container>
//     // </div>
//     // )
//
// }
// export default AuthorEdit;