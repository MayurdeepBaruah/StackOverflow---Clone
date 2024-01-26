import React, { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import { deleteQuestions, postAnswer, voteQuestion } from "../../actions/question";

function QuestionDetails() {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);
  console.log(questionsList);
  const [answer, setanswer] = useState("");
  const user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // path name can be selected
  //console.log(location)      
  const url = "http://localhost:3000";
  const handlePosAns = (e, answerLength) => {
    e.preventDefault();
    if (user === null) {
      alert("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength,
            answerBody: answer,
            userAnswered: user.result.name,
            userId: user.result._id,
          })
          
        );
      }
    }
  };
  console.log(answer)
  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };
  const handleDelete = () => {
    dispatch(deleteQuestions(id, navigate));
  };
  const handleupVote = () => {
    dispatch(voteQuestion(id, "upVote", user.result._id))
  }
  const handledownVote = () => {
    dispatch(voteQuestion(id, "downVote", user.result._id))
  }
  //console.log(id)
  // var questionsList = [
  //     {
  //       _id: "1",
  //       upVotes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 2,
  //       questionTitle: "What is a function ?",
  //       questionBody: "It meant to be",
  //       questionTags: ["Java", "Node.JS", "ReactJS", "MongoDB","Express JS"],
  //       userPosted: "mano",
  //       userId: 1,
  //       askedOn: "Jan 1",
  //       answer:[{
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "Jan 2",
  //         userId: 2
  //       }]
  //     },
  //     {
  //       _id: "2",
  //       upVotes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 0,
  //       questionTitle: "What is a function ?",
  //       questionBody: "It meant to be",
  //       questionTags: ["JavaScript", "R", "Python"],
  //       userPosted: "mano",
  //       userId: 1,
  //       askedOn: "Jan 1",
  //       answer:[{
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "Jan 2",
  //         userId: 2
  //       }]
  //     },
  //     {
  //       _id: "3",
  //       upVotes: 3,
  //       downVotes: 2,
  //       noOfAnswers: 0,
  //       questionTitle: "What is a function ?",
  //       questionBody: "It meant to be",
  //       questionTags: ["JavaScript", "R", "Python"],
  //       userPosted: "mano",
  //       userId: 1,
  //       askedOn: "Jan 1",
  //       answer:[{
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "Jan 2",
  //         userId: 2
  //       }]
  //     },
  //   ];
  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                {console.log(question)}
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt="upvote"
                        width={18}
                        className="votes-icon"
                        onClick={handleupVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt="downvote"
                        width={18}
                        className="votes-icon"
                        onClick={handledownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((questionTag) => (
                          <p key={questionTag}>{questionTag}</p>
                        ))}
                      </div>
                      <div className="question-action-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {user.result._id === question.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          {/* moment is used for displaying time */}
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar backgroundColor="orange" px="8px" py="5px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3>{question.noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={question._id}
                      question={question}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePosAns(e, question.answer.length);
                    }}
                  >
                    {/* passing event or parameter in the function to the eventhandler*/}
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => setanswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post your answer"
                    />
                  </form>
                  <p>
                    Browse other questions tagged
                    {question.questionTags.map((questionTag) => (
                      <Link to="/Tags" key={questionTag} className="ans-tags">
                        {questionTag}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask your own questions.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QuestionDetails;
