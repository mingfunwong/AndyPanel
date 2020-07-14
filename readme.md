# AndyPanel
Virtual host management panel for Docker Container Platform.
![AndyPanel](./panel/image.png)

## Includes
PHP 5.6 ,
PHP 7.4 ,
MySQL 8 ,
Adminer ,
Caddy ,
Pure-FTPd .

## Install

```bash
git clone https://github.com/mingfunwong/AndyPanel.git
cd ./AndyPanel
vi ./docker-compose.yml # set MYSQL_ROOT_PASSWORD
cp ./panel/server/.env.example ./panel/server/.env
vi ./panel/server/.env # set LOGIN_USERNAME LOGIN_PASSWORD MYSQL_PASSWORD JWT_SECRET
docker-compose up -d
```

### Guide
Open `http://localhost:8888/` access Control panel.  
Open `http://localhost:8080/` access MySQL Adminer panel.  

## Author
[Mingfun Wong](https://github.com/mingfunwong)

## License
MIT License