import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumCameraIndex} from '../enums/kepco-enum-camera-index';
/*
통신방향: 서버->로봇, 응답: COMMAND_ACK, 설명: 영상 전송 중지 요청
*/
// video_index 설명: 카메라 종류, enum: KEPCO_ENUM_CAMERA_INDEX uint8_t
export class KepcoCmdStopVideo extends MAVLinkMessage {
	public video_index!: KepcoEnumCameraIndex;
	public _message_id: number = 51014;
	public _message_name: string = 'KEPCO_CMD_STOP_VIDEO';
	public _crc_extra: number = 230;
	public _message_fields: [string, string, boolean, number][] = [
		['video_index', 'uint8_t', false, 0],
	];
}