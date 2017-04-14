import { observable, action, computed } from 'mobx';
import moment from 'moment';
// import Api from 'helpers/api';
import config from '../../components/Calendar/calendarConfig';


class Events {

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
        {
            spec: 'dantist',
            name: 'Ken dantist',
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
                    start: `${moment(new Date()).add(1, 'd').format('YY/MM/DD')} 11:00`,
                    end: `${moment(new Date()).add(1, 'd').format('YY/MM/DD')} 12:00`,
                },
                {
                    start: `${moment(new Date()).add(2, 'd').format('YY/MM/DD')} 12:00`,
                    end: `${moment(new Date()).add(2, 'd').format('YY/MM/DD')} 13:00`,
                },
                {
                    start: `${moment(new Date()).add(3, 'd').format('YY/MM/DD')} 12:00`,
                    end: `${moment(new Date()).add(3, 'd').format('YY/MM/DD')} 13:00`,
                },
            ],
        },
    ];


    @observable dates = [];
    @observable filters = {
        name: '',
        spec: '',
    };
    @observable isLoading = false;
    @observable selectedDocs = this.doctors;
    /**
     * функция возвращает массив докторов отфильтрованные по специальности
     * 
     * @param {Array} doctors - массив докоторов
     * @param {string} spec - специлальность доктора по которой надо отфильтровать
     */
    @action getFilterDoctors() {
        let selectedDocs = [];

        if (this.filters.name !== '' || this.filters.spec !== '') {
            if (this.filters.name) {
                selectedDocs = selectedDocs.concat(this.doctors
                    .filter(el => el.name === this.filters.name));
            }
            if (this.filters.spec) {
                selectedDocs = selectedDocs.concat(this.doctors
                    .filter(el => el.spec === this.filters.spec));
            }
        } else {
            selectedDocs = this.doctors;
        }
        
        // selectedDocs = this.filters;
        // console.log('docs from filter', docs);
        // docs.forEach(el => {
        //     if (el.working.days.start <= moment(config.startDate, 'YY/MM/DD HH:mm').format('YY/MM/DD') ||
        //         el.working.days.end >= moment(config.endDate, 'YY/MM/DD HH:mm').format('YY/MM/DD')) {
        //         selectedDocs.push(el);
        //     }
        // });
        // this.freeDoctors.push(selectedDocs);
        
        this.selectedDocs = selectedDocs;
        // return selectedDocs;
    }

    setFilterDoctors = (filter) => {
        this.filters = filter;
        this.getFilterDoctors();
    }

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


    @action fetchAll = (spec) => {
        console.log('отфильтрованные доки', this.selectedDocs.slice());
        this.dates = [];
        if (config.min > config.max) {
            throw new Error('Минимальное значение времени начала должно быть меньше времени окончания');
        }

        if (config.startDate > config.endDate) {
            throw new Error('Начальная дата должна быть мольше конечной');
        }

        if (!this.doctors || !Array.isArray(this.doctors)) {
            throw new Error('не обнаружил докоторов или ошибка в формате докторов (должен быть массив):');
        }

        let selectedDocs = this.selectedDocs;
        // if (spec !== '') {
        //     selectedDocs = this.filterDoctors(this.doctors, spec);
        // }

        const newDate = {
            title: 'Blank',
            start: config.startDate,
            end: moment(config.startDate).add(1, 'h').toDate(),
        };

        let over = false;
        let i = 0;
        do {
            const currentTime = moment(newDate.start).format('HH:mm');
            const currentDate = moment(newDate.start).format('YY/MM/DD');

            if (currentTime >= config.min && currentTime < config.max) {
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

                        // елси док в это время не занят, пихаем его имя в моссив
                        busy.length === 0 && desc.name.push(selectedDocs[x].name);

                        desc.speciality.push(selectedDocs[x].spec);
                        addNew.status = (desc.name.length === selectedDocs.length) ?
                            'all free' : addNew.status;
                        addNew.status = (!desc.name[0]) ? 'NA' : addNew.status;
                    } else {
                        desc.status = (desc.name.length === 0) ? ['NA'] : desc.status;
                    }

                    addNew.desc = desc;
                    addNew.title = (desc.name[0]) ? 'Записаться' : 'NA';
                }
                this.dates.push(addNew);
                if (moment(this.dates[i].start).format('LLL') === moment(config.endDate).format('LLL')) {
                    over = true;
                }
                i++;
            }

            newDate.start = newDate.end;
            newDate.end = moment(newDate.end).add(1, 'h').toDate();

            // защита от переполнения
            if (i === 10000) {
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

    @action getDocs = (docName, docSpec) => {
        const name = this.doctors.filter(doc => doc.name === docName);
        const specialty = this.doctors.filter(doc => doc.spec === docSpec);
        return { name, specialty, };
    }
}

export default new Events();
