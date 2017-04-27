import { observable, action, computed } from 'mobx';
import moment from 'moment';

import Api from 'helpers/api';
import config from '../../components/Calendar/calendarConfig';


class Doctors {
    // Путь для API
    path = '/Doctors';
    // значение загрузки для отображения спиннера
    @observable isLoading = false;
    // все даты для наполнения календаря
    @observable dates = [];
    // фильтры для списка докторов
    filters = {
        name: '',
        spec: '',
    };
    // список докторов для отображения в календаре
    @observable selectedDocs = [];
    // список всех имен докторов для отображения списка во вьюхе
    @observable namesList = [];

    /**
     * Заполняем все события в календаре совбодными врачами исходя из параметров filters
     * filters приходят из вьюхи
     */
    @action async fetchAll() {
        let selectedDocs = [];

        // получаем массив объектов доков от БД
        this.isLoading = true;
        const response = await Api.get(this.path);
        const status = await response.status;
        // console.log('status,', status);
        // let doctors = [];

        // Если упешно фильтруем докторов исходя из значений фитра
        if (status === 200) {

            // задаем значения для отображения вьюхи
            const doctors = await response.json();

            // задаем имена всех докторов для вьюхи
            this.namesList = doctors;


            // console.log(doctors.map(el => el.name));
            if (this.filters.spec !== '') {
                selectedDocs = selectedDocs.concat(doctors
                    .filter(el => el.spec === this.filters.spec));
                this.namesList = selectedDocs.slice();
            } else {
                selectedDocs = doctors;
                this.namesList = doctors;
            }

            if (this.filters.name !== '') {
                selectedDocs = doctors
                    .filter(el => el.name === this.filters.name);
            }

            // предаем отфильтрованных докторов классу
            this.selectedDocs = selectedDocs;
            // получаем массив событий календаря для построения во вьюхе
            this.getEvents();
        }
    }

    // устанавливам значения фильтров из вьюхи
    setFilterDoctors = (filter) => {
        this.filters = filter;
    }

    /**
     * функция создания массива событий календаря для формирования во вьюхе
     */


    getEvents = () => {
        this.dates = [];
        const selectedDocs = this.selectedDocs;
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
                    this.isLoading = false;
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


    /**
     * Добавляем запись в докроту что он занят в это время когда зациент записывается
     * docName - имя врача к которому записались
     * busyDates - время на которое записались
     */
    @action addNew = (docName, busyDates) => {
        this.selectedDocs.forEach(el => {
            if (el.name === docName) {
                this.patch(el.id, { busy: el.busy.concat(busyDates) });
            }
        });
    }

    // функция записи изменений в БД
    @action async patch(doctorId, data) {
        this.isLoading = true;
        const response = await Api.patch(`${this.path}/${doctorId}`, data);
        const status = await response.status;

        if (status === 200) {
            this.fetchAll();
        }
    }
}

export default new Doctors();
