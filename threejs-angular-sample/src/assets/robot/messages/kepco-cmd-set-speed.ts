import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 서버->로봇, 응답: COMMAND_ACK, 설명: 자동모드 또는 이벤트 모드 시, 직진 속도 조정 명령
*/
// speed 단위: m/s, 설명: 로봇 직진 속도, TODO: 현재 0이상의 속도에 대해서만 구현되어 있음, -속도는 검토중임 float
export class KepcoCmdSetSpeed extends MAVLinkMessage {
	public speed!: number;
	public _message_id: number = 51004;
	public _message_name: string = 'KEPCO_CMD_SET_SPEED';
	public _crc_extra: number = 137;
	public _message_fields: [string, string, boolean, number][] = [
		['speed', 'float', false, 0],
	];
}