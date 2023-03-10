import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavFrame} from '../enums/mav-frame';
import {PositionTargetTypemask} from '../enums/position-target-typemask';
/*
Reports the current commanded vehicle position, velocity, and acceleration as specified by the autopilot. This should match the commands sent in SET_POSITION_TARGET_LOCAL_NED if the vehicle is being controlled this way.
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// coordinate_frame Valid options are: MAV_FRAME_LOCAL_NED = 1, MAV_FRAME_LOCAL_OFFSET_NED = 7, MAV_FRAME_BODY_NED = 8, MAV_FRAME_BODY_OFFSET_NED = 9 uint8_t
// type_mask Bitmap to indicate which dimensions should be ignored by the vehicle. uint16_t
// x X Position in NED frame float
// y Y Position in NED frame float
// z Z Position in NED frame (note, altitude is negative in NED) float
// vx X velocity in NED frame float
// vy Y velocity in NED frame float
// vz Z velocity in NED frame float
// afx X acceleration or force (if bit 10 of type_mask is set) in NED frame in meter / s^2 or N float
// afy Y acceleration or force (if bit 10 of type_mask is set) in NED frame in meter / s^2 or N float
// afz Z acceleration or force (if bit 10 of type_mask is set) in NED frame in meter / s^2 or N float
// yaw yaw setpoint float
// yaw_rate yaw rate setpoint float
export class PositionTargetLocalNed extends MAVLinkMessage {
	public time_boot_ms!: number;
	public coordinate_frame!: MavFrame;
	public type_mask!: PositionTargetTypemask;
	public x!: number;
	public y!: number;
	public z!: number;
	public vx!: number;
	public vy!: number;
	public vz!: number;
	public afx!: number;
	public afy!: number;
	public afz!: number;
	public yaw!: number;
	public yaw_rate!: number;
	public _message_id: number = 85;
	public _message_name: string = 'POSITION_TARGET_LOCAL_NED';
	public _crc_extra: number = 140;
	public _message_fields: [string, string, boolean, number][] = [
		['time_boot_ms', 'uint32_t', false, 0],
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['z', 'float', false, 0],
		['vx', 'float', false, 0],
		['vy', 'float', false, 0],
		['vz', 'float', false, 0],
		['afx', 'float', false, 0],
		['afy', 'float', false, 0],
		['afz', 'float', false, 0],
		['yaw', 'float', false, 0],
		['yaw_rate', 'float', false, 0],
		['type_mask', 'uint16_t', false, 0],
		['coordinate_frame', 'uint8_t', false, 0],
	];
}