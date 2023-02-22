import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumCameraIndex} from '../enums/kepco-enum-camera-index';
/*
통신방향: 서버->로봇, 응답: COMMAND_ACK, 설명: 영상 전송 요청
*/
// video_index 설명: 카메라 종류, enum: KEPCO_ENUM_CAMERA_INDEX uint8_t
// width 단위: PIXEL, 설명: 영상 width uint32_t
// height 단위: PIXEL, 설명: 영상 height uint32_t
// ip 설명: 전송받을 ip address char
// port 설명: 전송받을 ip address uint16_t
// bitrate 단위: bps, 설명: 압축 bitrate uint32_t
// url_path 설명: rtmp 주소정보, rtmp://ip:port/url_path char
export class KepcoCmdRequestVideo extends MAVLinkMessage {
	public video_index!: KepcoEnumCameraIndex;
	public width!: number;
	public height!: number;
	public ip!: string;
	public port!: number;
	public bitrate!: number;
	public url_path!: string;
	public _message_id: number = 51008;
	public _message_name: string = 'KEPCO_CMD_REQUEST_VIDEO';
	public _crc_extra: number = 246;
	public _message_fields: [string, string, boolean, number][] = [
		['width', 'uint32_t', false, 0],
		['height', 'uint32_t', false, 0],
		['bitrate', 'uint32_t', false, 0],
		['port', 'uint16_t', false, 0],
		['video_index', 'uint8_t', false, 0],
		['ip', 'char', false, 15],
		['url_path', 'char', false, 100],
	];
}