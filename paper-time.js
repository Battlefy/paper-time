Polymer('paper-time', {
  publish: {
    /**
       * The `format` attribute details http://momentjs.com/docs/#/parsing/string-format/.
       *
       * @attribute format
       * @type string
       */
    format: 'h:mm A',
    date: null,
    hour: null,
    minute: null,
    peroid: null
  },
  created: function() {
    this.items = [];
    this.updateNowDate = this.debounce(this._updateNowDate, 1000);
  },

  ready: function() {
    this.now = moment();
  },
  observe: {
    date: 'updateNowDate',
    now: 'updateInputDate'
  },
  toggleInput: function(e) {
    this.$.timer.className = this.$.timer.className ? '' : 'show';
  },
  incHour: function() {
    this.now = this.now.add(1, 'hours');
    this.updateNowDate();
    this.updateInputDate();
  },
  decHour: function() {
    this.now = this.now.subtract(1, 'hours');
    this.updateNowDate();
    this.updateInputDate();
  },
  incMinute: function() {
    this.now = this.now.add(1, 'minutes');
    this.updateNowDate();
    this.updateInputDate();
  },
  decMinute: function() {
    this.now = this.now.subtract(1, 'minutes');
    this.updateNowDate();
    this.updateInputDate();
  },
  incPeriod: function() {
    this.now = this.now.add(12, 'hours');
    this.updateNowDate();
    this.updateInputDate();
  },
  decPeriod: function() {
    this.now = this.now.subtract(12, 'hours');
    this.updateNowDate();
    this.updateInputDate();
  },
  _updateNowDate: function() {
    var now = this.date ? moment(this.date, this.format) : moment();
    if (!now.isValid()) { return; }
    this.now = now;
  },
  updateInputDate: function() {
    this.date = this.now.format(this.format);
    this.hour = this.now.hours();
    this.minute = this.now.minutes();
    this.period = 'AM';

    if (this.hour > 12) {
      this.hour = this.hour - 12;
      this.period = 'PM';
    }

    if (this.hour < 10) {
      this.hour = '0' + this.hour;
    }

    if (this.minute < 10) {
      this.minute = '0' + this.minute;
    }
  },
  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      }, wait);
      if (immediate && !timeout) func.apply(context, args);
    };
  },
  get value() {
    var hour = this.now.hours();
    var minute = this.now.minutes();
    var period = 'AM';

    if (hour > 12) {
      hour = hour - 12;
      period = 'PM';
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    if (minute < 10) {
      minute = '0' + minute;
    }

    return hour + ':' + minute + ' ' + period;
  }
});
