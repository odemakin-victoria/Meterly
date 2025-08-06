// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import {
//   apiCatchResponse,
//   Console,
//   removeWhiteSpaceAndQuotes,
//   returnCookie,
//   returnDecryptedError,
//   storeCookie,
// } from "../../utils";
// import { Response } from "../types";
// import { RootState } from "../store/store";
// import { ERROR_CODE_TYPES } from "../../constants/error";
// import { CLIENTID } from "../../constants";
// import { startProcess, startEncryptProcess } from "../../utils/OpenPGPManager";
// import { CreateLoanPreQualificationAttributes, CreateLoanPreQualificationResponse, CreateLoanRequestAttributes, CreateLoanRequestResponse, FetchOrganiztionAttributes, FetchOrganiztionResponse, SendOtpByAccountNumberAndDobAttributes, SendOtpByAccountNumberAndDobResponse, ValidateAccountOtpAttributes, ValidateAccountOtpResponse } from "../types/auth";

// export const sendOtpByAccountNumberAndDob = createAsyncThunk<
// SendOtpByAccountNumberAndDobResponse,
// SendOtpByAccountNumberAndDobAttributes>(
//   "opti2.0/logUserIn", async (param, thunkApi) => {
//     try {
//       console.log(param, "this is upgrade param ");
//       let d = await startEncryptProcess(JSON.stringify(param));
//       const result = await axios.post(
//         `/api/validation/sendDobOtp`,
//         {
//           data: d,
//         },
//         {
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );

//       let decrypted_res = await startProcess(result.data);
// 			console.log(result,"this is the encrypted response")
// 			if (!decrypted_res) {
// 				return thunkApi.rejectWithValue({
// 					errorCode: ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: "Something went wrong please try again",
// 				});
// 			}
// 			let data = JSON.parse(decrypted_res as string) as Response;
	
// 			if (data.ResponseCode != "00") {
// 				return thunkApi.rejectWithValue({
// 					errorCode: data.ResponseCode || ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: data.ResponseMessage || "Request failed please try again",
// 				});
// 			}
	
// 			let res_data = data.Data as SendOtpByAccountNumberAndDobResponse;
// 			// Console.warn("logUserIn data", res_data);
// 			return thunkApi.fulfillWithValue(res_data);
// 		} catch (err) {
// 			Console.log("---logUserIn err ----", err);
// 			let error = await returnDecryptedError(err, true);
// 			console.log(error, "the error in catch");
// 			let errobj = {
// 				errorCode: "",
// 				errorMsg: "",
// 			};
// 			if (
// 				typeof error === "object" &&
// 				error !== null &&
// 				"responseCode" in (error as Record<string, unknown>)
// 			) {
// 				const typedError = error as {
// 					responseCode: string;
// 					responseMessage: string;
// 				};
// 				errobj.errorCode = typedError.responseCode;
// 				errobj.errorMsg = typedError.responseMessage;
// 				console.log(typedError.responseMessage)
// 			} else {
// 				errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
// 				errobj.errorMsg =
// 					typeof error === "string" ? error : "An unexpected error occurred";
// 			}
	
// 			return thunkApi.rejectWithValue(errobj);
// 		}
// 	});

// 	export const validateAccountOtp = createAsyncThunk<
// ValidateAccountOtpResponse,
// ValidateAccountOtpAttributes
// >("opti2.0/validateOtp", async (param, thunkApi) => {
//   try {
// 		console.log(param, "this is upgrade param ");
// 		let d = await startEncryptProcess(JSON.stringify(param));

//     const result = await axios.post(
//       `/api/validation/validateAccountOtp`,
      
// 			{
// 				data: d,
// 			},
//       {
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     let decrypted_res = await startProcess(result.data);
// 			console.log(result,"this is the encrypted response")
// 			if (!decrypted_res) {
// 				return thunkApi.rejectWithValue({
// 					errorCode: ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: "Something went wrong please try again",
// 				});
// 			}
// 			let data = JSON.parse(decrypted_res as string) as Response;
	
// 			if (data.ResponseCode != "00") {
// 				return thunkApi.rejectWithValue({
// 					errorCode: data.ResponseCode || ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: data.ResponseMessage || "Request failed please try again",
// 				});
// 			}
	
// 			let res_data = data.Data as ValidateAccountOtpResponse;
// 			// Console.warn("logUserIn data", res_data);
// 			return thunkApi.fulfillWithValue(res_data);
// 		} catch (err) {
// 			Console.log("---logUserIn err ----", err);
// 			let error = await returnDecryptedError(err, true);
// 			console.log(error, "the error in catch");
// 			let errobj = {
// 				errorCode: "",
// 				errorMsg: "",
// 			};
// 			if (
// 				typeof error === "object" &&
// 				error !== null &&
// 				"responseCode" in (error as Record<string, unknown>)
// 			) {
// 				const typedError = error as {
// 					responseCode: string;
// 					responseMessage: string;
// 				};
// 				errobj.errorCode = typedError.responseCode;
// 				errobj.errorMsg = typedError.responseMessage;
// 				console.log(typedError.responseMessage)
// 			} else {
// 				errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
// 				errobj.errorMsg =
// 					typeof error === "string" ? error : "An unexpected error occurred";
// 			}
	
// 			return thunkApi.rejectWithValue(errobj);
// 		}
// });


// export const createLoanRequest = createAsyncThunk<
// CreateLoanRequestResponse,
// CreateLoanRequestAttributes
// >("opti2.0/validateOtp", async (param, thunkApi) => {
//   try {
// 		console.log(param, "this is upgrade param ");
// 		let d = await startEncryptProcess(JSON.stringify(param));

