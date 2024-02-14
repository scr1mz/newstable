import React, { useContext } from 'react';
import { NewsContext, useNews } from '../../NewsContext';
import styles from './ColumnManager.module.scss';

const ColumnManager = () => {
    const { columns, toggleColumnVisibility } = useNews();

    return (
        <div className={styles.columnManager}>
            {columns.map(column => (
                <div key={column.id} className={styles.checkboxWrapper}>
                    <input
                        id={`checkbox-${column.id}`}
                        type="checkbox"
                        checked={column.visible}
                        onChange={() => toggleColumnVisibility(column.id)}
                        className={styles.customCheckbox}
                    />
                    <label htmlFor={`checkbox-${column.id}`}>{column.label}</label>
                </div>
            ))}
        </div>
    );
};

export default ColumnManager;
