'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'John Doe',
          email: 'scott@ya.ru',
          password: await bcrypt.hash('11111111', 10),
          avatar:
            '/uploads/avatars/1736862219291-340476787.jpg',
          gender: 'male',
          age: 22,
          height: '178',
          weight: '90',
          points: 10,
          calories: 0,
          goal: 'Стать сильнее',
          isAdmin: true,
        },
        {
          username: 'JohnDoe',
          email: 'john@example.com',
          avatar: 'https://example.com/avatar1.jpg',
          password: await bcrypt.hash('11111111', 10),

          gender: 'male',
          age: 25,
          height: '175',
          weight: '70',
          points: 100,
          calories: 2000,
          goal: 'Хочу стать самым сильным защитником своей жены',
        },
        {
          username: 'SarahSmith',
          email: 'sarah@example.com',
          avatar: 'https://example.com/avatar2.jpg',
          password: await bcrypt.hash('11111111', 10),

          gender: 'female',
          age: 30,
          height: '165cm',
          weight: '58kg',
          points: 150,
          calories: 1800,
          goal: 'нет цели, как и смысла, жизнь вообще вещь бессмысленная, а цели это лишь самообман, просто хочу убить своё время',
        },
        {
          username: 'MikeJohnson',
          email: 'mike@example.com',
          avatar: 'https://example.com/avatar3.jpg',
          password: await bcrypt.hash('11111111', 10),

          gender: 'male',
          age: 35,
          height: '182cm',
          weight: '85kg',
          points: 75,
          calories: 2500,
          goal: 'Хочу быть более выносливым',
        },
        {
          username: 'EmilyDavis',
          email: 'emily@example.com',
          avatar: 'https://example.com/avatar4.jpg',
          password: await bcrypt.hash('11111111', 10),

          gender: 'female',
          age: 28,
          height: '170cm',
          weight: '63kg',
          points: 200,
          calories: 1900,
          goal: 'Развитие растяжки',
        },
        {
          username: 'AlexWilson',
          email: 'alex@example.com',
          avatar: 'https://example.com/avatar5.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 42,
          height: '178cm',
          weight: '78kg',
          points: 180,
          calories: 2200,
          goal: 'Набор мышечной массы',
        },
        {
          username: 'LisaBrown',
          email: 'lisa@example.com',
          avatar: 'https://example.com/avatar6.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 32,
          height: '168cm',
          weight: '61kg',
          points: 120,
          calories: 1750,
          goal: 'Лол кек чебурек а я качок',
        },
        {
          username: 'DavidLee',
          email: 'david@example.com',
          avatar: 'https://example.com/avatar7.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 29,
          height: '173cm',
          weight: '72kg',
          points: 90,
          calories: 2300,
          goal: 'Хочу похудеть',
        },
        {
          username: 'AmyTaylor',
          email: 'amy@example.com',
          avatar: 'https://example.com/avatar8.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 27,
          height: '163cm',
          weight: '55kg',
          points: 160,
          calories: 1600,
          goal: 'Набор мышц',
        },
        {
          username: 'RobertClark',
          email: 'robert@example.com',
          avatar: 'https://example.com/avatar9.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 38,
          height: '180cm',
          weight: '82kg',
          points: 140,
          calories: 2400,
          goal: 'Стабильность',
        },
        {
          username: 'JennaWhite',
          email: 'jenna@example.com',
          avatar: 'https://example.com/avatar10.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 31,
          height: '167cm',
          weight: '59kg',
          points: 170,
          calories: 1850,
          goal: 'Я хочу убавить свой жирок',
        },
        {
          username: 'TomWilson',
          email: 'tom@example.com',
          avatar: 'https://example.com/avatar11.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 28,
          height: '175cm',
          weight: '75kg',
          points: 130,
          calories: 2100,
          goal: 'Улучшить выносливость',
        },
        {
          username: 'EmmaThompson',
          email: 'emma@example.com',
          avatar: 'https://example.com/avatar12.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 24,
          height: '165cm',
          weight: '57kg',
          points: 90,
          calories: 1700,
          goal: 'Подготовка к марафону',
        },
        {
          username: 'MaxPower',
          email: 'max@example.com',
          avatar: 'https://example.com/avatar13.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 32,
          height: '188cm',
          weight: '95kg',
          points: 220,
          calories: 2800,
          goal: 'Силовые тренировки',
        },
        {
          username: 'SophiaLee',
          email: 'sophia@example.com',
          avatar: 'https://example.com/avatar14.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 29,
          height: '172cm',
          weight: '65kg',
          points: 180,
          calories: 2000,
          goal: 'Йога и гибкость',
        },
        {
          username: 'DanielKim',
          email: 'daniel@example.com',
          avatar: 'https://example.com/avatar15.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 27,
          height: '170cm',
          weight: '68kg',
          points: 150,
          calories: 2200,
          goal: 'Боевые искусства',
        },
        {
          username: 'OliviaMartinez',
          email: 'olivia@example.com',
          avatar: 'https://example.com/avatar16.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 31,
          height: '168cm',
          weight: '61kg',
          points: 170,
          calories: 1850,
          goal: 'Танцы и фитнес',
        },
        {
          username: 'JamesAnderson',
          email: 'james@example.com',
          avatar: 'https://example.com/avatar17.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 45,
          height: '183cm',
          weight: '88kg',
          points: 140,
          calories: 2400,
          goal: 'Здоровый образ жизни',
        },
        {
          username: 'LucyWang',
          email: 'lucy@example.com',
          avatar: 'https://example.com/avatar18.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 26,
          height: '163cm',
          weight: '54kg',
          points: 110,
          calories: 1600,
          goal: 'Пилатес',
        },
        {
          username: 'RyanCooper',
          email: 'ryan@example.com',
          avatar: 'https://example.com/avatar19.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 33,
          height: '178cm',
          weight: '76kg',
          points: 190,
          calories: 2300,
          goal: 'Кроссфит',
        },
        {
          username: 'IsabellaRoss',
          email: 'isabella@example.com',
          avatar: 'https://example.com/avatar20.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 28,
          height: '169cm',
          weight: '62kg',
          points: 160,
          calories: 1900,
          goal: 'Функциональный тренинг',
        },
        {
          username: 'AdrianPatel',
          email: 'adrian@example.com',
          avatar: 'https://example.com/avatar21.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 29,
          height: '176cm',
          weight: '73kg',
          points: 200,
          calories: 2250,
          goal: 'Бодибилдинг',
        },
        {
          username: 'NatalieGreen',
          email: 'natalie@example.com',
          avatar: 'https://example.com/avatar22.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 34,
          height: '171cm',
          weight: '64kg',
          points: 140,
          calories: 1950,
          goal: 'Здоровое питание',
        },
        {
          username: 'MarcusYoung',
          email: 'marcus@example.com',
          avatar: 'https://example.com/avatar23.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 31,
          height: '185cm',
          weight: '87kg',
          points: 230,
          calories: 2600,
          goal: 'Пауэрлифтинг',
        },
        {
          username: 'ZoeBlack',
          email: 'zoe@example.com',
          avatar: 'https://example.com/avatar24.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'female',
          age: 27,
          height: '166cm',
          weight: '58kg',
          points: 120,
          calories: 1750,
          goal: 'Аэробика',
        },
        {
          username: 'LiamTurner',
          email: 'liam@example.com',
          avatar: 'https://example.com/avatar25.jpg',
          password: await bcrypt.hash('11111111', 10),
          gender: 'male',
          age: 36,
          height: '180cm',
          weight: '82kg',
          points: 170,
          calories: 2450,
          goal: 'Триатлон',
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
