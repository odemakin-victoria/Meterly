// import axios from "axios";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { startEncryptProcess, startProcess } from "@/utils/OpenPGPManager";
// import { apiCatchResponse, Console, encodeToBase64, returnDecryptedError } from "@/utils";
// import { ERROR_CODE_TYPES } from "@/constants/error";
// import { Response } from "../types";

// import { SendOtpByBvnAttributes, SendOtpByBvnResponse } from "../types/auth";


// export const createAccountNumber = createAsyncThunk<
// AccountFormsResponse,
// AccountFormsAttribute
// >("opti2.0/verifyPhoneForKYC", async (param, thunkApi) => {
//   try {
// 		console.log(param, "this is upgrade param ")
// 		let d = await startEncryptProcess(JSON.stringify(param)); 
//     // d = encodeToBase64(d as string);
//     const result = await axios.post(
//       `/api/account-opening/account-form`,
//       {
//         data: d,
//       },
//       {
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );
// 		console.log(result, "this is the result fom the api")


//     let decrypted_res = await startProcess(result.data);
//     Console.log(typeof(decrypted_res), "the actual from decrypted fnc");
//     Console.log(decrypted_res, "the actual from decrypted fnc");

//     if (!decrypted_res) {
//       return thunkApi.rejectWithValue({
//         errorCode: ERROR_CODE_TYPES["GENERAL_ERROR"],
//         errorMsg: "Something went wrong please try again",
//       });
//     }
//     let data = JSON.parse(decrypted_res) as Response;

//     if (data.ResponseCode != "00") {
//       return thunkApi.rejectWithValue({
//         errorCode: data.ResponseCode || ERROR_CODE_TYPES["GENERAL_ERROR"],
//         errorMsg: data.ResponseMessage || "Request failed please try again",
//       });
//     }
//     Console.log(decrypted_res, "the actual from decrypted fnc 222");

//     let res_data = data as AccountFormsResponse;
//     Console.log("createAccountAndProfileForUser encrypyed", res_data);
//     return thunkApi.fulfillWithValue(res_data);
//   } catch (err) {
//     Console.log("Error------------------", err)
//     return await apiCatchResponse(err, thunkApi, () =>
//       createAccountNumber(param)
//     );
//   }
// });

// export const sendOtpByBvn = createAsyncThunk<
// SendOtpByBvnResponse,
// SendOtpByBvnAttributes>(
//   "opti2.0/logUserIn", async (param, thunkApi) => {
//     try {
//       console.log(param, "this is upgrade param ");
//       let d = await startEncryptProcess(JSON.stringify(param));
//       const result = await axios.post(
//         `/api/validation/sendOtpBvn`,
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
	
// 			let res_data = data.Data as SendOtpByBvnResponse;
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
  


