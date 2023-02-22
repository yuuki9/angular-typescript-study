import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
통신방향: 로봇->서버, 주기: 미션 업로드 완료 시, 설명: 자동모드 또는 이벤트 모드 시, 업로드한 미션의 총 이동거리
*/
// distance 단위: m, 설명: 업로드한 미션의 총 거리 float
export class KepcoInfoMissionDistance extends MAVLinkMessage {
	public distance!: number;
	public _message_id: number = 51013;
	public _message_name: string = 'KEPCO_INFO_MISSION_DISTANCE';
	public _crc_extra: number = 200;
	public _message_fields: [string, string, boolean, number][] = [
		['distance', 'float', false, 0],
	];
}