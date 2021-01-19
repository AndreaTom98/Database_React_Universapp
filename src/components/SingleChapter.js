import styles from "../style/SingleChapter.module.css";
import { Link } from "react-router-dom";

const SingleChapter = ({ number, bookID, bookName, chapterKey, bookKey }) => {
  console.log("book id da pagina Singechapter.js", bookID);
  return (
    <Link
      className={styles.container}
      to={{
        pathname: `/book/${bookID}/chapter/${number}`,
        state: {
          libro: bookName,
          capitolo: number,
          chapterKey: chapterKey,
          bookKey: bookKey,
        }
      }}
    >
      <div>
        <p>Capitolo {number}</p>
      </div>
    </Link>
  );
};

export default SingleChapter;
