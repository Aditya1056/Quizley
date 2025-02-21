import styles from "./History.module.css";

import HistoryItem from "./HistoryItem";

import { useAuthContext } from "../../store/AuthContext";

const History = (props) => {

    const auth = useAuthContext();

    const tests = auth.tests;

    return (
        <div className={styles['test-history']} >
            <table className={styles['tests-table']} >
                <tbody>
                    <tr className={styles['table-header']} key="test-history__header" >
                        <th>Date of Attempt</th>
                        <th>Attempted</th>
                        <th>Score</th>
                        <th>More</th>
                    </tr>
                    {
                        tests.map((test) => {
                            return (
                                <HistoryItem 
                                    key={test.id} 
                                    id={test.id} 
                                    score={test.score} 
                                    attempted={test.sectionA.length + test.sectionB.length} 
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default History;