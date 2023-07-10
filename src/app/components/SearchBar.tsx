import styles from '../styles/searchbar.module.css'
import SearchResults from './SearchResults'

interface Props {
    category: "name" | "email",
    query: string,
    updateCategoryHandler: (category: "name" | "email") => void,
    updateQueryHandler: (query: string) => void,
    filteredUsers: usersType[] | null
}

export default function SearchBar({ category, query, updateCategoryHandler, updateQueryHandler, filteredUsers }: Props) {
    return (
        <div className={styles.searchbar_container}>
            <select className={styles.select} value={category} onChange={(e) => {
                const val = e.target.value
                if (val === 'name' || val === 'email') {
                    updateCategoryHandler(val)
                }
            }}>
                <option value={'name'}>Name</option>
                <option value={'email'}>Email</option>
            </select>
            <div className={styles.search_results_container}>
                <input
                    type="text"
                    className={`${styles.searchbar} ${styles.icon_rtl}`}
                    placeholder={category === 'name' ? 'Search Name...' : 'Search Email...'}
                    value={query}
                    onChange={(e) => updateQueryHandler(e.target.value)}
                />
                <SearchResults filteredUsers={filteredUsers} category={category} />
            </div>
        </div>
    )
}