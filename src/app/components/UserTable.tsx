'use client'

import styles from '../styles/table.module.css'
import { useState } from 'react'

// user object type
type usersType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

// props interface
interface Props {
    users: usersType[]
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

    return (
        <table className={styles.table}>
            <tbody>
                <tr className={styles.tr} key={0}>
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
        </table>
    )
}