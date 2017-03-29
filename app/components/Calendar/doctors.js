// const Doctors = {
//     name: {}, // имя данные, и т.д.
//     spesiality: '', // название специальности и т.д.
//     working: [], // массив или объект с датами, когда этот врач работает
//     reserved: [{}], // массив с объектами когда у этого врача есть запись со ссылками на пациентов
// };

import moment from 'moment';

moment.locale('ru');
// let time = moment('01/12/2016', 'DD/MM/YYYY', true).format();
// console.log(time);
// time = moment('01/12/2016 10:00', 'DD/MM/YYYY HH:mm').format();
// console.log(time);
// const ten = moment('10:00', 'HH:mm').format('HH:mm');
// const twelve = moment('01/12/2016 12:00', 'DD/MM/YYYY HH:mm').format();

// const a = '10:00';

// // console.log(ten, twelve);
// // console.log('10<12', ten < twelve);
// // // console.log(time);


const Doctors = [
    {
        id: '1',
        name: { name: 'Doc1', description: 'Doc1 is a cool doc ' }, // имя данные, и т.д.
        spesiality: 'spec1', // название специальности и т.д.
        working: {
            date: {
                start: new Date(2017, 0, 1),
                end: new Date(2017, 1, 0),
            },
            hours: {
                start: '10:00',
                end: moment('14:00', 'HH:mm').format('HH:mm'),
            },
        },  // массив или объект с датами, когда этот врач работает
    },
];

// console.log('form db', Doctors[0].working.hours.start);
// console.log('date from db', moment(Doctors[0].working.hours.start, 'HH:mm').format('LLL'));




const doctors = [
    {
        spec: 'sergeon',
        name: 'Jon',
        working: {
            days: {
                start: '15/04/10',
                end: '15/04/12',
            },
            hours: {
                start: '10:00',
                end: '16:00',
            },
        },
        busy: [
            {
                start: '',
                end: '',
            },
        ],

    },
    {
        spec: 'terapeft',
        name: 'Bob',
        working: {
            days: {
                start: '15/04/12',
                end: '15/07/14',
            },
            hours: {
                start: '10:00',
                end: '16:00',
            },
        },
        busy: [
            {
                start: '15/04/12 12:00',
                end: '15/04/12 13:00',
            },
            {
                start: '15/04/13 10:00',
                end: '15/04/13 11:00',
            },
        ],
    },
];


const dates = [];

const specaility = 'terapeft';

const min = moment('10:00', 'HH:mm').format('HH:mm');
const max = moment('18:00', 'HH:mm').format('HH:mm');
const startDate = moment('15/04/13 10:00', 'YY/MM/DD HH:mm');
const endDate = moment('15/04/20 10:00', 'YY/MM/DD HH:mm');



/**
 * функция возвращает массив докторов отфильтрованные по специальности
 * 
 * @param {Array} doctors - массив докоторов
 * @param {string} spec - специлальность доктора по которой надо отфильтровать
 */

const filterDoctors = (doctors, spec) => {
    const selectedDocs = [];
    const docs = doctors.filter(el => el.spec === spec);
    console.log('docs from filter', docs);
    docs.forEach(el => {
        if (el.working.days.start <= moment(startDate, 'YY/MM/DD HH:mm').format('YY/MM/DD') ||
            el.working.days.end >= moment(endDate, 'YY/MM/DD HH:mm').format('YY/MM/DD')) {
            selectedDocs.push(el);
        }
    });
    return selectedDocs;
};


/**
 * функция выдает массив объектов событий исходя из массива объекта докторов
 * 
 * @param {moment().format('HH:mm')} min значения времени в пределах которых идет обработка данных и формируется массив событий
 * @param {moment().format('HH:mm')} max значения времени в пределах которых идет обработка данных и формируется массив событий
 * @param {moment().format('YY/MM/DD HH:mm')} startDate дата начала  обработки данных
 * @param {moment().format('YY/MM/DD HH:mm')} endDate дата окончания обработки данных
 * @param {Array} doctors массив всех докторов
 * @param {spring} spec специальность доктора
 */


const format = (min, max, startDate, endDate, doctors, spec) => {

    if (min > max) {
        throw new Error('Минимальное значение времени начала должно быть меньше времени окончания');
    }

    if (startDate > endDate) {
        throw new Error('Начальная дата должна быть мольше конечной');
    }

    if (!doctors || !Array.isArray(doctors)) {
        throw new Error('не обнаружил докоторов или ошибка в формате докторов (должен быть массив):');
    }

    let selectedDocs = doctors;
    if (spec !== '') {
        selectedDocs = filterDoctors(doctors, spec);
    }

    const newDate = {
        title: 'Blank',
        start: startDate.toDate(),
        end: startDate.add(1, 'h').toDate(),
    };

    let over = false;
    let i = 0;
    let startTime, endTime, currentDate;
    do {
        startTime = moment(newDate.start).format('HH:mm');
        endTime = moment(newDate.start).format('HH:mm');
        currentDate = moment(newDate.start).format('YY/MM/DD');

        if (startTime >= min && endTime < max) {
            const addNew = {
                title: 'Data',
                start: newDate.start,
                end: newDate.end,
                desc: 'Blank',
            };
            // console.log(addNew);
            for (let x = 0; x < selectedDocs.length; x++) {
                // console.log(selectedDocs[x].working.days, startTime, endTime);
                // console.log(selectedDocs[x].working.days, currentDate);
                if (selectedDocs[x].working.hours.start <= startTime
                    && selectedDocs[x].working.hours.end >= endTime
                    && selectedDocs[x].working.days.start < currentDate
                    && selectedDocs[x].working.days.end > currentDate
                ) {
                    // console.log('match');
                    addNew.title = selectedDocs[x].spec;
                } else {
                    addNew.title = 'NA';
                }
            }

            dates.push(addNew);
            // console.log(dates[i]);
            // console.log(moment(dates[i].start).format('LLL'), ed.format('LLL'));
            if (moment(dates[i].start).format('LLL') === endDate.format('LLL')) {
                console.log(`I'm doAAAne`);
                // console.log(dates);
                over = true;
                console.log(dates);
            }
            i++;
        }

        newDate.start = newDate.end;
        newDate.end = moment(newDate.end).add(1, 'h').toDate();

        // защита от переполнения
        if (i === 10000) {
            // console.log(dates);
            over = true;
            console.warn('Больно большой массв', dates);
        }
    }
    while (!over);
};

format(min, max, startDate, endDate, doctors, 'terapeft');

export default Doctors;
