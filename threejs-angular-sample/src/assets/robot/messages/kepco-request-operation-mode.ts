import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 서버->로봇, 응답: KEPCO_INFO_OPERATION_MODE, 설명: 현재 로봇 상태 요청
*/
// dummy dummy 필드 uint8_t
export class KepcoRequestOperationMode extends MAVLinkMessage {
	public dummy!: number;
	public _message_id: number = 51015;
	public _message_name: string = 'KEPCO_REQUEST_OPERATION_MODE';
	public _crc_extra: number = 52;
	public _message_fields: [string, string, boolean, number][] = [
		['dummy', 'uint8_t', false, 0],
	];
}