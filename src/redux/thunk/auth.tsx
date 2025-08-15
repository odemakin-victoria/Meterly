import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Response } from "../types";
import { ERROR_CODE_TYPES } from "../../constants/error";
import { LogUserInAttributes, LogUserInResponse, OnboardUserAttribute, OnboardUserResponse, ProfileUserResponse, RegisterInAttribute, RegisterInResponse, ResendOtpAttributes, ResendOtpInResponse, ValidateOtpAttribute, ValidateOtpResponse } from "../types/auth";

export const RegisterUserIn = createAsyncThunk<
  RegisterInResponse,
  RegisterInAttribute
>(
  "opti2.0/registerUser", // Fixed the action type name to be more accurate
  async (param, thunkApi) => {
    try {
      console.log(param, "this is register param");
      
      const result = await axios.post(
        `/api/auth/register`,
        param,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(result, "this is the response from the api");
      
      let decrypted_res = result.data;
      let res_data = decrypted_res.data as RegisterInResponse;
      
      // This is the key fix - you need to return the data for fulfilled case
      return res_data;
      
    } catch (err: any) {
      console.log(err, "the error in catch");
      
      let errobj = {
        errorCode: "",
        errorMsg: "",
      };

      // Check if it's an axios error with response
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          "responseCode" in errorData
        ) {
          const typedError = errorData as {
            responseCode: string;
            responseMessage: string;
          };
          errobj.errorCode = typedError.responseCode;
          errobj.errorMsg = typedError.responseMessage;
          console.log(typedError.responseMessage);
        } else {
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorData.message || "An unexpected error occurred";
        }
      } else {
        errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
        errobj.errorMsg = err.message || "Network error occurred";
      }

      // Use rejectWithValue to return the error object
      return thunkApi.rejectWithValue(errobj);
    }
  }
);

export const LoginUserIn = createAsyncThunk<
  LogUserInResponse,
  RegisterInAttribute
>(
  "opti2.0/registerUser", // Fixed the action type name to be more accurate
  async (param, thunkApi) => {
    try {
      console.log(param, "this is register param");
      
      const result = await axios.post(
        `/api/auth/login`,
        param,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(result, "this is the response from the api");
      
      let decrypted_res = result.data;
      let res_data = decrypted_res.data as LogUserInResponse;
      
      // This is the key fix - you need to return the data for fulfilled case
      return res_data;
      
    } catch (err: any) {
      console.log(err, "the error in forget password catch");
      
      let errobj = {
        errorCode: "",
        errorMsg: "",
      };

      // Check if it's an axios error with response
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        // Handle the new error format: { "status": "Failed", "errors": { ... } }
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          errorData.status === "Failed" &&
          errorData.errors
        ) {
          // Extract error messages from the errors object
          const errors = errorData.errors;
          const errorMessages = Object.values(errors) as string[];
          
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorMessages.length > 0 
            ? errorMessages.join(", ") 
            : "Validation error occurred";
        } 
        // Handle the old error format: { "responseCode": "...", "responseMessage": "..." }
        else if (
          typeof errorData === "object" &&
          errorData !== null &&
          "responseCode" in errorData
        ) {
          const typedError = errorData as {
            responseCode: string;
            responseMessage: string;
          };
          errobj.errorCode = typedError.responseCode;
          errobj.errorMsg = typedError.responseMessage;
        } 
        // Handle generic error format
        else {
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorData.message || "Failed to send reset email";
        }
      } else {
        errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
        errobj.errorMsg = err.message || "Network error occurred";
      }

      console.log("Final error object:", errobj);
      
      // Use rejectWithValue to return the error object
      return thunkApi.rejectWithValue(errobj);
    }
  }
);

export const ValidateOtp = createAsyncThunk<
  ValidateOtpResponse,
  ValidateOtpAttribute
