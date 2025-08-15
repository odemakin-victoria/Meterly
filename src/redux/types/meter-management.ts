export interface AddUserMeterAttribute {
 meterNumber: string
  meterName: string
  meterAddress: string
  meterType: string
  disco: string
}

export interface AddUserMeterResponse {
	meterNumber: string
	meterName: string
	meterAddress: string
	meterType: string
	disco: string
}


export interface RemoveUserMeterAttribute {
 meterId?: any

}

export interface RemoveUserMeterResponse {
	meterNumber: string
	meterName: string
	meterAddress: string
	meterType: string
	disco: string
}
export interface FetchTransactionHistoryResponse {
	meterNumber: string
	meterName: string
	meterAddress: string
	meterType: string
	disco: string
}

export interface RechargeMeterAttribute {
 meterNumber?: any
 amount:any

}

export interface RechargeMeterResponse {
	status: number
  message: string
  data: string
}


