FROM php:7.4-apache

RUN apt-get update \
  && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libonig-dev \
  && docker-php-ext-configure gd \
      --with-freetype --with-jpeg \
  && docker-php-ext-install -j$(nproc) gd pdo_mysql mysqli mbstring && \
  a2enmod rewrite
