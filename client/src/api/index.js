import axios from "axios"; //data requesting to and responding from the server

const API = axios.create({ baseURL: "http://localhost:5000" }); //request and respond url

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`; // providing user token to each and every request to the database for security purposes
  }
  return req;
});

export const login = (authData) => API.post("/user/login", authData); // sending data (authData) to the server
export const signup = (authData) => API.post("/user/signup", authData); // sending data (authData) to the server

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestions = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });
export const fetchAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData)
