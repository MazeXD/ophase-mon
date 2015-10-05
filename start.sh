#!/bin/sh

cd $(dirname "$0")
BASE="$(pwd)"
cd /tmp

## Start a minimal window manager (needed to correctly set window dimensions)
dwm &

## Hide the mouse courser after 5 seconds
unclutter &

## Start an VNC server (create the password file with vncpasswd)
x0vncserver -display :0 -passwordfile ~/.vnc/passwd &

## Disable screen blanking
xset -dpms
xset s off

## Start backend server
# TODO: Make it start in here
#./backend.py &

## Start the browser (surf). You can restart it by "killall surf"
while true ; do
	surf -np "http://127.0.0.1:8000/" &
	echo $! >/tmp/browser.pid
	
	## Put surf into full screen (and hope that 5 seconds where enough)
	sleep 5
	xdotool search --classname surf key F11
	
	wait $(cat /tmp/browser.pid)
done
