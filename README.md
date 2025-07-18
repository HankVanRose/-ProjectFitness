<img width="1915" height="950" alt="image" src="https://github.com/user-attachments/assets/8e8b347a-55b2-44dd-b6e7-56152a635de4" />


<strong>Проект BE FIT</strong>, направлен на вовлечение людей в занятия спортом.
Позволяет выбрать готовую программу тренировок, либо создать свою.
Пользователь может планировать тренировки в календаре, также отмечать в нем их выполнение.
За прошедшие тренировки, пользователю начисляются баллы. В профиле учитывается и количество сожженных калорий, что удобно для тех, у кого основная цель - потеря веса.
В любой момент, пользователь может выгрузить резальтаты своих тренировок в файл (.xls) в профиле.

Проект разбит на 2 части.
client & server.

<strong>Server</strong> - написан на <strong>NodeJS</strong> с использованием ExpressJS. В качестве базы данных используется <strong>Postgres + Sequelize ORM</strong>. 
Регистрация и авторизация пользователя на <strong>JWT</strong> токенах. Пароли в базе данных хэшируются, что делает его безопасным.
После регистрации пользователь может изменить свои данные, загрузить свой аватар. Для этого используется <strong>Multer</strong>.
При регистрации пользователю направляется welcome message на почту благодоря <strong>nodemailer</strong>.
<br/>

<strong>Client</strong> -  написан на <strong>TypeScript, React + Redux Toolkit</strong>. Для выполнения асинхронных запросов к бд используется <strong>Axios</strong>.
В качестве сборщика выбран <strong>Vite</strong>. Chakra UI использована в качестве UI KIT. 
Для маршрутизации используется React-Router, с целью обеспечения большей безопасности используются ProtectedRoute.
Реализована возможность выбора и переключения темы с светлой на темную.
С целью оптимизации, используется lazy loading / suspense
 
   <strong> Для запуска проекта требуется:</strong>
  
<ul>
  <li>Выполнить его fork</li> 
  <li>Скопировать себе любым удобным способом (HTTPS, SSH ...), открыть в IDE</li> 
  <li>Открыть 2 терминала в IDE</li>
  <li>В первом терминале войти в client => Затем выполнить установку зависимостей в client => npm i => npm run dev </li>
  <li>Во втором терминале войти в server => Затем выполнить установку зависимостей в server => npm i => npm run dev  </li>
</ul>
 
 

