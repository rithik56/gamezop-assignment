'use client'

import styles from '../styles/usertable.module.css'
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
            // returning the top_users array from local storage
            return JSON.parse(topUsersKey)
        }
        else {
            // returning null as top_users doesn't exist
            return null
        }
    })

    function addTopUser(id: number) {

        if (topUsers) {
            // if top users array is present in local storage, then we are appending the value to top users array
            localStorage.setItem('top_users', JSON.stringify([...topUsers, id]))
            setTopUsers([...topUsers, id])
        }
        else {
            // if top users array is not present in local storage, then we are setting the top users
            localStorage.setItem('top_users', JSON.stringify([id]))
            setTopUsers([id])
        }
    }

    function removeTopUser(id: number) {
        // Filtered the array and return the array in which id is not present
        localStorage.setItem('top_users', JSON.stringify(topUsers.filter((curr: number) => curr !== id)))
        setTopUsers(topUsers.filter((curr: number) => curr !== id))
    }

    return (
        <>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.tr} key={0}>
                        <th className={styles.th}>Name</th>
                        <th className={styles.th}>Email</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>Top User</th>
                    </tr>
                    {users.map((user) => {
                        return (
                            <tr className={styles.tr} key={user.id}>
                                <td className={styles.td}>{user.name}</td>
                                <td className={styles.td}>{user.email}</td>
                                <td className={styles.td}>
                                    <label className={styles.switch}>
                                        <input className={styles.switch_input} type="checkbox" />
                                        <span className={styles.slider}></span>
                                    </label>
                                </td>
                                <td className={styles.td}>
                                    <input
                                        type='checkbox'
                                        className={styles.checkbox}
                                        checked={(topUsers && topUsers.includes(user.id)) ? true : false}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                addTopUser(user.id)
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
        </>
    )
}