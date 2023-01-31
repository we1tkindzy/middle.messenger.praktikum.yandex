const MONTHS: Indexed = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dateFormatting = (date: string) => {
  let transformDate;

  if (!!date) {
    const newDate = new Date(date);

    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    transformDate = `${hours}:${minutes} ${day} ${MONTHS[month]} ${year}`;
  } else {
    transformDate = '';
  }

  return transformDate;
};

export default dateFormatting;
