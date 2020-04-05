import React from 'react';
import ReactDOM from 'react-dom';
import CalendarBoard from './CalendarBoard.jsx';
import GuestsDisplay from  './GuestsDisplay.jsx';
import PriceBreakup from './PriceBreakup.jsx';
import { getMonthDays, getFullYear, getMonthFirstDay, createMonth, getMonth, iterateOverDataArray, calculateNumOfNights } from './helperFunc.js';
import $ from 'jquery';
import '../dist/style.css'


class Help extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      currentYear: null, //calendarComponent
      monthName: null,  //calendarComponent
      monthNumber: null,  //calendarComponent
      grid: [], //monthGrid
      toggleCheckinToDisplayCalendar: false,
      timesToggledonCheckinAndCheckOut: 0,
      displayCheckOut: false,
      checkin: null,  //input from user
      checkout: null,  //input from user
      bookedDates: [], //fetched from db
      displayPriceBreakup: false,
      displayGuestsMenu: false,
      toggleGuestsMenuCount: 0,
      toggleICanHelpButton: false,
      toggleINeedHelpButton: false


    }
    //bookedDates inside state are manually entered mock data for testing
    this.goToNextMonth = this.goToNextMonth.bind(this);
    this.goToPreviousMonth = this.goToPreviousMonth.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onClickCheckinButton = this.onClickCheckinButton.bind(this);
    this.displayCheckOutDate = this.displayCheckOutDate.bind(this);
    this.clearDatesButton = this.clearDatesButton.bind(this);
    this.onToggleICanHelpButton = this.onToggleICanHelpButton.bind(this);
    this.onToggleINeedHelpButton = this.onToggleINeedHelpButton.bind(this);
    this.onHandleGuestsClick = this.onHandleGuestsClick.bind(this);
    this.onHandleCloseGuestsDisplay = this.onHandleCloseGuestsDisplay.bind(this);


  }
  componentDidMount() {
    console.log('window', window.location.href)
    var currentYear = +(new Date().getFullYear());
    var currentMonth = +(new Date().getMonth()) + 1;
    var monthFirstDay = getMonthFirstDay(currentMonth, currentYear)
    var days = getMonthDays(currentMonth)
    var monthName = getMonth(currentMonth)
    //console.log('monthName', typeof monthName)
    //console.log(monthFirstDay)
    var grid = createMonth(days, monthFirstDay);
    this.setState({
      currentYear: currentYear,
      monthName: monthName,
      grid: grid,
      monthNumber: currentMonth
    })

  }
  onClickCheckinButton () {

     this.setState({
       toggleCheckinToDisplayCalendar: !this.state.toggleCheckinToDisplayCalendar,

     })

  }


  //Calendar Component methods
   goToNextMonth () {
     console.log('next')
    var currentYear = this.state.currentYear;
    var currentMonth = this.state.monthNumber
    var newMonth = currentMonth +1;
    console.log('newMonth', newMonth)
    var monthFirstDay = getMonthFirstDay(newMonth, currentYear)
    var days = getMonthDays(newMonth)
    console.log('daysOfNext', days)
    console.log('monthFirstDay', monthFirstDay)
    var monthName = getMonth(newMonth)
    var grid = createMonth(days, monthFirstDay)
    this.setState({
      grid: grid,
      currentYear: currentYear,
      monthName: monthName,
      monthNumber: newMonth
    })
  }
  goToPreviousMonth () {
    console.log('Previous')
   var currentYear = this.state.currentYear;
   var currentMonth = this.state.monthNumber;
   var newMonth = currentMonth -1;
   console.log('newMonth', newMonth)
   var monthFirstDay = getMonthFirstDay(newMonth, currentYear)
   var days = getMonthDays(newMonth)
   console.log('daysOfNext', days)
   console.log('monthFirstDay', monthFirstDay)
   var monthName = getMonth(newMonth)
   var grid = createMonth(days, monthFirstDay)
   this.setState({
     grid: grid,
     currentYear: currentYear,
     monthName: monthName,
     monthNumber: newMonth
   })
 }
 onDayClick(e) {
   console.log('onDayClick', e.target.id)
  var checkInDate = e.target.id;
  var clickedTimes = this.state.timesToggledonCheckinAndCheckOut;
  var bookedDates = this.state.bookedDates;
  if (!bookedDates.includes(checkInDate) && checkInDate !== 'empty') {
  this.setState({
    timesToggledonCheckinAndCheckOut: clickedTimes+1
  })
  if (this.state.timesToggledonCheckinAndCheckOut < 1) {

   var newStr = checkInDate.replace('-', '/')
   console.log('newStr', newStr)
   newStr = '2020/' + newStr;
    this.setState({
      checkin: newStr,
      displayCheckOut: !this.state.displayCheckOut
    })
  }
  }
  if (this.state.checkin) {
    this.displayCheckOutDate(e);
  }

 }

 displayCheckOutDate (e) {
 console.log('went in displayCheckOutDate')
  var checkOutDate = e.target.id;
  console.log('checkOutDate', checkOutDate)
  if (this.state.checkin) {
  var checkInDate = this.state.checkin;
  console.log('checkInDate', checkInDate)
  var checkIn = checkInDate.slice(5)
  var checkInFormatted = checkIn.replace('/', '-');
  var numOfNights = calculateNumOfNights(checkInFormatted, checkOutDate)
  this.setState({numOfNights: numOfNights})
  }
  var newStr = checkOutDate.replace('-', '/');
  newStr = '2020/' + newStr;


    this.setState({
      checkout: newStr,
      toggleCheckinToDisplayCalendar: !this.state.toggleCheckinToDisplayCalendar,
      displayPriceBreakup: true
    })


 }
 clearDatesButton () {
   console.log('clear Dates')

   this.setState({
     checkin: null,
     checkout: null,
     timesToggledonCheckinAndCheckOut: 0,
     numOfNights: null,
     displayCheckOut: true,
     displayPriceBreakup: false
   })
 }

