# Usar una imagen base de PHP con soporte para Laravel
FROM php:8.3-fpm

# Instalar dependencias del sistema y Node.js
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libpq-dev \
    zip \
    git \
    unzip \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Instalar extensiones de PHP necesarias para Laravel y PostgreSQL
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Definir el directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos del proyecto a la imagen
COPY . .

# Instalar las dependencias de Composer
RUN composer install --no-dev --optimize-autoloader

# Instalar dependencias de Node.js y construir el front-end
RUN npm install && npm run build

# Configurar permisos para los directorios de almacenamiento y caché
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto en el que Laravel corre por defecto (por ejemplo, 8000)
EXPOSE 8000

# Definir el comando para ejecutar migraciones y levantar el servidor
CMD ["sh", "-c", "php artisan migrate --force && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"]

