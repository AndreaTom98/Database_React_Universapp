import { useState } from "react";
import styles from "../style/SingleResult.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import {firebase} from '../Axios';

const SingleResults = ({ title, thumbnail, id, doesExist }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const myTitle = title.slice(0, 50);


  console.log('libro gia esistente?', doesExist);

  const addBook = async () => {
    if (doesExist) {
      alert('libro già salvato')
      return 
    }
    try {
      const data = await firebase.post("booksData.json",
        {
          bookId: id,
          bookTitle: title,
        }
      );
      console.log(data)
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };


  const buttonColor = doesExist ? 'grey' : 'green';
  return (
    <div className={styles.container}>
      <div style={{ padding: "5px", height: "70px" }}>
        <Link to={`book/${id}`}>
          <p>{myTitle}</p>
        </Link>
      </div>
      <img src={thumbnail} alt="" style={{ maxHeight: "200px" }} />
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon
            onClick={addBook}
            size="2x"
            icon={faPlusSquare}
            style={{ color: buttonColor }}
          />
          {error ? <p>errore di network</p> : null}
        </div>
      )}
    </div>
  );
};

export default SingleResults;
