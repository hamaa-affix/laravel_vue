FROM php:7.3-fpm

# COPY . /var/www/ninaite
WORKDIR /var/www/
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

# install packages
RUN apt-get update && apt-get install -y \
        git \
        unzip \
        vim \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        libzip-dev \
        libicu-dev \
        supervisor \
        procps \
        nginx &&\
        apt-get clean -y && \
        rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

RUN  docker-php-ext-install zip \
        #DGライブラリーをインストール
        &&  docker-php-ext-configure gd --with-png-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
        && docker-php-ext-install -j$(nproc) gd \
        #mysqlのpodドライバーのインストール
        && docker-php-ext-install zip pdo_mysql intl


# nginx
COPY ./docker/dev/app/nginx/dev.laravel.work.conf /etc/nginx/conf.d/dev.laravel.conf
COPY ./docker/dev/app/nginx/nginx.conf /etc/nginx/nginx.conf

# PHP
#www.conf意外が設定ファイルとして読み込んで欲しくない為、RUNでrmその他のfile群を削除している。
RUN rm -f /usr/local/etc/php-fpm.conf.default
RUN rm -f /usr/local/etc/php-fpm.d/zz-docker.conf
COPY ./docker/dev/app/php/php-fpm.conf /usr/local/etc/php-fpm.conf
COPY ./docker/dev/app/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker/dev/app/php/www.conf /usr/local/etc/php-fpm.d/www.conf

# nodejs install
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

#composer install
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin
RUN mv /usr/bin/composer.phar /usr/bin/composer

RUN npm install npm@latest -g

# setting superviser
COPY ./docker/dev/app/supervisor/supervisord.conf /etc/supervisord.conf
COPY ./docker/dev/app/supervisor/app.conf /etc/supervisor/conf.d/app.conf
RUN echo files = /etc/supervisor/conf.d/*.conf >> /etc/supervisord.conf


# Port to expose *outside* the container
EXPOSE 80
# Service to run
CMD ["/usr/bin/supervisord"]
