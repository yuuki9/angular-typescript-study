import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
The IMU readings in SI units in NED body frame
*/
// time_usec Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude of the number. uint64_t
// xacc X acceleration float
// yacc Y acceleration float
// zacc Z acceleration float
// xgyro Angular speed around X axis float
// ygyro Angular speed around Y axis float
// zgyro Angular speed around Z axis float
// xmag X Magnetic field float
// ymag Y Magnetic field float
// zmag Z Magnetic field float
// abs_pressure Absolute pressure float
// diff_pressure Differential pressure float
// pressure_alt Altitude calculated from pressure float
// temperature Temperature float
// fields_updated Bitmap for fields that have updated since last message, bit 0 = xacc, bit 12: temperature uint16_t
// id Id. Ids are numbered from 0 and map to IMUs numbered from 1 (e.g. IMU1 will have a message with id=0) uint8_t
export class HighresImu extends MAVLinkMessage {
	public time_usec!: number;
	public xacc!: number;
	public yacc!: number;
	public zacc!: number;
	public xgyro!: number;
	public ygyro!: number;
	public zgyro!: number;
	public xmag!: number;
	public ymag!: number;
	public zmag!: number;
	public abs_pressure!: number;
	public diff_pressure!: number;
	public pressure_alt!: number;
	public temperature!: number;
	public fields_updated!: number;
	public id!: number;
	public _message_id: number = 105;
	public _message_name: string = 'HIGHRES_IMU';
	public _crc_extra: number = 93;
	public _message_fields: [string, string, boolean, number][] = [
		['time_usec', 'uint64_t', false, 0],
		['xacc', 'float', false, 0],
		['yacc', 'float', false, 0],
		['zacc', 'float', false, 0],
		['xgyro', 'float', false, 0],
		['ygyro', 'float', false, 0],
		['zgyro', 'float', false, 0],
		['xmag', 'float', false, 0],
		['ymag', 'float', false, 0],
		['zmag', 'float', false, 0],
		['abs_pressure', 'float', false, 0],
		['diff_pressure', 'float', false, 0],
		['pressure_alt', 'float', false, 0],
		['temperature', 'float', false, 0],
		['fields_updated', 'uint16_t', false, 0],
		['id', 'uint8_t', true, 0],
	];
}