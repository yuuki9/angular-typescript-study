import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumMissionCmd} from '../enums/kepco-enum-mission-cmd';
/*
통신방향: 서버->로봇, 응답: COMMAND_ACK, 설명: 임무 command(start, pause, stop)
*/
// cmd 설명: 미션 동작, enum: KEPCO_ENUM_MISSION_CMD uint8_t
export class KepcoCmdMission extends MAVLinkMessage {
	public cmd!: KepcoEnumMissionCmd;
	public _message_id: number = 51003;
	public _message_name: string = 'KEPCO_CMD_MISSION';
	public _crc_extra: number = 118;
	public _message_fields: [string, string, boolean, number][] = [
		['cmd', 'uint8_t', false, 0],
	];
}