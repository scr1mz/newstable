import React, { useState, useContext } from 'react';
import { NewsContext, useNews } from '../../NewsContext';
import styles from './FilterPanel.module.scss';

const FilterPanel = () => {
    const [search, setSearch] = useState('');
    const { filterNews, filterNewsByDate, setShowColumnManager } = useNews();
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const placeholders = [
        'Input to search',
        'Input to search.',
        'Input to search..',
        'Input to search...'
    ];

    const handleMouseEnter = () => {
        const interval: number = window.setInterval(() => {
            setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 700);
        setIntervalId(interval);
    };

    const handleMouseLeave = () => {
        if (intervalId !== null) {
            clearInterval(intervalId);
        }
        setPlaceholderIndex(0);
    };


    const handleFilter = () => {
        filterNews(search);
    };

    return (
        <div className={styles.filterPanel}>
            <input
                className={styles.customInput}
                type="text"
                placeholder={placeholders[placeholderIndex]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
            <button className={styles.button} onClick={handleFilter}><span>Search</span></button>
            <button className={styles.button} onClick={() => setShowColumnManager((prev) => !prev)}>Manage columns</button>
            <select onChange={(e) => filterNewsByDate(e.target.value as 'newest' | 'oldest')} className={styles.customSelect}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
    );
};

export default FilterPanel;
