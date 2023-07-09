import styles from '../styles/navigation.module.css'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { USERS_PAGE_ROUTE, NEWS_PAGE_ROUTE, TOP_USERS_PAGE_ROUTE } from '../appRoutes';

const Navigation = () => {
    const pathname = usePathname()
    return (
        <nav className={styles.nav_list}>
            <Link href={USERS_PAGE_ROUTE} className={`${pathname === USERS_PAGE_ROUTE ? styles.nav_item_selected : ''} ${styles.nav_item}`}>
                <h4>
                    Users
                </h4>
            </Link>
            <Link href={NEWS_PAGE_ROUTE} className={`${pathname === NEWS_PAGE_ROUTE ? styles.nav_item_selected : ''} ${styles.nav_item} ${styles.news_heading}`}>
                <h4>
                    News
                </h4>
            </Link>
            <Link href={TOP_USERS_PAGE_ROUTE} className={`${pathname === TOP_USERS_PAGE_ROUTE ? styles.nav_item_selected : ''} ${styles.nav_item}`}>
                <h4>
                    Top Users
                </h4>
            </Link>
        </nav>
    )
}

export default Navigation;