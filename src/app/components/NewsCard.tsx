import styles from '../styles/newscard.module.css'

type newsType = {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface Props {
    news: newsType
}

export default function NewsCard({ news }: Props) {
    return (
        <article className={styles.article}>
            <h1>{news.title}</h1>
            <p className={styles.p}>{news.body}</p>
        </article>
    )
}