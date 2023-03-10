import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Reply to LOG_REQUEST_DATA
*/
// id Log id (from LOG_ENTRY reply) uint16_t
// ofs Offset into the log uint32_t
// count Number of bytes (zero for end of log) uint8_t
// data log data uint8_t
export class LogData extends MAVLinkMessage {
	public id!: number;
	public ofs!: number;
	public count!: number;
	public data!: number[];
	public _message_id: number = 120;
	public _message_name: string = 'LOG_DATA';
	public _crc_extra: number = 134;
	public _message_fields: [string, string, boolean, number][] = [
		['ofs', 'uint32_t', false, 0],
		['id', 'uint16_t', false, 0],
		['count', 'uint8_t', false, 0],
		['data', 'uint8_t', false, 90],
	];
}