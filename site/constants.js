(function (exports){

var constants =
{
FPS: 35,
UPS: 35,
TIME_INTERVAL: 1000,
FRAME_MAX: 30,

POSITION_CORRECT_X: 40,
POSITION_CORRECT_Y: 40,
POSITION_CORRECT_ANGLE: Math.PI/3,
POSITION_CORRECTION_PERCENT: 0.1,

CANVAS_WIDTH: 840,
CANVAS_HEIGHT: 420,

MAP_WIDTH: 2560,
MAP_HEIGHT: 1280,

BACKGROUND_STARS0: 10000,
BACKGROUND_STARS1: 1000,
BACKGROUND_PLANETS0: 10,
BACKGROUND_PLANET_SIZE_MIN: 30,
BACKGROUND_PLANET_SIZE_RANGE: 20,

PARTICLE_SIZE: 4,
PARTICLE_WALL_LOSS: 0.5,
PARTICLE_MASS: 100,
PARTICLE_CHARGE: 100,
PARTICLE_INITIAL_VELOCITY: 0.7, // pixels per millisecond
PARTICLE_ARRAY_MAX_SIZE: 100,

PLAYER_MAX_HEALTH: 1000,
PLAYER_MAX_ENERGY: 1000,
PLAYER_RADIUS: 20,
PLAYER_SHIELD_RADIUS: 26,
PLAYER_SHIELD_FADE_MAX: 700,
PLAYER_WING_ANGLE: 5*Math.PI/6,
PLAYER_WING_ANGLE_SIN: 20*Math.sin(5*Math.PI/6),
PLAYER_WING_ANGLE_COS: 20*Math.cos(5*Math.PI/6),
PLAYER_ACCELERATION: 0.0007,
PLAYER_ROTATE_SPEED: 1/360,
PLAYER_FRICTION: 0.001,
PLAYER_WALL_LOSS: 0.5,
PLAYER_FIRE_BATTERY: 120,
PLAYER_MASS: 2000,

COMMAND_ROTATE_CC: 1,
COMMAND_MOVE_FORWARD: 2,
COMMAND_ROTATE_CW: 4,
COMMAND_MOVE_BACKWARD: 8,
COMMAND_STRAFE_RIGHT: 16,
COMMAND_STRAFE_LEFT: 32,
PLAYER_MOVING: 63,

COMMAND_FIRE: 1024,
};

exports.getConstants = function () {return constants;}

})(typeof exports === 'undefined' ? this['constants']={}: exports);