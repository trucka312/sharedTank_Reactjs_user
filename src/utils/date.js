import moment from 'moment';

export const formatDate = (date, format) => {
    const formattedDate = moment(date).format(format);
    return formattedDate;
}

export const formatGMT = (date) => {
    const formattedGMT = moment(date).toDate();
    return formattedGMT;
}


export const handleShowTime = (time) => {
    if (time) {
      const total = moment(moment()).diff(time);
      const days = Math.floor(total / 1000 / 60 / 60 / 24);
      const dayNowInWeek = moment().isoWeekday();
      const daySendedInWeek = moment(time).isoWeekday();

      let formatDate = "";

      if (days <= 7) {
        formatDate =
          daySendedInWeek === dayNowInWeek
            ? moment(time).format("HH:mm")
            : daySendedInWeek === 1
            ? `Thứ 2 ${moment(time).format("HH:mm")}`
            : daySendedInWeek === 2
            ? `Thứ 3 ${moment(time).format("HH:mm")}`
            : daySendedInWeek === 3
            ? `Thứ 4 ${moment(time).format("HH:mm")}`
            : daySendedInWeek === 4
            ? `Thứ 5 ${moment(time).format("HH:mm")}`
            : daySendedInWeek === 5
            ? `Thứ 6 ${moment(time).format("HH:mm")}`
            : daySendedInWeek === 6
            ? `Thứ 7 ${moment(time).format("HH:mm")}`
            : daySendedInWeek === 7
            ? `Chủ nhật ${moment(time).format("HH:mm")}`
            : "";
      } else {
        formatDate = `${moment(time).format("DD/MM/YYYY HH:mm")}`;
      }
      return formatDate;
    }
    return "";
  };

  export const getDateForChartHour = () => {
    var from = moment().format("YYYY-MM-DD");
    var to = from;
    return {
      from,
      to,
    };
  };

  export const getDateForChartWeek = () => {
    if (moment().day() == 0) {
      return {
        from: moment().subtract(6, "days").format("YYYY-MM-DD"),
        to: moment().format("YYYY-MM-DD"),
      };
    }
    var weekStart = moment().clone().weekday(1).format("YYYY-MM-DD");
    var from = weekStart;
    var to = moment().format("YYYY-MM-DD");
    return {
      from,
      to,
    };
  };

  export const getDateForChartMonth = () => {
    var monthStart = moment().startOf("month").format("YYYY-MM-DD");
    var from = monthStart;
    var to = moment().format("YYYY-MM-DD");
    return {
      from,
      to,
    };
  };

  export const getDateForChartYear = () => {
    var monthStart = moment().format("YYYY");
    var from = "01-01-" + monthStart;
    var to = moment().format("YYYY-MM-DD");
    return {
      from,
      to,
    };
  };

  // func return today
  export const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
  
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    
    return formattedDate;
  }

  // func return 2 date , first is the first day on this month , second is tday
  export const getMonth = () => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    // Định dạng ngày đầu tháng
    const year = firstDayOfMonth.getFullYear();
    const month = (firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0');
    const day = firstDayOfMonth.getDate().toString().padStart(2, '0');
    const firstDayFormatted = `${year}-${month}-${day}`;
  
    // Định dạng ngày hôm nay
    const today = currentDate.toISOString().slice(0, 10);
  
    return { firstDayOfMonth: firstDayFormatted, today };
  }

  export const getWeek = () =>  {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); 
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(diff);
  
    const year = firstDayOfWeek.getFullYear();
    const month = (firstDayOfWeek.getMonth() + 1).toString().padStart(2, '0');
    const day = firstDayOfWeek.getDate().toString().padStart(2, '0');
    const firstDayFormatted = `${year}-${month}-${day}`;
  
    const todayYear = currentDate.getFullYear();
    const todayMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const todayDay = currentDate.getDate().toString().padStart(2, '0');
    const todayFormatted = `${todayYear}-${todayMonth}-${todayDay}`;
  
    return { firstDayOfWeek: firstDayFormatted, today: todayFormatted };
  }