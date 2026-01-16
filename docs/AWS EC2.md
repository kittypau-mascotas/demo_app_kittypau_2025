Instancias (1) Información

Conectar
Estado de la instancia
Acciones
Lanzar instancias


Todos los estados

1


Name
	
ID de la instancia
	
Estado de la instancia
	
Tipo de instancia
	
Comprobación de estado
	
Estado de la alarma
	
Zona de disponibilidad
	
DNS de IPv4 pública
	
Dirección IPv4 pública
	
IP elástica
	
Direcciones IP IPv6
	
Monitoreo
	
Nombre del grupo de seguridad
	
Nombre de la clave
	
Hora de lanzamiento
	
Detalles de la plataforma
	
Administradas
	
Operador

Name
	
ID de la instancia
	
Estado de la instancia
	
Tipo de instancia
	
Comprobación de estado
	
Estado de la alarma
	
Zona de disponibilidad
	
DNS de IPv4 pública
	
Dirección IPv4 pública
	
IP elástica
	
Direcciones IP IPv6
	
Monitoreo
	
Nombre del grupo de seguridad
	
Nombre de la clave
	
Hora de lanzamiento
	
Detalles de la plataforma
	
Administradas
	
Operador

kittypau-iot-bridge
i-06d9d84a3ebd359c0
En ejecución

t2.micro
2/2 comprobaciones superadas
Ver alarmas

us-east-2a
ec2-3-135-201-228.us-east-2.compute.amazonaws.com
3.135.201.228
–
–
disabled
launch-wizard-1
kittypau-key
2026/01/08 12:01 GMT-3
Linux/UNIX
falso
–

Resumen de instancia de i-06d9d84a3ebd359c0 (kittypau-iot-bridge) Información

Conectar
Estado de la instancia
Acciones
Se ha actualizado hace less than a minute

ID de la instancia
i-06d9d84a3ebd359c0
Dirección IPv4 pública

3.135.201.228 | dirección abierta 
Direcciones IPv4 privadas
172.31.14.153
Dirección IPv6
–
Estado de la instancia
En ejecución
DNS público

ec2-3-135-201-228.us-east-2.compute.amazonaws.com | dirección abierta 
Tipo de nombre de anfitrión
Nombre de IP: ip-172-31-14-153.us-east-2.compute.internal
Nombre DNS de IP privada (solo IPv4)
ip-172-31-14-153.us-east-2.compute.internal
Responder al nombre DNS de recurso privado
IPv4 (A)
Tipo de instancia
t2.micro
Direcciones IP elásticas
–
Dirección IP asignada automáticamente

3.135.201.228 [IP pública]
ID de VPC
vpc-0d4925fb6b5c01f2d 
Hallazgo de AWS Compute Optimizer
Suscribirse a AWS Compute Optimizer para recibir recomendaciones.
|
Más información 
Rol de IAM
–
ID de subred
subnet-0fac8e7073ffd4e90 
Nombre del grupo de Auto Scaling
–
IMDSv2
Required
ARN de instancia
arn:aws:ec2:us-east-2:440671981849:instance/i-06d9d84a3ebd359c0
Administradas
falso
Operador
–

Detalles

Estado y alarmas

Monitoreo

Seguridad

Redes

Almacenamiento

Etiquetas
Detalles de la instancia
Información
ID de AMI

ami-0f5fcdfbd140e4ab7
Monitoreo
desactivado
Detalles de la plataforma
Linux/UNIX
Nombre de AMI
ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-20251022
Imagen permitida
-
Protección de terminación
desactivado
Detener la protección
desactivado
Hora de lanzamiento
Thu Jan 08 2026 12:01:53 GMT-0300 (hora de verano de Chile) (8 days)
Ubicación de AMI
amazon/ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-20251022
Migración por reinicio de instancias
Predeterminada (activado)
Recuperación automática de instancias
Predeterminada
Ciclo de vida
normal
Comportamiento de detención de hibernación
desactivado
Índice de lanzamiento de AMI
0
Par de claves asignado en el lanzamiento

kittypau-key
Motivo de transición de estado
–
Especificación de crédito
standard
ID de kernel
–
Mensaje de transición de estado
–
Operación de uso
RunInstances
ID de disco RAM
–
Propietario
440671981849
Compatibilidad con enclaves
–
Modo de arranque
uefi-preferred
Modo de arranque de instancia actual
legacy-bios
Permitir etiquetas en los metadatos de la instancia
desactivado
Utilizar RBN como nombre de host del SO invitado
desactivado
Responder a RBN de DNS de nombre de host IPv4
Habilitado
Host y grupo de ubicación
Información
ID de alojamiento
–
Afinidad
–
Grupo de ubicación
–
Nombre del grupo de recursos de host
–
Tenencia
default
ID de grupo de ubicación
–
Tipo de virtualización
hvm
Reserva
r-096438fb2944261f9
Número de partición
–
Número de CPU virtuales
1
Reserva de capacidad
Información
ID de reserva de capacidad
–
Configuración de reserva de capacidad
open


