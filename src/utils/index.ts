// import changeNavigationBarColor from 'react-native-navigation-bar-color';
import CryptoJS from "crypto-js";
import country from "../constants/country";
import axios from "axios";
import { Response } from "../redux/types";
import { ERROR_CODE_TYPES } from "../constants/error";
import currencyCodeSymbol from "../constants/currency-code-symbol";
import type { AppDispatch } from "../redux/store/store";
import { logUserOut } from "../redux/slice/UserSlice";
import { ErrorResponse } from "../redux/types/auth";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {showMessage} from 'react-native-flash-message';
import {
  BillTransferOptions,
  BioInfo,
  TransactionTypeDetails,
  TransferOptions,
} from "../types";
import { startProcess } from "../utils/OpenPGPManager";
import Swal from "sweetalert2";
import { refreshAccessToken } from "@/redux/thunk/auth";

export const getBaseUrl = () => {
  // return "https://optiapi.optimusbank.com:3500/Optiverse-Gateway/gateway/api";
  if (process.env.NODE_ENV == "development") {
    return "https://optiweb.optimusbank.com:8025/api-gateway";
    // return "https://optiweb.optimusbank.com:8025/optiverse-auth-api/api/v3";

    //return 'https://optiweb.optimusbank.com:8025/optiverse-gateway/gateway/api';
  }
  return "https://optiapi.optimusbank.com:3500/Optiverse-Gateway/gateway/api";
};

export const getAuthBaseUrl = () => {
  // return "https://optiapi.optimusbank.com:3500/Optiverse-Gateway/gateway/api/auth";
  if (process.env.NODE_ENV == "development") {
    return "https://optiweb.optimusbank.com:8025/api-gateway";
    // return " https://optiweb.optimusbank.com:8025/optiverse-auth-api/api/v3/auth";
    //return 'https://optiweb.optimusbank.com:8025/optiverse-gateway/gateway/api/auth';
  }
  return "https://optiapi.optimusbank.com:3500/Optiverse-Gateway/gateway/api/auth";
};


export const returnOptimusBankCode = () => {
  if (process.env.NODE_ENV == "development") {
    return "999366"; //test api
  }

  return "000036"; //prod api
};

// export const changeAndroidNavigationBarColor = async (color: string) => {
//   try {
//     changeNavigationBarColor('#E6EBF5');
//   } catch (err) {
//     console.log(err);
//   }
// };

const emptyFunc = () => {};

export const Console =
  process.env.NODE_ENV == "development"
    ? console
    : { warn: emptyFunc, log: emptyFunc, error: emptyFunc, info: emptyFunc };

