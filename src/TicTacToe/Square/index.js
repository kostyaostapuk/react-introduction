import React from 'react';
import './index.css';

export default class Square extends React.Component {
    render() {
        const { onClick, value } = this.props;
        return <div className="square" onClick={onClick}>{value}</div>
    }
}
