import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import BookList from './component/list/BookList';
import MagazineList from './component/list/MagazineList';
import AuthorList from './component/list/AuthorList';
import Home from './component/Home';
import BookEdit from './component/edit/BookEdit';
import AuthorEdit from "./component/edit/AuthorEdit";
import MagazineEdit from './component/edit/MagazineEdit';
import { CookiesProvider } from 'react-cookie';
import Profile from "./component/Profile";
import Registration from "./component/Registration";
import Login from "./component/Login";
import Details from "./component/Details";

function App() {
  return (
      <CookiesProvider>
          <Router>
              <Switch>
                  <Route path="/" exact={true} component={Home}/>

                  <Route exact path="/library/books/:page/10" component={BookList}/>
                  <Route exact path="/library/books/search=:title" component={BookList}/>
                  <Route exact path="/library/books/search=" component={BookList}/>

                  <Route path="/library/books/add-book" component={BookEdit}/>
                  <Route path="/library/books/edit/:id" component={BookEdit}/>

                  <Route path="/library/books/:id" component={Details}/>

                  <Route exact path="/library/magazines" component={MagazineList}/>
                  <Route path="/library/magazines/add-magazine" component={MagazineEdit}/>
                  <Route path="/library/magazines/edit/:id" component={MagazineEdit}/>

                  <Route exact path="/library/authors" component={AuthorList}/>
                  <Route path="/library/authors/add-author" component={AuthorEdit}/>
                  <Route path="/library/authors/edit/:id" component={AuthorEdit}/>

                  <Route path="/library/login/signUp"  exact={true} component={Registration}/>
                  <Route path="/library/login/signIn"  exact={true} component={Login}/>

                  <Route exact path="/library/profile" component={Profile}/>

              </Switch>
          </Router>
      </CookiesProvider>
  )
}
export default App;
