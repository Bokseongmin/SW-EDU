var http = require('http');
var express = require('express');
var app = express()
var socketio = require('socket.io');
var cors = require('cors');
var static = require('serve-static');
var path = require('path');
var config = require('./config/config')
app.use(cors());