root@ip-172-31-14-153:~# find / > /root/filesystem_tree.txt 2>/root/errors.txt
root@ip-172-31-14-153:~# wc -l /root/filesystem_tree.txt
273783 /root/filesystem_tree.txt
root@ip-172-31-14-153:~# ls -lah /home
ls -lah /opt
ls -lah /srv
total 12K
drwxr-xr-x  3 root   root   4.0K Jan  7 00:49 .
drwxr-xr-x 22 root   root   4.0K Jan  8 15:02 ..
drwxr-x---  9 ubuntu ubuntu 4.0K Jan 10 05:41 ubuntu
total 8.0K
drwxr-xr-x  2 root root 4.0K Oct 22 09:59 .
drwxr-xr-x 22 root root 4.0K Jan  8 15:02 ..
total 8.0K
drwxr-xr-x  2 root root 4.0K Oct 22 09:59 .
drwxr-xr-x 22 root root 4.0K Jan  8 15:02 ..
root@ip-172-31-14-153:~# ls -lah /etc
ls -lah /etc/systemd/system
total 952K
drwxr-xr-x 108 root root      4.0K Jan 15 06:09 .
drwxr-xr-x  22 root root      4.0K Jan  8 15:02 ..
-rw-------   1 root root         0 Oct 22 10:00 .pwd.lock
-rw-r--r--   1 root root       862 Oct 22 09:59 .resolv.conf.systemd-resolved.bak
-rw-r--r--   1 root root       208 Oct 22 09:59 .updated
drwxr-xr-x   4 root root      4.0K Oct 22 10:01 ModemManager
drwxr-xr-x   2 root root      4.0K Jan  7 01:11 PackageKit
drwxr-xr-x   4 root root      4.0K Oct 22 10:00 X11
drwxr-xr-x   4 root root      4.0K Oct 22 10:15 acpi
-rw-r--r--   1 root root      3.4K Jul  5  2023 adduser.conf
drwxr-xr-x   2 root root      4.0K Jan  7 01:12 alternatives
drwxr-xr-x   2 root root      4.0K Jan  7 01:11 apparmor
drwxr-xr-x   9 root root       12K Jan  7 01:12 apparmor.d
drwxr-xr-x   3 root root      4.0K Oct 22 10:02 apport
drwxr-xr-x   8 root root      4.0K Oct 22 10:16 apt
-rw-r--r--   1 root root      2.3K Mar 31  2024 bash.bashrc
-rw-r--r--   1 root root        45 Jan 24  2020 bash_completion
drwxr-xr-x   2 root root      4.0K Oct 22 10:02 bash_completion.d
-rw-r--r--   1 root root       367 Aug  2  2022 bindresvport.blacklist
drwxr-xr-x   2 root root      4.0K Apr 19  2024 binfmt.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 byobu
drwxr-xr-x   3 root root      4.0K Oct 22 10:00 ca-certificates
-rw-r--r--   1 root root      6.2K Oct 22 10:00 ca-certificates.conf
drwxr-xr-x   4 root root      4.0K Oct 22 10:15 chrony
drwxr-xr-x   5 root root      4.0K Oct 22 10:02 cloud
drwxr-xr-x   2 root root      4.0K Oct 22 10:02 console-setup
drwx------   2 root root      4.0K Apr 19  2024 credstore
drwx------   2 root root      4.0K Apr 19  2024 credstore.encrypted
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 cron.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:02 cron.daily
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 cron.hourly
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 cron.monthly
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 cron.weekly
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 cron.yearly
-rw-r--r--   1 root root      1.2K Mar 31  2024 crontab
drwxr-xr-x   2 root root      4.0K Oct 22 10:02 cryptsetup-initramfs
-rw-r--r--   1 root root        54 Oct 22 10:01 crypttab
drwxr-xr-x   4 root root      4.0K Oct 22 10:00 dbus-1
-rw-r--r--   1 root root      2.9K Apr 12  2024 debconf.conf
-rw-r--r--   1 root root        11 Apr 22  2024 debian_version
drwxr-xr-x   3 root root      4.0K Jan  7 01:11 default
-rw-r--r--   1 root root      1.7K Jul  5  2023 deluser.conf
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 depmod.d
drwxr-xr-x   3 root root      4.0K Oct 22 10:00 dhcp
-rw-r--r--   1 root root      1.4K Mar 31  2024 dhcpcd.conf
drwxr-xr-x   4 root root      4.0K Oct 22 10:00 dpkg
-rw-r--r--   1 root root       685 Apr  8  2024 e2scrub.conf
-rw-r--r--   1 root root        34 Oct 22 10:02 ec2_version
-rw-r--r--   1 root root       106 Oct 22 10:00 environment
-rw-r--r--   1 root root      1.9K Oct 17  2022 ethertypes
-rw-r--r--   1 root root       146 Oct 22 10:14 fstab
-rw-r--r--   1 root root       694 Apr  8  2024 fuse.conf
drwxr-xr-x   4 root root      4.0K Oct 22 10:02 fwupd
-rw-r--r--   1 root root      2.6K Jan 31  2024 gai.conf
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 gnutls
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 groff
-rw-r--r--   1 root root       844 Jan  7 00:49 group
-rw-r--r--   1 root root       798 Oct 22 10:15 group-
drwxr-xr-x   2 root root      4.0K Oct 22 10:15 grub.d
-rw-r-----   1 root shadow     712 Jan  7 00:49 gshadow
-rw-r-----   1 root shadow     670 Oct 22 10:15 gshadow-
drwxr-xr-x   3 root root      4.0K Oct 22 10:00 gss
-rw-r--r--   1 root root      4.4K Oct  6  2022 hdparm.conf
-rw-r--r--   1 root root      1.5K Nov 20  2023 hibagent-config.cfg
-rw-r--r--   1 root root       822 May 23  2024 hibinit-config.cfg
-rw-r--r--   1 root root        92 Apr 22  2024 host.conf
-rw-r--r--   1 root root        17 Jan  7 00:49 hostname
-rw-r--r--   1 root root       221 Oct 21 22:50 hosts
-rw-r--r--   1 root root       411 Oct 22 10:01 hosts.allow
-rw-r--r--   1 root root       711 Oct 22 10:01 hosts.deny
drwxr-xr-x   2 root root      4.0K Jan  7 01:11 init.d
drwxr-xr-x   5 root root      4.0K Oct 22 10:01 initramfs-tools
-rw-r--r--   1 root root      1.9K Mar 31  2024 inputrc
drwxr-xr-x   4 root root      4.0K Oct 22 10:00 iproute2
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 iscsi
-rw-r--r--   1 root root        26 Aug  1 14:21 issue
-rw-r--r--   1 root root        19 Aug  1 14:21 issue.net
drwxr-xr-x   6 root root      4.0K Oct 22 10:14 kernel
drwxrwxr-x   2 root landscape 4.0K Jun 13  2025 landscape
-rw-r--r--   1 root root       21K Jan 15 06:09 ld.so.cache
-rw-r--r--   1 root root        34 Aug  2  2022 ld.so.conf
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 ld.so.conf.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 ldap
-rw-r--r--   1 root root       267 Apr 22  2024 legal
-rw-r--r--   1 root root       191 Mar 31  2024 libaudit.conf
drwxr-xr-x   3 root root      4.0K Oct 22 10:01 libblockdev
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 libibverbs.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 libnl-3
-rw-r--r--   1 root root      3.0K Mar 30  2024 locale.alias
-rw-r--r--   1 root root        13 Oct 22 10:02 locale.conf
-rw-r--r--   1 root root      9.4K Oct 22 10:02 locale.gen
lrwxrwxrwx   1 root root        27 Oct 22 10:00 localtime -> /usr/share/zoneinfo/Etc/UTC
drwxr-xr-x   4 root root      4.0K Oct 22 10:01 logcheck
-rw-r--r--   1 root root       13K Feb 22  2024 login.defs
-rw-r--r--   1 root root       586 Apr  8  2024 logrotate.conf
drwxr-xr-x   2 root root      4.0K Jan  7 01:12 logrotate.d
-rw-r--r--   1 root root       104 Aug  1 14:21 lsb-release
drwxr-xr-x   3 root root      4.0K Oct 22 10:02 lvm
-r--r--r--   1 root root        33 Jan  7 00:48 machine-id
-rw-r--r--   1 root root       111 Mar 31  2024 magic
-rw-r--r--   1 root root       111 Mar 31  2024 magic.mime
-rw-r--r--   1 root root      5.2K Apr  8  2024 manpath.config
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 mdadm
-rw-r--r--   1 root root       74K Jul 12  2023 mime.types
-rw-r--r--   1 root root       744 Apr  8  2024 mke2fs.conf
drwxr-xr-x   2 root root      4.0K Jan  7 01:11 modprobe.d
-rw-r--r--   1 root root       212 Oct 22 10:00 modules
drwxr-xr-x   2 root root      4.0K Jan  7 01:11 modules-load.d
lrwxrwxrwx   1 root root        19 Oct 22 10:00 mtab -> ../proc/self/mounts
drwx------   2 root root      4.0K Jan  7 00:48 multipath
-rw-r--r--   1 root root        41 Apr  7  2024 multipath.conf
-rw-r--r--   1 root root       12K May 23  2023 nanorc
drwxr-xr-x   6 root root      4.0K Oct 22 10:01 needrestart
-rw-r--r--   1 root root       767 Mar 31  2024 netconfig
drwxr-xr-x   2 root root      4.0K Jan  7 00:49 netplan
drwxr-xr-x   5 root root      4.0K Oct 22 10:15 network
drwxr-xr-x   8 root root      4.0K Oct 22 10:00 networkd-dispatcher
-rw-r--r--   1 root root        91 Apr 22  2024 networks
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 newt
-rwxr-xr-x   1 root root       243 Oct 19  2023 nftables.conf
-rw-r--r--   1 root root       526 Oct 22 10:00 nsswitch.conf
drwxr-xr-x   2 root root      4.0K Oct 22 09:59 opt
lrwxrwxrwx   1 root root        21 Aug  1 14:21 os-release -> ../usr/lib/os-release
-rw-r--r--   1 root root      6.8K Jul  3  2024 overlayroot.conf
-rw-r--r--   1 root root       112 Oct 22 10:02 overlayroot.local.conf
-rw-r--r--   1 root root       552 Oct 13  2022 pam.conf
drwxr-xr-x   2 root root      4.0K Jan  7 01:12 pam.d
-rw-r--r--   1 root root      1.9K Jan  7 00:49 passwd
-rw-r--r--   1 root root      1.8K Oct 22 10:15 passwd-
drwxr-xr-x   3 root root      4.0K Oct 22 10:01 perl
drwxr-xr-x   4 root root      4.0K Oct 22 10:01 pki
drwxr-xr-x   2 root root      4.0K Feb 25  2025 plymouth
drwxr-xr-x   3 root root      4.0K Oct 22 10:01 pm
drwxr-xr-x   3 root root      4.0K Oct 22 10:01 polkit-1
drwxr-xr-x   2 root root      4.0K Oct 22 10:02 pollinate
drwxr-xr-x   4 root root      4.0K Oct 22 10:15 ppp
-rw-r--r--   1 root root       582 Apr 22  2024 profile
drwxr-xr-x   2 root root      4.0K Jan  7 01:11 profile.d
-rw-r--r--   1 root root      3.1K Oct 17  2022 protocols
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 python3
drwxr-xr-x   2 root root      4.0K Jan 13 06:11 python3.12
drwxr-xr-x   2 root root      4.0K Oct 22 10:16 rc0.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:16 rc1.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:16 rc2.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:16 rc3.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:16 rc4.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:16 rc5.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:16 rc6.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 rcS.d
lrwxrwxrwx   1 root root        39 Oct 22 10:00 resolv.conf -> ../run/systemd/resolve/stub-resolv.conf
lrwxrwxrwx   1 root root        13 Apr  8  2024 rmt -> /usr/sbin/rmt
-rw-r--r--   1 root root       911 Oct 17  2022 rpc
-rw-r--r--   1 root root      1.2K Mar 22  2024 rsyslog.conf
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 rsyslog.d
-rw-r--r--   1 root root      3.6K Jun 20  2016 screenrc
drwxr-xr-x   4 root root      4.0K Oct 22 10:00 security
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 selinux
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 sensors.d
-rw-r--r--   1 root root       11K Mar 31  2024 sensors3.conf
-rw-r--r--   1 root root       13K Mar 27  2021 services
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 sgml
-rw-r-----   1 root shadow     899 Jan  7 00:49 shadow
-rw-r-----   1 root shadow     899 Jan  7 00:49 shadow-
-rw-r--r--   1 root root       148 Oct 22 10:02 shells
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 skel
drwxr-xr-x   6 root root      4.0K Oct 22 10:01 sos
drwxr-xr-x   4 root root      4.0K Jan  7 00:49 ssh
drwxr-xr-x   4 root root      4.0K Oct 22 10:00 ssl
-rw-r--r--   1 root root        20 Jan  7 00:49 subgid
-rw-r--r--   1 root root         0 Oct 22 10:00 subgid-
-rw-r--r--   1 root root        20 Jan  7 00:49 subuid
-rw-r--r--   1 root root         0 Oct 22 10:00 subuid-
-rw-r--r--   1 root root      4.3K Apr  8  2024 sudo.conf
-rw-r--r--   1 root root      9.6K Apr  8  2024 sudo_logsrvd.conf
-r--r-----   1 root root      1.8K Jan 29  2024 sudoers
drwxr-x---   2 root root      4.0K Jan  7 00:49 sudoers.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 supercat
-rw-r--r--   1 root root      2.2K Mar 24  2024 sysctl.conf
drwxr-xr-x   2 root root      4.0K Jan  7 01:11 sysctl.d
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 sysstat
drwxr-xr-x   6 root root      4.0K Jan  7 01:11 systemd
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 terminfo
-rw-r--r--   1 root root         8 Oct 22 10:00 timezone
drwxr-xr-x   2 root root      4.0K Oct 22 10:01 tmpfiles.d
drwxr-xr-x   2 root root      4.0K Jan  7 01:12 ubuntu-advantage
-rw-r--r--   1 root root      1.3K Jan 27  2023 ucf.conf
drwxr-xr-x   4 root root      4.0K Jan  7 01:11 udev
drwxr-xr-x   2 root root      4.0K Oct 22 10:02 udisks2
drwxr-xr-x   3 root root      4.0K Oct 22 10:01 ufw
drwxr-xr-x   3 root root      4.0K Oct 22 10:02 update-manager
drwxr-xr-x   2 root root      4.0K Jan  7 01:12 update-motd.d
drwxr-xr-x   2 root root      4.0K Apr  2  2025 update-notifier
-rw-r--r--   1 root root      1.5K Apr  8  2024 usb_modeswitch.conf
drwxr-xr-x   2 root root      4.0K Dec 16  2023 usb_modeswitch.d
lrwxrwxrwx   1 root root        16 Oct 22 10:00 vconsole.conf -> default/keyboard
drwxr-xr-x   2 root root      4.0K Oct 22 10:00 vim
drwxr-xr-x   4 root root      4.0K Oct 22 10:01 vmware-tools
lrwxrwxrwx   1 root root        23 Feb 26  2024 vtrgb -> /etc/alternatives/vtrgb
-rw-r--r--   1 root root      4.9K Jun 19  2024 wgetrc
-rw-r--r--   1 root root       681 Apr  8  2024 xattr.conf
drwxr-xr-x   4 root root      4.0K Oct 22 10:00 xdg
drwxr-xr-x   2 root root      4.0K Oct 22 10:02 xml
-rw-r--r--   1 root root       460 Jan 20  2023 zsh_command_not_found
total 136K
drwxr-xr-x 26 root root 4.0K Jan 15 23:07  .
drwxr-xr-x  6 root root 4.0K Jan  7 01:11  ..
lrwxrwxrwx  1 root root   38 Oct 22 10:15  chronyd.service -> /usr/lib/systemd/system/chrony.service
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  cloud-config.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  cloud-final.service.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  cloud-init.target.wants
lrwxrwxrwx  1 root root   44 Oct 22 10:02  dbus-org.freedesktop.ModemManager1.service -> /usr/lib/systemd/system/ModemManager.service
lrwxrwxrwx  1 root root   48 Oct 22 10:00  dbus-org.freedesktop.resolve1.service -> /usr/lib/systemd/system/systemd-resolved.service
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  emergency.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  final.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:00  getty.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  graphical.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  hibernate.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  hybrid-sleep.target.wants
lrwxrwxrwx  1 root root   42 Oct 22 10:01  iscsi.service -> /usr/lib/systemd/system/open-iscsi.service
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  mdmonitor.service.wants
drwxr-xr-x  2 root root 4.0K Jan 15 23:07  multi-user.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 09:59  network-online.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  open-vm-tools.service.requires
drwxr-xr-x  2 root root 4.0K Oct 22 10:15  paths.target.wants
-rw-r--r--  1 root root  666 Jan  8 20:40  pm2-ubuntu.service
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  rescue.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  sleep.target.wants
-rw-r--r--  1 root root  359 Oct 22 10:15 'snap-amazon\x2dssm\x2dagent-11797.mount'
-rw-r--r--  1 root root  359 Jan  7 15:11 'snap-amazon\x2dssm\x2dagent-12322.mount'
-rw-r--r--  1 root root  326 Jan  8 15:07  snap-core22-2193.mount
-rw-r--r--  1 root root  326 Jan 15 23:07  snap-core22-2216.mount
-rw-r--r--  1 root root  326 Oct 22 10:15  snap-snapd-25202.mount
-rw-r--r--  1 root root  326 Jan  7 15:10  snap-snapd-25935.mount
-rw-r--r--  1 root root  589 Jan  7 15:11  snap.amazon-ssm-agent.amazon-ssm-agent.service
drwxr-xr-x  2 root root 4.0K Jan 15 23:07  snapd.mounts.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:15  sockets.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  ssh.service.requires
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  suspend-then-hibernate.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  suspend.target.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:15  sysinit.target.wants
lrwxrwxrwx  1 root root   39 Oct 22 10:00  syslog.service -> /usr/lib/systemd/system/rsyslog.service
drwxr-xr-x  2 root root 4.0K Oct 22 10:01  sysstat.service.wants
drwxr-xr-x  2 root root 4.0K Oct 22 10:02  timers.target.wants
lrwxrwxrwx  1 root root   45 Oct 22 10:01  vmtoolsd.service -> /usr/lib/systemd/system/open-vm-tools.service
root@ip-172-31-14-153:~# ls -lah /var/log
total 4.1M
drwxrwxr-x  11 root      syslog          4.0K Jan 11 00:00 .
drwxr-xr-x  13 root      root            4.0K Jan  7 00:48 ..
lrwxrwxrwx   1 root      root              39 Oct 22 10:00 README -> ../../usr/share/doc/systemd/README.logs
-rw-r--r--   1 root      root             901 Jan  7 01:12 alternatives.log
drwx------   3 root      root            4.0K Jan  7 00:49 amazon
-rw-r-----   1 root      adm                0 Jan  7 00:49 apport.log
drwxr-xr-x   2 root      root            4.0K Jan 15 06:09 apt
-rw-r-----   1 syslog    adm             591K Jan 16 15:31 auth.log
-rw-r-----   1 syslog    adm             349K Jan 10 23:59 auth.log.1
-rw-rw----   1 root      utmp            484K Jan 16 11:45 btmp
drwxr-x---   2 _chrony   _chrony         4.0K Jan  7 00:49 chrony
-rw-r-----   1 root      adm             9.6K Jan  8 15:02 cloud-init-output.log
-rw-r-----   1 syslog    adm             341K Jan  8 15:02 cloud-init.log
drwxr-xr-x   2 root      root            4.0K Jul 25 16:08 dist-upgrade
-rw-r-----   1 root      adm              45K Jan  8 15:02 dmesg
-rw-r-----   1 root      adm              43K Jan  7 15:05 dmesg.0
-rw-r-----   1 root      adm              14K Jan  7 00:49 dmesg.1.gz
-rw-r--r--   1 root      root            115K Jan 15 06:09 dpkg.log
drwxr-sr-x+  3 root      systemd-journal 4.0K Jan  7 00:48 journal
-rw-r-----   1 syslog    adm              107 Jan 15 23:07 kern.log
-rw-r-----   1 syslog    adm             178K Jan  8 15:07 kern.log.1
drwxr-xr-x   2 landscape landscape       4.0K Jan  7 01:08 landscape
-rw-rw-r--   1 root      utmp            286K Jan 16 15:31 lastlog
drwx------   2 root      root            4.0K Jan  7 00:48 private
-rw-r-----   1 syslog    adm             902K Jan 16 15:31 syslog
-rw-r-----   1 syslog    adm             928K Jan 11 00:00 syslog.1
drwxr-xr-x   2 root      root            4.0K Jan 16 00:07 sysstat
-rw-r--r--   1 root      root               0 Jan  7 01:11 ubuntu-advantage-apt-hook.log
drwxr-x---   2 root      adm             4.0K Jan  7 15:10 unattended-upgrades
-rw-rw-r--   1 root      utmp             59K Jan 16 15:31 wtmp
root@ip-172-31-14-153:~#