>(
  "opti2.0/validateOtp",
  async (param, thunkApi) => {
    try {
      console.log(param, "this is validate OTP param");
      
      const result = await axios.post(
        `/api/auth/validateOtp`,
        param,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(result, "this is the response from validate OTP API");
      
      let decrypted_res = result.data;
      let res_data = decrypted_res.data as ValidateOtpResponse;
      
      return res_data;
      
    } catch (err: any) {
      console.log(err, "the error in validate OTP catch");
      
      let errobj = {
        errorCode: "",
        errorMsg: "",
      };

      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          "responseCode" in errorData
        ) {
          const typedError = errorData as {
            responseCode: string;
            responseMessage: string;
          };
          errobj.errorCode = typedError.responseCode;
          errobj.errorMsg = typedError.responseMessage;
          console.log(typedError.responseMessage);
        } else {
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorData.message || "OTP validation failed";
        }
      } else {
        errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
        errobj.errorMsg = err.message || "Network error occurred";
      }

      return thunkApi.rejectWithValue(errobj);
    }
  }
);

export const ResendOtp = createAsyncThunk<
  ResendOtpInResponse,
  ResendOtpAttributes
>(
  "opti2.0/resendOtp",
  async (param, thunkApi) => {
    try {
      console.log(param, "this is resend OTP param");
      
      const result = await axios.post(
        `/api/auth/resendOtp`,
        param,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(result, "this is the response from resend OTP API");
      
      let decrypted_res = result.data;
      let res_data = decrypted_res.data as ResendOtpInResponse;
      
      return res_data;
      
    } catch (err: any) {
      console.log(err, "the error in resend OTP catch");
      
      let errobj = {
        errorCode: "",
        errorMsg: "",
      };

      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          "responseCode" in errorData
        ) {
          const typedError = errorData as {
            responseCode: string;
            responseMessage: string;
          };
          errobj.errorCode = typedError.responseCode;
          errobj.errorMsg = typedError.responseMessage;
          console.log(typedError.responseMessage);
        } else {
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorData.message || "Failed to resend OTP";
        }
      } else {
        errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
        errobj.errorMsg = err.message || "Network error occurred";
      }

      return thunkApi.rejectWithValue(errobj);
    }
  }
);

// Updated thunk - OnboardingUser
export const OnboardingUser = createAsyncThunk<
  OnboardUserResponse,
  OnboardUserAttribute
>(
  "opti2.0/registerUser",
  async (param, thunkApi) => {
    try {
      console.log(param, "this is register param");
      
      // ✅ Extract token and create URL with token in the path
      const { token, ...bodyData } = param;
      
      // ✅ Include token in the URL path
      const result = await axios.post(
        `/api/auth/onboarding-user/${encodeURIComponent(token)}`,
        bodyData, // Send everything except token in body
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(result, "this is the response from the api");
      
      let decrypted_res = result.data;
      let res_data = decrypted_res.data as OnboardUserResponse;
      
      // This is the key fix - you need to return the data for fulfilled case
      return res_data;
      
    } catch (err: any) {
      console.log(err, "the error in onboarding user catch");
      
      let errobj = {
        errorCode: "",
        errorMsg: "",
      };

      // Check if it's an axios error with response
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        // Handle the new error format: { "status": "Failed", "errors": { ... } }
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          errorData.status === "Failed" &&
          errorData.errors
        ) {
          // Extract error messages from the errors object
          const errors = errorData.errors;
          const errorMessages = Object.values(errors) as string[];
          
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorMessages.length > 0 
            ? errorMessages.join(", ") 
            : "Validation error occurred";
        }
        
        // Handle the old error format: { "responseCode": "...", "responseMessage": "..." }
        else if (
          typeof errorData === "object" &&
          errorData !== null &&
          "responseCode" in errorData
        ) {
          const typedError = errorData as {
            responseCode: string;
            responseMessage: string;
          };
          errobj.errorCode = typedError.responseCode;
          errobj.errorMsg = typedError.responseMessage;
        }
        
        // Handle generic error format
        else {
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorData.message || "Failed to complete onboarding";
        }
      } else {
        errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
        errobj.errorMsg = err.message || "Network error occurred";
      }

      console.log("Final error object:", errobj);
      
      // Use rejectWithValue to return the error object
      return thunkApi.rejectWithValue(errobj);
    }
  }
);



