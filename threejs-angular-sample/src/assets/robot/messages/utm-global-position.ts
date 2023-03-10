import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {UtmFlightState} from '../enums/utm-flight-state';
import {UtmDataAvailFlags} from '../enums/utm-data-avail-flags';
/*
The global position resulting from GPS and sensor fusion.
*/
// time Time of applicability of position (microseconds since UNIX epoch). uint64_t
// uas_id Unique UAS ID. uint8_t
// lat Latitude (WGS84) int32_t
// lon Longitude (WGS84) int32_t
// alt Altitude (WGS84) int32_t
// relative_alt Altitude above ground int32_t
// vx Ground X speed (latitude, positive north) int16_t
// vy Ground Y speed (longitude, positive east) int16_t
// vz Ground Z speed (altitude, positive down) int16_t
// h_acc Horizontal position uncertainty (standard deviation) uint16_t
// v_acc Altitude uncertainty (standard deviation) uint16_t
// vel_acc Speed uncertainty (standard deviation) uint16_t
// next_lat Next waypoint, latitude (WGS84) int32_t
// next_lon Next waypoint, longitude (WGS84) int32_t
// next_alt Next waypoint, altitude (WGS84) int32_t
// update_rate Time until next update. Set to 0 if unknown or in data driven mode. uint16_t
// flight_state Flight state uint8_t
// flags Bitwise OR combination of the data available flags. uint8_t
export class UtmGlobalPosition extends MAVLinkMessage {
	public time!: number;
	public uas_id!: number[];
	public lat!: number;
	public lon!: number;
	public alt!: number;
	public relative_alt!: number;
	public vx!: number;
	public vy!: number;
	public vz!: number;
	public h_acc!: number;
	public v_acc!: number;
	public vel_acc!: number;
	public next_lat!: number;
	public next_lon!: number;
	public next_alt!: number;
	public update_rate!: number;
	public flight_state!: UtmFlightState;
	public flags!: UtmDataAvailFlags;
	public _message_id: number = 340;
	public _message_name: string = 'UTM_GLOBAL_POSITION';
	public _crc_extra: number = 99;
	public _message_fields: [string, string, boolean, number][] = [
		['time', 'uint64_t', false, 0],
		['lat', 'int32_t', false, 0],
		['lon', 'int32_t', false, 0],
		['alt', 'int32_t', false, 0],
		['relative_alt', 'int32_t', false, 0],
		['next_lat', 'int32_t', false, 0],
		['next_lon', 'int32_t', false, 0],
		['next_alt', 'int32_t', false, 0],
		['vx', 'int16_t', false, 0],
		['vy', 'int16_t', false, 0],
		['vz', 'int16_t', false, 0],
		['h_acc', 'uint16_t', false, 0],
		['v_acc', 'uint16_t', false, 0],
		['vel_acc', 'uint16_t', false, 0],
		['update_rate', 'uint16_t', false, 0],
		['uas_id', 'uint8_t', false, 18],
		['flight_state', 'uint8_t', false, 0],
		['flags', 'uint8_t', false, 0],
	];
}