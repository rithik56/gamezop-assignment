'use client'

import styles from '../styles/table.module.css'

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

export default function TopUsersTable() {
    const topUsersKey = localStorage.getItem('top_users')
    let users: usersType[] | undefined = undefined
    if (topUsersKey) {
        users = Object.values(JSON.parse(topUsersKey))
    }
    return (
        <table className={styles.table}>
            <tbody>
                <tr className={styles.tr} key={0}>
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
    )
}