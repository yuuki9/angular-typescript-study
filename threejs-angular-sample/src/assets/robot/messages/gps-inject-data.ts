import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Data for injecting into the onboard GPS (used for DGPS)
*/
// target_system System ID uint8_t
// target_component Component ID uint8_t
// len Data length uint8_t
// data Raw data (110 is enough for 12 satellites of RTCMv2) uint8_t
export class GpsInjectData extends MAVLinkMessage {
	public target_system!: number;
	public target_component!: number;
	public len!: number;
	public data!: number[];
	public _message_id: number = 123;
	public _message_name: string = 'GPS_INJECT_DATA';
	public _crc_extra: number = 250;
	public _message_fields: [string, string, boolean, number][] = [
		['target_system', 'uint8_t', false, 0],
		['target_component', 'uint8_t', false, 0],
		['len', 'uint8_t', false, 0],
		['data', 'uint8_t', false, 110],
	];
}