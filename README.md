# FSiTE index page
## Индексная страница моего сайта

Сайт(портфолио/песочница) находится по адресу https://mkon.pythonanywhere.com/

Дизайн страницы создавался под влиянием material design'а - адаптивность, тени, прозрачность, шрифт, анимация переходов.

Взглянув на названия папок, можно прийти к выводу, что стили писались в sass, а бэк сайта выполнен на flask.

Так оно и есть.

Flask отдает шаблоны для по адресам, это описано во flask_app.py.
Однако, данная страница(индекс) записи по названиям приложений и ссылкам к ним получает запросом от Vue-компонента к /api/projects, что тоже смотрим во flask_app.py, расчет данных происходит в fsite_index.py.
