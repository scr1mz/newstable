import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NewsTable from './components/NewsTable/NewsTable';
import ArticlePage from './components/ArticlePage/ArticlePage';
import FilterPanel from './components/FilterPanel/FilterPanel';
import ColumnManager from './components/ColumnManager/ColumnManager'
import { useNews } from './NewsContext';
import './App.scss';

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const { showColumnManager } = useNews();

    const isArticlePage = location.pathname.includes('/article/');

    return (
        <div className="app">
            {/* Отображается фильтр на главной странице и кнопка "Назад" на странице статьи */}
            {isArticlePage ? (
                <div onClick={() => navigate(-1)} className="backButton">Назад</div>
            ) : (
                <>
                    <FilterPanel />
                    {showColumnManager && <ColumnManager />}
                </>
            )}
            <Routes>
                <Route path="/" element={<NewsTable />} />
                <Route path="/article/:title" element={<ArticlePage />} />
            </Routes>
        </div>
    );
}

export default App;
