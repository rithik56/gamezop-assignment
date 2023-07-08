'use client';

// Navigation Component
import React from 'react'
import styles from './navigation.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { USERS_PAGE_ROUTE, NEWS_PAGE_ROUTE, TOP_USERS_PAGE_ROUTE } from '@/app/appRoutes';

interface Props {
    toggleDrawer: () => void
}

export default function Navigation({ toggleDrawer }: Props) {
    const pathname = usePathname()
    return (
        <nav className={styles.nav}>
            <div className={styles.menu_icon} onClick={toggleDrawer}>
                <div className={styles.menu_div}></div>
                <div className={styles.menu_div}></div>
                <div className={styles.menu_div}></div>
            </div>
            <div className={styles.header_container}>
                <Link href={USERS_PAGE_ROUTE} className={`${pathname === USERS_PAGE_ROUTE ? styles.nav_item_selected : ''} ${styles.nav_item} ${styles.bx_1}`}>
                    <h4>
                        Users
                    </h4>
                </Link>
                <Link href={NEWS_PAGE_ROUTE} className={`${pathname === NEWS_PAGE_ROUTE ? styles.nav_item_selected : ''} ${styles.nav_item} ${styles.news_heading}`}>
                    <h4>
                        News
                    </h4>
                </Link>
                <Link href={TOP_USERS_PAGE_ROUTE} className={`${pathname === TOP_USERS_PAGE_ROUTE ? styles.nav_item_selected : ''} ${styles.nav_item} ${styles.bx_1}`}>
                    <h4>
                        Top Users
                    </h4>
                </Link>
            </div>
        </nav>
    )
}