import moment from 'moment';

import { useNavigate } from 'react-router-dom';

import styles from './HistoryItem.module.css';

const HistoryItem = (props) => {

    const navigate = useNavigate();

    const testLinkHandler = () => {
        navigate('/test/' + props.id);
    }

    const dt = new Date(props.id);

    return (
        <tr className={styles['table-row']} >
            <td>{moment(dt).format('Do MMM YYYY')}, {moment(dt).format('LT')}</td>
            <td>{props.attempted} / 10</td>
            <td>{props.score} / 10</td>
            <td>
                <button type="button" className={styles['view-btn']} onClick={testLinkHandler} >view</button>
            </td>
        </tr>
    );
}

export default HistoryItem;