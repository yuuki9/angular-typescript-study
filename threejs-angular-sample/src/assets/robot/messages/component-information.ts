import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
/*
Information about a component. For camera components instead use CAMERA_INFORMATION, and for autopilots additionally use AUTOPILOT_VERSION. Components including GCSes should consider supporting requests of this message via MAV_CMD_REQUEST_MESSAGE.
*/
// time_boot_ms Timestamp (time since system boot). uint32_t
// general_metadata_file_crc CRC32 of the TYPE_GENERAL file (can be used by a GCS for file caching). uint32_t
// general_metadata_uri Component definition URI for TYPE_GENERAL. This must be a MAVLink FTP URI and the file might be compressed with xz. char
// peripherals_metadata_file_crc CRC32 of the TYPE_PERIPHERALS file (can be used by a GCS for file caching). uint32_t
// peripherals_metadata_uri (Optional) Component definition URI for TYPE_PERIPHERALS. This must be a MAVLink FTP URI and the file might be compressed with xz. char
export class ComponentInformation extends MAVLinkMessage {
	public time_boot_ms!: number;
	public general_metadata_file_crc!: number;
	public general_metadata_uri!: string;
	public peripherals_metadata_file_crc!: number;
	public peripherals_metadata_uri!: string;
	public _message_id: number = 395;
	public _message_name: string = 'COMPONENT_INFORMATION';
	public _crc_extra: number = 0;
	public _message_fields: [string, string, boolean, number][] = [
		['time_boot_ms', 'uint32_t', false, 0],
		['general_metadata_file_crc', 'uint32_t', false, 0],
		['peripherals_metadata_file_crc', 'uint32_t', false, 0],
		['general_metadata_uri', 'char', false, 100],
		['peripherals_metadata_uri', 'char', false, 100],
	];
}