# O-Phase Monitor
## Install
Create the file `/etc/systemd/system/getty@tty7.service.d/autologin.conf` to automatically switch to `tty7` and start a shell (bash) as user `picast`.
```sh
mkdir /etc/systemd/system/getty@tty7.service.d
cat >/etc/systemd/system/getty@tty7.service.d/autologin.conf <<EOF
[Service]
ExecStart=
ExecStart=-/usr/bin/agetty --autologin picast --noclear %I 38400 linux
Type=simple
RestartSec=120s
EOF
```

Bash then starts an X session:
```
echo "exec /usr/bin/startx" >/home/picast/.bash_profile
```

Which starts our startup script (which in turn starts dwm, surf, ...)
```
echo "exec /path/to/start.sh">/home/picast/.xinitrc
```
