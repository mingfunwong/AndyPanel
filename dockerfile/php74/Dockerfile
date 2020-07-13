FROM php:7.4-apache

ADD ./php.ini /usr/local/etc/php/php.ini

RUN apt-get update && apt-get install -y \
  libpng-dev \
  libonig-dev \
  && docker-php-ext-install gd pdo_mysql mysqli && \
  a2enmod rewrite