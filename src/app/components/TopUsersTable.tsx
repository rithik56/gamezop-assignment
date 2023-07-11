'use client'

import styles from '../styles/table.module.css'
import SearchBar from './SearchBar'
import { useState, useEffect } from 'react'
import UserDetails from './UserDetails'

export default function TopUsersTable() {

    const [topUsers, setTopUsers] = useState<usersType[] | null>(null)

    const [filteredUsers, setFilteredUsers] = useState<usersType[] | null>(null)

    const [category, setCategory] = useState<'name' | 'email'>('name')

    const [query, setQuery] = useState('')

    const [showUserDetails, setShowUserDetails] = useState<{ showUser: boolean, userDetails: null | usersType }>({
        showUser: false,
        userDetails: null
    })

    function filterDataHandler(category: "name" | "email", query: string) {

        let newData: usersType[] | null

        // If users is null then we return
        if (topUsers === null) {
            return
        }

        // If query is empty, then we return all the users
        if (query === '') {
            newData = null
        }

        // Filter the data according to query and category
        else {
            newData = topUsers.filter((user: usersType) => {
                return user[category].toLowerCase().includes(query.toLowerCase())
            })
        }

        setFilteredUsers(newData)
        setCategory(category)
        setQuery(query)
    }
    useEffect(() => {
        let topUsersKey = localStorage.getItem('top_users')
        let users: usersType[] | null = null
        if (topUsersKey) {
            users = Object.values(JSON.parse(topUsersKey))
        }
        setTopUsers(users)
    }, [])
    return (
        <>
            <h1 className={styles.table_heading}>Top Users</h1>
            <div className={styles.table_container}>
                <SearchBar
                    category={category}
                    query={query}
                    filterUserHandler={(category, query) => filterDataHandler(category, query)}
                    filteredUsers={filteredUsers}
                    updateShowUserHandler={(showUser: boolean, userDetails: usersType) => {
                        setShowUserDetails({
                            showUser: showUser,
                            userDetails: userDetails
                        })
                        setQuery('')
                    }}
                />
                {!showUserDetails.showUser ? <table className={styles.table}>
                    <tbody>
                        <tr className={`${styles.tr} ${styles.header_row}`} key={0}>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Email</th>
                        </tr>
                        {topUsers && topUsers.map((user: usersType) => {
                            return (
                                <tr className={styles.tr} key={user.id}>
                                    <td className={styles.td}>{user.name}</td>
                                    <td className={styles.td}>{user.email}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> : showUserDetails.userDetails &&
                <UserDetails
                    user={showUserDetails.userDetails}
                    updateShowUserDetailsHandler={() => {
                        setShowUserDetails({
                            showUser: false,
                            userDetails: null
                        })
                    }}
                />}
            </div>
        </>
    )
}