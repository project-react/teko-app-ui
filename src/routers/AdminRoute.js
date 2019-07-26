import React from 'react'; 
import { Route, Redirect } from 'react-router-dom';
import { ProFileForm } from 'components/Admin/ProFileForm'
import { ListUserForm } from 'components/Admin/ListUserForm'

const AdminRoute = () => {
  return (
    <div>
      <Route path='/admin/listuser' component={ListUserForm} />
      <Route path='/admin/profile' component={ProFileForm} />
      <Redirect from="/" to="/admin/profile" />
    </div>
  )
}

export default AdminRoute