import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 서버->로봇, 응답: 성공시 KEPCO_INFO_MISSION_STATE, 설명: 현재 미션 상태 요청
*/
// dummy dummy 필드 uint8_t
export class KepcoRequestMissionState extends MAVLinkMessage {
	public dummy!: number;
	public _message_id: number = 51016;
	public _message_name: string = 'KEPCO_REQUEST_MISSION_STATE';
	public _crc_extra: number = 81;
	public _message_fields: [string, string, boolean, number][] = [
		['dummy', 'uint8_t', false, 0],
	];
}