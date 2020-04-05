import React from 'react';
import WeekRow from './WeekRow.jsx';
//import createMonth from './help.js'

var CalendarBoard = (props) => {

 //const arr = createMonth(31, 6)

 return (
  <div className="calendarFrame">
    <button className="goLeft" onClick={props.onPrevious}>&larr;</button><span>{props.month} {props.year}</span>
    <button className="goRight" onClick={props.onNext}>&rarr;</button>

    <table className="calendarBoard" align="center">
      <thead>
        <td>Su</td>
        <td>Mo</td>
        <td>Tu</td>
        <td>We</td>
        <td>Th</td>
        <td>Fr</td>
        <td>Sa</td>
      </thead>
       <tbody>

        {props.monthGrid.map((dataArr, i) => {
          //maybe change <tb> to <tbody> as well?
          //maybe remove the <tr>s from below?
          return <WeekRow onDayClick={props.onDayClick} month={props.monthNum}key={i} week={dataArr} booked={props.booked}/>
        })}
        </tbody>
    </table>
    <button className="clearButton"
    onClick={props.onClear}>Clear Dates</button>
  </div>
 )
      }

export default CalendarBoard;