'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Exercises',
      [
        {
          name: 'Бёрпи',
          description:
            'Бёрпи (англ. Burpee, от имени изобретателя упражнения доктора Royal Burpee) — сложное базовое многосуставное физическое упражнение, которое задействует много мышц тела, улучшает ловкость и выносливость. Требует длительного изучения. Подходит опытным спортсменам. Травмоопасно. Применяют при физической подготовке в армии и на флоте, кроссфите, троеборье.',
          muscleGroup:
            'икроножные мышцы, квадрицепсы, ягодицы, дельтовидные мышцы, трицепсы, мышцы пресса и груди.',
          type: 'базовое',
          equipment: 'не требуется',
          points: 1,
          calories: 0.5,
        },
        {
          name: 'StandUps',
          description:
            'Стоячие отжимания могут показаться довольно простыми и понятными, но на самом деле это сложное упражнение, которое нужно освоить и выполнять правильно. Это упражнение настолько сложное, что его используют даже в армии США. ',
          muscleGroup:
            'Мышцы Кора и обеспечивают нагрузку на пресс, квадрицепсы и ягодицы.',
          type: 'базовое',
          equipment: 'коврик',
          points: 1.2,
          calories: 0.7,
        },
        {
          name: 'Jumping Jack',
          description:
            'Энергичное упражнение Jumping Jack предполагает прыжки с одновременным разведением в стороны рук и ног. Это одно из самых популярных кардио-упражнений, оно уместно в любой аэробной тренировке.',
          muscleGroup: 'Сердце, мышцы ног, спина',
          type: 'кардио',
          equipment: 'коврик',
          points: 0.8,
          calories: 0.4,
        },
        {
          name: 'Cruches',
          description:
            'Мы используем мышцы кора во всём, и их укрепление жизненно важно для стабильности, равновесия и поддержки. Если рельефные мышцы живота — одна из ваших целей в области здоровья и фитнеса, то скручивания станут важной частью вашей тренировки мышц кора, и на то есть веские причины.',
          muscleGroup: 'Прямая мышца живота',
          type: 'кардио',
          equipment: 'коврик',
          points: 0.4,
          calories: 0.3,
        },
        {
          name: 'Пистолетики',
          description:
            'Приседания «пистолет» проверяют подвижность тазобедренного сустава и лодыжки, требуют напряжения всей ноги и являются отличным способом улучшить равновесие.',
          muscleGroup: 'Квадрицепсы, ягодицы, икры, подколенные сухожилия.',
          type: 'базовое',
          equipment: 'коврик',
          points: 0.5,
          calories: 0.5,
        },
        {
          name: 'Отжимания',
          description:
            'Отжимания — невероятно популярное упражнение с собственным весом, которое входит практически в каждую тренировку и используется в ряде тренировочных программ, например, в армии, школьном спорте и некоторых боевых искусствах.',
          muscleGroup: 'грудные мышцы, руки, плечи',
          type: 'базовое',
          equipment: 'коврик',
          points: 0.5,
          calories: 0.5,
        },
        {
          name: 'Альпинист',
          description:
            'Альпинисты» отлично подходят для проработки и укрепления мышц живота, и чем быстрее вы двигаете ногами, тем больше это упражнение становится кардиоупражнением. Замедляя движения и контролируя количество повторений, вы можете сосредоточиться на укреплении мышц кора или разнообразить упражнение и менять скорость, чтобы по-настоящему почувствовать жжение.',
          muscleGroup: 'пресс, ноги, руки, плечи',
          type: 'базовое / кардио',
          equipment: 'коврик',
          points: 0.6,
          calories: 0.6,
        },
        {
          name: 'Dragonflag',
          description:
            'Драконий флаг» — это продвинутое упражнение, которое прорабатывает весь корпус. Оно особенно сложное, потому что требует удерживать большую часть веса собственного тела в контролируемом эксцентрическом движении, при котором мышечные волокна удлиняются под нагрузкой.',
          muscleGroup: 'спина, ягодицы, руки, плечи',
          type: 'базовое / кардио',
          equipment: 'коврик',
          points: 0.9,
          calories: 0.9,
        },
        {
          name: 'Выпрыгивания с приседа',
          description:
            'За счёт мощного выпрыгивания вверх из приседа создаётся быстрое усилие за короткий отрезок времени — взрывная нагрузка. Такие упражнения называют плиометрическими. Они, в противоположность изометрическим упражнениям, используют взрывные, быстрые движения, помогая мышцам развивать наибольшее усилие за наименьший возможный промежуток времени. ',
          muscleGroup: 'мышцы-стабилизаторы, ягодицы, мышцы ног',
          type: 'базовое / кардио',
          equipment: 'не требуется',
          points: 0.9,
          calories: 0.9,
        },
        {
          name: 'Подтягивания',
          description:
            'Подтягивания задействуют спину и руки, что способствует их укреплению. Сильные мышцы помогают держать ровную осанку и упрощают выполнение многих бытовых задач.',
          muscleGroup:
            'трапециевидные и широчайшие мышцы спины, бицепс, трицепс и большие грудные мышцы',
          type: 'базовое / кардио',
          equipment: 'Перекладина',
          points: 1.1,
          calories: 1.0,
        },
        {
          name: 'Запрыгивания на тумбу',
          description:
            'Прыжки на плиобокс тренируют взрывную силу ног, улучшают координацию и гибкость, повышают выносливость, развивают скорость и прыгучесть. Прыжки могут быть хорошим дополнением к основным тренировкам тяжелоатлетов.',
          muscleGroup: 'мышцы ног, ягодицы',
          type: 'базовое',
          equipment: 'тумба',
          points: 1.2,
          calories: 1.2,
        },
        {
          name: 'Выпады в прыжке',
          description:
            'Выпады в прыжке - это функциональное упражнение, более интенсивнее чем стандартные выпады, использует больше энергии и требует больше навыков для выполнения.',
          muscleGroup: 'мышцы ног, ягодицы',
          type: 'функциональное',
          equipment: 'не требуется',
          points: 0.8,
          calories: 1.1,
        },
        {
          name: 'Приседания',
          description:
            'При выполнении упражнения работает основная часть мышц нижней части тела, что способствует развитию их силы и выносливости. ',
          muscleGroup:
            'мышцы пресса, квадрицепсы, ягодичные мышцы, приводящие мышцы',
          type: 'базовое',
          equipment: 'не требуется',
          points: 0.3,
          calories: 0.3,
        },
        {
          name: 'Планка вверх-вниз',
          description:
            'упражнение, которое укрепляет мышцы живота, развивает грудь, плечи, спину и трицепс.',
          muscleGroup: 'плечи, спину, трицепс',
          type: 'базовое',
          equipment: 'не требуется',
          points: 0.4,
          calories: 0.4,
        },
        {
          name: 'Ягодичный мостик',
          description:
            'Базовое упражнение для упругих бёдер и не только. Он рассчитан на прокачку нижней части тела, но несёт большую пользу и для верха.',
          muscleGroup: 'Большие, средние и малые ягодичные мышцы',
          type: 'базовое',
          equipment: 'коврик',
          points: 0.5,
          calories: 0.8,
        },
        {
          name: 'Бег на месте',
          description:
            'Бег на месте — это простое, но эффективное упражнение, которое можно выполнять практически в любом месте. Оно помогает улучшить кардиоваскулярную выносливость, сжечь калории и укрепить мышцы ног и кора',
          muscleGroup: 'Ягодичные, подвздошные мышцы, мышцы ног',
          type: 'кардио',
          equipment: 'не требуется',
          points: 0.5,
          calories: 0.8,
        },
        {
          name: 'Ягодичный мост со штангой',
          description:
            'Ягодичный мостик со штангой – упражнение для проработки задней поверхности бедра и всего массива ягодичных мышц.',
          muscleGroup: 'Ягодичные, подвздошные мышцы, мышцы ног',
          type: 'тяжелая атлетика',
          equipment: 'штанга',
          points: 1.5,
          calories: 1.8,
        },
        {
          name: 'Жимовой швунг со штангой',
          description:
            'Жимовой швунг штанги – одно из самых популярных силовых кроссфит упражнений. И это не случайно, ведь оно является одним из базовых тяжело-атлетических упражнений, которое прорабатывает большие группы мышц',

          muscleGroup:
            'Передняя и задняя части бедра, ягодицы, грудные мушцы, дельты, верх спины',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'штанга',
          points: 2.5,
          calories: 2.2,
        },
        {
          name: 'Кластеры (Clusters)',
          description:
            'Упражнение кластеры представляет собой связку из двух последовательно выполняемых известных в кроссфите упражнений: взятия штанги на грудь (любым удобным для Вас способом) и трастеров (выбросов со штангой).',

          muscleGroup:
            'Передняя и задняя части бедра, ягодицы, грудные мушцы, дельты, верх спины',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'штанга',
          points: 2.5,
          calories: 2.2,
        },
        {
          name: 'Фронтальный присед',
          description:
            'Фронтальные приседания со штангой или как принято его величать в народе присед со штангой на груди по праву занимает своё почетное место среди упражнений долгожителей. Данный вид приседаний нашёл своих почитателей в таких направлениях как: тяжелая атлетика, бодибилдинг и кроссфит.',

          muscleGroup: 'квадрицепс, икроножные, ягодичные',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'штанга',
          points: 2.2,
          calories: 2.1,
        },
        {
          name: 'Приседания со штангой над головой',
          description:
            'Фронтальные приседания со штангой или как принято его величать в народе присед со штангой на груди по праву занимает своё почетное место среди упражнений долгожителей. Данный вид приседаний нашёл своих почитателей в таких направлениях как: тяжелая атлетика, бодибилдинг и кроссфит.',

          muscleGroup: 'квадрицепс, икроножные, ягодичные',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'штанга',
          points: 2.5,
          calories: 2.2,
        },
        {
          name: 'Выпады с блином над головой',
          description:
            'Среди многочисленных кроссфит-комплексов, используемых не только профессиональными кроссфитерами, но и начинающими спортсменами, особой популярностью пользуются выпады с блином над головой',

          muscleGroup: 'квадрицепс, трапециевидные мышцы, трицепсы',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'блин',
          points: 1.5,
          calories: 1.2,
        },
        {
          name: 'Ходьба по стене (WW)',
          description:
            'Суть WW – в эффективности и возможности адаптации к более сложным упражнениям. «Прогулка» по стенке заключается в плавном переходе из горизонтального положения в вертикальное.',

          muscleGroup: 'бицепсы, трицепсы',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'Стена',
          points: 1.7,
          calories: 1.7,
        },
        {
          name: 'Приседания плие с гантелей',
          description:
            'Приседания плие с гантелей – достаточно простое на первый взгляд упражнение, направленное на проработку внутренней поверхности бедра.',

          muscleGroup: 'ягодицы, квардицепс, бицепс бедра',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'Гантель',
          points: 1.6,
          calories: 1.6,
        },
        {
          name: 'Упражнения с кувалдой',
          description:
            'Выполняя удары кувалдой по покрышке, вы развиваете силовую выносливость мышц корпуса, координацию и взрывную силу. Также идет комплексная нагрузка на почти все крупные мышечные группы организма, за счет чего ваши мышцы постепенно будут расти.',

          muscleGroup:
            'широчайшие мышцы спины, плечи, разгибатели позвоночника',
          type: 'тяжелая атлетика / CrossFit',
          equipment: 'кувалда, покрышка',
          points: 1.9,
          calories: 1.9,
        },
        {
          name: 'Становая тяга с гантелями',
          description:
            'Становая тяга с гантелями – альтернативная вариация самого распространённого во всех тренажёрных залах упражнения',

          muscleGroup: 'брюшной пресс, икроножные мышцы, ягодичные',
          type: 'тяжелая атлетика ',
          equipment: 'гантели',
          points: 1.3,
          calories: 1.3,
        },
        {
          name: 'Прыжки на скакаке',
          description:
            'Прыжки на скакалке – один из наиболее распространенных вариантов кардио-нагрузки, применяемый, как для похудения, так и для улучшения функциональных качеств атлета.',

          muscleGroup: 'икроножные, бицепс бедра',
          type: 'кардио',
          equipment: 'скакалка',
          points: 1.7,
          calories: 1.7,
        },
        {
          name: 'Упражнение с санями',
          description:
            'Кроссфит сани – тренажер эффективный, но достаточно специфический. Помимо рекомендации к применению, они имеют и ряд противопоказаний.',

          muscleGroup: 'икроножные, бицепс бедра, спина',
          type: 'кардио / CrossFit',
          equipment: 'сани',
          points: 1.7,
          calories: 1.7,
        },
        {
          name: 'Силовой рывок гантели',
          description:
            'Рывок гантели одной рукой с пола – взрывное упражнение, распространенное в кроссфите и силовом экстриме.',

          muscleGroup: 'икроножные, бицепс бедра, спина, плечи',
          type: 'CrossFit',
          equipment: 'гантель',
          points: 1.6,
          calories: 1.6,
        },
        {
          name: 'Носки к перекладине (Toes-to-Bar)',
          description:
            'Подъем ног в висе на перекладине (Toes to Bar) – одно из самых эффективных упражнений на пресс, благодаря тому, что при его выполнении корпус находится в растянутой позиции, поэтому наши мышцы получают колоссальную нагрузку еще и в негативной фазе движения (при опускании ног).',
          muscleGroup: 'пресс',
          type: 'CrossFit',
          equipment: 'перекладина',
          points: 1.8,
          calories: 1.8,
        },
        {
          name: 'Выпады на одну ногу с гирей на плече',
          description:
            'Это классическая версия и она подойдет абсолютно для каждого, так как является очень эффективным и простым упражнением в техническом плане.',
          muscleGroup: 'ягодицы',
          type: 'Тяжелая атлетика / CrossFit',
          equipment: 'гиря',
          points: 1.8,
          calories: 1.8,
        },
        {
          name: 'Толчок гири одной рукой',
          description:
            'Это классическая версия и она подойдет абсолютно для каждого, так как является очень эффективным и простым упражнением в техническом плане.',
          muscleGroup: 'ягодицы',
          type: 'Тяжелая атлетика / CrossFit',
          equipment: 'гиря',
          points: 1.8,
          calories: 1.8,
        },
        {
          name: 'Толчок гири одной рукой',
          description:
            'Это классическая версия и она подойдет абсолютно для каждого, так как является очень эффективным и простым упражнением в техническом плане.',
          muscleGroup: 'ягодицы',
          type: 'Тяжелая атлетика / CrossFit',
          equipment: 'гиря',
          points: 1.8,
          calories: 1.8,
        },
        {
          name: 'Бёрпи с подтягиванием',
          description:
            'Улучшенная версия классических Burpee, испытай себя',
          muscleGroup:
            'икроножные мышцы, квадрицепсы, ягодицы, дельтовидные мышцы, трицепсы, мышцы пресса и груди.',
          type: 'базовое',
          equipment: 'не требуется',
          points: 1.2,
          calories: 0.9,
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
