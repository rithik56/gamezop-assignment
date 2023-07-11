import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { HOME_PAGE_ROUTE, NEWS_PAGE_ROUTE, LOGOUT_PAGE_ROUTE } from '@/app/appRoutes'
import styles from '../styles/drawer.module.css'

interface Props {
    isOpen: boolean
}

export default function Drawer({ isOpen }: Props) {
    const pathname = usePathname()
    return (
        <aside className={styles.aside} style={{ display: isOpen ? 'block' : 'none' }}>
            <Link href={HOME_PAGE_ROUTE} className={`${pathname === HOME_PAGE_ROUTE ? styles.drawer_item_selected : ''} ${styles.drawer_item}`}>
                <div className={`display-flex align-items-center justify-content-center`}>
                    <Image src="/home.svg" alt="" width="24" height="24" />
                    <h4 className={styles.h4}>
                        Home
                    </h4>
                </div>
            </Link>
            <Link href={NEWS_PAGE_ROUTE} className={`${pathname === NEWS_PAGE_ROUTE ? styles.drawer_item_selected : ''} ${styles.drawer_item}`}>
                <div className={`display-flex align-items-center justify-content-center`}>
                    <Image src="/news.svg" alt="" width="24" height="24" />
                    <h4 className={styles.h4}>
                        News
                    </h4>
                </div>
            </Link>
            <Link href={LOGOUT_PAGE_ROUTE} className={`${pathname === LOGOUT_PAGE_ROUTE ? styles.drawer_item_selected : ''} ${styles.drawer_item}`}>
                <div className={`display-flex align-items-center justify-content-center`}>
                    <Image src="/logout.svg" alt="" width="24" height="24" />
                    <h4 className={styles.h4}>
                        Log Out
                    </h4>
                </div>
            </Link>
        </aside>
    )
}
