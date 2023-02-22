import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumManualMode} from '../enums/kepco-enum-manual-mode';
/*
통신방향: 서버->로봇, 응답: COMMAND_ACK, 설명: 수동모드 적용/해제
*/
// manual 설명: 수동모드 적용/해제, enum: KEPCO_ENUM_MANUAL_MODE uint8_t
export class KepcoCmdManualMode extends MAVLinkMessage {
	public manual!: KepcoEnumManualMode;
	public _message_id: number = 51009;
	public _message_name: string = 'KEPCO_CMD_MANUAL_MODE';
	public _crc_extra: number = 129;
	public _message_fields: [string, string, boolean, number][] = [
		['manual', 'uint8_t', false, 0],
	];
}