import {MAVLinkMessage} from 'node-mavlink';
import {readInt64LE, readUInt64LE} from 'node-mavlink';
import {MavBatteryFunction} from '../enums/mav-battery-function';
import {MavBatteryType} from '../enums/mav-battery-type';
/*
Smart Battery information (static/infrequent update). Use for updates from: smart battery to flight stack, flight stack to GCS. Use BATTERY_STATUS for smart battery frequent updates.
*/
// id Battery ID uint8_t
// battery_function Function of the battery uint8_t
// type Type (chemistry) of the battery uint8_t
// capacity_full_specification Capacity when full according to manufacturer, -1: field not provided. int32_t
// capacity_full Capacity when full (accounting for battery degradation), -1: field not provided. int32_t
// cycle_count Charge/discharge cycle count. UINT16_MAX: field not provided. uint16_t
// serial_number Serial number in ASCII characters, 0 terminated. All 0: field not provided. char
// device_name Static device name in ASCII characters, 0 terminated. All 0: field not provided. Encode as manufacturer name then product name separated using an underscore. char
// weight Battery weight. 0: field not provided. uint16_t
// discharge_minimum_voltage Minimum per-cell voltage when discharging. If not supplied set to UINT16_MAX value. uint16_t
// charging_minimum_voltage Minimum per-cell voltage when charging. If not supplied set to UINT16_MAX value. uint16_t
// resting_minimum_voltage Minimum per-cell voltage when resting. If not supplied set to UINT16_MAX value. uint16_t
// charging_maximum_voltage Maximum per-cell voltage when charged. 0: field not provided. uint16_t
// cells_in_series Number of battery cells in series. 0: field not provided. uint8_t
// discharge_maximum_current Maximum pack discharge current. 0: field not provided. uint32_t
// discharge_maximum_burst_current Maximum pack discharge burst current. 0: field not provided. uint32_t
// manufacture_date Manufacture date (DD/MM/YYYY) in ASCII characters, 0 terminated. All 0: field not provided. char
export class SmartBatteryInfo extends MAVLinkMessage {
	public id!: number;
	public battery_function!: MavBatteryFunction;
	public type!: MavBatteryType;
	public capacity_full_specification!: number;
	public capacity_full!: number;
	public cycle_count!: number;
	public serial_number!: string;
	public device_name!: string;
	public weight!: number;
	public discharge_minimum_voltage!: number;
	public charging_minimum_voltage!: number;
	public resting_minimum_voltage!: number;
	public charging_maximum_voltage!: number;
	public cells_in_series!: number;
	public discharge_maximum_current!: number;
	public discharge_maximum_burst_current!: number;
	public manufacture_date!: string;
	public _message_id: number = 370;
	public _message_name: string = 'SMART_BATTERY_INFO';
	public _crc_extra: number = 75;
	public _message_fields: [string, string, boolean, number][] = [
		['capacity_full_specification', 'int32_t', false, 0],
		['capacity_full', 'int32_t', false, 0],
		['cycle_count', 'uint16_t', false, 0],
		['weight', 'uint16_t', false, 0],
		['discharge_minimum_voltage', 'uint16_t', false, 0],
		['charging_minimum_voltage', 'uint16_t', false, 0],
		['resting_minimum_voltage', 'uint16_t', false, 0],
		['id', 'uint8_t', false, 0],
		['battery_function', 'uint8_t', false, 0],
		['type', 'uint8_t', false, 0],
		['serial_number', 'char', false, 16],
		['device_name', 'char', false, 50],
		['charging_maximum_voltage', 'uint16_t', true, 0],
		['cells_in_series', 'uint8_t', true, 0],
		['discharge_maximum_current', 'uint32_t', true, 0],
		['discharge_maximum_burst_current', 'uint32_t', true, 0],
		['manufacture_date', 'char', true, 11],
	];
}