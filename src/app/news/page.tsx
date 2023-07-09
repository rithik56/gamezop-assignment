import { FETCH_NEWS_ENDPOINT } from '../endpoints'

type newsType = {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface Props {
    news: newsType[]
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
    console.log(news)
    return (
        <main>
            <h1>Users</h1>
        </main>

    )
}
