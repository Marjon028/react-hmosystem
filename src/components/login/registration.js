import React, { PureComponent } from 'react'

export class registration extends PureComponent {
  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Username" name="username" /><br />
          <input type="password" placeholder="Password" name="password" /><br />
          <input type="email" placeholder="Email" name="email" /><br />
          <input type="text" placeholder="First Name" name="firstname" /><br />
          <input type="text" placeholder="Middle Name" name="middlename" /><br />
          <input type="text" placeholder="Last Name" name="lastname" /><br />
          <input type="text" placeholder="Mobile Number" name="mobilenumber" /><br />
          <input type="text" placeholder="Department Code" name="departmentcode" /><br />
          <input type="text" placeholder="Role ID" name="roleid" /><br />
          <input type="text" placeholder="Address" name="address" /><br />
          <input type="text" placeholder="Location Code" name="locationcode" /><br />
          <input type="text" placeholder="User Status Code" name="userstatuscode" /><br />
          <input type="text" placeholder="Remarks" name="remarks" /><br />
          <input type="text" placeholder="Transact By" name="transactby" /><br />
          <input type="text" placeholder="Transact Type" name="transacttype" /><br />
          <input type="text" placeholder="Status" name="status" /><br />
        </form>
      </div>
    )
  }
}

export default registration
