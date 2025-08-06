
type ValidateOtp = {
  PhoneNo?: string;
  OtpToken: string;
  Email?: string;
  ReferenceId: string;
};

export type SendOtpByAccountNumberAttributes = {
  accountNumber: string;
};

export type SendOtpByAccountNumberResponse = {
  data: { referenceId: string | null; phoneNo: string | null };
};

export type ValidateAccountOtpAttributes = {
  AccountNumber: string;
  token: string;
  // referenceID: string;
};
export type ValidateAccountOtpResponse = String;

export type ValidateOtpAttributes = ValidateOtp &
  Required<Pick<ValidateOtp, "Email" | "PhoneNo">>;



	export interface FetchAccountFormResponse {
		data:{
			customerId: string
			accountNumber: string
			accountName: string
			accountOpeningDate: string
			accountType: string
			freezeCode: string
			productCode: string
			product: string
			accountStatus: string
			currencyCode: string
			branchCode: string
			branch: string
			bookBalance: number
			availableBalance: number
			lienAmount: number
			unclearedBalance: number
			clearedBalance: number
			mobileNo: string
			email: string
			isoCode: any
			relationshipManagerId: any
			bvn: any
			kycLevel: string
			dob: any
			effectiveavail: number
			formattedEffAvailBal: string
			errorDetail: any
			channel: string

		}
		
	}
export type ValidateOtpResponse = {
  TraceID: string;
};
export type Document = {
  documentName: string;
  documentFileData: string;
  documentType: number;
  documentNumber: string;
  issueAuthority: string;
  countryOfIssue: string;
  placeOfIssue: string;
  issueDate: string;
  expiryDate: string;
  fileExtension: string;
};

export type Address = {
  address: string | null;
  streetName: string | null;
  houseNumber: string | null;
  postalCode: string | null;
  city: string | null;
  town: string | null;
  state: string | null;
  country: string | null;
  addressType: string | null;
};

export type CreateAccountAndProfileForUserAttributes = {
  emailAddress: string;
  referralCode?: string;
  traceId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNo: string;
  gender: string;
  dateOfBirth: string | Date;
  maritalStatus: string;
  isStaff: boolean;
  nationality: string;
  title: string;
  bvn: string;
  accountType: number;
  documents?: Document[]; // Optional
  addresses?: Address[]; // Optional
  requestId: string;
  smsAlert: boolean;
  productId: string;
  deviceId: string;
  deviceModel: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  pin: string;
  confirmPin: string;
  createdBy: string;
  SecurityResponse: {
    Identifier: string;
    Answer: string;
  };
};

export type CreateAccountAndProfileForUserResponse = {
  nuban: string | null;
  dateCreated: string; // Assuming this is in ISO date-time format
  accountName: string | null;
  customerId: string | null;
  requestId: string | null;
};

export type ResendOtpAttributes = {
  referenceno: string;
};

export type ResendOtpResponse = {
  phoneNumber: string;
  isEnabled: boolean;
  isUsed: boolean;
  referenceId: string;
};

export type SendOtpByAccountNumberAndDobAttributes = {
  accountNumber: string;
  dateOfBirth: string | Date;
};

export type SendOtpByAccountNumberAndDobResponse = {
  ReferenceId: string;
  PhoneNo: string;
};

export type SendOtpByBvnAttributes = {
  bvn: string;
};

export type SendOtpByBvnResponse = {
  ReferenceId: string;
  PhoneNo: string;
};

export type CreateCustomerProfileAttributes = {
  deviceId: string;
  deviceModel: string;
  traceId: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  pin: string;
  confirmPin: string;
  createdBy: string;
  smsAlert: boolean;
  AccountNumber?: string; // Optional property
  SecurityResponse: {
    Identifier: string; // Optional,
    Answer: string;
  };
};


export type UserAccountAttributes = {
  accountNumber?: string;
  dateOfBirth?: string;
	
};

export type UserAccountResponse = {
  AccessToken: string;
	DisplayName: string;
	RefreshToken: string;

  // RefreshToken: {
  //   tokenString: string;
  //   expireAt: string;
  // };
};
export type DecodedToken =  {
  Role: string;
  EmailAddress: string;
  exp: number;
  iss: string;
  aud: string;
}


