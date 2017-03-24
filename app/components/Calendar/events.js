import moment from 'moment';
import Doctors from './doctors';

const preMadeEvents = [
  {
    'title': 'My event',    
    'start': sd,
    'end': ed,
  },
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


const startDate = '15/04/06 10:00';
const endDate = '15/04/16 10:00';

const sd = moment(startDate, 'YY/MM/DD HH:mm');
const ed = moment(endDate, 'YY/MM/DD HH:mm');

let over = false;

const min=moment('10:00', 'HH:mm').format('HH:mm');
const max=moment('22:00', 'HH:mm').format('HH:mm');



const dates = [{
  title: 'Blank',
  start: sd.toDate(),
  end: sd.add(1, 'h').toDate(),
  desc: 'Black',
}];

let i = 0;
do {
    const addNew = {
        title: 'Data',
        start: dates[i].end,
        end: moment(dates[i].end).add(1, 'h').toDate(),
        desc: 'Blank',
    };
    // console.log(moment(addNew.start, 'HH:mm').format('HH:mm'));
    // console.log(moment(addNew.start, 'HH:mm').format('HH:mm') >= min);

    if (i & 1) {
      addNew.title = 'i odd';
    }
    // if (moment(addNew.start, 'HH:mm').format('HH:mm') >= min &&
    // moment(addNew.end, 'HH:mm').format('HH:mm') <= max) {
    // }
      dates.push(addNew);
    // dates.push(moment(dates[i-1]).add(1, 'h'));
    // console.log(`I'm done do this shit`);
    if (moment(dates[i].end).format('LLL') === ed.format('LLL')) {
        
        over = true;
    }

    // if (i === 1000) {
    //     console.log(dates);
    //     over = true;
    // }
    i++;
}
while (over === false);


preMadeEvents.push({
  title: 'Blank',
  start: sd.toDate(),
  end: sd.add(1, 'h').toDate(),
});

const events = preMadeEvents.concat(dates);

export default events;
