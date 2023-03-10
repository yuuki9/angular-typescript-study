import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
To debug something using a named 3D vector.
*/
// name Name char
// time_usec Timestamp (UNIX Epoch time or time since system boot). The receiving end can infer timestamp format (since 1.1.1970 or since system boot) by checking for the magnitude of the number. uint64_t
// x x float
// y y float
// z z float
export class DebugVect extends MAVLinkMessage {
	public name!: string;
	public time_usec!: number;
	public x!: number;
	public y!: number;
	public z!: number;
	public _message_id: number = 250;
	public _message_name: string = 'DEBUG_VECT';
	public _crc_extra: number = 49;
	public _message_fields: [string, string, boolean, number][] = [
		['time_usec', 'uint64_t', false, 0],
		['x', 'float', false, 0],
		['y', 'float', false, 0],
		['z', 'float', false, 0],
		['name', 'char', false, 10],
	];
}