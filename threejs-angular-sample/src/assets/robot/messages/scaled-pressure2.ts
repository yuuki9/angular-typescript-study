import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Barometer readings for 2nd barometer
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// press_abs Absolute pressure float
// press_diff Differential pressure float
// temperature Absolute pressure temperature int16_t
// temperature_press_diff Differential pressure temperature (0, if not available). Report values of 0 (or 1) as 1 cdegC. int16_t
export class ScaledPressure2 extends MAVLinkMessage {
	public time_boot_ms!: number;
	public press_abs!: number;
	public press_diff!: number;
	public temperature!: number;
	public temperature_press_diff!: number;
	public _message_id: number = 137;
	public _message_name: string = 'SCALED_PRESSURE2';
	public _crc_extra: number = 195;
	public _message_fields: [string, string, boolean, number][] = [
		['time_boot_ms', 'uint32_t', false, 0],
		['press_abs', 'float', false, 0],
		['press_diff', 'float', false, 0],
		['temperature', 'int16_t', false, 0],
		['temperature_press_diff', 'int16_t', true, 0],
	];
}