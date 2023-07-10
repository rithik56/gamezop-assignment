'use client'

import styles from '../styles/table.module.css'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'

export default function TopUsersTable() {
    const topUsersKey = localStorage.getItem('top_users')
    let users: usersType[] | null = null
    if (topUsersKey) {
        users = Object.values(JSON.parse(topUsersKey))
    }
    const [filteredUsers, setFilteredUsers] = useState<usersType[] | null>(null)
    const [category, setCategory] = useState<'name' | 'email'>('name')
    const [query, setQuery] = useState('')
    function filterDataHandler(category: "name" | "email", query: string) {

        let newData: usersType[] | null

        // If users is null then we return
        if (users === null) {
            return
        }

        // If query is empty, then we return all the users
        if (query === '') {
            newData = null
        }

        // Filter the data according to query and category
        else {
            newData = users.filter((user: usersType) => {
                return user[category].toLowerCase().includes(query.toLowerCase())
            })
        }

        setFilteredUsers(newData)
        setCategory(category)
        setQuery(query)
    }
    return (
        <>
            <>
                <SearchBar
                    category={category}
                    query={query}
                    filterUserHandler={(category, query) => filterDataHandler(category, query)}
                    filteredUsers={filteredUsers}
                />
                <table className={styles.table}>
                    <tbody>
                        <tr className={`${styles.tr} ${styles.header_row}`} key={0}>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Email</th>
                        </tr>
                        {users && users.map((user: usersType) => {
                            return (
                                <tr className={styles.tr} key={user.id}>
                                    <td className={styles.td}>{user.name}</td>
                                    <td className={styles.td}>{user.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </>
        </>
    )
}