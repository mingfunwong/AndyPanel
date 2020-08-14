FROM php:5.6-apache

RUN apt-get update \
  && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev \
  && docker-php-ext-configure gd \ 
    --with-freetype-dir=/usr/include/ \ 
    --with-jpeg-dir=/usr/include/ \
  && docker-php-ext-install -j$(nproc) gd pdo_mysql mysql mysqli mbstring && \
  a2enmod rewrite
