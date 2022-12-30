import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const FeedbackLink = () => {
    return (
        <div className="feedback-form">
            <a href="#" target="_blank" rel="noopener noreferrer">
                <p>Tell us your Suggestions!</p> <ArrowTopRightOnSquareIcon className="icon redirect-icon" />
            </a>
        </div>
    );
}
 
export default FeedbackLink;