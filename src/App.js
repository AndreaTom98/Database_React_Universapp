import Home from "./pages/Home";
import Book from "./pages/Book";
import SavedBooks from './pages/SavedBooks';
import Header from './components/Header';
import BookChapter from './pages/BookChapter';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/book/:id" component={Book} />
        <Route exact path="/savedbooks" component={SavedBooks} />
        <Route exact path="/book/:id/chapter/:number" component={BookChapter} />
      </Switch>
    </div>
  );
}

export default App;
