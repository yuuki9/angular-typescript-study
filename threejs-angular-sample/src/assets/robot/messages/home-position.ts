import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
This message can be requested by sending the MAV_CMD_GET_HOME_POSITION command. The position the system will return to and land on. The position is set automatically by the system during the takeoff in case it was not explicitly set by the operator before or after. The global and local positions encode the position in the respective coordinate frames, while the q parameter encodes the orientation of the surface. Under normal conditions it describes the heading and terrain slope, which can be used by the aircraft to adjust the approach. The approach 3D vector describes the point to which the system should fly in normal flight mode and then perform a landing sequence along the vector.
*/
// latitude Latitude (WGS84) int32_t
// longitude Longitude (WGS84) int32_t
// altitude Altitude (MSL). Positive for up. int32_t
// x Local X position of this position in the local coordinate frame float
// y Local Y position of this position in the local coordinate frame float
// z Local Z position of this position in the local coordinate frame float
// q World to surface normal and heading transformation of the takeoff position. Used to indicate the heading and slope of the ground float
// approach_x Local X position of the end of the approach vector. Multicopters should set this position based on their takeoff path. Grass-landing fixed wing aircraft should set it the same way as multicopters. Runway-landing fixed wing aircraft should set it to the opposite direction of the takeoff, assuming the takeoff happened from the threshold / touchdown zone. float
// approach_y Local Y position of the end of the approach vector. Multicopters should set this position based on their takeoff path. Grass-landing fixed wing aircraft should set it the same way as multicopters. Runway-landing fixed wing aircraft should set it to the opposite direction of the takeoff, assuming the takeoff happened from the threshold / touchdown zone. float
// approach_z Local Z position of the end of the approach vector. Multicopters should set this position based on their takeoff path. Grass-landing fixed wing aircraft should set it the same way as multicopters. Runway-landing fixed wing aircraft should set it to the opposite direction of the takeoff, assuming the takeoff happened from the threshold / touchdown zone. float
// time_usec Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude of the number. uint64_t
export class HomePosition extends MAVLinkMessage {
	public latitude!: number;
	public longitude!: number;
	public altitude!: number;
	public x!: number;
	public y!: number;
	public z!: number;
	public q!: number[];
	public approach_x!: number;
	public approach_y!: number;
	public approach_z!: number;
	public time_usec!: number;
	public _message_id: number = 242;
	public _message_name: string = 'HOME_POSITION';
	public _crc_extra: number = 104;
	public _message_fields: [string, string, boolean, number][] = [
		['latitude', 'int32_t', false, 0],
		['longitude', 'int32_t', false, 0],
		['altitude', 'int32_t', false, 0],
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['z', 'float', false, 0],
		['q', 'float', false, 4],
		['approach_x', 'float', false, 0],
		['approach_y', 'float', false, 0],
		['approach_z', 'float', false, 0],
		['time_usec', 'uint64_t', true, 0],
	];
}