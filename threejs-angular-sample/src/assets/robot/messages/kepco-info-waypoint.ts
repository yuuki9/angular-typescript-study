import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumMissionAction} from '../enums/kepco-enum-mission-action';
/*
통신방향: 서버->로봇, 설명: 자동모드 또는 이벤트 모드 시, 이동 목표 지점
*/
// x 단위: m, 설명: map에서 x좌표 float
// y 단위: m, 설명: map에서 y좌표 float
// action 설명: waypoint 도착시 행동, enum: KEPCO_ENUM_MISSION_ACTION uint8_t
export class KepcoInfoWaypoint extends MAVLinkMessage {
	public x!: number;
	public y!: number;
	public action!: KepcoEnumMissionAction;
	public _message_id: number = 51001;
	public _message_name: string = 'KEPCO_INFO_WAYPOINT';
	public _crc_extra: number = 140;
	public _message_fields: [string, string, boolean, number][] = [
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['action', 'uint8_t', false, 0],
	];
}