import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import BookList from './component/BookList';
import MagazineList from './component/MagazineList';
import AuthorList from './component/AuthorList';
import Home from './component/Home';
import BookEdit from './component/BookEdit';
import AuthorEdit from "./component/AuthorEdit";
import MagazineEdit from './component/MagazineEdit';
import { CookiesProvider } from 'react-cookie';
import Profile from "./component/Profile";
import Registration from "./component/Registration";
import Login from "./component/Login";
import Details from "./component/Details";
import Read from "./component/Read";
import ProfileEdit from "./component/ProfileEdit";
import AddChapter from "./component/AddChapter";

function App() {
  return (
      <CookiesProvider>
          <Router>
              <Switch>
                  {/*<Route path="/" exact={true} component={Home}/>*/}
                  <Route exact path="/" component={BookList}/>
                  <Route exact path="/books" component={BookList}/>
                  {/*<Route exact path="/library/books/search=:title" component={BookList}/>*/}
                  {/*<Route exact path="/library/books/search=" component={BookList}/>*/}

                  <Route exact path="/add-book" component={BookEdit}/>
                  <Route exact path="/edit/:id" component={BookEdit}/>

                  <Route exact path="/:id" component={Details}/>

                  {/*<Route exact path="/library/magazines" component={MagazineList}/>*/}
                  {/*<Route path="/library/magazines/add-magazine" component={MagazineEdit}/>*/}
                  {/*<Route path="/library/magazines/edit/:id" component={MagazineEdit}/>*/}

                  {/*<Route exact path="/library/authors" component={AuthorList}/>*/}
                  {/*<Route path="/library/authors/add-author" component={AuthorEdit}/>*/}
                  {/*<Route path="/library/authors/edit/:id" component={AuthorEdit}/>*/}

                  <Route exact path="/login/signUp" component={Registration}/>
                  <Route exact path="/login/signIn" component={Login}/>

                  <Route exact path="/user/profile" component={Profile}/>
                  <Route exact path="/user/profile/edit" component={ProfileEdit}/>
                  <Route exact path="/:id/v:volumeNumber/c:chapterNumber" component={Read}/>
                  <Route exact path="/:id/add-chapter" component={AddChapter}/>

              </Switch>
          </Router>
      </CookiesProvider>
  )
}
export default App;
