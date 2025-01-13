'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Days',
      [
        {
          planId: 1,
          points: 100,
          title: 'BUZZZZER',
          rounds: 3,
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          description:
            '3 Выхода на кольца; 6 Взятий на грудь + толчок 60 кг; 9 Подтягиваний; 12 Берпи; 15 Приседаний 60 кг; 18 Отжиманий; 21 Махи гири 24кг; 24 V-up',
        },
        {
          planId: 1,
          points: 120,
          title: 'FAT BURNER',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 10,
          description:
            '10-9-8-7-6-5-4-3-2-1; Выбросы одной гири двумя руками, 32/24 кг; Махи гирей двумя руками, 32/24 кг; Тяга гири с пола к подбородку, 32/24 кг; Тяга гири в наклоне, 32/24 кг; Становая тяга с гирей, 32/24 кг;',
        },
        {
          planId: 1,
          points: 130,
          title: 'LUCKY SEVEN',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 7,
          description:
            '7 отжиманий в стойке на руках; 7 толчков штанги, 60 кг; 7 ног к перекладине; 7 становых тяг, 110 кг; 7 берпи; 7 махов гирей, 24 кг; 7 подтягиваний на турнике;',
        },
        {
          planId: 1,
          points: 150,
          title: 'Cross 16.3',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description:
            '50 двойных прыжков на скакалке; 10 прыжков на тумбу; 40 двойных прыжков на скакалке; 20 прыжков на тумбу; 30 двойных прыжков на скакалке; 40 прыжков на тумбу; 10 двойных прыжков на скакалке; 50 прыжков на тумбу; ',
        },
        {
          planId: 1,
          points: 200,
          title: 'FuncBodyTrain',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 3,
          description:
            '21-15-9; Подтягивания на турнике; Отжимания от пола; Подъем ног в висе к перекладине; Гоблет приседания;',
        },
        {
          planId: 1,
          points: 210,
          title: 'FuncBodyTrain',
          type: 'AMRAP',
          target:
            'Задача: Завершить как можно больше раундов за 20 минут (AMRAP 20 min)',
          rounds: 1,
          description:
            '8 подъемов ног носками к турнику; 10 взятий с виса и толчков гантели 22,5 / 15 кг; 14/12 калорий гребли;',
        },
        {
          planId: 1,
          points: 280,
          title: 'HEART PUMP',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 10,
          description:
            '50 одинарных скакалок; 10 подтягиваний (киппинг); 50 одинарных скакалок; 10 V-ups; 50 одинарных скакалок; 10 отжиманий на брусьях; 50 одинарных скакалок; 10 отжиманий стандартных;',
        },
        {
          planId: 1,
          points: 170,
          title: 'IRON MIKE TYSON',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 10,
          description:
            '100 повторений на пресс; 40 поднятий ног; 60 скручиваний на пресс; ',
        },
        {
          planId: 1,
          points: 250,
          title: 'GAEL',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 10,
          description:
            '5 подтягиваний на турнике; 10 отжиманий от пола; 15 сит-ап; 20 воздушных приседаний;',
        },
        {
          planId: 1,
          points: 210,
          title: 'GAEL',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description:
            '50 фронатльных приседаний (60/43 кг); 40 подтягиваний на турнике; 30 толчков штанги (60/43 кг); 50 фронатльных приседаний со штангой на груди (38/30 кг); 40 подтягиваний на турнике; 30 толчков штанги (38/30 кг); 50 приседания со штангой над головой (30/20 кг):; 40 Подтягиваний на турнике; 30 толчков штанги (30/20 кг)',
        },
        {
          planId: 1,
          points: 300,
          title: 'D Z O',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description:
            '75 приседаний; 50 отжиманий от пола; 20 отжиманий на кольцах; 50 приседаний; 35 подтягиваний на турнике; 15 отжиманий на кольцах; 25 приседаний; 20 подтягиваний на турнике; 10 отжиманий на кольцах',
        },
        {
          planId: 1,
          points: 310,
          title: 'Franco',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description:
            '10 выбросов гири 2шт по 24кг; 10 силовых взятий штанги на грудь (60 кг); 10 жимовых швунгов (60 кг); 10 становых тяг (60 кг); 10 махов гирей двумя руками (24 кг); 10 выпадов с гантелями (10 кг); 10 бёрпи; 10 ситапов; 10 двойных прыжков со скакалкой; 10 выбросов штанги (60 кг)',
        },

        {
          planId: 2,
          points: 150,
          description: '5',
        },
        {
          planId: 3,
          points: 100,
          description: '5',
        },
        {
          planId: 4,
          points: 150,
          description: 'biba biba ibbba',
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'DayExercises',
      [
        // Day 1 exercises
        {
          dayId: 1,
          exerciseId: 34,
        },
        {
          dayId: 1,
          exerciseId: 36,
        },
        {
          dayId: 1,
          exerciseId: 35,
        },
        {
          dayId: 1,
          exerciseId: 10,
        },
        {
          dayId: 1,
          exerciseId: 1,
        },
        {
          dayId: 1,
          exerciseId: 37,
        },
        {
          dayId: 1,
          exerciseId: 6,
        },
        {
          dayId: 1,
          exerciseId: 38,
        },
        {
          dayId: 1,
          exerciseId: 39,
        },
        // Day 2 exercises
        {
          dayId: 2,
          exerciseId: 40,
        },
        {
          dayId: 2,
          exerciseId: 38,
        },
        {
          dayId: 2,
          exerciseId: 41,
        },
        {
          dayId: 2,
          exerciseId: 42,
        },
        {
          dayId: 2,
          exerciseId: 43,
        },
        // Day 3 exercises
        {
          dayId: 3,
          exerciseId: 45,
        },
        {
          dayId: 3,
          exerciseId: 35,
        },
        {
          dayId: 3,
          exerciseId: 30,
        },
        {
          dayId: 3,
          exerciseId: 47,
        },
        {
          dayId: 3,
          exerciseId: 1,
        },
        {
          dayId: 3,
          exerciseId: 38,
        },
        {
          dayId: 3,
          exerciseId: 10,
        },
        // Day 4 exercises
        {
          dayId: 4,
          exerciseId: 48,
        },
        {
          dayId: 4,
          exerciseId: 11,
        },
        {
          dayId: 4,
          exerciseId: 48,
        },
        {
          dayId: 4,
          exerciseId: 11,
        },
        {
          dayId: 4,
          exerciseId: 48,
        },
        {
          dayId: 4,
          exerciseId: 11,
        },
        {
          dayId: 4,
          exerciseId: 48,
        },
        {
          dayId: 4,
          exerciseId: 11,
        },
        // Day 5 exercises
        {
          dayId: 5,
          exerciseId: 10,
        },
        {
          dayId: 5,
          exerciseId: 6,
        },
        {
          dayId: 5,
          exerciseId: 30,
        },
        {
          dayId: 5,
          exerciseId: 46,
        },
        // Days for plan 6
        {
          dayId: 6,
          exerciseId: 30,
        },
        {
          dayId: 6,
          exerciseId: 32,
        },
        {
          dayId: 6,
          exerciseId: 49,
        },
        // Days for plan 7
        {
          dayId: 7,
          exerciseId: 48,
        },
        {
          dayId: 7,
          exerciseId: 10,
        },
        {
          dayId: 7,
          exerciseId: 48,
        },
        {
          dayId: 7,
          exerciseId: 39,
        },
        // Days for plan 8
        {
          dayId: 8,
          exerciseId: 11,
        },
        {
          dayId: 8,
          exerciseId: 12,
        },
        {
          dayId: 8,
          exerciseId: 13,
        },
        // Days for plan 9
        {
          dayId: 9,
          exerciseId: 22,
        },
        {
          dayId: 9,
          exerciseId: 23,
        },
        {
          dayId: 9,
          exerciseId: 32,
        },
        // Days for plan 10
        {
          dayId: 10,
          exerciseId: 24,
        },
        {
          dayId: 10,
          exerciseId: 12,
        },
        {
          dayId: 10,
          exerciseId: 1,
        },
        // Days for plan 11
        {
          dayId: 11,
          exerciseId: 3,
        },
        {
          dayId: 11,
          exerciseId: 2,
        },
        {
          dayId: 11,
          exerciseId: 14,
        },
        // Days for plan 12
        {
          dayId: 12,
          exerciseId: 4,
        },
        {
          dayId: 12,
          exerciseId: 5,
        },
        {
          dayId: 12,
          exerciseId: 6,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DayExercises', null, {});
    await queryInterface.bulkDelete('Days', null, {});
  },
};
