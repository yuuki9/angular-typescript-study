import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: 1hz, 설명: 드론의 배터리 정보, TODO: 드론 사용여부에 따라 사용하지 않을 수 있음, 배터리시스템으로 부터 획득정보 파악 중.. 확인 후 필드 추가 예정
*/
// voltage 단위: V, 설명: 배터리 전압 float
// current 단위: A, 설명: 배터리 전류 float
export class KepcoStateDroneBattery extends MAVLinkMessage {
	public voltage!: number;
	public current!: number;
	public _message_id: number = 50004;
	public _message_name: string = 'KEPCO_STATE_DRONE_BATTERY';
	public _crc_extra: number = 98;
	public _message_fields: [string, string, boolean, number][] = [
		['voltage', 'float', false, 0],
		['current', 'float', false, 0],
	];
}