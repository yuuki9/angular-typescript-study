import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumMissionMode} from '../enums/kepco-enum-mission-mode';
/*
통신방향: 서버->로봇, 응답: COMMAND_ACK, 설명: 자동모드 또는 이벤트 모드 시, 이동 목표 지점 전송 시작 알림
*/
// mode 설명: 미션모드, enum : KEPCO_ENUM_MISSION_MODE uint8_t
// count 설명: waypoint 개수 uint8_t
// speed 단위: m/s, 설명: 미션속도, 초기 미션속도는 0보다 커야함 float
export class KepcoInfoWaypointStart extends MAVLinkMessage {
	public mode!: KepcoEnumMissionMode;
	public count!: number;
	public speed!: number;
	public _message_id: number = 51000;
	public _message_name: string = 'KEPCO_INFO_WAYPOINT_START';
	public _crc_extra: number = 135;
	public _message_fields: [string, string, boolean, number][] = [
		['speed', 'float', false, 0],
		['mode', 'uint8_t', false, 0],
		['count', 'uint8_t', false, 0],
	];
}