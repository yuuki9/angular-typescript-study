import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavFrame} from '../enums/mav-frame';
import {MavCmd} from '../enums/mav-cmd';
import {MavMissionType} from '../enums/mav-mission-type';
/*
Message encoding a mission item. This message is emitted to announce
                the presence of a mission item and to set a mission item on the system. The mission item can be either in x, y, z meters (type: LOCAL) or x:lat, y:lon, z:altitude. Local frame is Z-down, right handed (NED), global frame is Z-up, right handed (ENU). NaN may be used to indicate an optional/default value (e.g. to use the system's current latitude or yaw rather than a specific value). See also https://mavlink.io/en/services/mission.html.
*/
// target_system System ID uint8_t
// target_component Component ID uint8_t
// seq Sequence uint16_t
// frame The coordinate system of the waypoint. uint8_t
// command The scheduled action for the waypoint. uint16_t
// current false:0, true:1 uint8_t
// autocontinue Autocontinue to next waypoint uint8_t
// param1 PARAM1, see MAV_CMD enum float
// param2 PARAM2, see MAV_CMD enum float
// param3 PARAM3, see MAV_CMD enum float
// param4 PARAM4, see MAV_CMD enum float
// x PARAM5 / local: X coordinate, global: latitude float
// y PARAM6 / local: Y coordinate, global: longitude float
// z PARAM7 / local: Z coordinate, global: altitude (relative or absolute, depending on frame). float
// mission_type Mission type. uint8_t
export class MissionItem extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public seq!: number;
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
	public mission_type!: MavMissionType;
	public _message_id: number = 39;
	public _message_name: string = 'MISSION_ITEM';
	public _crc_extra: number = 254;
	public _message_fields: [string, string, boolean, number][] = [
		['param1', 'float', false, 0],
		['param2', 'float', false, 0],
		['param3', 'float', false, 0],
		['param4', 'float', false, 0],
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['z', 'float', false, 0],
		['seq', 'uint16_t', false, 0],
		['command', 'uint16_t', false, 0],
		['target_system', 'uint8_t', false, 0],
		['target_component', 'uint8_t', false, 0],
		['frame', 'uint8_t', false, 0],
		['current', 'uint8_t', false, 0],
		['autocontinue', 'uint8_t', false, 0],
		['mission_type', 'uint8_t', true, 0],
	];
}