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
          points: 250,
          title: 'Nuke',
          type: 'No Time',
          target: 'грудь + трицепс + дельты',
          rounds: 1,
          description:
            '12-10-8-6; Жим штанги лежа вес: 75% от максимума; Жим штанги лежа узким хватом вес: 75% от максимума; Жим Арнольда вес: 75% от максимума; Тяга штанги к подбородку широким хватом вес: 75% от максимума',
        },
        {
          planId: 2,
          points: 350,
          title: 'BINGO',
          type: 'No Time',
          target: 'спина + грудь + дельты',
          rounds: 1,
          description:
            '12-10-8-6; Становая тяга классикой; 75% от максимума; Подтягивания; Тяга штанги вес: 75% от максимума; фронтальный присед вес: 75% от максимума; гребля 20 каллорий;',
        },
        {
          planId: 2,
          points: 350,
          title: 'ANDERSON',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 5,
          description:
            'бег 200 метров ; 10 отжиманий от пола ; 10 воздушных приседаний; 5 бёрпи ;',
        },
        {
          planId: 2,
          points: 250,
          title: 'Gretta',
          type: 'AMRAP',
          target: 'Задача: Закончить как можно больше раундов за 20 минут',
          rounds: 1,
          description:
            '10 жимовые швунги со штангой 52/35кг; 10 махи гирей 24/16кг; 10 прыжки на тумбу 60/50см; 5 бёрпи ;',
        },
        {
          planId: 2,
          points: 170,
          title: 'NIOH',
          type: 'AMRAP',
          target: 'Задача: Закончить как можно больше раундов за 25 минут',
          rounds: 1,
          description:
            '15 становая тяга 70/40кг; 20 выпады с блином на голове 9/6кг; 25 двойные прыжки на скакалке; 400 метров бег;',
        },
        {
          planId: 2,
          points: 170,
          title: 'TSUSIMA',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 6,
          description:
            '30 воздушных приседаний; 19 взятий штанги на грудь 60/40кг; 7 строгих подтягиваний на турнике; 400 метров бег;',
        },
        {
          planId: 2,
          points: 170,
          title: 'SHIBURA',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 6,
          description:
            '50 выпады с блином над головой 20/10кг; 40 подтягивания на турнике; 30 кластеры со штангой 43/30кг; 20 бурпи; 10 взятий штанги на грудь в сед 60/43кг;',
        },
        {
          planId: 2,
          points: 170,
          title: 'Катастрофа',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 6,
          description:
            '6 кластеры с гантелями 25/15кг; 40 подтягивания на турнике; 6 становая тяга 120/80кг; 10 бурпи;',
        },
        {
          planId: 3,
          points: 100,
          title: 'BIG',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 3,
          description:
            'Гребля на тренажере 1000 метров; 50 берпи; 50 прыжков на ящик, 60 см; Бег 800 метров;',
        },
        {
          planId: 3,
          points: 150,
          title: 'DADDY',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description:
            'Бег 2800 м; Отдых 30 секунд; Бег 800 м с ускорением на последних 100 м; Отдых 15 секунд; Бег 800 м с ускорением на последних 100 м; Отдых 15 секунд; Бег 800 м с ускорением на последних 100 м; Отдых 15 секунд; Бег 800 м с ускорением на последних 100 м; Отдых 15 секунд; Бег 800 м с ускорением на последних 100 м;',
        },
        {
          planId: 3,
          points: 250,
          title: 'FRANCHESKA',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 10,
          description:
            'Двойные прыжки со скакалкой - 300; Упражнение с санями - 25метров; ',
        },
        {
          planId: 3,
          points: 300,
          title: 'REDHOOD',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description:
            '3000 м гребля на тренажере; 300 двойных прыжков через скакалку; 3 мили бега (4,8 км)',
        },
        {
          planId: 3,
          points: 350,
          title: 'REDHOOD',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description: 'Бег 10 км',
        },
        {
          planId: 3,
          points: 500,
          title: 'PUSHMASTER',
          type: 'ASAP',
          target: 'Задача: Закончить задание за минимальное время',
          rounds: 1,
          description: '300 отжиманий от пола',
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
          exerciseId: 4,
        },
        {
          dayId: 8,
          exerciseId: 30,
        },
        {
          dayId: 8,
          exerciseId: 2,
        },
        // Days for plan 9
        {
          dayId: 9,
          exerciseId: 10,
        },
        {
          dayId: 9,
          exerciseId: 6,
        },
        {
          dayId: 9,
          exerciseId: 2,
        },
        {
          dayId: 9,
          exerciseId: 13,
        },
        // Days for plan 10
        {
          dayId: 10,
          exerciseId: 20,
        },
        {
          dayId: 10,
          exerciseId: 10,
        },
        {
          dayId: 10,
          exerciseId: 35,
        },
        {
          dayId: 10,
          exerciseId: 20,
        },
        {
          dayId: 10,
          exerciseId: 10,
        },
        {
          dayId: 10,
          exerciseId: 35,
        },
        {
          dayId: 10,
          exerciseId: 35,
        },
        // Days for plan 11
        {
          dayId: 11,
          exerciseId: 13,
        },
        {
          dayId: 11,
          exerciseId: 6,
        },
        {
          dayId: 11,
          exerciseId: 34,
        },
        {
          dayId: 11,
          exerciseId: 13,
        },
        {
          dayId: 11,
          exerciseId: 10,
        },
        {
          dayId: 11,
          exerciseId: 34,
        },
        {
          dayId: 11,
          exerciseId: 13,
        },
        // Days for plan 12
        {
          dayId: 12,
          exerciseId: 40,
        },
        {
          dayId: 12,
          exerciseId: 36,
        },
        {
          dayId: 12,
          exerciseId: 18,
        },
        {
          dayId: 12,
          exerciseId: 47,
        },
        {
          dayId: 12,
          exerciseId: 38,
        },
        {
          dayId: 12,
          exerciseId: 22,
        },
        {
          dayId: 12,
          exerciseId: 1,
        },
        // Day 13 exercises
        {
          dayId: 13,
          exerciseId: 34,
        },
        {
          dayId: 13,
          exerciseId: 34,
        },
        {
          dayId: 13,
          exerciseId: 34,
        },
        {
          dayId: 13,
          exerciseId: 52,
        },
        // Day 14 exercises
        {
          dayId: 14,
          exerciseId: 47,
        },
        {
          dayId: 14,
          exerciseId: 40,
        },
        {
          dayId: 14,
          exerciseId: 35,
        },
        {
          dayId: 14,
          exerciseId: 20,
        },
        {
          dayId: 14,
          exerciseId: 49,
        },
        // Day 15 exercises
        {
          dayId: 15,
          exerciseId: 49,
        },
        {
          dayId: 15,
          exerciseId: 53,
        },
        {
          dayId: 15,
          exerciseId: 6,
        },
        {
          dayId: 15,
          exerciseId: 13,
        },
        {
          dayId: 15,
          exerciseId: 1,
        },
        // Day 16 exercises
        {
          dayId: 16,
          exerciseId: 18,
        },
        {
          dayId: 16,
          exerciseId: 38,
        },
        {
          dayId: 16,
          exerciseId: 11,
        },
        {
          dayId: 16,
          exerciseId: 1,
        },
        // Day 17 exercises
        {
          dayId: 17,
          exerciseId: 47,
        },
        {
          dayId: 17,
          exerciseId: 22,
        },
        {
          dayId: 17,
          exerciseId: 48,
        },
        {
          dayId: 17,
          exerciseId: 53,
        },
        // Day 18 exercises
        {
          dayId: 18,
          exerciseId: 22,
        },
        {
          dayId: 18,
          exerciseId: 10,
        },
        {
          dayId: 18,
          exerciseId: 19,
        },
        {
          dayId: 18,
          exerciseId: 1,
        },
        {
          dayId: 18,
          exerciseId: 36,
        },
        // Day 19 exercises
        {
          dayId: 19,
          exerciseId: 19,
        },
        {
          dayId: 19,
          exerciseId: 19,
        },
        {
          dayId: 19,
          exerciseId: 10,
        },
        {
          dayId: 19,
          exerciseId: 47,
        },
        {
          dayId: 19,
          exerciseId: 1,
        },
        // Day 20 exercises
        {
          dayId: 20,
          exerciseId: 19,
        },
        {
          dayId: 20,
          exerciseId: 10,
        },
        {
          dayId: 20,
          exerciseId: 47,
        },
        {
          dayId: 20,
          exerciseId: 1,
        },
        // Day 21 exercises
        {
          dayId: 21,
          exerciseId: 49,
        },
        {
          dayId: 21,
          exerciseId: 1,
        },
        {
          dayId: 21,
          exerciseId: 11,
        },
        {
          dayId: 21,
          exerciseId: 53,
        },
        // Day 22 exercises
        {
          dayId: 22,
          exerciseId: 53,
        },
        {
          dayId: 22,
          exerciseId: 53,
        },
        {
          dayId: 22,
          exerciseId: 53,
        },
        {
          dayId: 22,
          exerciseId: 53,
        },
        {
          dayId: 22,
          exerciseId: 53,
        },
        {
          dayId: 22,
          exerciseId: 53,
        },
        // Day 23 exercises
        {
          dayId: 23,
          exerciseId: 48,
        },
        {
          dayId: 23,
          exerciseId: 28,
        },
        // Day 24 exercises
        {
          dayId: 24,
          exerciseId: 49,
        },
        {
          dayId: 24,
          exerciseId: 48,
        },
        {
          dayId: 24,
          exerciseId: 53,
        },
        // Day 25 exercises
        {
          dayId: 25,
          exerciseId: 53,
        },
        // Day 26 exercises
        {
          dayId: 26,
          exerciseId: 6,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DayExercises', null, {});
    await queryInterface.bulkDelete('Days', null, {});
  },
};
