export enum KepcoEnumMissionAction {
	KEPCO_ENUM_MISSION_ACTION_NONE = 0, // 액션 없음
	KEPCO_ENUM_MISSION_ACTION_TURN = 1, // 반대방향으로 회전하는 액션, 보통 복귀하는 지점에 사용됨
	KEPCO_ENUM_MISSION_ACTION_DOCK = 2, // DOCKING 지점
	KEPCO_ENUM_MISSION_ACTION_ENUM_END = 3, // 
}