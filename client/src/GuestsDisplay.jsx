import React from 'react';

var GuestsDisplay = (props) => {


  return (
  <div>
    <div>
    <form >

          <br></br>
          <select >
            <option>Help with Groceries</option>
            <option>Host a zoom meetup</option>
            <option>Other</option>
          </select>

      </form>
      <br></br>
    <form >
        <label>
          Join an organization:
          <br></br>
          <select >
            <option value="GHO">GHO</option>
            <option value="TTU">RTU</option>
            <option value="QMR">QMR</option>
            <option value="POP">POP</option>
          </select>
        </label>
      </form>
  </div>
  <button className="closeButton"
  onClick={props.onClose}>Close</button>
  </div>
  )
}


export default GuestsDisplay;