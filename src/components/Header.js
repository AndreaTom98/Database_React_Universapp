import styles from "../style/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookReader, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      <Link to="/" style={{color: 'white'}}>
        <FontAwesomeIcon size="3x" icon={faBookReader} />
      </Link>
      <div className={styles.rightContainer}>
        <Link style={{color: 'white'}} to="/savedbooks">
          <p style={{ marginRight: "20px" }}>i miei libri</p>
        </Link>
        <FontAwesomeIcon size="3x" icon={faPlusSquare} />
      </div>
    </div>
  );
};

export default Header;
