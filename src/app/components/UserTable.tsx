import styles from '../styles/usertable.module.css'

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

interface Props {
    users: usersType[]
}

export default function UserTable({ users }: Props) {
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
                                    <input type='checkbox' className={styles.checkbox} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}