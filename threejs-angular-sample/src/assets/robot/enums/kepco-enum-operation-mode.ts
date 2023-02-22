export enum KepcoEnumOperationMode {
	KEPCO_ENUM_OPERATION_MODE_MANUAL = 0, // 수동조종 모드
	KEPCO_ENUM_OPERATION_MODE_CHARGE = 1, // 충전/데이터 전송모드
	KEPCO_ENUM_OPERATION_MODE_STANDBY = 2, // 스테이션에서 대기모드
	KEPCO_ENUM_OPERATION_MODE_DOCKING = 3, // 도킹 모드, 주행로에서 도킹스테이션까지 이동, 또는 도킹스테이션에서 주행로까지 이동
	KEPCO_ENUM_OPERATION_MODE_AUTO = 4, // 자동 모드, 주행로를 따라 자율주행하는 상태
	KEPCO_ENUM_OPERATION_MODE_STOP = 100, // STOP 모드, 로봇이 정지한상태며 수동조작이 불가능한 상태. 이 모드일때만 KEPCO_CMD_MANUAL_MODE 명령에 의해 수동모드 변환 가능
	KEPCO_ENUM_OPERATION_MODE_ENUM_END = 101, // 
}