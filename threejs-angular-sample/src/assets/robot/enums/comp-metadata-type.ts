export enum CompMetadataType {
	COMP_METADATA_TYPE_GENERAL = 0, // General information about the component. General metadata includes information about other COMP_METADATA_TYPEs supported by the component. This type must be supported and must be downloadable from vehicle.
	COMP_METADATA_TYPE_PARAMETER = 1, // Parameter meta data.
	COMP_METADATA_TYPE_COMMANDS = 2, // Meta data that specifies which commands and command parameters the vehicle supports. (WIP)
	COMP_METADATA_TYPE_PERIPHERALS = 3, // Meta data that specifies external non-MAVLink peripherals.
	COMP_METADATA_TYPE_EVENTS = 4, // Meta data for the events interface.
	COMP_METADATA_TYPE_ENUM_END = 5, // 
}