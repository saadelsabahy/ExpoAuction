import moment from 'moment';

export const calculateTimeDifferance = (
   startDate,
   startTime,
   endDate,
   endTime
) => {
   const start = `${startDate} ${startTime}`;
   const end = `${endDate} ${endTime}`;

   const diff = moment(start, 'DD/MM/YYYY LT').diff(end);

   return diff;
};
