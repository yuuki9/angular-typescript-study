import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MagCalStatus} from '../enums/mag-cal-status';
import {MavSensorOrientation} from '../enums/mav-sensor-orientation';
/*
Reports results of completed compass calibration. Sent until MAG_CAL_ACK received.
*/
// compass_id Compass being calibrated. uint8_t
// cal_mask Bitmask of compasses being calibrated. uint8_t
// cal_status Calibration Status. uint8_t
// autosaved 0=requires a MAV_CMD_DO_ACCEPT_MAG_CAL, 1=saved to parameters. uint8_t
// fitness RMS milligauss residuals. float
// ofs_x X offset. float
// ofs_y Y offset. float
// ofs_z Z offset. float
// diag_x X diagonal (matrix 11). float
// diag_y Y diagonal (matrix 22). float
// diag_z Z diagonal (matrix 33). float
// offdiag_x X off-diagonal (matrix 12 and 21). float
// offdiag_y Y off-diagonal (matrix 13 and 31). float
// offdiag_z Z off-diagonal (matrix 32 and 23). float
// orientation_confidence Confidence in orientation (higher is better). float
// old_orientation orientation before calibration. uint8_t
// new_orientation orientation after calibration. uint8_t
// scale_factor field radius correction factor float
export class MagCalReport extends MAVLinkMessage {
	public compass_id!: number;
	public cal_mask!: number;
	public cal_status!: MagCalStatus;
	public autosaved!: number;
	public fitness!: number;
	public ofs_x!: number;
	public ofs_y!: number;
	public ofs_z!: number;
	public diag_x!: number;
	public diag_y!: number;
	public diag_z!: number;
	public offdiag_x!: number;
	public offdiag_y!: number;
	public offdiag_z!: number;
	public orientation_confidence!: number;
	public old_orientation!: MavSensorOrientation;
	public new_orientation!: MavSensorOrientation;
	public scale_factor!: number;
	public _message_id: number = 192;
	public _message_name: string = 'MAG_CAL_REPORT';
	public _crc_extra: number = 36;
	public _message_fields: [string, string, boolean, number][] = [
		['fitness', 'float', false, 0],
		['ofs_x', 'float', false, 0],
		['ofs_y', 'float', false, 0],
		['ofs_z', 'float', false, 0],
		['diag_x', 'float', false, 0],
		['diag_y', 'float', false, 0],
		['diag_z', 'float', false, 0],
		['offdiag_x', 'float', false, 0],
		['offdiag_y', 'float', false, 0],
		['offdiag_z', 'float', false, 0],
		['compass_id', 'uint8_t', false, 0],
		['cal_mask', 'uint8_t', false, 0],
		['cal_status', 'uint8_t', false, 0],
		['autosaved', 'uint8_t', false, 0],
		['orientation_confidence', 'float', true, 0],
		['old_orientation', 'uint8_t', true, 0],
		['new_orientation', 'uint8_t', true, 0],
		['scale_factor', 'float', true, 0],
	];
}