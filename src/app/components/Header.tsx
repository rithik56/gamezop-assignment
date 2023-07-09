'use client'

import React, { useState } from 'react'
import styles from '../styles/header.module.css'
import Navigation from './Navigation';
import Drawer from './Drawer';

export default function Header() {
    const [isOpen, setIsOpen] = useState(true)
    function toggleDrawer() {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <header className={styles.header}>
                <div className={styles.menu_icon} onClick={toggleDrawer}>
                    <div className={styles.menu_div}></div>
                    <div className={styles.menu_div}></div>
                    <div className={styles.menu_div}></div>
                </div>
                <Navigation />
            </header>
            <Drawer isOpen={isOpen} />
        </>
    )
}