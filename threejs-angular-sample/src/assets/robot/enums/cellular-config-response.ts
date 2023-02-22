export enum CellularConfigResponse {
	CELLULAR_CONFIG_RESPONSE_ACCEPTED = 0, // Changes accepted.
	CELLULAR_CONFIG_RESPONSE_APN_ERROR = 1, // Invalid APN.
	CELLULAR_CONFIG_RESPONSE_PIN_ERROR = 2, // Invalid PIN.
	CELLULAR_CONFIG_RESPONSE_REJECTED = 3, // Changes rejected.
	CELLULAR_CONFIG_BLOCKED_PUK_REQUIRED = 4, // PUK is required to unblock SIM card.
	CELLULAR_CONFIG_RESPONSE_ENUM_END = 5, // 
}