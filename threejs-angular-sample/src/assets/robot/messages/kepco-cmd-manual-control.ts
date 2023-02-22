import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 서버->로봇, 주기: xxhz, 응답: 수동조종이 불가능한 모드일때 COMMAND_ACK, 설명: 수동조작 명령, 모든값 범위는 -1~1로 normalize해서 전송
*/
// linear_vel 설명: 직진 명령 float
// angular_vel 설명: 회전 명령 float
// side_vel 설명: 횡방향 명령 float
export class KepcoCmdManualControl extends MAVLinkMessage {
	public linear_vel!: number;
	public angular_vel!: number;
	public side_vel!: number;
	public _message_id: number = 51007;
	public _message_name: string = 'KEPCO_CMD_MANUAL_CONTROL';
	public _crc_extra: number = 100;
	public _message_fields: [string, string, boolean, number][] = [
		['linear_vel', 'float', false, 0],
		['angular_vel', 'float', false, 0],
		['side_vel', 'float', false, 0],
	];
}