import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavFrame} from '../enums/mav-frame';
import {MavCmd} from '../enums/mav-cmd';
/*
Message encoding a command with parameters as scaled integers. Scaling depends on the actual command value. NaN or INT32_MAX may be used in float/integer params (respectively) to indicate optional/default values (e.g. to use the component's current latitude, yaw rather than a specific value). The command microservice is documented at https://mavlink.io/en/services/command.html
*/
// target_system System ID uint8_t
// target_component Component ID uint8_t
// frame The coordinate system of the COMMAND. uint8_t
// command The scheduled action for the mission item. uint16_t
// current Not used. uint8_t
// autocontinue Not used (set 0). uint8_t
// param1 PARAM1, see MAV_CMD enum float
// param2 PARAM2, see MAV_CMD enum float
// param3 PARAM3, see MAV_CMD enum float
// param4 PARAM4, see MAV_CMD enum float
// x PARAM5 / local: x position in meters * 1e4, global: latitude in degrees * 10^7 int32_t
// y PARAM6 / local: y position in meters * 1e4, global: longitude in degrees * 10^7 int32_t
// z PARAM7 / z position: global: altitude in meters (relative or absolute, depending on frame). float
export class CommandInt extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public frame!: MavFrame;
	public command!: MavCmd;
	public current!: number;
	public autocontinue!: number;
	public param1!: number;
	public param2!: number;
	public param3!: number;
	public param4!: number;
	public x!: number;
	public y!: number;
	public z!: number;
	public _message_id: number = 75;
	public _message_name: string = 'COMMAND_INT';
	public _crc_extra: number = 158;
	public _message_fields: [string, string, boolean, number][] = [
		['param1', 'float', false, 0],
		['param2', 'float', false, 0],
		['param3', 'float', false, 0],
		['param4', 'float', false, 0],
		['x', 'int32_t', false, 0],
		['y', 'int32_t', false, 0],
		['z', 'float', false, 0],
		['command', 'uint16_t', false, 0],
		['target_system', 'uint8_t', false, 0],
		['target_component', 'uint8_t', false, 0],
		['frame', 'uint8_t', false, 0],
		['current', 'uint8_t', false, 0],
		['autocontinue', 'uint8_t', false, 0],
	];
}