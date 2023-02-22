import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: 5hz, 설명: 드론의 현재 위치와 속도 정보, TODO: 드론 사용여부에 따라 사용하지 않을 수 있음
*/
// x 단위: m, 설명: map에서 x좌표 float
// y 단위: m, 설명: map에서 y좌표 float
// z 단위: m, 설명: map에서 z좌표 float
// v_x 단위: m/s, 설명: 직진방향 속도, 전진 + float
// v_y 단위: m/s, 설명: 횡방향 속도, 오른쪽 + float
// v_z 단위: m/s, 설명: 상하방향 속도, 상승 + float
// v_yaw 단위: rad/s, 설명: yawing 속도, 반시계방향 + float
// heading 단위: rad, 설명: heading 방향, x축 0도, y축 90도 기준 float
export class KepcoStateDronePosVel extends MAVLinkMessage {
	public x!: number;
	public y!: number;
	public z!: number;
	public v_x!: number;
	public v_y!: number;
	public v_z!: number;
	public v_yaw!: number;
	public heading!: number;
	public _message_id: number = 50002;
	public _message_name: string = 'KEPCO_STATE_DRONE_POS_VEL';
	public _crc_extra: number = 106;
	public _message_fields: [string, string, boolean, number][] = [
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['z', 'float', false, 0],
		['v_x', 'float', false, 0],
		['v_y', 'float', false, 0],
		['v_z', 'float', false, 0],
		['v_yaw', 'float', false, 0],
		['heading', 'float', false, 0],
	];
}