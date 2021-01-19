import {useEffect, useState} from 'react';
import styles from "../style/Results.module.css";
import SingleResult from "./SingleResult";
import { firebase } from "../Axios";

const Results = ({ data }) => {
  const [savedIDs, setSavedIDs] = useState([]);

  console.log("dati da results.js", data.items);
  const myData = data.items;

  // 1. prendere id dei libri salvati su firebase
  // 2. prendere id dei libri cercati dall'utente
  // 3. vedere se l'id dei libri salvati combacia con l'id dei libri appena cercati

  useEffect(() => {
    getSavedBooksID();
  }, [])

  const getSavedBooksID = async () => {
    try {
      const response = await firebase.get('booksData.json');
      const data = response.data;
      console.log('data da firebase', data);
      const allIDs = [];
      for (let key in data) {
        allIDs.push(data[key].bookId);
      }
      await setSavedIDs(allIDs);
      console.log('id salvati', savedIDs);

    } catch (error) {
      console.log(error)
    }
  }

  const renderElement = () => {
    return myData.map((book) => {
      const doesExist = savedIDs.includes(book.id);
      return (
          <SingleResult
            key={book.id}
            id={book.id}
            doesExist={doesExist}
            thumbnail={book.volumeInfo.imageLinks.thumbnail}
            title={book.volumeInfo.title}
            description={book.volumeInfo.description}
          />
      );
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.resultsContainer}>{renderElement()}</div>
    </div>
  );
};

export default Results;
