# PHP + Apache
FROM php:8.0-apache

# Update OS and install common dev tools
RUN apt-get update
RUN apt-get install nano

# Install PHP extensions needed
RUN docker-php-ext-install -j$(nproc) mysqli pdo_mysql

# Set working directory to web files
WORKDIR /var/www/html