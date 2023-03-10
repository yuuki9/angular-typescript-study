import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Data packet for images sent using the Image Transmission Protocol: https://mavlink.io/en/services/image_transmission.html.
*/
// seqnr sequence number (starting with 0 on every transmission) uint16_t
// data image data bytes uint8_t
export class EncapsulatedData extends MAVLinkMessage {
	public seqnr!: number;
	public data!: number[];
	public _message_id: number = 131;
	public _message_name: string = 'ENCAPSULATED_DATA';
	public _crc_extra: number = 223;
	public _message_fields: [string, string, boolean, number][] = [
		['seqnr', 'uint16_t', false, 0],
		['data', 'uint8_t', false, 253],
	];
}