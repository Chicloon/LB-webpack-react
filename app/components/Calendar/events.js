import moment from 'moment';
import doctors from './doctors';

const preMadeEvents = [
  // {
  //   'title': 'My event',    
  //   'start': startDate.toDate(),
  //   'end': endDate.toDate(),
  // },
  {
    'title': 'Some Event',
    'start': new Date(2015, 3, 9, 12, 0, 0),
    'end': new Date(2015, 3, 9, 13, 0, 0)
  },
  {
    'title': 'Some Event 2',
    'start': new Date(2015, 3, 9, 13, 0, 0),
    'end': new Date(2015, 3, 9, 14, 0, 0),
    'author': 'Jack',
  },
    {
    'title': 'I HAVE AUTHOR',
    'start': new Date(2015, 3, 9, 15, 0, 0),
    'end': new Date(2015, 3, 9, 16, 0, 0),
    'author': 'Jack',
  },
  {
    'title': 'Conference',
    'start': new Date(2015, 3, 11, 15, 0, 0),
    'end': new Date(2015, 3, 11, 17, 0, 0),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2015, 3, 12, 10, 30, 0, 0),
    'end': new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2015, 3, 12, 12, 0, 0, 0),
    'end': new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2015, 3, 12, 14, 0, 0, 0),
    'end': new Date(2015, 3, 12, 15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
];



const dates = [];

const specaility = '';

const min = moment('10:00', 'HH:mm').format('HH:mm');
const max = moment('18:00', 'HH:mm').format('HH:mm');
const today = moment(new Date()).format('YY/MM/DD');
console.log(today);
const startDate = moment(`${today} 10:00`, 'YY/MM/DD HH:mm').toDate();
const endDate = moment(startDate).add(1, 'months').toDate();
console.log('start and end', startDate, endDate);

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
    console.log(selectedDocs);

    const newDate = {
        title: 'Blank',
        start: startDate,
        end: moment(startDate).add(1, 'h').toDate(),        
    };

    let over = false;
    let i = 0;
    let startTime, endTime, currentDate;
    do {
        startTime = moment(newDate.start).format('HH:mm');
        endTime = moment(newDate.start).format('HH:mm');
        currentDate = moment(newDate.start).format('YY/MM/DD');

        if (startTime >= min && endTime < max) {
            let addNew = {
                title: [],
                start: newDate.start,
                end: newDate.end,
                desc: 'Blank',
            };
            // console.log(addNew);
            for (let x = 0; x < selectedDocs.length; x++) {
                // console.log(selectedDocs[x].working.days, startTime, endTime);
                // console.log(selectedDocs[x].working.days, currentDate);
                if (selectedDocs[x].working.hours.start <= startTime
                    && selectedDocs[x].working.hours.end > endTime
                    && selectedDocs[x].working.days.start <= currentDate
                    && selectedDocs[x].working.days.end >= currentDate
                ) {
                    // console.log('match');
                    addNew.title.push(`Dr. ${selectedDocs[x].name}`);
                } else {
                    addNew.title = 'NA';
                }
            }
            dates.push(addNew);
            // console.log(dates[i]);
            // console.log(moment(dates[i].start).format('LLL'), ed.format('LLL'));
            if (moment(dates[i].start).format('LLL') === moment(endDate).format('LLL')) {
                console.log(`I'm doAAAne`);
                // console.log(dates);
                over = true;
                // console.log(dates);
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

format(min, max, startDate, endDate, doctors, '');


preMadeEvents.push({
  title: 'Blank',
  start: startDate,
  end: moment(startDate).add(1, 'h').toDate(),
});

const events = preMadeEvents.concat(dates);

export default events;
