# AndyPanel
PHP development environment for Docker Container Platform.

## Includes
PHP 5.6 ,
PHP 7.3 ,
MySQL 8 ,
Adminer ,
Caddy ,
Pure-FTPd .

## Install

```
git clone https://github.com/mingfunwong/AndyPanel.git
cd AndyPanel
docker-compose up -d
```

## Use

### 1. For add Virtual Host 
Edit file ``Caddyfile`` , add file ``vhost/*.conf`` and exec ``docker-compose restart php56 php73 caddy``.

### 2. For add FTP user
Linux
```
(echo EXAMPLE-PASSWORD; echo EXAMPLE-PASSWORD) | docker exec -i andypanel_ftpd_1 /usr/bin/pure-pw useradd EXAMPLE-USERNAME -f /etc/pure-ftpd/passwd/pureftpd.passwd -m -d /www/EXAMPLE-DIRECTORY-NAME -u www-data -g www-data
```
Windows
```
docker exec -i andypanel_ftpd_1 /usr/bin/pure-pw useradd EXAMPLE-USERNAME -f /etc/pure-ftpd/passwd/pureftpd.passwd -m -d /www/EXAMPLE-DIRECTORY-NAME -u www-data -g www-data
```
replace ``EXAMPLE-USERNAME``, ``EXAMPLE-PASSWORD``, ``EXAMPLE-DIRECTORY-NAME`` to your needs.

### 3. Access Service
For PHP 5.6 PHP-INFO http://php56.lvh.me/phpinfo.php

For PHP 7.3 PHP-INFO http://php73.lvh.me/phpinfo.php

For Adminer http://localhost:8080 Server: mysql Username: root Password: root

## Author
[Mingfun Wong](https://github.com/mingfunwong)

## License
MIT License