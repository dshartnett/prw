(function (exports){

var constant_refs = 
{
CANVAS_WIDTH: 1024,
CANVAS_HEIGHT: 640,
MAP_SIZE: 11
};

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

CANVAS_WIDTH: constant_refs.CANVAS_WIDTH,
CANVAS_HEIGHT: constant_refs.CANVAS_HEIGHT,

MAP_WIDTH: 2*Math.pow(2, constant_refs.MAP_SIZE),
MAP_HEIGHT: Math.pow(2, constant_refs.MAP_SIZE),

BACKGROUND_STARS0: Math.pow(2,constant_refs.MAP_SIZE + 2),
BACKGROUND_STARS1: 1000,
BACKGROUND_PLANETS0: 10,
BACKGROUND_PLANET_SIZE_MIN: 30,
BACKGROUND_PLANET_SIZE_RANGE: 20,

HEALTH_LOCATION_X: constant_refs.CANVAS_WIDTH/2,
HEALTH_LOCATION_Y: 10,
HEALTH_WIDTH: 100,
HEALTH_HEIGHT: 20,

WALL_DAMAGE_MINIMUM: 30,
WALL_DAMAGE_MULTIPLIER: 900,

PARTICLE_SIZE: 4,
PARTICLE_WALL_LOSS: 0.5,
PARTICLE_MASS: 100,
PARTICLE_CHARGE: 100,
PARTICLE_INITIAL_VELOCITY: 0.6,// pixels per millisecond
PARTICLE_CORRECT_X: 4,
PARTICLE_CORRECT_Y: 4,
PARTICLE_CORRECTION_PERCENT: 0.2,
PARTICLE_DAMAGE: 120,

OBJECT_POSITION_CORRECT_X: 10,
OBJECT_POSITION_CORRECT_Y: 10,

G_OBJECT_STATUS_DETONATED: 1,
G_OBJECT_TIME_TO_DET: 3000,
G_OBJECT_TIME_TO_LAST: 15000,
G_OBJECT_MIN_RADIUS: 10,
G_OBJECT_MAX_RADIUS: 40,
G_OBJECT_WALL_LOSS: 0.5,
G_OBJECT_LAUNCH_MASS: 2000,
G_OBJECT_INITIAL_VELOCITY: 0.1,
G_OBJECT_MASS: 20,
G_OBJECT_FRICTION: 0.001,

OBJ_POWER_UP: 0,
OBJ_G_OBJECT: 1,
OBJ_BOMB: 2,

POWER_UP_RADIUS: 10,
POWER_UP_CLOAK: 0,
POWER_UP_CLOAK_CHAR:"C",
POWER_UP_INVINCIBLE: 1,
POWER_UP_INVINCIBLE_CHAR:"I",
POWER_UP_G_OBJECT: 2,
POWER_UP_G_OBJECT_CHAR:"G",
POWER_UP_BOMB: 3,
POWER_UP_BOMB_CHAR:"B",

TEAM0: 0,
TEAM1: 1,
TEAM2: 2,
TEAM3: 3,
TEAM4: 4,
TEAM_DARK: ["black","red","blue","gray","orange"],
TEAM_LIGHT: ["white","pink","cyan","white","yellow"],

PLAYER_MAX_HEALTH: 1000,
PLAYER_HEALTH_REGEN: 0.1,
PLAYER_MAX_ENERGY: 1000,
PLAYER_MAX_BULLETS: 10,
PLAYER_RADIUS: 20,
PLAYER_SHIELD_RADIUS: 26,
PLAYER_SHIELD_FADE_MAX: 700,
PLAYER_DEAD_COUNTER_MAX: 2000,
PLAYER_WING_ANGLE: 5*Math.PI/6,
PLAYER_WING_ANGLE_SIN: 20*Math.sin(5*Math.PI/6),
PLAYER_WING_ANGLE_COS: 20*Math.cos(5*Math.PI/6),
PLAYER_ACCELERATION: 0.0007,
PLAYER_ROTATE_SPEED: 1/360,
PLAYER_FRICTION: 0.001,
PLAYER_WALL_LOSS: 0.5,
PLAYER_FIRE_BATTERY: 120,
PLAYER_MASS: 2000,

PLAYER_STATUS_MOVING: 1,
PLAYER_STATUS_HIT: 2,
PLAYER_STATUS_INVINCIBLE: 4,
PLAYER_STATUS_CLOAKED: 8,
PLAYER_STATUS_DEAD: 16,

COMMAND_ROTATE_CC: 1,
COMMAND_MOVE_FORWARD: 2,
COMMAND_ROTATE_CW: 4,
COMMAND_MOVE_BACKWARD: 8,
COMMAND_STRAFE_RIGHT: 16,
COMMAND_STRAFE_LEFT: 32,
PLAYER_MOVING: 63,

COMMAND_FIRE: 1024,
COMMAND_G_OBJECT: 2048,
COMMAND_BOMB: 4096
};

exports.getConstants = function () {return constants;}

})(typeof exports === 'undefined' ? this['constants']={}: exports);
