import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: 1hz, 설명: 로봇의 배터리 정보, TODO: 배터리시스템으로 부터 획득정보 파악 중.. 확인 후 필드 수정 예정
*/
// voltage 단위: V, 설명: 배터리 전압 float
// current 단위: A, 설명: 배터리 전류 float
export class KepcoStateRobotBattery extends MAVLinkMessage {
	public voltage!: number;
	public current!: number;
	public _message_id: number = 50001;
	public _message_name: string = 'KEPCO_STATE_ROBOT_BATTERY';
	public _crc_extra: number = 17;
	public _message_fields: [string, string, boolean, number][] = [
		['voltage', 'float', false, 0],
		['current', 'float', false, 0],
	];
}