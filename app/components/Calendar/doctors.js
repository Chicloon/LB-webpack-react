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
        },  // массив или объект с датами, когда этот врач работает
    },
];

// console.log('form db', Doctors[0].working.hours.start);
// console.log('date from db', moment(Doctors[0].working.hours.start, 'HH:mm').format('LLL'));


const startDate = '15/04/06 10:00';
const endDate = '15/04/16 10:00';
// const sd = moment(startDate, 'YY/MM/DD HH:mm').format();
const m = moment(new Date(2015, 3, 6, 10, 0, 0));
const sd = moment(startDate, 'YY/MM/DD HH:mm');
// console.log('--------------------');
// console.log(sd, m);
// console.log('--------------------');
// console.log(moment(sd).add(1, 'h'), m.add(1, 'd'));
// console.log(moment(sd).add(1, 'd').d === m.add(1, 'd').d);
const ed = moment(endDate, 'YY/MM/DD HH:mm');

// let sdDate = moment(sd).toDate();

// console.log(sdDate, moment(sdDate).add(1, 'd').toDate());

const dates = [{
  title: 'Blank',
  start: sd.toDate(),
  end: sd.add(1, 'h').toDate(),
}];

let over = false;
// const dates = [sd];
// let newDate = moment (dates[0]).add(1, 'h'); 
// dates.push(newDate);
// console.log(dates);
// console.log('dates 0', dates[0]);
// console.log('dates', dates[0]);
let i = 0;
do {
    i++;
    const addNew = {
        title: 'Data',
        start: dates[i - 1].end,
        end: moment(dates[i - 1].end).add(1, 'h').toDate(),
    };

    // dates.push(moment(dates[i-1]).add(1, 'h'));
    dates.push(addNew);
    // console.log(`I'm done do this shit`);
    if (moment(dates[i].end).format('LLL') === ed.format('LLL')) {
        console.log(`I'm done`);
        // console.log(dates);
        over = true;
    }

    if (i === 1000) {
        // console.log(dates);
        over = true;
    }
}
while (over === false);

// console.log(`I'm done`);
// console.log(sd);
// console.log(moment(sd).add(1, 'h').format());

// const dateJs = new Date(2016, 0, 1);
// const date = '16/01/02 10:00';
// console.log('date', moment(date, 'YY/MM/DD HH:mm').format('LLL'));
// console.log('dateJs', dateJs);
export default Doctors;
