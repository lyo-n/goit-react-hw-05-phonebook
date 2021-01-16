import React from 'react';
import propTypes from 'prop-types';
import styles from './filter.module.css';

export default function Filter ({value, changeFilter}) {
    return (
        <div className={styles.searchBlock}>
            Find contacts by name
            <input  type="text" value={value} onChange = {(e) => changeFilter(e.target.value)}/>
        </div>
    );
}

Filter.propTypes = {
    value: propTypes.string.isRequired,
    changeFilter: propTypes.func.isRequired,
};