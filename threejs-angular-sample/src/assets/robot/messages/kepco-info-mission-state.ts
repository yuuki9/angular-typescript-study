import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumMissionCmd} from '../enums/kepco-enum-mission-cmd';
/*
통신방향: 로봇->서버, 주기: 변경 시 또는 KEPCO_CMD_REQUEST_MISSION_STATE 요청 시, 설명: 현재 미션 상태 전송
*/
// state 미션 상태 uint8_t
export class KepcoInfoMissionState extends MAVLinkMessage {
	public state!: KepcoEnumMissionCmd;
	public _message_id: number = 51017;
	public _message_name: string = 'KEPCO_INFO_MISSION_STATE';
	public _crc_extra: number = 75;
	public _message_fields: [string, string, boolean, number][] = [
		['state', 'uint8_t', false, 0],
	];
}