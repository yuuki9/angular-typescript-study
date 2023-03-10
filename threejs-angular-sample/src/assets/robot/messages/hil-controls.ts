import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavMode} from '../enums/mav-mode';
/*
Sent from autopilot to simulation. Hardware in the loop control outputs
*/
// time_usec Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude of the number. uint64_t
// roll_ailerons Control output -1 .. 1 float
// pitch_elevator Control output -1 .. 1 float
// yaw_rudder Control output -1 .. 1 float
// throttle Throttle 0 .. 1 float
// aux1 Aux 1, -1 .. 1 float
// aux2 Aux 2, -1 .. 1 float
// aux3 Aux 3, -1 .. 1 float
// aux4 Aux 4, -1 .. 1 float
// mode System mode. uint8_t
// nav_mode Navigation mode (MAV_NAV_MODE) uint8_t
export class HilControls extends MAVLinkMessage {
	public time_usec!: number;
	public roll_ailerons!: number;
	public pitch_elevator!: number;
	public yaw_rudder!: number;
	public throttle!: number;
	public aux1!: number;
	public aux2!: number;
	public aux3!: number;
	public aux4!: number;
	public mode!: MavMode;
	public nav_mode!: number;
	public _message_id: number = 91;
	public _message_name: string = 'HIL_CONTROLS';
	public _crc_extra: number = 63;
	public _message_fields: [string, string, boolean, number][] = [
		['time_usec', 'uint64_t', false, 0],
		['roll_ailerons', 'float', false, 0],
		['pitch_elevator', 'float', false, 0],
		['yaw_rudder', 'float', false, 0],
		['throttle', 'float', false, 0],
		['aux1', 'float', false, 0],
		['aux2', 'float', false, 0],
		['aux3', 'float', false, 0],
		['aux4', 'float', false, 0],
		['mode', 'uint8_t', false, 0],
		['nav_mode', 'uint8_t', false, 0],
	];
}