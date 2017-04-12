import { observable, action } from 'mobx';
import moment from 'moment';
// import Api from 'helpers/api';



class Events {
    // path = '/Contacts';


    // min = moment('10:00', 'HH:mm').format('HH:mm');
    // max = moment('18:00', 'HH:mm').format('HH:mm');
    // today = moment(new Date()).format('YY/MM/DD');
    // startDate = moment(`${today} 10:00`, 'YY/MM/DD HH:mm').toDate();
    // endDate = moment(startDate).add(1, 'months').toDate();


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
                    end: '15:00',
                },
            },
            busy: [
                {
                    start: `${moment(new Date()).format('YY/MM/DD')} 16:00`,
                    end: `${moment(new Date()).format('YY/MM/DD')} 17:00`,
                },
            ],

        },
        {
            spec: 'terapeft',
            name: 'Bob',
            working: {
                days: {
                    start: '15/04/12',
                    end: moment(new Date()).add(4, 'd').format('YY/MM/DD'),
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
                    start: `${moment(new Date()).format('YY/MM/DD')} 11:00`,
                    end: `${moment(new Date()).format('YY/MM/DD')} 12:00`,
                },
            ],
        },
        {
            spec: 'dantist',
            name: 'Mike',
            working: {
                days: {
                    start: moment(new Date()).format('YY/MM/DD'),
                    end: moment(new Date()).add(4, 'd').format('YY/MM/DD'),
                },
                hours: {
                    start: '10:00',
                    end: '13:00',
                },
            },
            busy: [
                {
                    start: `${moment(new Date()).format('YY/MM/DD')} 11:00`,
                    end: `${moment(new Date()).format('YY/MM/DD')} 12:00`,
                },
                {
                    start: `${moment(new Date()).add(1, 'd').format('YY/MM/DD')} 11:00`,
                    end: `${moment(new Date()).add(1, 'd').format('YY/MM/DD')} 12:00`,
                },
                {
                    start: `${moment(new Date()).add(2, 'd').format('YY/MM/DD')} 12:00`,
                    end: `${moment(new Date()).add(2, 'd').format('YY/MM/DD')} 13:00`,
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
        this.dates = [];
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
        console.log('selectedDocs', selectedDocs);

        const newDate = {
            title: 'Blank',
            start: startDate,
            end: moment(startDate).add(1, 'h').toDate(),
        };

        let over = false;
        let i = 0;
        do {
            const currentTime = moment(newDate.start).format('HH:mm');
            const currentDate = moment(newDate.start).format('YY/MM/DD');

            if (currentTime >= min && currentTime < max) {
                const addNew = {
                    title: 'Записаться',
                    start: newDate.start,
                    end: newDate.end,
                    desc: [],
                    status: 'NA',
                };
                const desc = {
                    name: [],
                    speciality: [],
                };
                for (let x = 0; x < selectedDocs.length; x++) {
                    if (selectedDocs[x].working.hours.start <= currentTime
                        && selectedDocs[x].working.hours.end > currentTime
                        && selectedDocs[x].working.days.start <= currentDate
                        && selectedDocs[x].working.days.end >= currentDate
                    ) {
                        // меняем статус на доступный
                        addNew.status = 'partially';

                        // отфильтровываем докторов которые заняты в это время
                        const busy = selectedDocs[x].busy.filter(el => el.start === currentDate + ' ' + currentTime);

                        if (busy.length === 0) {
                            desc.name.push(selectedDocs[x].name);
                        }

                        desc.speciality.push(selectedDocs[x].spec);
                        addNew.status = (desc.name.length === selectedDocs.length) ?
                            'all free' : addNew.status;
                        addNew.status = (!desc.name[0]) ? 'NA' : addNew.status;
                    } else {
                        desc.status = (desc.name.length === 0) ? ['NA'] : desc.status;
                    }
                    // addNew.desc = desc.name;
                    // addNew.speciality = desc.speciality;
                    addNew.desc = desc;
                    addNew.title = (desc.name[0]) ? 'Записаться' : 'NA';
                }
                this.dates.push(addNew);
                if (moment(this.dates[i].start).format('LLL') === moment(endDate).format('LLL')) {
                    console.log(`I'm doAAAne`);
                    // console.log(this.dates.slice());
                    over = true;
                    // console.log(this.dates);
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

    @action addNew = (docName, dates) => {
        this.doctors.forEach(el => {
            if (el.name === docName) {
                el.busy.push(dates);
            }
        });
    }
}

export default new Events();
