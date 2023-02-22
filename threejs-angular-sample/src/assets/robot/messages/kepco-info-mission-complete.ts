import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 설명: 자동모드 또는 이벤트 모드 시, mission 완료 메세지
*/
// dummy dummy 필드 uint8_t
export class KepcoInfoMissionComplete extends MAVLinkMessage {
	public dummy!: number;
	public _message_id: number = 51012;
	public _message_name: string = 'KEPCO_INFO_MISSION_COMPLETE';
	public _crc_extra: number = 40;
	public _message_fields: [string, string, boolean, number][] = [
		['dummy', 'uint8_t', false, 0],
	];
}