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
const ten = moment('10:00', 'HH:mm').format('HH:mm');
const twelve = moment('01/12/2016 12:00', 'DD/MM/YYYY HH:mm').format();

const a = '10:00';

// console.log(ten, twelve);
// console.log('10<12', ten < twelve);
// // console.log(time);


const Doctors = [
    {
        id: '1',
        name: {name: 'Doc1', description: 'Doc1 is a cool doc ' }, // имя данные, и т.д.
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
        },
        
         // массив или объект с датами, когда этот врач работает
    },
];

// console.log('form db', Doctors[0].working.hours.start);
// console.log('date from db', moment(Doctors[0].working.hours.start, 'HH:mm').format('LLL'));

const dateJs = new Date(2016, 0, 1);
const date = '10:00';
console.log('date', moment(date, 'HH:mm').format('LLL'));
console.log('dateJs', dateJs);
export default Doctors;
