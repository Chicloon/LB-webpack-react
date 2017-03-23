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
            dates: {
                start: '15/04/10',
                end: '15/04/12',
            },
            hours: {
                start: '10:00',
                end: '16:00',
            },
        },

    },
    {
        spec: 'terapeft',
        name: 'Bob',
        working: {
            days: {
                start: '15/04/12',
                end: '15/04/14',
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

let newDate = {
    title: 'Blank',
    start: sd.toDate(),
    end: sd.add(1, 'h').toDate(),
};

// const dates = [{
//     title: 'Blank',
//     start: newDate.start,
//     end: newDate.end,
// }];

const selectedDocs = doctors.filter(el => el.spec === 'sergeon');
console.log(selectedDocs);

const docWorking = doctors[0].working.dates.start + ' ' + doctors[0].working.hours.start;

console.log(moment(docWorking, 'YY/MM/DD HH:mm').toDate());

const dates = [];
const min = moment('10:00', 'HH:mm').format('HH:mm');
const max = moment('18:00', 'HH:mm').format('HH:mm');

// const dates = [sd];
// let newDate = moment (dates[0]).add(1, 'h'); 
// dates.push(newDate);
// console.log(dates);
// console.log('dates 0', dates[0]);
// console.log('dates', dates[0]);

/*
функция возвращает массив из дат и времени в которое доктора могу принять

docs - массив докторов подходящих по специальности
*/

const selectedTime = [];
let finSelect = true;
let ss = 0;

do {
    if (moment(newDate.start).format('HH:mm') >= min &&
        moment(newDate.end).format('HH:mm') < max) {

        selectedTime.push({
            start: newDate.start,
            end: newDate.end,
        });

        if (moment(newDate.end).format('LLL') === ed.format('LLL')) {
            console.log(`I'm done`);
            // console.log(dates);
            finSelect = true;
            console.log(selectedTime);
        }
        ss++;
        if (ss > 10) {
            finSelect = false;
            console.log(selectedTime);
        }
    }

    newDate.start = newDate.end;
    newDate.end = moment(newDate.end).add(1, 'h').toDate();
}
while (finSelect);

newDate = {
    title: 'Blank',
    start: sd.toDate(),
    end: sd.add(1, 'h').toDate(),
};


const getFreeDocTime = (docs) => {
    const freeTime = [];
    const busyTime = [];

    docs.forEach(doc => {
        console.log('doc', doc);

        const currentTime = {
            start: moment(`${doc.working.days.start} ${doc.working.hours.start}`, 'YY/MM/DD HH:mm').toDate(),
            end: moment(`${doc.working.days.start} ${doc.working.hours.start}`, 'YY/MM/DD HH:mm').add(1, 'h').toDate(),
        };

        let fin = true;
        let c = 0;
        do {
            currentTime.start = currentTime.end;
            currentTime.end = moment(currentTime.start).add(1, 'h').toDate();

            let passIteration = false;
            for (let busyCouter = 0; busyCouter < doc.busy.length; busyCouter++) {
                if (moment(currentTime.start).format('YY/MM/DD HH:mm') === doc.busy[busyCouter].start) {
                    console.log('passing iteraton');
                    busyTime.push({
                        start: currentTime.start,
                        end: currentTime.end,
                    });
                    passIteration = true;
                }
            }
            if (passIteration) {
                continue;
            }
            freeTime.push({
                start: currentTime.start,
                end: currentTime.end,
            });
            // console.log(passIteration);
            // console.log('currentTime', currentTime);
            c++;
            if (c > 10) {
                fin = false;
            }
            if (currentTime.start === moment(`${doc.working.days.end} ${doc.working.hours.end}`, 'YY/MM/DD HH:mm').add(1, 'h').toDate()) {
                fin = true;
            }
        }
        while (fin);
    });
    console.log('free', freeTime);
    console.log('busy', busyTime);

    // console.log(docs);
    return 'asdfasdf';
};

const spec = 'terapeft';
console.log(getFreeDocTime(doctors.filter(el => el.spec === spec)));

let over = false;
let i = 0;

const format = () => {
    do {
        // newDate = {
        //     start: dates[i].end,
        //     end: moment(dates[i].end).add(1, 'h').toDate(),
        // };
        // console.log(newDate);


        if (moment(newDate.start).format('HH:mm') >= min &&
            moment(newDate.end).format('HH:mm') < max) {
            const addNew = {
                title: 'Data',
                start: newDate.start,
                end: newDate.end,
                desc: 'Blank',
            };

            for (let x = 0; x < doctors.length; x++) {
                if (doctors[x].spec === 'sergeon') {
                    if (doctors[x].working.hours.start === moment(newDate.start).format('HH:mm') &&
                        doctors[x].working.hours.end === moment(newDate.end).format('HH:mm') &&
                        doctors[x].working.days.start === moment(newDate.end).format('HH:mm') &&
                        doctors[x].working.days.end === moment(newDate.end).format('HH:mm')
                    ) {
                        addNew.title = 'sergeon';
                    }
                } else {
                    addNew.title = 'NA';
                }

                // console.log(addNew);
            }

            dates.push(addNew);
            if (moment(dates[i].end).format('LLL') === ed.format('LLL')) {
                console.log(`I'm done`);
                // console.log(dates);
                over = true;
                console.log(dates[3], dates[4]);
            }
            i++;
        }

        newDate.start = newDate.end;
        newDate.end = moment(newDate.end).add(1, 'h').toDate();

        // console.log(`I'm done do this shit`);

        if (i === 10) {
            // console.log(dates);
            over = true;
            console.log(dates);
        }
    }
    while (over === false);
};

// format();


// console.log(`I'm done`);
// console.log(sd);
// console.log(moment(sd).add(1, 'h').format());

// const dateJs = new Date(2016, 0, 1);
// const date = '16/01/02 10:00';
// console.log('date', moment(date, 'YY/MM/DD HH:mm').format('LLL'));
// console.log('dateJs', dateJs);
export default Doctors;
