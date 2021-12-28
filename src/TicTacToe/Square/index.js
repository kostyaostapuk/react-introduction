import React from 'react';
import './index.css';

export default class Square extends React.Component {
    render() {
        const { onClick, value, isWinner } = this.props;

        const styles = {
            backgroundColor: isWinner ? 'yellow' : 'white'
        }
        return <div className="square" onClick={onClick} style={styles}>{value}</div>
    }
}