root@ip-172-31-14-153:~# systemctl list-units --type=service --state=running
  UNIT                                           LOAD   ACTIVE SUB     DESCRIPTION                                     >
  acpid.service                                  loaded active running ACPI event daemon
  chrony.service                                 loaded active running chrony, an NTP client/server
  cron.service                                   loaded active running Regular background program processing daemon
  dbus.service                                   loaded active running D-Bus System Message Bus
  getty@tty1.service                             loaded active running Getty on tty1
  ModemManager.service                           loaded active running Modem Manager
  multipathd.service                             loaded active running Device-Mapper Multipath Device Controller
  networkd-dispatcher.service                    loaded active running Dispatcher daemon for systemd-networkd
  pm2-ubuntu.service                             loaded active running PM2 process manager
  polkit.service                                 loaded active running Authorization Manager
  rsyslog.service                                loaded active running System Logging Service
  serial-getty@ttyS0.service                     loaded active running Serial Getty on ttyS0
  snap.amazon-ssm-agent.amazon-ssm-agent.service loaded active running Service for snap application amazon-ssm-agent.am>
  snapd.service                                  loaded active running Snap Daemon
  ssh.service                                    loaded active running OpenBSD Secure Shell server
  systemd-journald.service                       loaded active running Journal Service
  systemd-logind.service                         loaded active running User Login Management
  systemd-networkd.service                       loaded active running Network Configuration
  systemd-resolved.service                       loaded active running Network Name Resolution
  systemd-udevd.service                          loaded active running Rule-based Manager for Device Events and Files
  udisks2.service                                loaded active running Disk Manager
  unattended-upgrades.service                    loaded active running Unattended Upgrades Shutdown
  user@1000.service                              loaded active running User Manager for UID 1000

