import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { fetchNews } from './api/newsApi';

/**
 * @param id - ключ заголовка
 * @param label - текст заголовка
 * @param visible - показана колонка или нет
 */
type Column = {
    id: string;
    label: string;
    visible: boolean;
};

interface NewsContextType {
    filteredNews: any[];
    showColumnManager: boolean;
    setShowColumnManager: (show: boolean) => void;
    columns: Column[];
    toggleColumnVisibility: (columnId: string) => void;
    filterNews: (searchTerm: string) => void;
    filterNewsByDate: (sortBy: 'newest' | 'oldest') => void;
    loading: boolean;
    error: string | null;
}

export const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
    children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
    const [allNews, setAllNews] = useState<any[]>([]);
    const [filteredNews, setFilteredNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showColumnManager, setShowColumnManager] = useState(false);
    const [columns, setColumns] = useState<Column[]>([
        { id: 'title', label: 'Title', visible: true },
        { id: 'description', label: 'Description', visible: true },
        { id: 'publishedAt', label: 'Published', visible: true },
        { id: 'author', label: 'Author', visible: false },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const news = await fetchNews({
                    keyword: 'apple',
                    from: '2024-02-11',
                    to: '2024-02-11',
                    sortBy: 'popularity'
                });
                setAllNews(news);
                setFilteredNews(news);
            } catch (error) {
                setError('Failed to fetch news');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleColumnVisibility = (columnId: string) => {
        setColumns(columns.map(column =>
            column.id === columnId ? { ...column, visible: !column.visible } : column
        ));
    };

    const filterNews = (searchTerm: string) => {
        const filtered = allNews.filter(news => news.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredNews(filtered);
    };

    /**
     * Фильтрует массив новостей по дате публикации.
     * Статьи сортируются по убыванию даты 'newest', или по возрастанию 'oldest'.
     * '+' Преобразует строки дат публикации в числовые значения.
     * @param {'newest' | 'oldest'} sortBy - Критерий сортировки: 'newest' для сортировки от самых новых к самым старым, 'oldest' наоборот.
     * @returns {void} Не возвращает значение и обновляет состояние filteredNews отсортированным списком новостей.
     */
    const filterNewsByDate = (sortBy: 'newest' | 'oldest') => {
        const sortedNews = [...allNews].sort((a, b) => {
            const dateA = new Date(a.publishedAt);
            const dateB = new Date(b.publishedAt);
            return sortBy === 'newest' ? +dateB - +dateA : +dateA - +dateB;
        });
        setFilteredNews(sortedNews);
    };

    return (
        <NewsContext.Provider value={{ filteredNews, showColumnManager, setShowColumnManager, columns, toggleColumnVisibility, filterNews, filterNewsByDate, loading, error }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => {
    const context = React.useContext(NewsContext);
    if (context === undefined) {
        throw new Error('useNews должны использоваться с NewsProvider');
    }
    return context;
};

