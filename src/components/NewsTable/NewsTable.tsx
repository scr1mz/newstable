import React from 'react';
import styles from './NewsTable.module.scss';
import { useNews } from '../../NewsContext';
import { Link } from 'react-router-dom';

const NewsTable = () => {
    const { filteredNews, columns, loading, error } = useNews();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Фильтрация видимых колонок
    const visibleColumns = columns.filter(column => column.visible);

    /** Форматирование даты
     * @param dateString - дата
     */
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC'
        });
    };

    return (
        <table className={styles.newsTable}>
            <thead>
            <tr>
                {visibleColumns.map(column => (
                    <th key={column.id}>{column.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {filteredNews.map((newsItem, index) => (
                <tr key={index}>
                    {visibleColumns.map(column => (
                        <td key={column.id}>
                            {column.id === 'description' ? (
                                <>
                                    {newsItem[column.id]}
                                    <Link to={`/article/${encodeURIComponent(newsItem.title)}`} state={{ newsItem }} className={styles.viewButton}>
                                        Read more...
                                    </Link>

                                </>
                            ) : column.id === 'publishedAt' ? (
                                formatDate(newsItem[column.id])
                            ) : (
                                newsItem[column.id]
                            )}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default NewsTable;