onToggleINeedHelpButton () {
  console.log('click on I needHelp')
  this.setState({
    toggleINeedHelpButton: !this.state.toggleINeedHelpButton,
    toggleICanHelpButton: false
  })
}

onToggleICanHelpButton () {
  console.log('click on I CanHelp')
  this.setState({
    toggleICanHelpButton: !this.state.toggleICanHelpButton,
    toggleINeedHelpButton: false
  })
}
 onHandleGuestsClick () {

   if (this.state.toggleGuestsMenuCount === 0) {
   this.setState({
     displayGuestsMenu: true,
     toggleGuestsMenuCount: this.state.toggleGuestsMenuCount+1
   })
  } else {
    this.setState({
      displayGuestsMenu: false,
      toggleGuestsMenuCount: this.state.toggleGuestsMenuCount-1
    })
  }
 }

 onHandleCloseGuestsDisplay () {
   this.setState({
     displayGuestsMenu: false,
     toggleGuestsMenuCount: 0
   })
 }


  render () {
    var style;
    return (
      <div className="mainFrame">
      <div><button onClick={this.onToggleICanHelpButton}>I Can Help</button><span>&#9756;     &#9758;</span><button onClick={this.onToggleINeedHelpButton}>I need Help</button></div>
      <br></br>
      <div>{this.state.toggleICanHelpButton &&
      <div>
      <div className="dateFrame">
      <span>&#10057;</span><button className="myAvailableDates" onClick={this.onClickCheckinButton}>Dates I can help</button><span>&#10057;</span>

     </div>
    <div>{this.state.toggleCheckinToDisplayCalendar &&<CalendarBoard monthNum={this.state.monthNumber} month={this.state.monthName} year={this.state.currentYear}monthGrid={this.state.grid} onNext={this.goToNextMonth} onPrevious={this.goToPreviousMonth} onDayClick={this.onDayClick} onClear={this.clearDatesButton} booked={this.state.bookedDates}/>}</div>
  <br></br>

    <div className="guestsFrame">
      <span className="iHelp" onClick={this.onHandleGuestsClick}>{this.state.guests} I can offer help on</span>
      </div>
      <div className="guestsMenu">
    {this.state.displayGuestsMenu && <GuestsDisplay onClose={this.onHandleCloseGuestsDisplay}/>} <br></br></div>

    </div>


      }</div>


        <div>{this.state.toggleINeedHelpButton && <div>
      <div className="dateFrame"><span>&#10057;</span>
     <button className="myAvailableDates" onClick={this.onClickCheckinButton}>Dates I need help</button><span>&#10057;</span>

     </div>
    <div>{this.state.toggleCheckinToDisplayCalendar &&<CalendarBoard monthNum={this.state.monthNumber} month={this.state.monthName} year={this.state.currentYear}monthGrid={this.state.grid} onNext={this.goToNextMonth} onPrevious={this.goToPreviousMonth} onDayClick={this.onDayClick} onClear={this.clearDatesButton} booked={this.state.bookedDates}/>}</div>
  <br></br>
  <div></div>
        <PriceBreakup /></div>}</div>
      <br></br>


        <button className="helpButton">Match</button></div>


    )
  }
}


ReactDOM.render(<Help/>, document.getElementById('help'))