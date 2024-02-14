import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { NewsProvider } from './NewsContext';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
// Контейнер не null и не underfined
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <NewsProvider>
                <App />
            </NewsProvider>
        </BrowserRouter>
    </React.StrictMode>
);

