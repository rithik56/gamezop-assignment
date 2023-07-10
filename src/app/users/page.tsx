import { FETCH_USERS_ENDPOINT } from "../endpoints"
import UserTable from "../components/UserTable"
import styles from './user.module.css'

async function getData() {
  const res = await fetch(FETCH_USERS_ENDPOINT, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Users() {
  const users = await getData()
  return (
    <main className={styles.main}>
      <UserTable users={users} />
    </main>
  )
}
