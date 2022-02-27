import {Link} from "@chakra-ui/react"
import {Link as ReachLink} from 'react-router-dom';
import authService from "../service/auth.service";
import {} from "../style/App.css";

const AppNavbar = () => {

    const authorization = () => {
        if (localStorage.getItem("user")) {
            return <div className="header-right-menu">
                <div className="header-right-menu__item header-button">
                    <Link as={ReachLink} to="/library/profile"><button>Profile</button></Link>
                    <Link><button onClick={authService.logout}>Logout</button></Link>
                </div>
            </div>
        } else {
            return <div className="header-right-menu">
                <div className="header-right-menu__item header-button">
                    <Link as={ReachLink} to="/library/login/signIn"><button className="button header__sign header__sign-in">Sign
                        In</button></Link>
                    <Link as={ReachLink} to="/library/login/signUp"><button className="button header__sign header__sign-up">Sign
                        Up</button></Link>
                </div>
            </div>
        }
    };

    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__item header__left">
                    <Link _focus={{boxShadow: "0 0 0 0px"}} _hover={{color: "white"}} as={ReachLink}
                          to="/">Library</Link>
                </div>
                <div className="header__item header__menu">
                    <div className="header-menu">
                        <div className="header-menu__item">
                            <ReachLink to="/library/books/0/10">Books</ReachLink>
                        </div>
                        <div className="header-menu__item">
                            <ReachLink to="/library/magazines/0/10">Magazines</ReachLink>
                        </div>
                        <div className="header-menu__item">
                            <ReachLink to="/library/authors">Authors</ReachLink>
                        </div>
                    </div>
                </div>
                {authorization()}
            </div>
        </header>
    )
};

export default AppNavbar;