Legend: LOAD   → Reflects whether the unit definition was properly loaded.
        ACTIVE → The high-level unit activation state, i.e. generalization of SUB.
        SUB    → The low-level unit activation state, values depend on unit type.

23 loaded units listed.
lines 2-30/30 (END)

lsblk
mount
Filesystem      Size  Used Avail Use% Mounted on
/dev/root       6.8G  2.9G  3.9G  43% /
tmpfs           479M     0  479M   0% /dev/shm
tmpfs           192M  872K  191M   1% /run
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/xvda16     881M  155M  665M  19% /boot
/dev/xvda15     105M  6.2M   99M   6% /boot/efi
tmpfs            96M   12K   96M   1% /run/user/1000
NAME     MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0      7:0    0 27.6M  1 loop /snap/amazon-ssm-agent/11797
loop1      7:1    0 27.8M  1 loop /snap/amazon-ssm-agent/12322
loop3      7:3    0 50.8M  1 loop /snap/snapd/25202
loop4      7:4    0 48.1M  1 loop /snap/snapd/25935
loop5      7:5    0   74M  1 loop /snap/core22/2193
loop6      7:6    0 73.9M  1 loop /snap/core22/2216
xvda     202:0    0    8G  0 disk
├─xvda1  202:1    0    7G  0 part /
├─xvda14 202:14   0    4M  0 part
├─xvda15 202:15   0  106M  0 part /boot/efi
└─xvda16 259:0    0  913M  0 part /boot
/dev/xvda1 on / type ext4 (rw,relatime,discard,errors=remount-ro,commit=30)
devtmpfs on /dev type devtmpfs (rw,nosuid,noexec,relatime,size=478860k,nr_inodes=119715,mode=755,inode64)
proc on /proc type proc (rw,nosuid,nodev,noexec,relatime)
sysfs on /sys type sysfs (rw,nosuid,nodev,noexec,relatime)
securityfs on /sys/kernel/security type securityfs (rw,nosuid,nodev,noexec,relatime)
tmpfs on /dev/shm type tmpfs (rw,nosuid,nodev,inode64)
devpts on /dev/pts type devpts (rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000)
tmpfs on /run type tmpfs (rw,nosuid,nodev,size=196060k,nr_inodes=819200,mode=755,inode64)
tmpfs on /run/lock type tmpfs (rw,nosuid,nodev,noexec,relatime,size=5120k,inode64)
cgroup2 on /sys/fs/cgroup type cgroup2 (rw,nosuid,nodev,noexec,relatime,nsdelegate,memory_recursiveprot)
pstore on /sys/fs/pstore type pstore (rw,nosuid,nodev,noexec,relatime)
bpf on /sys/fs/bpf type bpf (rw,nosuid,nodev,noexec,relatime,mode=700)
systemd-1 on /proc/sys/fs/binfmt_misc type autofs (rw,relatime,fd=32,pgrp=1,timeout=0,minproto=5,maxproto=5,direct,pipe_ino=1818)
hugetlbfs on /dev/hugepages type hugetlbfs (rw,nosuid,nodev,relatime,pagesize=2M)
mqueue on /dev/mqueue type mqueue (rw,nosuid,nodev,noexec,relatime)
debugfs on /sys/kernel/debug type debugfs (rw,nosuid,nodev,noexec,relatime)
tracefs on /sys/kernel/tracing type tracefs (rw,nosuid,nodev,noexec,relatime)
fusectl on /sys/fs/fuse/connections type fusectl (rw,nosuid,nodev,noexec,relatime)
configfs on /sys/kernel/config type configfs (rw,nosuid,nodev,noexec,relatime)
/var/lib/snapd/snaps/amazon-ssm-agent_11797.snap on /snap/amazon-ssm-agent/11797 type squashfs (ro,nodev,relatime,errors=continue,threads=single,x-gdu.hide,x-gvfs-hide)
/var/lib/snapd/snaps/amazon-ssm-agent_12322.snap on /snap/amazon-ssm-agent/12322 type squashfs (ro,nodev,relatime,errors=continue,threads=single,x-gdu.hide,x-gvfs-hide)
/var/lib/snapd/snaps/snapd_25202.snap on /snap/snapd/25202 type squashfs (ro,nodev,relatime,errors=continue,threads=single,x-gdu.hide,x-gvfs-hide)
/var/lib/snapd/snaps/snapd_25935.snap on /snap/snapd/25935 type squashfs (ro,nodev,relatime,errors=continue,threads=single,x-gdu.hide,x-gvfs-hide)
/dev/xvda16 on /boot type ext4 (rw,relatime)
/dev/xvda15 on /boot/efi type vfat (rw,relatime,fmask=0077,dmask=0077,codepage=437,iocharset=iso8859-1,shortname=mixed,errors=remount-ro)
binfmt_misc on /proc/sys/fs/binfmt_misc type binfmt_misc (rw,nosuid,nodev,noexec,relatime)
/var/lib/snapd/snaps/core22_2193.snap on /snap/core22/2193 type squashfs (ro,nodev,relatime,errors=continue,threads=single,x-gdu.hide,x-gvfs-hide)
/var/lib/snapd/snaps/core22_2216.snap on /snap/core22/2216 type squashfs (ro,nodev,relatime,errors=continue,threads=single,x-gdu.hide,x-gvfs-hide)
tmpfs on /run/user/1000 type tmpfs (rw,nosuid,nodev,relatime,size=98028k,nr_inodes=24507,mode=700,uid=1000,gid=1000,inode64)
tracefs on /sys/kernel/debug/tracing type tracefs (rw,nosuid,nodev,noexec,relatime)
root@ip-172-31-14-153:~#

