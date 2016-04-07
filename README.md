# mafia-portal
Portal for Kirovohrad mafia club

##Mafia Install

1. Установить [MongoDB](https://www.mongodb.org/).
2. Установить и настроить [расширение](http://docs.php.net/manual/ru/mongodb.setup.php) для PHP.
3. Установить [composer](https://getcomposer.org/).
4. Клонировать проект. Директории 'storage' и 'bootstrap/cache' должны быть доступны для записи вашим веб сервером.
5. Перейти в директорию с проектом, выполнить [composer install](https://getcomposer.org/doc/01-basic-usage.md#stability).
6. Копировать и переименовать файл '.env.example' в '.env'. Прописать свои настройки для mongoDB.
7. Сформировать 'key' для проекта командой 'php artisan key:generate'.
8. Запустить миграции для DB командой 'php artisan migrate'.
9. В Браузере перейти по ссылке 'http://url_to_project/public'. Если все прошло успешно появится надпись 'Landing'.

10. Логин по ссылке '/muffin/login'. 
11. Данные для входа Админом - 'phone' => '11111', 'password' => 'admin'.


[Laravel Basic Configuration](https://laravel.com/docs/5.1/installation#basic-configuration)
