import AppNavbar from "./AppNavBar";
import {Link as ReachLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import authService from "../service/auth.service";

const Login = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().required('Password is required')
            .min(4, 'Password must be at least 4 characters')
    });

    const {register, handleSubmit, formState: {errors}} = useForm({resolver: yupResolver(validationSchema)});

    const onSubmit = data => {
        console.log("submit");
        authService.login(data.email, data.password);
        setTimeout(function tick() {
            window.location.href = '/';
        }, 300);

    };

    return (
        <div>
            <AppNavbar/>
            <div className="page">
                <div className="page__inner">
                    <div className="custom-container container-offset container-responsive">
                        <div className="modal__inner">
                            <div className="modal__content">
                                <div className="modal__header">
                                    <h4 className="modal__title text-center">Authorization</h4>
                                </div>
                                <div className="modal__body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form__subtitle">
                                            Login via login or email
                                        </div>
                                        <div className="form__field">
                                            <div className="form__input-wrap">
                                                <input className="form__input" type="text" name="email" placeholder="Email" id="email" {...register('email')}/>
                                            </div>
                                        </div>
                                        <div className="form__field">
                                            <div className="form__input-wrap">
                                                <input className="form__input" type="password" name="password" placeholder="Password" id="password" {...register('password')}/>
                                            </div>
                                        </div>
                                        <div className="form__footer">
                                            <button className="button button_primary button_md" type="submit">Sign in</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    /*
        return (
            <div>
                <AppNavbar/>
                <Container>
                    <Text fontSize="3xl">Sign In</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children={<EmailIcon color="gray.400"/>}/>
                                <Input isInvalid={errors.email} {...register('email')} type="text" name="email" id="email"/>
                            </InputGroup>
                            <span style={{color: "red"}}>{errors.email?.message}</span>

                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.400"/>}/>
                                <Input isInvalid={errors.password} {...register('password')} type="text" name="password"
                                       id="password"/>
                            </InputGroup>
                            <span style={{color: "red"}}>{errors.password?.message}</span>

                            <Button marginTop="10px" type="submit">Login</Button>{' '}
                            <Link _hover={{color: "black"}} as={ReachLink} to="/"><Button color="secondary" marginTop="10px">Cancel</Button></Link>
                        </FormControl>
                    </form>
                </Container>
            </div>
        )

     */
};

export default Login;