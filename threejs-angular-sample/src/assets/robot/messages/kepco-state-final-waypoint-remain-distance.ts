import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: 1hz, 설명: 자동모드 또는 이벤트 모드 시, 최종 도착지까지의 거리, 1Hz
*/
// distance 단위: m, 설명: 최종 도착지까지의 거리 float
export class KepcoStateFinalWaypointRemainDistance extends MAVLinkMessage {
	public distance!: number;
	public _message_id: number = 51005;
	public _message_name: string = 'KEPCO_STATE_FINAL_WAYPOINT_REMAIN_DISTANCE';
	public _crc_extra: number = 147;
	public _message_fields: [string, string, boolean, number][] = [
		['distance', 'float', false, 0],
	];
}