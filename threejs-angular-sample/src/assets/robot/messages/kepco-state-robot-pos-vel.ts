import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: 5hz, 설명: 로봇의 현재 위치와 속도 정보
*/
// x 단위: m, 설명: map에서 x좌표 float
// y 단위: m, 설명: map에서 y좌표 float
// linear_vel 단위: m/s, 설명: 로봇 직진방향 속도, 전진 + float
// angular_vel 단위: rad/s, 설명: 로봇 회전방향 속도, 반시계 방향 + float
// side_vel 단위: m/s, 설명: 로봇 횡방향 속도, 옆으로 이동가능한 로봇만 해당, 오른쪽 + float
// heading 단위: rad, 설명: heading 방향, x축 0도, y축 90도 기준 float
export class KepcoStateRobotPosVel extends MAVLinkMessage {
	public x!: number;
	public y!: number;
	public linear_vel!: number;
	public angular_vel!: number;
	public side_vel!: number;
	public heading!: number;
	public _message_id: number = 50000;
	public _message_name: string = 'KEPCO_STATE_ROBOT_POS_VEL';
	public _crc_extra: number = 108;
	public _message_fields: [string, string, boolean, number][] = [
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['linear_vel', 'float', false, 0],
		['angular_vel', 'float', false, 0],
		['side_vel', 'float', false, 0],
		['heading', 'float', false, 0],
	];
}