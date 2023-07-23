ARG PHP_VERSION="8.1"

FROM ghcr.io/roadrunner-server/roadrunner AS roadrunner

FROM php:${PHP_VERSION}-fpm-alpine

ENV COMPOSER_ALLOW_SUPERUSER=1

RUN apk update  && \
    apk add \
        libpng-dev \
        libxml2-dev \
        libmcrypt-dev \
        --no-cache make protobuf-dev

RUN docker-php-ext-install sockets && \
    docker-php-ext-enable sockets


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY --from=roadrunner /usr/bin/rr /usr/local/bin/rr

WORKDIR /app

COPY . /app

RUN composer update

EXPOSE 8000

CMD ["rr", "serve"]