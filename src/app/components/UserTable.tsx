'use client'

import styles from '../styles/table.module.css'
import { useState } from 'react'
import SearchBar from './SearchBar'
import UserDetails from './UserDetails'

// user object type

// props interface
interface Props {
    users: usersType[] | null
}

export default function UserTable({ users }: Props) {

    const [topUsers, setTopUsers] = useState(() => {
        // Fetching the top users from the local storage
        let topUsersKey = localStorage.getItem('top_users')
        // checking if top_users exists
        if (topUsersKey) {
            // returning the top_users mao from local storage
            return JSON.parse(topUsersKey)
        }
        else {
            // returning null as top_users doesn't exist
            return null
        }
    })

    const [blockedUsers, setBlockedUsers] = useState(() => {
        // Fetching the blocked users from the local storage
        let blockedUsersKey = localStorage.getItem('blocked_users')
        // checking if blocked_users exists
        if (blockedUsersKey) {
            // returning the blocked_users map from local storage
            const obj = JSON.parse(blockedUsersKey)
            const newObj = {
                ...obj
            }
            const currentTimestamp = Date.now()
            for (const id in obj) {
                if (currentTimestamp - obj[id] >= 300000) {
                    delete newObj[id]
                }
            }
            localStorage.setItem('blocked_users', JSON.stringify(newObj))
            return newObj
        }
        else {
            // returning null as blocked_users doesn't exist
            return null
        }
    })

    const [filteredUsers, setFilteredUsers] = useState<usersType[] | null>(null)

    // Initial state for category in dropdown 
    const [category, setCategory] = useState<'name' | 'email'>('name')

    // Initial state for query 
    const [query, setQuery] = useState('')

    // Show User Details state
    const [showUserDetails, setShowUserDetails] = useState<{ showUser: boolean, userDetails: null | usersType }>({
        showUser: false,
        userDetails: null
    })

    function addTopUser(id: number, user: usersType) {

        if (topUsers) {
            // if top users map is present in local storage, then we are adding the new entry {id: user} in the map
            const newObj = {
                ...topUsers,
                [id]: user
            }
            localStorage.setItem('top_users', JSON.stringify(newObj))
            setTopUsers(newObj)
        }
        else {
            // if top users map is not present in local storage, then we are setting the top users map 
            const newObj = {
                [id]: user
            }
            localStorage.setItem('top_users', JSON.stringify(newObj))
            setTopUsers(newObj)
        }
    }

    function removeTopUser(id: number) {
        // Delete the id 
        const newObj = {
            ...topUsers
        }
        delete newObj[id]
        localStorage.setItem('top_users', JSON.stringify(newObj))
        setTopUsers(newObj)
    }

    function blockUser(id: number) {

        if (blockedUsers) {
            // if blocked users map is present in local storage, then we are adding the new entry {id: current timestamp} in the map
            const newObj = {
                ...blockedUsers,
                [id]: Date.now()
            }
            localStorage.setItem('blocked_users', JSON.stringify(newObj))
            setBlockedUsers(newObj)
        }
        else {
            // if blocked users map is not present in local storage, then we are setting the blocked users map
            const newObj = {
                [id]: Date.now()
            }
            localStorage.setItem('blocked_users', JSON.stringify(newObj))
            setBlockedUsers(newObj)
        }
    }

    function unblockUser(id: number) {
        // Delete the id 
        const newObj = {
            ...blockedUsers
        };
        delete newObj[id]
        localStorage.setItem('blocked_users', JSON.stringify(newObj))
        setBlockedUsers(newObj)
    }

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
            {/* Checking if filteredUsers exists */}
            {users && <>
                <div className={`display-flex`}>
                    {/* Passing the values of category and query as props to searchbar component along with their respective updateHandler functions */}
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
                </div>
                {!showUserDetails.showUser ? <table className={styles.table}>
                    <tbody>
                        <tr className={`${styles.tr} ${styles.header_row}`} key={0}>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Blocked</th>
                            <th className={styles.th}>Top User</th>
                        </tr>
                        {users.map((user) => {
                            return (
                                <tr className={styles.tr} key={user.id}>
                                    <td className={styles.td}>{user.name}</td>
                                    <td className={styles.td}>{user.email}</td>
                                    <td className={styles.td}>
                                        <label className={styles.switch}>
                                            <input
                                                className={styles.switch_input}
                                                type="checkbox"
                                                checked={(blockedUsers && (blockedUsers.hasOwnProperty(user.id))) ? true : false}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        blockUser(user.id)
                                                    }
                                                    else {
                                                        unblockUser(user.id)
                                                    }
                                                }}
                                            />
                                            <span className={styles.slider}></span>
                                        </label>
                                    </td>
                                    <td className={styles.td}>
                                        <input
                                            type='checkbox'
                                            className={styles.checkbox}
                                            checked={(topUsers && topUsers.hasOwnProperty(user.id)) ? true : false}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    addTopUser(user.id, user)
                                                }
                                                else {
                                                    removeTopUser(user.id)
                                                }
                                            }}
                                        />
                                    </td>
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
            </>}
        </>
    )
}