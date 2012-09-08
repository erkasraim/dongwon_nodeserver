#!/bin/sh

argc=$#
if [ $argc -lt 1 ]
then
	echo "Usage : ./run.sh [start/stop/restart]"
	exit 0;
fi

start_func()
{
#	mkdir -p tmp/pids
#	node app.js &  
#	echo $! > tmp/pids/node_pid.log
	forever start app.js
	echo "node server start~!";
}

stop_func()
{
#	pid="$(cat tmp/pids/node_pid.log)"
#	kill -9 $pid;
	forever stop 0
	echo "node server stop!!! pid : $pid";
}

if [ $1 = "start" ]; then
	start_func;
elif [ $1 = "stop" ]; then
	stop_func;
elif [ $1 = "restart" ]; then
	forever restart 0;
fi

