import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {GimbalManagerFlags} from '../enums/gimbal-manager-flags';
/*
High level message to control a gimbal's pitch and yaw angles. This message is to be sent to the gimbal manager (e.g. from a ground station). Angles and rates can be set to NaN according to use case.
*/
// target_system System ID uint8_t
// target_component Component ID uint8_t
// flags High level gimbal manager flags to use. uint32_t
// gimbal_device_id Component ID of gimbal device to address (or 1-6 for non-MAVLink gimbal), 0 for all gimbal device components. Send command multiple times for more than one gimbal (but not all gimbals). uint8_t
// pitch Pitch angle (positive: up, negative: down, NaN to be ignored). float
// yaw Yaw angle (positive: to the right, negative: to the left, NaN to be ignored). float
// pitch_rate Pitch angular rate (positive: up, negative: down, NaN to be ignored). float
// yaw_rate Yaw angular rate (positive: to the right, negative: to the left, NaN to be ignored). float
export class GimbalManagerSetPitchyaw extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public flags!: GimbalManagerFlags;
	public gimbal_device_id!: number;
	public pitch!: number;
	public yaw!: number;
	public pitch_rate!: number;
	public yaw_rate!: number;
	public _message_id: number = 287;
	public _message_name: string = 'GIMBAL_MANAGER_SET_PITCHYAW';
	public _crc_extra: number = 1;
	public _message_fields: [string, string, boolean, number][] = [
		['flags', 'uint32_t', false, 0],
		['pitch', 'float', false, 0],
		['yaw', 'float', false, 0],
		['pitch_rate', 'float', false, 0],
		['yaw_rate', 'float', false, 0],
		['target_system', 'uint8_t', false, 0],
		['target_component', 'uint8_t', false, 0],
		['gimbal_device_id', 'uint8_t', false, 0],
	];
}