export function getFomattedDate(date: Date) {
  if (!date) {
    return "";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1.
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

interface EncryptionResult {
  success: boolean;
  encryptedText: string;
  error?: string;
}

export const encryptWithAES256 = (originalText: string): EncryptionResult => {
  try {
    const key = CryptoJS.enc.Utf8.parse("wQ2mm5V4Uad2sygYJVHF9yPEufd8AHPD");
    const iv = CryptoJS.enc.Utf8.parse("&Fq6lm$La,2E7%H;");

    // const key = CryptoJS.enc.Utf8.parse('Wc43IKafoWG+vv9Q1VwARw==');
    // const iv = CryptoJS.enc.Utf8.parse('859f6a015524e945355a258ae8eb2a6e');

    let encrypted = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(originalText),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );

    return {
      success: true,
      encryptedText: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    };
  } catch (error) {
    Console.log("encryptWithAES256 err", error);
    return {
      success: false,
      encryptedText: "",
      error: `Encryption error: ${String(error)}`,
    };
  }
};

export const encryptDataFromClane = async (data: any) => {
  try {
    let key = CryptoJS.enc.Utf8.parse("b75524255a7f54d2726a951bb39204df");
    let iv = CryptoJS.enc.Utf8.parse("1583288699248111");

    const cipherData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();

    return cipherData;
  } catch (err) {}
};

export const decryptDataFromClane = async (data: any) => {
  const key = CryptoJS.enc.Utf8.parse("b75524255a7f54d2726a951bb39204df");
  const iv = CryptoJS.enc.Utf8.parse("1583288699248111");

  let bytes = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  return decryptedData;
};

export function removeSpacesAndTrim(input: string) {
  // Remove spaces from the input
  const stringWithoutSpaces = input.replace(/\s+/g, "");

  // Trim unnecessary text
  const trimmedString = stringWithoutSpaces.trim();

  return trimmedString;
}

interface DecryptionResult {
  success: boolean;
  decryptedText: string;
  error?: string;
}

export const decryptWithAES256 = (originalText: string): DecryptionResult => {
  try {
    const key = CryptoJS.enc.Utf8.parse("wQ2mm5V4Uad2sygYJVHF9yPEufd8AHPD");
    const iv = CryptoJS.enc.Utf8.parse("&Fq6lm$La,2E7%H;");
    // const key = CryptoJS.enc.Utf8.parse('Wc43IKafoWG+vv9Q1VwARw==');
    // const iv = CryptoJS.enc.Utf8.parse('859f6a015524e945355a258ae8eb2a6e');

    let decrypted = CryptoJS.AES.decrypt(originalText, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return {
      success: true,
      decryptedText: decrypted.toString(CryptoJS.enc.Utf8),
    };
  } catch (error) {
    Console.log("decryptWithAES256 err", error);
    return {
      success: false,
      decryptedText: "",
      error: `Encryption error: ${String(error)}`,
    };
  }
};

export function replaceWithAsterisks(
  inputString: string,
  startIndex: number,
  length: number
): string {
  if (startIndex < 0 || startIndex >= inputString.length || length <= 0) {
    // Invalid parameters, return the original string
    return inputString;
  }

  const endIndex = startIndex + length;
  const prefix = inputString.substring(0, startIndex);
  const replacedPart = "*".repeat(length);
  const suffix = inputString.substring(endIndex);

  return prefix + replacedPart + suffix;
}

export const generateRandomGUID = (): string => {
  const randomHex = Math.floor(Math.random() * 0xffffffff)
    .toString(16)
    .toUpperCase();
  const paddedHex = randomHex.padStart(32, "0"); // Ensure the string is 32 characters long
  return paddedHex;
};

export const generateRandomHex = (length: number): string => {
  const characters = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
};

export const returnCountryCode = (name: string) => {
  let countryobject = country.find(
    (item) => item.name.toLowerCase() == name.toLowerCase()
  );

  return countryobject ? countryobject.code : name;
};

export function appendDateStringToDate(dateString: string): string {
  return `${dateString}T00:00:00.000Z`;
}

// export const returnDecryptedError = async (err: unknown, objRes = false) => {
//   try {
//     Console.log("returnDecryptedError 1", [String(err)]);
//     let generic_msg = "Request Failed. Please try again";
//     let generic_error_code = ERROR_CODE_TYPES["GENERAL_ERROR"];
//     if (axios.isAxiosError(err)) {
//       if (String(err).indexOf("Network Error") > -1) {
//         return "Network Error";
//       }
//       if (err?.response?.data) {
// 				let error = await startProcess(err?.response?.data);

//         // let error =  err?.response?.data;
//         Console.log(typeof(error), "the actual from decrypted second fnc");
//         Console.log("returnDecryptedError 2", [error]);
       
//         console.log("Not an object");
//         return error
         
//       }
//     }

//     return objRes
//       ? {
//           responseMessage: generic_msg,
//           responseCode: generic_error_code,
//         }
//       : generic_msg;
//   } catch (err) {
//     return "Request Failed please try again";
//   }
// };

export const returnDecryptedError = async (err: unknown, objRes = false) => {
  try {
		console.log(err?.response.status, "returnDecryptedError @@@@@@@@@@@")
    if (err?.status == 401) {
			logOutCleanUp();
	
		}
		if (err?.response?.status === 401) {
			// Refresh token and retry the request
			logOutCleanUp();
	
	
	
		}
		
		Console.log("returnDecryptedError 1", [String(err)]);
    let generic_msg = "Request Failed. Please try again";
    let generic_error_code = ERROR_CODE_TYPES["GENERAL_ERROR"];
    if (axios.isAxiosError(err)) {
      if (String(err).indexOf("Network Error") > -1) {
        return "Network Error";
      }
      if (err?.response?.data) {
        let error = await startProcess((err?.response?.data));
        Console.log(error, "the actual from decrypted second fnc");
        Console.log("returnDecryptedError 2", [error]);
        error = JSON.parse(error);
        if (typeof error == "object") {
          Console.log("its an obj");
          let res_err = error as Response;
          if (!objRes) {
            return res_err.ResponseMessage || generic_msg;
          } else {
            Console.log(
              res_err,
              "the res_Err to extract response message cause it's an object"
            );
            return {
              responseMessage: res_err.ResponseMessage || generic_msg,
              responseCode: res_err.ResponseCode || generic_error_code,
            };
          }
        }
        console.log("Not an object");
        return objRes
          ? {
              responseMessage: generic_msg,
              responseCode: generic_error_code,
            }
          : generic_msg;
      }
			if (err.status == 401) {
				logOutCleanUp();
		
			}
			if (err.response?.status === 401) {
				// Refresh token and retry the request
				logOutCleanUp();
		
		
		
			}
    }

    return objRes
      ? {
          responseMessage: generic_msg,
          responseCode: generic_error_code,
        }
      : generic_msg;
  } catch (err) {
    return "Request Failed please try again";
  }
};
export const apiCatchResponse = async (
  err: any,
  thunkApi: any,
  endpointFnc: any
) => {
  let error = await returnDecryptedError(err, true);
  Console.log("api catch error-----", error);
  if (err.status == 401) {
		logOutCleanUp();

  }
  if (err.response?.status === 401) {
    // Refresh token and retry the request
		logOutCleanUp();



  }
  let errobj = {
    errorCode: "",
    errorMsg: "",
  };
  if (typeof error == "object") {
    errobj.errorCode = error.responseCode;
    errobj.errorMsg = error.responseMessage;
  } else {
    errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
    errobj.errorMsg = error;
  }
  return thunkApi.rejectWithValue(errobj);
};




// export const apiCatchResponse = async (
//   err: any,
//   thunkApi: any,
//   endpointFnc: any
// ) => {
//   let error = await returnDecryptedError(err, true);
//   console.log("api catch error-----", err, error);

//   if (err.status === 401 || err.response?.status === 401) {
//     const refreshResult = await thunkApi
//       .dispatch(
//         refreshAccessToken({
//           onOk: () => thunkApi.dispatch(endpointFnc), // Dispatching the main function after token refresh
//         })
//       )
//       .unwrap();

//     if (refreshResult) {
//       return await thunkApi.dispatch(endpointFnc()).unwrap();
//     }
//   }

//   // Handle other errors
//   let errobj = { errorCode: "", errorMsg: "" };
//   if (typeof error === "object") {
//     errobj.errorCode = error.responseCode;
//     errobj.errorMsg = error.responseMessage;
//   } else {
//     errobj.errorCode = ERROR_CODE_TYPES["GENERAL_ERROR"];
//     errobj.errorMsg = error;
//   }

//   return thunkApi.rejectWithValue(errobj);
// };



export function getCurrencySymbol(code: string) {
  const currency = currencyCodeSymbol.find(
    (currency) => currency.code === code.toUpperCase()
  );
  return currency ? currency.symbol : "";
}

export function addCommasToNumber(number: string | number): string {
  if (!number && number !== 0) {
    return "";
  }

  // Convert the number to string
  const numberString = String(number);

  // Split the number into integer and decimal parts
  const parts = numberString.split(".");

  // Format the integer part with commas every three digits
  const integerPartWithCommas = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the integer and decimal parts with the decimal point
  let formattedText = integerPartWithCommas;
  if (parts.length > 1) {
    formattedText += "." + parts[1];
  }

  return formattedText;
}

export function formatAmountInput(number: string | number) {
  // Remove existing commas and any non-digit characters except decimals
  const cleanedText = String(number).replace(/[^\d.]/g, "");

  // Split the number into integer and decimal parts
  const parts = cleanedText.split(".");

  // Format the integer part with commas every three digits
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the integer and decimal parts with the decimal point
  let formattedText = integerPart;
  if (parts.length > 1) {
    formattedText += "." + parts[1];
  }

  return formattedText;
}

export function removeCommasFromNumber(numberWithCommas: string) {
  return numberWithCommas.replace(/,/g, "");
}
export function removeNonNumericCharacters(input: string) {
  return input.replace(/[^0-9.]/g, "");
}
export const copyToClipboard = (text: string) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // Prevents scrolling to bottom
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    console.log("Text copied to clipboard");
    return true;
  } catch (err) {
    console.error("Failed to copy text", err);
    return false;
  }
  document.body.removeChild(textarea);
};

