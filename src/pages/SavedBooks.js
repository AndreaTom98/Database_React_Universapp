import { useState, useEffect } from "react";
import Message from "../components/Message";
import {firebase} from "../Axios";
import { Link } from "react-router-dom";


function SavedBooks() {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    setLoading(true);
    try {
      const response = await firebase.get("booksData.json");
      const bookList = [];
      for (let key in response.data) {
        console.log('key from savedbook', key)
        // Aggiungi un oggetto contenente titolo e id nell'array da iterare
        bookList.push({
          title: response.data[key].bookTitle,
          id: response.data[key].bookId,
          key: key,
        });
      }
      setBookData(bookList);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  const renderBookItem = book => {
    return (
      <div
        key={book.id}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "green",
          marginBottom: "10px"
        }}
      >
        <Link style={{textDecoration: 'none'}} to={{
          pathname: `/book/${book.id}`,
          state: {
            bookKey: book.key,
          }
        }}>
         <p style={{ color: "white" }}>{book.title}</p>
        </Link>
      </div>
    );
  };

  const renderListBooks = () => {
    return bookData.map(item => {
      return renderBookItem(item);
    });
  };

  return (
    <div>
      <h1>I miei libri</h1>
      {error ? (
        <Message message="Errore di network" error />
      ) : loading ? (
        <Message message="carico..." />
      ) : (
        renderListBooks()
      )}
    </div>
  );
}

export default SavedBooks;
