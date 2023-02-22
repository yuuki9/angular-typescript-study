import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 서버->로봇, 응답: COMMAND_ACK, 설명: 자동모드 또는 이벤트 모드 시, 이동 목표 지점 전송 끝 알림
*/
// dummy dummy 필드 uint8_t
export class KepcoInfoWaypointEnd extends MAVLinkMessage {
	public dummy!: number;
	public _message_id: number = 51002;
	public _message_name: string = 'KEPCO_INFO_WAYPOINT_END';
	public _crc_extra: number = 132;
	public _message_fields: [string, string, boolean, number][] = [
		['dummy', 'uint8_t', false, 0],
	];
}