te voy a pegar solo el contenido de kittypau en EC2
/home/ubuntu/kittypau
/home/ubuntu/kittypau/.env
/home/ubuntu/kittypau/certs
/home/ubuntu/kittypau/certs/cert.pem
/home/ubuntu/kittypau/certs/private.key
/home/ubuntu/kittypau/certs/AmazonRootCA1.pem
/home/ubuntu/kittypau/package-lock.json
/home/ubuntu/kittypau/schema.js.bak
/home/ubuntu/kittypau/index.js.bak
/home/ubuntu/kittypau/db.js
/home/ubuntu/kittypau/index.js
/home/ubuntu/kittypau/package.json
/home/ubuntu/kittypau/schema.js
/home/ubuntu/kittypau/node_modules (esta carpeta tiene muchas cosas asi qeu solo lo deje asi)
/home/ubuntu/.ssh
/home/ubuntu/.ssh/authorized_keys
/home/ubuntu/.pm2
/home/ubuntu/.pm2/logs
/home/ubuntu/.pm2/logs/kittypau-iot-error.log
/home/ubuntu/.pm2/logs/kittypau-iot-out.log
/home/ubuntu/.pm2/dump.pm2.bak
/home/ubuntu/.pm2/pids
/home/ubuntu/.pm2/pids/kittypau-iot-0.pid
/home/ubuntu/.pm2/pub.sock
/home/ubuntu/.pm2/pm2.log
/home/ubuntu/.pm2/pm2.pid
/home/ubuntu/.pm2/modules
/home/ubuntu/.pm2/rpc.sock
/home/ubuntu/.pm2/touch
/home/ubuntu/.pm2/module_conf.json
/home/ubuntu/.pm2/dump.pm2
/home/ubuntu/.sudo_as_admin_successful
/home/ubuntu/kittypau-bridge
/home/ubuntu/kittypau-bridge/.env
/home/ubuntu/kittypau-bridge/package-lock.json
/home/ubuntu/kittypau-bridge/package.json
/home/ubuntu/kittypau-bridge/node_modules (esta carpeta tiene muchas cosas asi qeu solo lo deje asi)
/home/ubuntu/.local
/home/ubuntu/.local/share
/home/ubuntu/.local/share/nano
/home/ubuntu/.cache
/home/ubuntu/.cache/motd.legal-displayed
/home/ubuntu/.bash_logout
/home/ubuntu/.profile