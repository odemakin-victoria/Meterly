import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Response } from "../types";
import { ERROR_CODE_TYPES } from "../../constants/error";
import { AddUserMeterAttribute, AddUserMeterResponse, FetchTransactionHistoryResponse, RechargeMeterAttribute, RechargeMeterResponse, RemoveUserMeterAttribute, RemoveUserMeterResponse } from "../types/meter-management";


export const AddMeter = createAsyncThunk<
	AddUserMeterResponse,
	AddUserMeterAttribute
>(
	"auth/forgetPassword",
	async (param, thunkApi) => {
		try {
			console.log(param, "this is forget password param");
			
			const result = await axios.post(
				`/api/meter-management/addMeter`,
				param,
				{
					headers: {
						Accept: "application/json",
					},
				}
			);

			console.log(result, "this is the response from the forget password api");
			
			let decrypted_res = result.data;
			let res_data = decrypted_res.data as AddUserMeterResponse;
			
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

export const RemoveUserMeter = createAsyncThunk<
	RemoveUserMeterResponse,
	RemoveUserMeterAttribute
>(
	"auth/forgetPassword",
	async (param, thunkApi) => {
		try {
			console.log(param, "this is forget password param");
			      const { meterId, ...bodyData } = param;

			const result = await axios.delete(
				`/api/meter-management/removeMeter/${encodeURIComponent(meterId)}`,
			
				{
					headers: {
						Accept: "application/json",
					},
				}
			);

			console.log(result, "this is the response from the forget password api");
			
			let decrypted_res = result.data;
			let res_data = decrypted_res.data as AddUserMeterResponse;
			
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
export const FetchTransactionHistory = createAsyncThunk<
	FetchTransactionHistoryResponse
	
>(
	"auth/forgetPassword",
	async (param, thunkApi) => {
		try {
			console.log(param, "this is forget password param");

			const result = await axios.get(
				`/api/meter-management/getTransactionHistory`,
			
				{
					headers: {
						Accept: "application/json",
					},
				}
			);

			console.log(result, "this is the response from the forget password api");
			
			let decrypted_res = result.data;
			let res_data = decrypted_res.data as AddUserMeterResponse;
			
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

export const RechargeUserMeter = createAsyncThunk<
	RechargeMeterResponse,
	RechargeMeterAttribute
>(
	"auth/forgetPassword",
	async (param, thunkApi) => {
		try {
			console.log(param, "this is forget password param");
			
			const result = await axios.post(
				`/api/meter-management/recharge-meter`,
				param,
				{
					headers: {
						Accept: "application/json",
					},
				}
			);

			console.log(result, "this is the response from the forget password api");
			
			let decrypted_res = result.data;
			let res_data = decrypted_res.data as RechargeMeterResponse;
			
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