import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: waypoint 변경 시, 설명: 자동모드 또는 이벤트 모드 시, 현재 TARGET으로 하는 waypoint index
*/
// index 설명: 목표지점 waypoint index uint8_t
export class KepcoInfoTargetWaypointIndex extends MAVLinkMessage {
	public index!: number;
	public _message_id: number = 51006;
	public _message_name: string = 'KEPCO_INFO_TARGET_WAYPOINT_INDEX';
	public _crc_extra: number = 121;
	public _message_fields: [string, string, boolean, number][] = [
		['index', 'uint8_t', false, 0],
	];
}