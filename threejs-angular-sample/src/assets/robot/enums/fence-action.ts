export enum FenceAction {
	FENCE_ACTION_NONE = 0, // Disable fenced mode. If used in a plan this would mean the next fence is disabled.
	FENCE_ACTION_GUIDED = 1, // Fly to geofence MAV_CMD_NAV_FENCE_RETURN_POINT in GUIDED mode. Note: This action is only supported by ArduPlane, and may not be supported in all versions.
	FENCE_ACTION_REPORT = 2, // Report fence breach, but don't take action
	FENCE_ACTION_GUIDED_THR_PASS = 3, // Fly to geofence MAV_CMD_NAV_FENCE_RETURN_POINT with manual throttle control in GUIDED mode. Note: This action is only supported by ArduPlane, and may not be supported in all versions.
	FENCE_ACTION_RTL = 4, // Return/RTL mode.
	FENCE_ACTION_HOLD = 5, // Hold at current location.
	FENCE_ACTION_TERMINATE = 6, // Termination failsafe. Motors are shut down (some flight stacks may trigger other failsafe actions).
	FENCE_ACTION_LAND = 7, // Land at current location.
	FENCE_ACTION_ENUM_END = 8, // 
}