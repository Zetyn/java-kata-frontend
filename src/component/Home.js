import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

const Home = () => {

    return (
        <div>
            <AppNavbar />
            <div className="page">
                <div className="page__inner">
                    <div className="container container-offset">
                        <div className="page-wrapper">
                            <div className="section paper">
                                <div className="section-body">
                                    <h2 className="page-title">Popular books</h2>
                                </div>
                            </div>
                        </div>
                        <div className="section paper">
                            <div className="section__header section-header-tabs">
                                <strong className="section-header-title">New books</strong>
                            </div>
                            <div className="section-body">
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
            <Container fluid style={{margin:"0px",padding:"0px"}}>
                <Link to="/library/books/0/10"><button className="buttonStyle" style={{backgroundImage:`url(${BackgroundBook})`}}>Books</button></Link>
                <Link to="/library/magazines"><button className="buttonStyle" style={{backgroundImage:`url(${BackgroundMagazine})`}}>Magazines</button></Link>
                <Link to="/library/authors"><button className="buttonStyle" style={{backgroundImage:`url(${BackgroundAuthor})`}}>Authors</button></Link>
            </Container>
        </div>
    )
     */
}
export default Home;