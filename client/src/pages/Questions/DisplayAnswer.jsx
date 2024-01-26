import React from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import Avatar from "../../components/Avatar/Avatar";
import { deleteAnswer } from "../../actions/question.js"

function DisplayAnswer({ question, key, handleShare }) {
  const { id } = useParams();
  const user = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const handleDelete = (answerId, noOfAnswers) => {
    //console.log(noOfAnswers)
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1))
  }
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={key}>
          <p>{ans.answerBody}</p>
          <div className="question-action-user">
            <div>
              <button type="button" onClick={handleShare}>Share</button>
              {user.result._id === ans.userId && (
                            <button type="button" onClick={()=> handleDelete(ans._id, question.noOfAnswers)}>
                              Delete
                            </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar backgroundColor="green" px="8px" py="5px">
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAnswer;
