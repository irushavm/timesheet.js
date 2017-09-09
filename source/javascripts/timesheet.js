(function () {
  'use strict';

  /**
   * Creates a new Timesheet
   * @class
   * @param {Object}  opts global config object
   * @param {string}  opts.targetId id of the container to append timesheet elements in
   * @param {boolean} opts.showDates show Dates with each event
   * @param {boolean} opts.labelsBelow show labels below bubble
   * @param {string}  opts.theme theme of the timesheet
   * @param {number}  opts.padYears number of padding sections around the timesheet (aesthetic change)
   * 
   */
  var Timesheet = function (opts) {

    this.theme = opts && opts.theme || 'default';
    this.showDates = opts && opts.showDates;
    this.labelsBelow = opts && opts.labelsBelow;

    if (opts && opts.events) {
      this.events = this.parseEvents(opts.events || []);

      this.bounds = this.events.reduce(function (accBounds, event) {
        if (accBounds.max < event.end) { accBounds.max = event.end.getFullYear() + (opts.padYears || 1); }
        if (!accBounds.min || accBounds.min > event.begin) { accBounds.min = event.begin.getFullYear() - (opts.padYears || 1); }
        return accBounds;
      }, { max: 0 });
    }
    if (typeof document !== 'undefined') {
      this.container = document.querySelector('#' + opts.targetId);
    }
  };

  /**
   * Renders the timesheet with the ID given during setup 
   */
  Timesheet.prototype.render = function () {
    this.container.className = 'timesheet color-scheme-' + this.theme;
    this.createBins();
    this.insertEvents();
  };

  /**
   * Insert data into Timesheet
   */
  Timesheet.prototype.insertEvents = function () {

    var widthMonth = this.container.querySelector('.scale section').offsetWidth;
    var _this = this;
    var html = this.events.map(function (event) {
      var bubble = _this.createBubble(widthMonth, _this.bounds.min, event.begin, event.end);
      return '<li ' + (_this.labelsBelow ? 'style=margin-bottom:' + (_this.showDates ? 30 : 20) + 'px;"' : '') + '>' +
        '<span style="margin-left: ' + bubble.getStartOffset() + 'px; width: ' + bubble.getWidth() + 'px;" class="bubble bubble-' + (event.className || 'default') +
        '" data-duration="' + (event.end ? Math.round((event.end - event.begin) / 1000 / 60 / 60 / 24 / 39) : '') + '"></span>' +
        (_this.showDates ? '<span class="date" ' + (_this.labelsBelow ? ' style="position: absolute; top: 15px; left:' + bubble.getStartOffset() + 'px;"' : '') + '>' + bubble.getDateLabel() + '</span> ' : '') +
        '<span class="label" ' + (_this.labelsBelow ? 'style="position:absolute; top: ' + (_this.showDates ? 30 : 15) + 'px; left:' + bubble.getStartOffset() + 'px;"' : '') + '>' + event.label + '</span>' +
        '</li>';

    });
    this.container.innerHTML += '<ul class="data">' + html.join('') + '</ul>';
  };

  /**
   * Draw section labels
   */
  Timesheet.prototype.createBins = function () {
    var bins = [];

    for (var c = this.bounds.min; c <= this.bounds.max; c++) {
      bins.push('<section>' + c + '</section>');
    }

    this.container.innerHTML = '<div class="scale">' + bins.join('') + '</div>';
    console.log('containerB', this.container.querySelector('.scale').offsetWidth);
    this.container.style.width = this.container.querySelector('.scale').offsetWidth + 'px';
    console.log('c', this.container.style.width);
  };

  /**
   * Parse data string
   */
  Timesheet.prototype.parseDate = function (date) {
    if (date.indexOf('/') === -1) {
      date = new Date(parseInt(date, 10), 0, 1);
      date.hasMonth = false;
    } else {
      date = date.split('/');
      date = new Date(parseInt(date[1], 10), parseInt(date[0], 10) - 1, 1);
      date.hasMonth = true;
    }

    return date;
  };

  /**
   * Parse passed data
   */
  Timesheet.prototype.parseEvents = function (events) {
    var _this = this;
    return events.map(function (event) {
      return {
        begin: event.begin && _this.parseDate(event.begin),
        end: event.end && _this.parseDate(event.end),
        label: event.label,
        className: event.className
      };
    });
  };

  /**
   * Wrapper for adding bubbles
   */
  Timesheet.prototype.createBubble = function (wMonth, min, start, end) {
    return new Bubble(wMonth, min, start, end);
  };

  /**
   * Timesheet Bubble
   */
  var Bubble = function (wMonth, min, start, end) {
    this.min = min;
    this.start = start;
    this.end = end;
    this.widthMonth = wMonth;
  };

  /**
   * Format month number
   */
  Bubble.prototype.formatMonth = function (num) {
    num = parseInt(num, 10);

    return num >= 10 ? num : '0' + num;
  };

  /**
   * Calculate starting offset for bubble
   */
  Bubble.prototype.getStartOffset = function () {
    return (this.widthMonth / 12) * (12 * (this.start.getFullYear() - this.min) + this.start.getMonth());
  };

  /**
   * Get count of full years from start to end
   */
  Bubble.prototype.getFullYears = function () {
    return ((this.end && this.end.getFullYear()) || this.start.getFullYear()) - this.start.getFullYear();
  };

  /**
   * Get count of all months in Timesheet Bubble
   */
  Bubble.prototype.getMonths = function () {
    var fullYears = this.getFullYears();
    var months = 0;

    if (!this.end) {
      months += !this.start.hasMonth ? 12 : 1;
    } else {
      if (!this.end.hasMonth) {
        months += 12 - (this.start.hasMonth ? this.start.getMonth() : 0);
        months += 12 * (fullYears - 1 > 0 ? fullYears - 1 : 0);
      } else {
        months += this.end.getMonth() + 1;
        months += 12 - (this.start.hasMonth ? this.start.getMonth() : 0);
        months += 12 * (fullYears - 1);
      }
    }

    return months;
  };

  /**
   * Get bubble's width in pixel
   */
  Bubble.prototype.getWidth = function () {
    return (this.widthMonth / 12) * this.getMonths();
  };

  /**
   * Get the bubble's label
   */
  Bubble.prototype.getDateLabel = function () {
    return [
      (this.start.hasMonth ? this.formatMonth(this.start.getMonth() + 1) + '/' : '') + this.start.getFullYear(),
      (this.end ? '-' + ((this.end.hasMonth ? this.formatMonth(this.end.getMonth() + 1) + '/' : '') + this.end.getFullYear()) : '')
    ].join('');
  };

  window.Timesheet = Timesheet;
})();