export function handleErrorEdgeCases(
  dispatch: AppDispatch,
  error: ErrorResponse,
  defaultAction?: () => void
) {
  try {
    if (!dispatch || !error) {
      return;
    }

    switch (error.errorCode) {
      case ERROR_CODE_TYPES["PASSWORD_ACCOUNT_LOCKED"]:
        // showMessage({
        //   message: 'You account has been locked, please contact customer care',
        //   type: 'danger',
        //   duration: 4000,
        // });
        dispatch(logUserOut());
        break;
      case ERROR_CODE_TYPES["PIN_MISMATCH"]:
        // showMessage({
        //   message: `Transaction pin is incorrect, you have 3 attempts before account is locked`,
        //   type: 'danger',
        //   duration: 4000,
        // });
        break;
      case ERROR_CODE_TYPES["INVALID_CREDENTIALS"]:
        // showMessage({
        //   message:
        //     error.errorMsg ||
        //     'Email or password incorrect, please note that your account will be locked after 3 wrong trials ',
        //   type: 'danger',
        //   duration: 4000,
        // });
        break;
      case ERROR_CODE_TYPES["PIN_ACCOUNT_LOCKED"]:
        // showMessage({
        //   message: 'You transaction pin has been locked!',
        //   type: 'danger',
        //   duration: 4000,
        // });
        break;
      default:
        defaultAction && defaultAction();
        break;
    }
  } catch (err) {
    Console.log("handleErrorEdgeCases err", err);
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-NG", options).format(date);
  return formattedDate.replace(/\b\d{1,2}\b/g, (match) => {
    const num = parseInt(match);
    const suffixes = ["th", "st", "nd", "rd"];
    const suffix =
      num % 100 > 10 && num % 100 < 14 ? "th" : suffixes[num % 10] || "th";
    return `${num}${suffix}`;
  });
}

export function getTimeInAMPMFormat(dateString: string): string {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export function convertSecondsToMinutesSeconds(seconds: number): string {
  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;
  const formattedMinutes: string = String(minutes).padStart(2, "0");
  const formattedSeconds: string = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function removeWhiteSpaceAndQuotes(text: string): string {
  return text.replace(/[\s"']/g, "");
}

export const storeCookie = async (cname = "", cvalue = "", exdays = 1) => {
  try {
    const d = new Date();
    cvalue = (cvalue);
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + `; path=/;`;
  } catch (err) {
    Console.error("storeEncryptedCookie err", JSON.stringify(err));
    return false;
  }
};

export const returnCookie = async (cname = "", cookie = "") => {
  try {
    let name = cname + "=";
    let tousecookie = cookie || document.cookie;
    let ca = tousecookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return (c.substring(name.length, c.length));
      }
    }
    return "";
  } catch (err) {
    Console.error("returnEncryptedCookie err", JSON.stringify(err));
    return null;
  }
};
export const deleteCookie = (cname = "") => {
  try {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Cookie ${cname} deleted.`);
  } catch (err) {
    console.error("deleteCookie err", JSON.stringify(err));
  }
};

export const clearBioInfo = async () => {
  // try {
  //   await AsyncStorage.removeItem(BIOMETRIC_KEY);
  //   return true;
  // } catch (err) {
  //   return false;
  //   Console.error('clearBioInfo err', err);
  // }
};

export const determineTransactionType = (
  choice: TransferOptions | null
): TransactionTypeDetails => {
  switch (choice) {
    case "optimus":
      return {
        TransactionType: 0,
        BeneficiaryTransactionType: "LOCAL_TRANSFER",
      };
    case "others":
      return {
        TransactionType: 1,
        BeneficiaryTransactionType: "EXTERNAL_TRANSFER",
      };
    case "self":
      return {
        TransactionType: 2,
        BeneficiaryTransactionType: "SELF",
      };
    default:
      return {
        TransactionType: 0,
        BeneficiaryTransactionType: "LOCAL_TRANSFER",
      };
  }
};

export const determineBillTransactionType = (
  choice: BillTransferOptions | null
): TransactionTypeDetails => {
  switch (choice) {
    case "airtime":
      return {
        TransactionType: 0,
        BeneficiaryTransactionType: "Airtime/Data",
      };
    case "cabletv":
      return {
        TransactionType: 1,
        BeneficiaryTransactionType: "CableTV",
      };
    case "betting":
      return {
        TransactionType: 2,
        BeneficiaryTransactionType: "Betting",
      };
    case "electricity":
      return {
        TransactionType: 3,
        BeneficiaryTransactionType: "Electricity",
      };
    case "dealer":
      return {
        TransactionType: 4,
        BeneficiaryTransactionType: "DealerPayments",
      };
    case "school":
      return {
        TransactionType: 5,
        BeneficiaryTransactionType: "School and Exam Fees",
      };
    case "travel":
      return {
        TransactionType: 6,
        BeneficiaryTransactionType: "Travel and Hotel",
      };
    case "financial":
      return {
        TransactionType: 7,
        BeneficiaryTransactionType: "Financial Services",
      };
    case "unknown":
      return {
        TransactionType: 8,
        BeneficiaryTransactionType: "Unknown",
      };
    default:
      return {
        TransactionType: 0,
        BeneficiaryTransactionType: "Airtime/Data",
      };
  }
};

export const getInitials = (username: string) => {
  const words = username.split(" ");
  const initials = words.map((word: string) => word.charAt(0)).join("");
  return initials.toUpperCase();
};

export function formatSize(sizeInBytes: number): string {
  const units = ["bytes", "KB", "MB", "GB", "TB"];

  let unitIndex = 0;
  let size = sizeInBytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return size % 1 === 0
    ? `${size} ${units[unitIndex]}`
    : `${size.toFixed(2)} ${units[unitIndex]}`;
}

export const camelCaseToWords = (str: string) => {
  const words = str.replace(/([A-Z])/g, " $1").split(" ");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const encodeToBase64 = (input: string) => {
  const utf8Encode = new TextEncoder().encode(input);
  const base64String = btoa(String.fromCharCode(...utf8Encode));
  return base64String;
};

export const encryptData = (data: string) => {
  const SECRET_KEY = "b92145d7-d967-44b4-93a5-8d057ca6a5e8";
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
  return encrypted;
};

export const decryptData = (data: string) => {
  const SECRET_KEY = "b92145d7-d967-44b4-93a5-8d057ca6a5e8";
  const decrypted = CryptoJS.AES.decrypt(data, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  // Console.warn(decrypted);
  return decrypted;
};

export const extractDetails = (phoneDetails: string, email: string) => {
  try {
    // Mask the phone number, defaulting to asterisks if no phoneDetails are available
    const phone = phoneDetails ? "*".repeat(4) + phoneDetails.slice(-4) : "";

    // Safely access and process email
    const [localPart, domain] = email.split("@");
    const visibleStartLength = 4; // Number of characters to show at the beginning
    const visibleEndLength = 3; // Number of characters to show at the end

    let maskedEmail = email; // Default to unmasked email if no localPart

    if (localPart && domain) {
      const maskedLength =
        localPart.length - visibleStartLength - visibleEndLength;
      const maskedLocalPart =
        localPart.slice(0, visibleStartLength) +
        "*".repeat(Math.max(maskedLength, 0)) +
        localPart.slice(-visibleEndLength);
      maskedEmail = maskedLocalPart + "@" + domain;
    }

    // Safely set the email and phone details
    return {
      phone,
      email: maskedEmail,
    };
  } catch (error) {
    console.error("Failed to extract details:", error);
  }
};
export const renderCurrencyType = (code: string) => {
  switch (code) {
    case "NGN":
      return "₦";
    case "USD":
      return "$";
    default:
      break;
  }
};

export const formatDate2 = (dateStr: string) => {
  const date = new Date(dateStr);
  const day = date.getDate();

  return `${day} ${date.toLocaleString("en-GB", {
    month: "long",
    year: "numeric",
  })}`;
};
export const extractTime = (dateStr: string) => {
  const date = new Date(dateStr);

  // Format the time as 'HH:MM AM/PM'
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  });
};
export const formatDateAndTime = (dateStr: string) => {
  const date = new Date(dateStr);

  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase(); // Makes month uppercase

  const formattedTime = date
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase(); // Adds AM/PM in uppercase

  return `${formattedDate}, ${formattedTime}`;
};

export const logOutCleanUp = () => {
  deleteCookie("KAD_AT");
  deleteCookie("KAD_RT");
  deleteCookie("KAD_CI");
	deleteCookie("KAD_USER_ROLE");
  deleteCookie("KAD_USER_EMAIL");
	  deleteCookie("RIB_DI");


  if (!window.location.pathname.includes("/auth/login")) {
    Swal.fire({
      title: "Session expired. Please login again",
      timer: 10000,
    }).then(() => window.location.replace("/auth/login"));
  }
};
export const trimWithEllipses = (str: string, length?: number) => {
  if (!str) return "";
  return str.length > (length ?? 40)
    ? `${str.substring(0, length ?? 40)}...`
    : str;
};
