import moment from 'moment';


const preMadeEvents = [
  {
    'title': 'My event',    
    'start': sd,
    'end': ed,
  },
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10),
    'author': 'Efim'
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2016, 2, 13, 0, 0, 0),
    'end': new Date(2016, 2, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 10, 6, 0, 0, 0),
    'end': new Date(2016, 10, 13, 0, 0, 0)
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
    'start': new Date(2015, 3, 11),
    'end': new Date(2015, 3, 13),
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
    'start':new Date(2015, 3, 12,14, 0, 0, 0),
    'end': new Date(2015, 3, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2015, 3, 12, 17, 0, 0, 0),
    'end': new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2015, 3, 12, 20, 0, 0, 0),
    'end': new Date(2015, 3, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2015, 3, 13, 7, 0, 0),
    'end': new Date(2015, 3, 13, 10, 30, 0)
  }
];


const startDate = '15/04/06 10:00';
const endDate = '15/04/16 10:00';

const sd = moment(startDate, 'YY/MM/DD HH:mm');
const ed = moment(endDate, 'YY/MM/DD HH:mm');

let over = false;

const dates = [{
  title: 'Blank',
  start: sd.toDate(),
  end: sd.add(1, 'h').toDate(),
  desc: 'Black',
}];

let i = 0;
do {
    i++;
    const addNew = {
        title: 'Data',
        start: dates[i - 1].end,
        end: moment(dates[i - 1].end).add(1, 'h').toDate(),
        desc: 'Blank',
    };

    // dates.push(moment(dates[i-1]).add(1, 'h'));
    dates.push(addNew);
    // console.log(`I'm done do this shit`);
    if (moment(dates[i].end).format('LLL') === ed.format('LLL')) {
        console.log(`I'm done`);
        console.log(dates);
        over = true;
    }

    if (i === 1000) {
        console.log(dates);
        over = true;
    }
}
while (over === false);


preMadeEvents.push({
  title: 'Blank',
  start: sd.toDate(),
  end: sd.add(1, 'h').toDate(),
});

const events = preMadeEvents.concat(dates);

console.log('events', events);
export default events;
