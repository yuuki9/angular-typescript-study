import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
The global position, as returned by the Global Positioning System (GPS). This is
                 NOT the global position estimate of the sytem, but rather a RAW sensor value. See message GLOBAL_POSITION for the global position estimate.
*/
// time_usec Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude of the number. uint64_t
// fix_type 0-1: no fix, 2: 2D fix, 3: 3D fix. Some applications will not use the value of this field unless it is at least two, so always correctly fill in the fix. uint8_t
// lat Latitude (WGS84) int32_t
// lon Longitude (WGS84) int32_t
// alt Altitude (MSL). Positive for up. int32_t
// eph GPS HDOP horizontal dilution of position (unitless * 100). If unknown, set to: UINT16_MAX uint16_t
// epv GPS VDOP vertical dilution of position (unitless * 100). If unknown, set to: UINT16_MAX uint16_t
// vel GPS ground speed. If unknown, set to: UINT16_MAX uint16_t
// vn GPS velocity in north direction in earth-fixed NED frame int16_t
// ve GPS velocity in east direction in earth-fixed NED frame int16_t
// vd GPS velocity in down direction in earth-fixed NED frame int16_t
// cog Course over ground (NOT heading, but direction of movement), 0.0..359.99 degrees. If unknown, set to: UINT16_MAX uint16_t
// satellites_visible Number of satellites visible. If unknown, set to UINT8_MAX uint8_t
// id GPS ID (zero indexed). Used for multiple GPS inputs uint8_t
// yaw Yaw of vehicle relative to Earth's North, zero means not available, use 36000 for north uint16_t
export class HilGps extends MAVLinkMessage {
	public time_usec!: number;
	public fix_type!: number;
	public lat!: number;
	public lon!: number;
	public alt!: number;
	public eph!: number;
	public epv!: number;
	public vel!: number;
	public vn!: number;
	public ve!: number;
	public vd!: number;
	public cog!: number;
	public satellites_visible!: number;
	public id!: number;
	public yaw!: number;
	public _message_id: number = 113;
	public _message_name: string = 'HIL_GPS';
	public _crc_extra: number = 124;
	public _message_fields: [string, string, boolean, number][] = [
		['time_usec', 'uint64_t', false, 0],
		['lat', 'int32_t', false, 0],
		['lon', 'int32_t', false, 0],
		['alt', 'int32_t', false, 0],
		['eph', 'uint16_t', false, 0],
		['epv', 'uint16_t', false, 0],
		['vel', 'uint16_t', false, 0],
		['vn', 'int16_t', false, 0],
		['ve', 'int16_t', false, 0],
		['vd', 'int16_t', false, 0],
		['cog', 'uint16_t', false, 0],
		['fix_type', 'uint8_t', false, 0],
		['satellites_visible', 'uint8_t', false, 0],
		['id', 'uint8_t', true, 0],
		['yaw', 'uint16_t', true, 0],
	];
}