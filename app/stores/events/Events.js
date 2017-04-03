import { observable, action } from 'mobx';
import moment from 'moment';
// import Api from 'helpers/api';



class Events {
    // path = '/Contacts';

    doctors = [
    {
        spec: 'sergeon',
        name: 'Jon',
        working: {
            days: {
                start: '15/04/10',
                end: moment(new Date()).format('YY/MM/DD'),
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
                end: moment(new Date()).format('YY/MM/DD'),
            },
            hours: {
                start: '10:00',
                end: '16:00',
            },
        },
        busy: [
            {
                start: `${moment(new Date()).format('YY/MM/DD')} 10:00`,
                end: `${moment(new Date()).format('YY/MM/DD')} 11:00`,
            },
            {
                start: `${moment(new Date()).format('YY/MM/DD')} 12:00`,
                end: `${moment(new Date()).format('YY/MM/DD')} 13:00`,
            },
        ],
    },
];


    @observable dates = [];
    @observable freeDoctors = [];
    @observable isLoading = false;

    /**
     * функция возвращает массив докторов отфильтрованные по специальности
     * 
     * @param {Array} doctors - массив докоторов
     * @param {string} spec - специлальность доктора по которой надо отфильтровать
     */
    filterDoctors = (doctors, spec) => {
        const selectedDocs = [];
        const docs = doctors.filter(el => el.spec === spec);
        console.log('docs from filter', docs);
        docs.forEach(el => {
            if (el.working.days.start <= moment(startDate, 'YY/MM/DD HH:mm').format('YY/MM/DD') ||
                el.working.days.end >= moment(endDate, 'YY/MM/DD HH:mm').format('YY/MM/DD')) {
                selectedDocs.push(el);
            }
        });
        this.freeDoctors.push(selectedDocs);
        console.log(this.freeDoctors);
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


    @action fetchAll = (min, max, startDate, endDate, spec) => {

        if (min > max) {
            throw new Error('Минимальное значение времени начала должно быть меньше времени окончания');
        }

        if (startDate > endDate) {
            throw new Error('Начальная дата должна быть мольше конечной');
        }

        if (!this.doctors || !Array.isArray(this.doctors)) {
            throw new Error('не обнаружил докоторов или ошибка в формате докторов (должен быть массив):');
        }

        let selectedDocs = this.doctors;
        if (spec !== '') {
            selectedDocs = this.filterDoctors(this.doctors, spec);
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
                const addNew = {
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
                        addNew.title = 'free';
                    }
                }
                this.dates.push(addNew);
                // console.log(dates[i]);
                // console.log(moment(dates[i].start).format('LLL'), ed.format('LLL'));
                if (moment(this.dates[i].start).format('LLL') === moment(endDate).format('LLL')) {
                    console.log(`I'm doAAAne`);
                    // console.log(dates);
                    over = true;
                    console.log(this.dates);
                }
                i++;
            }

            newDate.start = newDate.end;
            newDate.end = moment(newDate.end).add(1, 'h').toDate();

            // защита от переполнения
            if (i === 10000) {
                // console.log(dates);
                over = true;
                console.warn('Больно большой массв', this.dates);
            }
        }
        while (!over);
    };

    @action addNew = (e) => {        
        e.title = 'NA';
    }

}

export default new Events();



// /**
//  * функция возвращает массив докторов отфильтрованные по специальности
//  * 
//  * @param {Array} doctors - массив докоторов
//  * @param {string} spec - специлальность доктора по которой надо отфильтровать
//  */

// const filterDoctors = (doctors, spec) => {
//     const selectedDocs = [];
//     const docs = doctors.filter(el => el.spec === spec);
//     console.log('docs from filter', docs);
//     docs.forEach(el => {
//         if (el.working.days.start <= moment(startDate, 'YY/MM/DD HH:mm').format('YY/MM/DD') ||
//             el.working.days.end >= moment(endDate, 'YY/MM/DD HH:mm').format('YY/MM/DD')) {
//             selectedDocs.push(el);
//         }
//     });
//     return selectedDocs;
// };


