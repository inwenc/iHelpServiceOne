import React from 'react'

var PriceBreakup = (props) => {

  return (
    <div>
    <form >
        <label className="iHelp">
          Things I need help with:
          <br></br>
          <select >
            <option>Help with Groceries</option>
            <option>Find a counselor</option>
            <option>Other</option>
          </select>
        </label>
      </form>
      <br></br>
        <label>
          Create an organization:
          <br></br>
          <form>
        <label>
         Name
         <input type="text" />
        </label>
        <input type="submit" value="Create" />
        </form>
        </label>

  </div>

  )
}

export default PriceBreakup;