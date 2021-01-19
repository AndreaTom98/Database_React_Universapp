import { useState } from "react";
import Results from "../components/Results";
import Message from '../components/Message';
import {googleBooks} from "../Axios";
import styles from "../style/SearchBar.module.css";

function App() {
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    if (inputText.trim() === "") {
      return 
    }
    await setLoading(true)
    const myData = await googleBooks.get(
      `?q=${inputText}`
    );
    await setData(myData.data);
    await setLoading(false);
  };

  const handleInput = (e) => {
    setInputText(e.target.value)
  }

  const showResults = () => {
    if (data.totalItems === 0) {
      return <Message error={true} message="Ricerca senza risultati" />
    } else if(data.length === 0) {
      return <Message message="cerca qualcosa..." />
    } else {
      return loading ? <Message message="carico..." /> : <Results data={data} />
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <h2>Cerca un libro</h2>
        <div style={{display: 'flex'}}>
          <input value={inputText} onChange={handleInput} type="text" />
          <button onClick={fetchData}>Cerca</button>
        </div>
      </div>
      <div>
        <h1 style={{paddingLeft: '30px'}}>Results</h1>
        {showResults()}
      </div>

    </div>
  );
}

export default App;
