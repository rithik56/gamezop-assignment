import styles from '../styles/searchresults.module.css'

interface Props {
    filteredUsers: usersType[] | null
    category: "name" | "email"
}

export default function SearchResults({ filteredUsers, category }: Props) {
    return (
        <div className={styles.search_results}>
            {filteredUsers && filteredUsers.map((user) => {
                return (
                    <h3 className={styles.search_results_heading}>{user[category]}</h3>
                )
            })}
        </div>
    )
}