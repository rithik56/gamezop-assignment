import { FETCH_NEWS_ENDPOINT } from '../endpoints'
import NewsCard from '../components/NewsCard'
import styles from './news.module.css'

type newsType = {
    userId: number,
    id: number,
    title: string,
    body: string
}

async function getData() {
    const res = await fetch(FETCH_NEWS_ENDPOINT)
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function News() {
    const news = await getData();
    return (
        <main className={styles.main}>
            {news.map((item: newsType) => {
                return <NewsCard news={item} />
            })}
        </main>
    )
}
