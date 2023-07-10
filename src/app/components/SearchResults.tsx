import styles from '../styles/searchresults.module.css'

interface Props {
    filteredUsers: usersType[] | null
    category: "name" | "email"
    query: string
    updateShowUserHandler: (showUser: boolean, userDetails: usersType) => void
}

export default function SearchResults({ filteredUsers, category, query, updateShowUserHandler }: Props) {
    return (
        <div className={`${styles.search_results} ${query !== '' ? styles.search_results_active : ''}`}>
            {filteredUsers && filteredUsers.map((user) => {
                return (
                    <h3 key={user.id} className={styles.search_results_heading} onClick={() => updateShowUserHandler(true, user)}>{user[category]}</h3>
                )
            })}
        </div>
    )
}