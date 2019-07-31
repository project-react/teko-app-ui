import React from 'react'; 
import {Route, Redirect, Switch} from 'react-router-dom';
import {ProFileForm} from 'components/Admin/ProFileForm'; 
import {ListUserForm} from 'components/Admin/ListUserForm'; 
import {AddUserForm} from 'components/Admin/AddUserForm'; 

const AdminRoute = () => {
  return (
    <Switch>
      <Route path='/admin/listuser' component={ListUserForm} />
      <Route path='/admin/profile' component={ProFileForm} />
      <Route path='/admin/adduser' component={AddUserForm} />
      <Redirect from="/" to="/admin/profile" />
    </Switch>
  )
}

export default AdminRoute