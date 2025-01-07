'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Plans',
      [
        {
          name: 'CrossFit HELL',
          image:
            'https://fitni.ru/wp-content/uploads/2017/07/1500225443_maxresdefault.jpg',
          description:
            'Программа тренировок по кроссфиту для любителей и профессионалов. Подготовка к выступлению на соревнованиях по кроссфиту',
          equipment: 'Штанга, перекладина',
          difficulty: 'Высокая',
        },
        {
          name: 'ВИКИНГ',
          image:
            'https://i.pinimg.com/originals/bd/94/79/bd9479a040a56e5bed49c50d4f9793c0.jpg',
          description:
            'Программа тренировок включающая в себя как функциональные аспекты, так и тяжелоатлетические комплексы',
          equipment: 'Штанга, перекладина, гири, гантели',
          difficulty: 'Высокая',
        },
        {
          name: 'ЦЕРБЕРУС',
          image:
            'https://kuznica.pro/upload/1797032a-6900-4b00-9c1e-fef7239b096f.png',
          description:
            'Тренировка рук со штангой и турником. Развитие силы в жиме лежа и жиме стоя + увеличение строгих подтягиваний.',
          equipment: 'Штанга, перекладина, гири, гантели',
          difficulty: 'Средняя',
        },
        {
          name: 'Murph Prep',
          image:
            'https://kuznica.pro/upload/ec40029b-1cfe-482f-af0c-8a4be4d4b5a8.png',
          description:
            'Тренировка рук со штангой и турником. Развитие силы в жиме лежа и жиме стоя + увеличение строгих подтягиваний.',
          equipment: 'коврик, перекладина',
          difficulty: 'Средняя',
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
