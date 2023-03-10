import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {GpsFixType} from '../enums/gps-fix-type';
/*
The global position, as returned by the Global Positioning System (GPS). This is
                NOT the global position estimate of the system, but rather a RAW sensor value. See message GLOBAL_POSITION for the global position estimate.
*/
// time_usec Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude of the number. uint64_t
// fix_type GPS fix type. uint8_t
// lat Latitude (WGS84, EGM96 ellipsoid) int32_t
// lon Longitude (WGS84, EGM96 ellipsoid) int32_t
// alt Altitude (MSL). Positive for up. Note that virtually all GPS modules provide the MSL altitude in addition to the WGS84 altitude. int32_t
// eph GPS HDOP horizontal dilution of position (unitless * 100). If unknown, set to: UINT16_MAX uint16_t
// epv GPS VDOP vertical dilution of position (unitless * 100). If unknown, set to: UINT16_MAX uint16_t
// vel GPS ground speed. If unknown, set to: UINT16_MAX uint16_t
// cog Course over ground (NOT heading, but direction of movement) in degrees * 100, 0.0..359.99 degrees. If unknown, set to: UINT16_MAX uint16_t
// satellites_visible Number of satellites visible. If unknown, set to UINT8_MAX uint8_t
// alt_ellipsoid Altitude (above WGS84, EGM96 ellipsoid). Positive for up. int32_t
// h_acc Position uncertainty. uint32_t
// v_acc Altitude uncertainty. uint32_t
// vel_acc Speed uncertainty. uint32_t
// hdg_acc Heading / track uncertainty uint32_t
// yaw Yaw in earth frame from north. Use 0 if this GPS does not provide yaw. Use UINT16_MAX if this GPS is configured to provide yaw and is currently unable to provide it. Use 36000 for north. uint16_t
export class GpsRawInt extends MAVLinkMessage {
	public time_usec!: number;
	public fix_type!: GpsFixType;
	public lat!: number;
	public lon!: number;
	public alt!: number;
	public eph!: number;
	public epv!: number;
	public vel!: number;
	public cog!: number;
	public satellites_visible!: number;
	public alt_ellipsoid!: number;
	public h_acc!: number;
	public v_acc!: number;
	public vel_acc!: number;
	public hdg_acc!: number;
	public yaw!: number;
	public _message_id: number = 24;
	public _message_name: string = 'GPS_RAW_INT';
	public _crc_extra: number = 24;
	public _message_fields: [string, string, boolean, number][] = [
		['time_usec', 'uint64_t', false, 0],
		['lat', 'int32_t', false, 0],
		['lon', 'int32_t', false, 0],
		['alt', 'int32_t', false, 0],
		['eph', 'uint16_t', false, 0],
		['epv', 'uint16_t', false, 0],
		['vel', 'uint16_t', false, 0],
		['cog', 'uint16_t', false, 0],
		['fix_type', 'uint8_t', false, 0],
		['satellites_visible', 'uint8_t', false, 0],
		['alt_ellipsoid', 'int32_t', true, 0],
		['h_acc', 'uint32_t', true, 0],
		['v_acc', 'uint32_t', true, 0],
		['vel_acc', 'uint32_t', true, 0],
		['hdg_acc', 'uint32_t', true, 0],
		['yaw', 'uint16_t', true, 0],
	];
}