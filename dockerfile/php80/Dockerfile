FROM php:8.0-apache

RUN apt-get update \
  && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libzip-dev zip \
  && docker-php-ext-configure gd \
      --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd pdo_mysql mysqli mbstring zip && \
  a2enmod rewrite