export const ForgetPassword = createAsyncThunk<
  RegisterInResponse,
  RegisterInAttribute
>(
  "auth/forgetPassword",
  async (param, thunkApi) => {
    try {
      console.log(param, "this is forget password param");
      
      const result = await axios.post(
        `/api/auth/forgetPassword`,
        param,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(result, "this is the response from the forget password api");
      
      let decrypted_res = result.data;
      let res_data = decrypted_res.data as RegisterInResponse;
      
      // Return the data for fulfilled case
      return res_data;
      
    } catch (err: any) {
      console.log(err, "the error in forget password catch");
      
      let errobj = {
        errorCode: "",
        errorMsg: "",
      };

      // Check if it's an axios error with response
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        // Handle the new error format: { "status": "Failed", "errors": { ... } }
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          errorData.status === "Failed" &&
          errorData.errors
        ) {
          // Extract error messages from the errors object
          const errors = errorData.errors;
          const errorMessages = Object.values(errors) as string[];
          
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorMessages.length > 0 
            ? errorMessages.join(", ") 
            : "Validation error occurred";
        } 
        // Handle the old error format: { "responseCode": "...", "responseMessage": "..." }
        else if (
          typeof errorData === "object" &&
          errorData !== null &&
          "responseCode" in errorData
        ) {
          const typedError = errorData as {
            responseCode: string;
            responseMessage: string;
          };
          errobj.errorCode = typedError.responseCode;
          errobj.errorMsg = typedError.responseMessage;
        } 
        // Handle generic error format
        else {
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorData.message || "Failed to send reset email";
        }
      } else {
        errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
        errobj.errorMsg = err.message || "Network error occurred";
      }

      console.log("Final error object:", errobj);
      
      // Use rejectWithValue to return the error object
      return thunkApi.rejectWithValue(errobj);
    }
  }
);

export const FetchUserProfile = createAsyncThunk<
  ProfileUserResponse
>(
  "auth/fetchUserProfile", // Fixed: Changed from "auth/forgetPassword" to match the actual function
  async (_, thunkApi) => {
    try {
      console.log("Fetching user profile...");
      
      const result = await axios.get(
        `/api/auth/get-profile`,
        {
          headers: {
            Accept: "application/json",
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Added auth header
          },
        }
      );

      console.log(result, "this is the response from the get profile api");
      
      let decrypted_res = result.data;
      let res_data = decrypted_res.data as ProfileUserResponse;
      
      // Return the data for fulfilled case
      return res_data;
      
    } catch (err: any) {
      console.log(err, "the error in get profile catch");
      
      let errobj = {
        errorCode: "",
        errorMsg: "",
      };

      // Check if it's an axios error with response
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        
        // Handle the new error format: { "status": "Failed", "errors": { ... } }
        if (
          typeof errorData === "object" &&
          errorData !== null &&
          errorData.status === "Failed" &&
          errorData.errors
        ) {
          // Extract error messages from the errors object
          const errors = errorData.errors;
          const errorMessages = Object.values(errors) as string[];
          
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorMessages.length > 0 
            ? errorMessages.join(", ") 
            : "Validation error occurred";
        } 
        // Handle the old error format: { "responseCode": "...", "responseMessage": "..." }
        else if (
          typeof errorData === "object" &&
          errorData !== null &&
          "responseCode" in errorData
        ) {
          const typedError = errorData as {
            responseCode: string;
            responseMessage: string;
          };
          errobj.errorCode = typedError.responseCode;
          errobj.errorMsg = typedError.responseMessage;
        } 
        // Handle generic error format
        else {
          errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
          errobj.errorMsg = errorData.message || "Failed to fetch user profile";
        }
      } else {
        errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
        errobj.errorMsg = err.message || "Network error occurred";
      }

      console.log("Final error object:", errobj);
      
      // Use rejectWithValue to return the error object
      return thunkApi.rejectWithValue(errobj);
    }
  }
);