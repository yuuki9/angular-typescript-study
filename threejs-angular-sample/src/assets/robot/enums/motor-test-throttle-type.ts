export enum MotorTestThrottleType {
	MOTOR_TEST_THROTTLE_PERCENT = 0, // Throttle as a percentage (0 ~ 100)
	MOTOR_TEST_THROTTLE_PWM = 1, // Throttle as an absolute PWM value (normally in range of 1000~2000).
	MOTOR_TEST_THROTTLE_PILOT = 2, // Throttle pass-through from pilot's transmitter.
	MOTOR_TEST_COMPASS_CAL = 3, // Per-motor compass calibration test.
	MOTOR_TEST_THROTTLE_TYPE_ENUM_END = 4, // 
}