export type ValidateResetPasswordAttributes = {
  deviceId: string;
  emailAddress: string;
  transactionPin: string;
};

export type ResetPasswordAttributes = {
  deviceId: string;
  emailAddress: string;
  temporalPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  transactionPin: string;
};

export type SendOtpForPasswordResetAttribute = {
  email: string;
  phoneNumber: string;
  transactionPin: string;
};

export type SendOtpForPasswordResetResponse = string;

export type ValidateAnswerFromPasswordResetAttribute = {
  AccountNumber: string;
  SecretAnswer: string;
  TransactionPin: string;
  Device: {
    DeviceId: string;
    DeviceModel: string;
  };
};
export type ValidateAnswerFromPasswordResetResponse = {
  TraceID: string;
};

export type RevealQuestionFromPasswordResetAttribute = {
  AccountNumber: string;
  TransactionPin: string;
};

export type RevealQuestionFromPasswordResetResponse = {
  Label: string;
  UniqueIdentifier: string;
};
export type ChangePasswordFromPasswordResetAttribute = {
  TraceID: string;
  NewPassword: string;
  ConfirmNewPassword: string;
};
export type ChangePasswordFromPasswordResetResponse = {
  referenceId: string;
  phoneNo: string;
  TraceID: string;
};

export type ValidateOtpFromPasswordResetAttribute = {
  PhoneNo: string;
  OtpToken: string;
  Email: string;
  ReferenceId: string;
};

export type ChangePasswordAttribute = {
  deviceId?: string;
  accessToken?: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  transactionPin: string;
};
export type ChangeTransactionPinAttribute = {
  deviceId?: string;
  password: string;
  transactionPin: string;
  NewTransactionPin: string;
  ConfirmNewTransactionPin: string;
};

export type ErrorResponse = {
  errorMsg: string;
  errorCode: string;
};

export type SendOtpForDeviceChangeAttributes = {
  deviceId: string;
  deviceModel: string;
  accountNumber: string;
  password: string;
};

export type SendOtpForDeviceChangeResponse = {
  ReferenceId: string | null;
  SessionId: string | null;
};

export type ChangeDeviceAttributes = {
  AccountNumber: string;
  ReferenceId: string;
  SessionId: string;
  Otp: string;
  DeviceId: string;
  DeviceModel: string;
};

export type RefreshTokenAttribute = {
  refreshToken: string;
};
export type RefreshTokenResponse = {
  ResponseCode: string;
  ResponseMessage: string;
  Data: string;
};
export type RefreshAccessTokenAttributes2 = {
  onOk: () => void;
};
export type FetchAllUserSecretQuestionAttribute = String;
export type FetchAllUserSecretQuestionResponse = {
  Label: string;
  UniqueIdentifier: string;
};

export type setSecurityQuestionAttribute = {
  Response: { Identifier: string | null; Answer: string };
  TransactionPin: string;
  Device: {
    DeviceId: string;
    DeviceModel: string;
  };
};

export type setSecurityQuestionResponse = String;


export type 	CreateLoanRequestAttributes = {
	RequestId: string
  Channel: string
  PensionOrganisationId: string
  AccountNumber: string
  PensionerPin: string
  OTP: string
  Documents: LoanDocument[]
};

export interface LoanDocument {
  FileName: string
  ContentType: string
  Content: string
}

export type CreateLoanRequestResponse = {
  AccountNumber: string;
  token: string;
  // referenceID: string;
};

export type 	CreateLoanPreQualificationAttributes = {
	RequestId: string;
  PensionPin: string;
  TenorInMonths: number;
  LoanAmount: number;
  SubmittedBy: string;
  RepaymentAmount: number;
};

export type 	CreateLoanPreQualificationResponse = {
	RequestId: string;
  PensionPin: string;
  TenorInMonths: number;
  LoanAmount: number;
  SubmittedBy: string;
  RepaymentAmount: number;
};
export type FetchOrganiztionAttributes = {
	organisationId: number;
};

export type FetchOrganiztionResponse = {
  data: Data
  responseCode: string
  responseMessage: string
}

export type Data = {
  items: Item[]
  nextCursor: any
}

export type Item = {
  id: number
  objectId: string
  name: string
  createdBy: string
  createdAt: string
  modifiedAt: any
}