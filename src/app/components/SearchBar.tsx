import styles from '../styles/searchbar.module.css'
import SearchResults from './SearchResults'

interface Props {
    category: "name" | "email"
    query: string
    filterUserHandler: (category: "name" | "email", query: string) => void
    filteredUsers: usersType[] | null,
    updateShowUserHandler: (showUser: boolean, userDetails: usersType) => void
}

export default function SearchBar({ category, query, filterUserHandler, filteredUsers, updateShowUserHandler }: Props) {
    return (
        <div className={styles.searchbar_container}>
            <select className={styles.select} value={category} onChange={(e) => {
                const val = e.target.value
                if (val === 'name' || val === 'email') {
                    filterUserHandler(val, query)
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
                    onChange={(e) => filterUserHandler(category, e.target.value)}
                />
                <SearchResults
                    filteredUsers={filteredUsers}
                    category={category}
                    query={query}
                    updateShowUserHandler={updateShowUserHandler}
                />
            </div>
        </div>
    )
}