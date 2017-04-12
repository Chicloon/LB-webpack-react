import moment from 'moment';

const config = {
  min: moment('10:00', 'HH:mm').format('HH:mm'),
  max: moment('18:00', 'HH:mm').format('HH:mm'),
  today: moment(new Date()).format('YY/MM/DD'),
};

config.startDate = moment(`${config.today} 10:00`, 'YY/MM/DD HH:mm').toDate();
config.endDate = moment(config.startDate).add(1, 'months').toDate();

export default config;
