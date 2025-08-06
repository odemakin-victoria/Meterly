



export interface FetchAccountFormsResponse {
  Data: Data
  ResponseMessage: string
  ResponseCode: string
}

export interface Data {
  TotalCount: number
  TotalPages: number
  PageNumber: number
  PageSize: number
  Data: Daum[]
}

export interface Daum {
	AssignedTo: any
	DateAssigned: any
	UpdatedKycLevel: any
	UpdatedSchemeCode: any
	DateApproved: any
	ReviewedBy: any
	StageDeclined: any
	DateDeclined: any
	CurrentKycLevel: any
	CurrentSchemeCode: any
	Reviewer: any
	DateReviewed: any
	Id:number
  SchemeCode: string
  KycLevel: string
  DateRequested: string
  AccountNumber: string
  AccountName: string
}

export type FetchAccountFormsAttributes  = {
	requestType: number;
	status: number;
	pageNumber: number;
	pageSize: number;

};


export type FetchUserAccessAttributes = {
  ApplicationId: number;
};
export type FetchUserAccessResponse = {
  userName: string
  userId: string
  email: string
  department: string
  branch: string
  role: string
}

export type FetchUserAccountDetailAttributes = {
  Id: number;
};



export interface FetchUserAccountDetailResponse {
  AccountNumber: string
  PersonalDetail: PersonalDetail
  SocialMedia: SocialMedia
  NokDetail: NokDetail
  FinancialDetail: FinancialDetail
  ForeignCitizenShip: ForeignCitizenShip
  Identification: Identification
  Document: Document[]
}

export interface PersonalDetail {
	SchemeType: string
  AccountNumber: any
  AccountName: string
  Title: string
  MothersMaidenName: string
  MaritalStatus: string
  PurposeOfAccount: any
  Country: string
  state: string
  Lga: string
  Area: string
  Street: string
  HouseNo: string
}

export interface SocialMedia {
  Linkedin: string
  Facebook: string
  Instagram: string
  Tiktok: string
  Twitter: string
}

export interface NokDetail {
  Name: string
  Relationship: string
  Gender: string
  Dob: string
  PhoneNumber: string
  Email: string
  Country: any
  State: any
  Lga: any
  Area: any
  Street: any
  HouseNo: any
}

export interface FinancialDetail {
  EmploymentStatus: string
  EmployersName: string
  NatureOfBusiness: string
  SourceOfFunds: any
  ExpectedAnnualIncome: string
  OfficeAddress: string
  YearsOfEmployment: string
  EmploymentDate: string
}

export interface ForeignCitizenShip {
  TaxCountry: string
  TaxId: string
  CitizenCountry: string
  Address: any
  TaxUnavailabilityReason: string
  TaxNoReasonClass: string
}

export interface Identification {
  Nin: any
  IdentificationType: string
  IdNumber: string
  IssueDate: string
  ExpiryDate: string
}

export interface Document {
  Id: number
  Type: string
  Extension: string
  Status: string
  Document: string
  Comment: any
}


export type ProcessDocumentAttributes = {
  DocumentId: number;
	Comment:string;
	ProcessType:number
};
export type ProcessDocumentResponse = {
  userName: string
  userId: string
  email: string
  department: string
  branch: string
  role: string
}

export type AssignedReviewerAttributes = {
  RequestId: number | null;
	Email:string;
};
export type AssignedReviewerResponse = {
  userName: string
  userId: string
  email: string
  department: string
  branch: string
  role: string
}

export type FetchNinAttributes = {
  Id: number;
};

export interface FetchNinResponse {
  match: string
  NinDetails: NinDetails
}

export interface NinDetails {
  NinValid: boolean
  FirstName: string
  LastName: string
  Gender: any
  Dob: string
  Phone: string
  Email: string
  Address: string
  Lga: string
  State: string
}

export type ProcessUserRequestAttributes = {
  RequestId: number;
	Comment:string;
	ProcessType:number;
UpgradeInfo:{

	SchemeCode:string;
	ExpectedAnnualIncome:number

}

};
export type ProcessUserRequestResponse = {
  userName: string
  userId: string
  email: string
  department: string
  branch: string
  role: string
}