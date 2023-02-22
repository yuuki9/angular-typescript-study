import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: 5hz, 설명: 드론의 현재 자세, TODO: 드론 사용여부에 따라 사용하지 않을 수 있음
*/
// roll 단위: rad, 설명: roll float
// pitch 단위: rad, 설명: pitch float
// yaw 단위: rad, 설명: yaw float
export class KepcoStateDroneAttitude extends MAVLinkMessage {
	public roll!: number;
	public pitch!: number;
	public yaw!: number;
	public _message_id: number = 50003;
	public _message_name: string = 'KEPCO_STATE_DRONE_ATTITUDE';
	public _crc_extra: number = 246;
	public _message_fields: [string, string, boolean, number][] = [
		['roll', 'float', false, 0],
		['pitch', 'float', false, 0],
		['yaw', 'float', false, 0],
	];
}