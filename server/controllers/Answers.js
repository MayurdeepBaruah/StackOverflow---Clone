import mongoose from "mongoose";
import Questions from "../models/Questions.js";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params; //requesting the server only the id
  const { noOfAnswers, answerBody, userAnswered, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    //checking the objectid in moongose database is valid with the request id sent by the user
    return res.status(404).send("Question unavailable...");
  }
  updateNoOfAnswers(_id, noOfAnswers);
  try {
    const updatedQuestion = await Questions.findByIdAndUpdate(_id, {
      $addToSet: { answer: [{ answerBody, userAnswered, userId }] },
    }); // find in record with specific id and update and $addtoSet means adding new value to the answer array
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(404).json(error);
  }
};

const updateNoOfAnswers = async (_id, noOfAnswers) => {
  try {
    await Questions.findByIdAndUpdate(_id, {
      $set: { noOfAnswers: noOfAnswers },
    }); //$set means replacing the array or updating the existing array
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async( req, res ) => {
  const  { id: _id } = req.params;
  const { answerId, noOfAnswers } = req.body;
  console.log(req.body)
  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).send("Question unavailable...")
  }
  if(!mongoose.Types.ObjectId.isValid(answerId))
  {
    return res.status(404).send("Answer unavailable...")
  }
  updateNoOfAnswers(_id, noOfAnswers)
  try {
    await Questions.updateOne({_id},{      //updating only one value
      $pull: {"answer":{ _id: answerId }}    //remove ($pull) this element with particular id
    }) 
    res.status(200).json({ message: "Successfully deleted..."})            
  } catch (error) {
    console.log(error)
    res.status(404).json(error)
  }

}
