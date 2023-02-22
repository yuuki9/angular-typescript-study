import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumOperationMode} from '../enums/kepco-enum-operation-mode';
/*
통신방향: 로봇->서버, 주기: 운용모드 변경 시 또는 KEPCO_CMD_REQUEST_OPERATION_MODE 요청시, 설명: 운용모드 변경 시 정보 제공
*/
// mode 설명: 운용모드, enum: KEPCO_ENUM_OPERATION_MODE uint8_t
export class KepcoInfoOperationMode extends MAVLinkMessage {
	public mode!: KepcoEnumOperationMode;
	public _message_id: number = 51010;
	public _message_name: string = 'KEPCO_INFO_OPERATION_MODE';
	public _crc_extra: number = 116;
	public _message_fields: [string, string, boolean, number][] = [
		['mode', 'uint8_t', false, 0],
	];
}