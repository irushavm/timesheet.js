/* global Lib, Timesheet */

(function () {
  'use strict';

  Lib.ready(function () {

    var TS = new Timesheet({
      theme: 'default',
      targetId: 'timesheet-default',
      showDates: true,
      labelsBelow: true,
      padYears: 2,
      events: [
        { begin: '2002', end: '09/2002', label: 'A freaking awesome time', className: 'lorem' },
        { begin: '06/2002', end: '09/2003', label: 'Some great memories', className: 'ipsum' },
        { begin: '2003', label: 'Had very bad luck' },
        { begin: '10/2003', end: '2006', label: 'At least had fun', className: 'dolor' },
        { begin: '02/2005', end: '05/2006', label: 'Enjoyed those times as well', className: 'ipsum' },
        { begin: '07/2005', end: '09/2005', label: 'Bad luck again', className: 'default' },
        { begin: '10/2005', end: '2008', label: 'For a long time nothing happened', className: 'dolor' },
        { begin: '01/2008', end: '05/2009', label: 'LOST Season #4', className: 'lorem' },
        { begin: '01/2009', end: '05/2009', label: 'LOST Season #4', className: 'sit' },
        { begin: '02/2010', end: '05/2010', label: 'LOST Season #5', className: 'lorem' },
        { begin: '09/2008', end: '06/2010', label: 'FRINGE #1 & #2', className: 'ipsum' }
      ]
    });

    TS.render();

    document.querySelector('#switch-dark').addEventListener('click', function () {
      document.querySelector('body').className = 'index black';
    });

    document.querySelector('#switch-light').addEventListener('click', function () {
      document.querySelector('body').className = 'index white';
    });
  });
})();
