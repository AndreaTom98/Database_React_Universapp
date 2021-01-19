import { useState, useEffect } from "react";
import styles from "../style/Book.module.css";
import axios from 'axios';
import {firebase} from '../Axios'
import { v4 as uuidv4 } from "uuid";
import SingleChapter from "../components/SingleChapter";
import {googleBooks} from "../Axios";

function Book(props) {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [chapterList, setChapterList] = useState([{ id: uuidv4() }]);

  // useEffect per gestire caricamento dei dati
  const bookID = props.match.params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await googleBooks.get(
          `${bookID}`
        );
        await setBookData(bookData.data.volumeInfo);
        await fetchChaptersData();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [bookID]);

  // render dei capitoli
  const renderChapters = () => {
    const bookID = props.match.params.id;
    const bookKey = props.location.state.bookKey;
    console.log("book id da pagina book.js", bookID);
    return chapterList.map((key, index) => {
      return (
        <SingleChapter
          bookName={bookData.title}
          key={key}
          chapterKey={key}
          bookKey={bookKey}
          bookID={bookID}
          chapter={4}
          number={index + 1}
        />
      );
    });
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
}

  const createNewChapter = async (e) => {
    e.preventDefault();
    const bookKey = props.location.state.bookKey;
    try {
      const response = await firebase.post(`booksData/${bookKey}/chapters.json`, [inputText]);
      const newChapterList = [...chapterList, response.data.name];
      setChapterList(newChapterList);
      setInputText("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchChaptersData = async () => {
    const bookKey = props.location.state.bookKey;
    try {
      const response = await firebase.get(`booksData/${bookKey}/chapters.json`);
      const myData = await response.data;
      const chaptersList = [];
      for (let key in myData) {
        chaptersList.push(key)
      }
      setChapterList(chaptersList);
    } catch (error) {
      console.log(error);
    }
  }



  const nextChapterNumber = chapterList.length + 1
  // Return per fare render dell'interfaccia
  return loading ? (
    <p>carico...</p>
  ) : (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div style={{ width: "90%", paddingRight: "20px" }}>
          <h2>{bookData.title}</h2>
          <p>{bookData.description}</p>
          <h4>Autore: {bookData.authors[0]} </h4>
        </div>
        <img
          className={styles.image}
          src={bookData.imageLinks.thumbnail}
          alt=""
        />
      </div>

      <div className={styles.chapterContainer}>
        {renderChapters()}
        {/* <FontAwesomeIcon
          onClick={createNewChapter}
          style={{ marginTop: "20px" }}
          size="3x"
          icon={faPlusSquare}
        /> */}
        <form style={{width: '90%', padding: '10px'}} onSubmit={createNewChapter}>
          <input value={inputText} onChange={handleInputChange} type="text" placeholder={`Aggiungi takeaway al capitolo ${nextChapterNumber}`}/>
        </form>
      </div>
    </div>
  );
}

export default Book;