//     const result = await axios.post(
//       `/api/validation/loanRequest`,
      
// 			{
// 				data: d,
// 			},
//       {
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     let decrypted_res = await startProcess(result.data);
// 			console.log(result,"this is the encrypted response")
// 			if (!decrypted_res) {
// 				return thunkApi.rejectWithValue({
// 					errorCode: ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: "Something went wrong please try again",
// 				});
// 			}
// 			let data = JSON.parse(decrypted_res as string) as Response;
	
// 			if (data.ResponseCode != "00") {
// 				return thunkApi.rejectWithValue({
// 					errorCode: data.ResponseCode || ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: data.ResponseMessage || "Request failed please try again",
// 				});
// 			}
	
// 			let res_data = data.Data as CreateLoanRequestResponse;
// 			// Console.warn("logUserIn data", res_data);
// 			return thunkApi.fulfillWithValue(res_data);
// 		} catch (err) {
// 			Console.log("---logUserIn err ----", err);
// 			let error = await returnDecryptedError(err, true);
// 			console.log(error, "the error in catch");
// 			let errobj = {
// 				errorCode: "",
// 				errorMsg: "",
// 			};
// 			if (
// 				typeof error === "object" &&
// 				error !== null &&
// 				"responseCode" in (error as Record<string, unknown>)
// 			) {
// 				const typedError = error as {
// 					responseCode: string;
// 					responseMessage: string;
// 				};
// 				errobj.errorCode = typedError.responseCode;
// 				errobj.errorMsg = typedError.responseMessage;
// 				console.log(typedError.responseMessage)
// 			} else {
// 				errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
// 				errobj.errorMsg =
// 					typeof error === "string" ? error : "An unexpected error occurred";
// 			}
	
// 			return thunkApi.rejectWithValue(errobj);
// 		}
// });

// export const createLoanPreQualificationRequest = createAsyncThunk<
// CreateLoanPreQualificationResponse,
// CreateLoanPreQualificationAttributes
// >("opti2.0/validateOtp", async (param, thunkApi) => {
//   try {
// 		console.log(param, "this is upgrade param ");
// 		let d = await startEncryptProcess(JSON.stringify(param));

//     const result = await axios.post(
//       `/api/validation/preQualification`,
      
// 			{
// 				data: d,
// 			},
//       {
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     let decrypted_res = await startProcess(result.data);
// 			console.log(result,"this is the encrypted response")
// 			if (!decrypted_res) {
// 				return thunkApi.rejectWithValue({
// 					errorCode: ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: "Something went wrong please try again",
// 				});
// 			}
// 			let data = JSON.parse(decrypted_res as string) as Response;
	
// 			if (data.ResponseCode != "00") {
// 				return thunkApi.rejectWithValue({
// 					errorCode: data.ResponseCode || ERROR_CODE_TYPES["GENERAL_ERROR"],
// 					errorMsg: data.ResponseMessage || "Request failed please try again",
// 				});
// 			}
	
// 			let res_data = data.Data as CreateLoanPreQualificationResponse;
// 			// Console.warn("logUserIn data", res_data);
// 			return thunkApi.fulfillWithValue(res_data);
// 		} catch (err) {
// 			Console.log("---logUserIn err ----", err);
// 			let error = await returnDecryptedError(err, true);
// 			console.log(error, "the error in catch");
// 			console.log("preqaul error");
// 			let errobj = {
// 				errorCode: "",
// 				errorMsg: "",
// 			};
// 			if (
// 				typeof error === "object" &&
// 				error !== null &&
// 				"responseCode" in (error as Record<string, unknown>)
// 			) {
// 				const typedError = error as {
// 					responseCode: string;
// 					responseMessage: string;
// 				};
// 				errobj.errorCode = typedError.responseCode;
// 				errobj.errorMsg = typedError.responseMessage;
// 				console.log(typedError.responseMessage)
// 			} else {
// 				errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
// 				errobj.errorMsg =
// 					typeof error === "string" ? error : "An unexpected error occurred";
// 			}
	
// 			return thunkApi.rejectWithValue(errobj);
// 		}
// });



// export const fetchOrganizationDetails = createAsyncThunk<
// FetchOrganiztionResponse,
// FetchOrganiztionAttributes

// >("opti2.0/fetchUserByAccountNumber", async (param, thunkApi) => {
// 	try {
//     const result = await axios.get(
//       `/api/validation/getOrganisationId?limit=${param.organisationId}`,
//       {
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );
//     let decrypted_res = (result.data);
//     // Console.log(decrypted_res, "the actual from decrypted fnc get details");

//     if (!decrypted_res) {
//       return thunkApi.rejectWithValue({
//         errorCode: ERROR_CODE_TYPES["GENERAL_ERROR"],
//         errorMsg: "Something went wrong please try again",
//       });
//     }


//     let data = decrypted_res  as Response;

// 		if (data.responseCode !== "00") {
//       return thunkApi.rejectWithValue({
//         errorCode: data.responseCode,
//         errorMsg: data.responseMessage,
//       });
//     }

//     let res_data = decrypted_res as FetchOrganiztionResponse;
		

//     return thunkApi.fulfillWithValue(res_data);
//   } catch (err) {
//     return await apiCatchResponse(err, thunkApi, () => {
//       return thunkApi.dispatch(fetchOrganizationDetails(param));
//     });
//   }
// });