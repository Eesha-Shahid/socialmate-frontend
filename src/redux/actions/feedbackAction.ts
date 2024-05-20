import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { FeedbackReset, setFeedbackSending } from "../reducers/feedbackReducer";
import { updateAlert } from "./alertAction";
import { NotificationType } from "@/types";

export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (message: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
        dispatch(setFeedbackSending(true));
        await axiosInstance.post(`/user/submit/feedback`, {message: message});
        dispatch(FeedbackReset());
        dispatch(updateAlert({ type: NotificationType.Success, message: 'Feedback Submitted.' }))
    } catch (err: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: 'Error Submitting Feedback' }))
        dispatch(FeedbackReset());
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);