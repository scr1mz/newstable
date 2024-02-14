import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ArticlePage.module.scss';

const ArticlePage = () => {
    const location = useLocation();
    const { newsItem: article } = location.state || {};

    if (!article) {
        return <div>Статья не найдена.</div>;
    }

    // Форматирование даты публикации
    const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-En', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={styles.articlePage}>
            <h1>{article.title}</h1>
            {article.author && <p>Author: {article.author}</p>}
            <p>Publication date: {publishedDate}</p>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className={styles.articleImage} />}
            <p className={styles.articleDescription}>{article.description}</p>
            {/* Проверка на наличие и вывод полного текста статьи */}
            {article.content && <div className={styles.articleContent}>
                <p>{article.content.replace(/\[\+\d+ chars\]/g, '')}</p> {/* Удаление "[+число chars]" */}
            </div>}
            <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.fullArticleLink}>
                Read more at the source
            </a>
        </div>
    );
};

export default ArticlePage;
