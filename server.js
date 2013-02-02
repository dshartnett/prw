(function(){

"use strict";

function Timer()
{
	this.then = Date.now();
	this.int_count = 0;

	this.time_array = [];
	this.time_array_index = 0;
	this.frame_count = 0;
	this.time_count = 0;
}

Timer.prototype = {
	get interval(){
		var i = Date.now() - this.then;
		this.then = Date.now();

		this.time_array_index++;
		if (this.time_array_index >= CONST.FRAME_MAX) this.time_array_index = 0;

		if (this.frame_count >= CONST.FRAME_MAX) this.time_count -= this.time_array[this.time_array_index];
		else this.frame_count++;

		this.time_array[this.time_array_index] = i;

		this.time_count += i;
		this.int_count++;
		return i;
	},
	get i_count(){return this.int_count;},
	get frame_rate(){return 1000*this.frame_count/this.time_count;}
};

var CONST = require('./site/constants.js').getConstants();
var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var staticReq = require('node-static'); // for serving files

// This will make all the files in the current folder accessible
var fileServer = new staticReq.Server('./site/');
	
// http://localhost:8080
app.listen(8080);

// If the URL of the socket server is opened in a browser
function handler(request, response) {request.addListener('end', function () {fileServer.serve(request, response);}); }
//function handler(request, response) {response.writeHeader(200, {'Content-Type': 'text/plain'});  response.end('Hello World\n');}

// Delete this row if you want to see debug messages
io.set('log level', 1);

var PLAYER_ID = 0;
var player_list = {};
var OBJECT_ID = 0;
var object_list = {};

var main_timer = new Timer();

setInterval(function () {
	//console.log(Date.now() + "    " + Math.random()*Math.pow(2,32));
	var server_interval = main_timer.interval;
	for (var u in player_list) player_list[u].player.update(server_interval);
//	console.log(server_interval);
},1000/CONST.UPS);

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {
	PLAYER_ID++;

	player_list[socket.id] = {
		start_interval: Date.now(),
		end_interval: null,
		player:new Player(PLAYER_ID)
	};

	console.log("player " + PLAYER_ID + " connected on socket " + socket.id + ". ponging now...");
	socket.emit("pong",player_list[socket.id].player.data());

	socket.on('ping', function(data) {
		player_list[socket.id].end_interval = Date.now();
		var interval = player_list[socket.id].end_interval - player_list[socket.id].start_interval;
		console.log("pinged with: " + data + " player id: " + player_list[socket.id].player.p_id + "  socket id: " + socket.id + " interval: " + interval);

		player_list[socket.id].player.move_command_state = data;
		//player_list[socket.id].player.update(interval);
		
		player_list[socket.id].start_interval = Date.now();
		
		socket.volatile.emit("pong", player_list[socket.id].player.data());
		//setTimeout(function(){socket.emit("pong", player_list[socket.id].player.data());}, 200);
	});

	socket.on('disconnect', function(){
		console.log("player " + player_list[socket.id].player.p_id + " disconnected");
		socket.broadcast.emit('player_removed', PLAYER_ID);
		delete player_list[socket.id];
	});
});

function Particle(x,y,v_x,v_y,color){
        this.pos_x = x;
        this.pos_y = y;
        this.v_x = v_x;
        this.v_y = v_y;
        this.mass = CONST.PARTICLE_MASS;
        this.charge = CONST.PARTICLE_CHARGE;
        this.color = color;
        this.size = CONST.PARTICLE_SIZE;
        this.half_size = this.size/2;

        this.update = function(interval) {
                this.pos_x += this.v_x*interval;
                this.pos_y += this.v_y*interval;

                if (this.pos_x >= CONST.MAP_WIDTH) {this.pos_x = CONST.MAP_WIDTH - 1; this.v_x = -this.v_x*CONST.PARTICLE_WALL_LOSS;}
                else if (this.pos_x <= 0) {this.pos_x = 1; this.v_x = -this.v_x*CONST.PARTICLE_WALL_LOSS;}

                if (this.pos_y >= CONST.MAP_HEIGHT) {this.pos_y = CONST.MAP_HEIGHT - 1; this.v_y = -this.v_y*CONST.PARTICLE_WALL_LOSS;}
                else if (this.pos_y <= 0) {this.pos_y = 1; this.v_y = -this.v_y*CONST.PARTICLE_WALL_LOSS;}
        }

        this.draw = function(context, pos_x, pos_y) {
                context.fillStyle = this.color;
                var x = this.pos_x - pos_x;
                var y = this.pos_y - pos_y;
                if (x >= 0 && x <= CONST.CANVAS_WIDTH && y >= 0 && y <= CONST.CANVAS_HEIGHT)
                        context.fillRect(x - this.half_size, y - this.half_size, this.size, this.size);
        }
        return this;
}

function Player(player_id){
	this.p_id = player_id;
	this.pos_x = (0.1 + Math.random()*0.8)*CONST.MAP_WIDTH;
	this.pos_y = (0.1 + Math.random()*0.8)*CONST.MAP_HEIGHT;
	this.angle = 0;
	
	this.v_x = 0;
	this.v_y = 0;
	this.radius = CONST.PLAYER_RADIUS;
	this.wing_angle = CONST.PLAYER_WING_ANGLE;
	this.team_color = 'red';
	
	this.mass = CONST.PLAYER_MASS;
	
	this.shield_fade = 0;
	this.fire_battery = 0;
	
	this.move_command_state = 0;
	
	this.server_set = false;

	this.data = function() { return {p_id:this.p_id, x:this.pos_x, y:this.pos_y, v_x:this.v_x, v_y:this.v_y, angle:this.angle};};

	this.update = function (interval) {
		this.v_x -= CONST.PLAYER_FRICTION*this.v_x*interval;
		this.v_y -= CONST.PLAYER_FRICTION*this.v_y*interval;

		if (this.shield_fade > 0) this.shield_fade -= interval;
		if (this.fire_battery > 0) this.fire_battery -= interval;

		if (this.move_command_state & CONST.COMMAND_ROTATE_CC) this.angle -= CONST.PLAYER_ROTATE_SPEED*interval;
		if (this.move_command_state & CONST.COMMAND_MOVE_FORWARD)
		{
			this.v_x += CONST.PLAYER_ACCELERATION*interval*Math.cos(this.angle);
			this.v_y += CONST.PLAYER_ACCELERATION*interval*Math.sin(this.angle);
		}
		if (this.move_command_state & CONST.COMMAND_ROTATE_CW) this.angle += CONST.PLAYER_ROTATE_SPEED*interval;
		if (this.move_command_state & CONST.COMMAND_MOVE_BACKWARD)
		{
			this.v_x -= CONST.PLAYER_ACCELERATION*interval*Math.cos(this.angle);
			this.v_y -= CONST.PLAYER_ACCELERATION*interval*Math.sin(this.angle);
		}
		if (this.move_command_state & CONST.COMMAND_STRAFE_LEFT)
		{
			this.v_x += CONST.PLAYER_ACCELERATION*interval*Math.sin(this.angle);
			this.v_y -= CONST.PLAYER_ACCELERATION*interval*Math.cos(this.angle);
		}
		if (this.move_command_state & CONST.COMMAND_STRAFE_RIGHT)
		{
			this.v_x -= CONST.PLAYER_ACCELERATION*interval*Math.sin(this.angle);
			this.v_y += CONST.PLAYER_ACCELERATION*interval*Math.cos(this.angle);
		}
		/*
		if (this.fire_battery <= 0 && this.move_command_state & CONST.COMMAND_FIRE)
		{
			this.request_state += CONST.COMMAND_FIRE;
			this.fire_battery = CONST.PLAYER_FIRE_BATTERY;
			this.v_x -= CONST.PARTICLE_MASS*CONST.PARTICLE_INITIAL_VELOCITY*Math.cos(this.angle)/this.mass;
			this.v_y -= CONST.PARTICLE_MASS*CONST.PARTICLE_INITIAL_VELOCITY*Math.sin(this.angle)/this.mass;
		}*/

		this.pos_x += this.v_x*interval;
		this.pos_y += this.v_y*interval;

		if (this.pos_x - this.radius <= 0)
			{this.v_x = -CONST.PLAYER_WALL_LOSS*this.v_x; this.pos_x = this.radius; this.shield_fade = CONST.PLAYER_SHIELD_FADE_MAX;}
		else if (this.pos_x + this.radius >= CONST.MAP_WIDTH)
			{this.v_x = -CONST.PLAYER_WALL_LOSS*this.v_x; this.pos_x = CONST.MAP_WIDTH-this.radius; this.shield_fade = CONST.PLAYER_SHIELD_FADE_MAX;}
		if (this.pos_y - this.radius <= 0)
			{this.v_y = -CONST.PLAYER_WALL_LOSS*this.v_y; this.pos_y = this.radius; this.shield_fade = CONST.PLAYER_SHIELD_FADE_MAX;}
		else if (this.pos_y + this.radius >= CONST.MAP_HEIGHT)
			{this.v_y = -CONST.PLAYER_WALL_LOSS*this.v_y; this.pos_y = CONST.MAP_HEIGHT-this.radius; this.shield_fade = CONST.PLAYER_SHIELD_FADE_MAX;}
	};
	return this;
}

})();
