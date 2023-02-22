import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
로봇이 서버에 접속을 해제하는 신호
*/
// robo_code 로봇의 고유번호 char
export class KepcoDisconnect extends MAVLinkMessage {
	public robo_code!: string;
	public _message_id: number = 59002;
	public _message_name: string = 'KEPCO_DISCONNECT';
	public _crc_extra: number = 209;
	public _message_fields: [string, string, boolean, number][] = [
		['robo_code', 'char', false, 20],
	];
}