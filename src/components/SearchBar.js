import styles from '../style/SearchBar.module.css';

const SearchBar = () => {
    return (
        <div className={styles.container}>
            <h2>Cerca un libro</h2>
            <input type="text"/>
        </div>
    )
}

export default SearchBar;