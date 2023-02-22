import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {KepcoEnumRobotAxisMode} from '../enums/kepco-enum-robot-axis-mode';
/*
로봇이 서버에 접속하는 신호 ( IP변경시 마다 해당 신호를 다시 보내야함 )
*/
// robo_code 로봇의 고유번호 char
// robo_name 로봇 이름 char
// axis_mode 설명: 기춘축모드, enum : KEPCO_ENUM_ROBOT_AXIS_MODE uint8_t
export class KepcoConnect extends MAVLinkMessage {
	public robo_code!: string;
	public robo_name!: string;
	public axis_mode!: KepcoEnumRobotAxisMode;
	public _message_id: number = 59001;
	public _message_name: string = 'KEPCO_CONNECT';
	public _crc_extra: number = 254;
	public _message_fields: [string, string, boolean, number][] = [
		['robo_code', 'char', false, 20],
		['robo_name', 'char', false, 50],
		['axis_mode', 'uint8_t', false, 0],
	];
}