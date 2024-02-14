import axios from 'axios';

/** @param {String} BASE_URL Базовый URL к NewsAPI */
const BASE_URL = 'https://newsapi.org/v2';
/** @param {String} API_KEY Индивидуальный ключ для получения данных по API в NewsAPI*/
const API_KEY = '7eb4908bcbeb40f1a9dda3c9476ae326';

/**
 * Запрос к NewsAPI для получения списка новостей по заданным критериям.
 * @param {Object} params Параметры для фильтрации новостей: ключевое слово, дата начала и конца, критерий сортировки.
 * @param {string} params.keyword Ключевое слово для поиска в новостях.
 * @param {string} params.from Дата начала периода для поиска новостей.
 * @param {string} params.to Дата окончания периода для поиска новостей.
 * @param {string} params.sortBy Критерий сортировки новостей ('popularity', 'publishedAt' и т.д.).
 * @returns {Promise<any[]>} Промис, при успешном выполнении возвращает массив новостей.
 * @throws {Error} В случае ошибки запроса к API вызовется исключение с описанием ошибки.
 */
export const fetchNews = async ({ keyword, from, to, sortBy }: { keyword: string, from: string, to: string, sortBy: string }) => {
    try {
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: { q: keyword, from, to, sortBy, apiKey: API_KEY },
        });
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};
