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

##Gulp start

1. Установить [Node.js](https://nodejs.org/en/).
2. В директорию проекта в терминале вести: npm install (установка необходимых пакетов для работы сборщика Gulp. Все необходимые плагины прописаны в файле package.json).
3. В директории проекта в терминале вести: gulp.
4. Эта комплексная задача включает в себя: запуск сервера browser-sync, преобразование less файлов в css и сборка общего файла стилей admin.css. Включение отслеживания изменения файлов .css, .js, .php, .less( при изменениях в этих файлах запускаются необходимые задачи и перегрузка сервера browser-sync).Для остановки сервера нужно вести CTRL + C.
5. При необходимости можно вызывать отдельно нужные задачи ( но без перегрузки сервера).
6. vet - анализ кода .js файлов,
   styles - преобразование .less в .css и сборка общего admin.css файла стилей.
   browser-sync - запуск сервера browser-sync.
   watch - запуск отслеживания css, .js, .php, .less файлов.
7. Все необходимые пути к файлам прописаны в файле gulp.config.js. 