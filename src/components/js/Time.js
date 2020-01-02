var DateTimeFormat = {
    GetDate: function (dateTime) {
      var nowDate = new Date(dateTime);
      return nowDate.format("dd/mm/yyyy");
    },
    GetTime: function (dateTime) {
      var nowDate = new Date((dateTime.substr(6)));
      return nowDate.format("HH:MM");
    },
    GetFullTime: function (dateTime) {
      var nowDate = new Date((dateTime.substr(6)));
      return nowDate.format("HH:MM:ss");
    },
    GetDateTime: function (dateTime) {
      var nowDate = new Date(parseInt(dateTime.substr(6)));
      return nowDate.format("dd/mm/yyyy -- HH:MM:ss");
    }
  }