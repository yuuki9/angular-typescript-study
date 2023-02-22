export enum KepcoEnumMissionMode {
	KEPCO_ENUM_MISSION_MODE_AUTO = 0, // 자동점검모드, 서버측에서 미션에 의해서만 설정, 미션 전송 시 서버 -> 로봇 전송
	KEPCO_ENUM_MISSION_MODE_EVENT = 1, // 이벤트 발생 운용모드, 서버측에서 미션에 의해서만 설정, 미션 전송 시 서버 -> 로봇 전송
	KEPCO_ENUM_MISSION_MODE_ENUM_END = 2, // 
}