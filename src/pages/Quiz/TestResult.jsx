import { useParams } from "react-router-dom";

import SingleTestHistory from "../../components/UserOverview/SingleTestHistory";

const TestResult = (props) => {

    const params = useParams();

    const testId = params.testId;

    return (
        <SingleTestHistory id={testId} />
    );
}

export default TestResult;