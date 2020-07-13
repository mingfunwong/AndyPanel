FROM php:5.6-apache

ADD ./php.ini /usr/local/etc/php/php.ini

RUN apt-get update && apt-get install -y \
        libpng-dev \
  && docker-php-ext-install gd pdo_mysql mysqli mbstring && \
  a2enmod rewrite
