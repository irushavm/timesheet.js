# Timesheet.js
## forked from https://sbstjn.github.io/timesheet.js

Simple JavaScript library to create HTML time sheets. Wrapped in an example project using Middleman …

![https://irushavm.github.io/timesheet.js](https://raw.githubusercontent.com/irushavm/timesheet.js/master/screen.png)

You only have to include `dist/timesheet.js` and `dist/timesheet.css` in your HTML and initialize Timesheet.js with:

```HTML
<div id="timesheet"></div>
```

```javascript
new Timesheet({
  theme: 'default',
  targetId: 'timesheet-default',
  showDates: true,
  labelsBelow: false,
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
```

## Grunt commands

Use `npm run build` to build all JavaScript and StyleSheet files located inside `dist/`. 

Use `npm run start` to start a local web server on [localhost:8080](http://localhost:8080) to customize Timesheet.js, afterwards run `grunt` to compile all needed files.

Use `grunt gh` to generate the site and files available at [sbstjn.github.io/timesheet.js](http://sbstjn.github.io/timesheet.js) into the `gh-pages` folder.

## Changelog

v 1.1.1 - Changed options to an object that accepts an array of events; Added padYears, showDates, and labelsBelow options.


## License

Timesheet.js is licensed under MIT License.
