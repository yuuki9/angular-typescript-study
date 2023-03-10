import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Global position estimate from a Vicon motion system source.
*/
// usec Timestamp (UNIX time or time since system boot) uint64_t
// x Global X position float
// y Global Y position float
// z Global Z position float
// roll Roll angle float
// pitch Pitch angle float
// yaw Yaw angle float
// covariance Row-major representation of 6x6 pose cross-covariance matrix upper right triangle (states: x, y, z, roll, pitch, yaw; first six entries are the first ROW, next five entries are the second ROW, etc.). If unknown, assign NaN value to first element in the array. float
export class ViconPositionEstimate extends MAVLinkMessage {
	public usec!: number;
	public x!: number;
	public y!: number;
	public z!: number;
	public roll!: number;
	public pitch!: number;
	public yaw!: number;
	public covariance!: number[];
	public _message_id: number = 104;
	public _message_name: string = 'VICON_POSITION_ESTIMATE';
	public _crc_extra: number = 56;
	public _message_fields: [string, string, boolean, number][] = [
		['usec', 'uint64_t', false, 0],
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['z', 'float', false, 0],
		['roll', 'float', false, 0],
		['pitch', 'float', false, 0],
		['yaw', 'float', false, 0],
		['covariance', 'float', true, 21],
	];
}