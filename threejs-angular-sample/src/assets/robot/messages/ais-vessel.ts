import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {AisNavStatus} from '../enums/ais-nav-status';
import {AisType} from '../enums/ais-type';
import {AisFlags} from '../enums/ais-flags';
/*
The location and information of an AIS vessel
*/
// MMSI Mobile Marine Service Identifier, 9 decimal digits uint32_t
// lat Latitude int32_t
// lon Longitude int32_t
// COG Course over ground uint16_t
// heading True heading uint16_t
// velocity Speed over ground uint16_t
// turn_rate Turn rate int8_t
// navigational_status Navigational status uint8_t
// type Type of vessels uint8_t
// dimension_bow Distance from lat/lon location to bow uint16_t
// dimension_stern Distance from lat/lon location to stern uint16_t
// dimension_port Distance from lat/lon location to port side uint8_t
// dimension_starboard Distance from lat/lon location to starboard side uint8_t
// callsign The vessel callsign char
// name The vessel name char
// tslc Time since last communication in seconds uint16_t
// flags Bitmask to indicate various statuses including valid data fields uint16_t
export class AisVessel extends MAVLinkMessage {
	public MMSI!: number;
	public lat!: number;
	public lon!: number;
	public COG!: number;
	public heading!: number;
	public velocity!: number;
	public turn_rate!: number;
	public navigational_status!: AisNavStatus;
	public type!: AisType;
	public dimension_bow!: number;
	public dimension_stern!: number;
	public dimension_port!: number;
	public dimension_starboard!: number;
	public callsign!: string;
	public name!: string;
	public tslc!: number;
	public flags!: AisFlags;
	public _message_id: number = 301;
	public _message_name: string = 'AIS_VESSEL';
	public _crc_extra: number = 243;
	public _message_fields: [string, string, boolean, number][] = [
		['MMSI', 'uint32_t', false, 0],
		['lat', 'int32_t', false, 0],
		['lon', 'int32_t', false, 0],
		['COG', 'uint16_t', false, 0],
		['heading', 'uint16_t', false, 0],
		['velocity', 'uint16_t', false, 0],
		['dimension_bow', 'uint16_t', false, 0],
		['dimension_stern', 'uint16_t', false, 0],
		['tslc', 'uint16_t', false, 0],
		['flags', 'uint16_t', false, 0],
		['turn_rate', 'int8_t', false, 0],
		['navigational_status', 'uint8_t', false, 0],
		['type', 'uint8_t', false, 0],
		['dimension_port', 'uint8_t', false, 0],
		['dimension_starboard', 'uint8_t', false, 0],
		['callsign', 'char', false, 7],
		['name', 'char', false, 20],
	];
}