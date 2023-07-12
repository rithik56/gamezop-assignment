import styles from '../styles/searchresults.module.css'

interface Props {
    filteredUsers: usersType[] | null
    category: "name" | "email"
    query: string
    updateShowUserHandler: (showUser: boolean, userDetails: usersType) => void
}

export default function SearchResults({ filteredUsers, category, query, updateShowUserHandler }: Props) {
    console.log(filteredUsers)
    return (
        <div className={`${styles.search_results} ${query !== '' ? styles.search_results_active : ''}`}>
            {filteredUsers && filteredUsers.length !== 0 && filteredUsers.map((user) => {
                return (
                    <h3 key={user.id} className={styles.search_results_heading} onClick={() => updateShowUserHandler(true, user)}>{user[category]}</h3>
                )
            })}
            {(!filteredUsers || filteredUsers && filteredUsers.length === 0) &&
                <h3 className={styles.search_results_heading}>No Results...</h3>
            }
        </div>
    )
}