import styles from '../styles/searchbar.module.css'

interface Props {
    category: string,
    query: string,
    updateCategoryHandler: (category: "name" | "email") => void,
    updateQueryHandler: (query: string) => void
}

export default function SearchBar({ category, query, updateCategoryHandler, updateQueryHandler }: Props) {
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
            <input
                type="text"
                className={`${styles.searchbar} ${styles.icon_rtl}`}
                placeholder={category === 'name' ? 'Search Name...' : 'Search Email...'}
                value={query}
                onChange={(e) => updateQueryHandler(e.target.value)}
            />
        </div>
    )
}