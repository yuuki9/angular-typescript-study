import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Orientation of a mount
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// roll Roll in global frame (set to NaN for invalid). float
// pitch Pitch in global frame (set to NaN for invalid). float
// yaw Yaw relative to vehicle (set to NaN for invalid). float
// yaw_absolute Yaw in absolute frame relative to Earth's North, north is 0 (set to NaN for invalid). float
export class MountOrientation extends MAVLinkMessage {
	public time_boot_ms!: number;
	public roll!: number;
	public pitch!: number;
	public yaw!: number;
	public yaw_absolute!: number;
	public _message_id: number = 265;
	public _message_name: string = 'MOUNT_ORIENTATION';
	public _crc_extra: number = 26;
	public _message_fields: [string, string, boolean, number][] = [
		['time_boot_ms', 'uint32_t', false, 0],
		['roll', 'float', false, 0],
		['pitch', 'float', false, 0],
		['yaw', 'float', false, 0],
		['yaw_absolute', 'float', true, 0],
	];
}