import React from 'react'; 
import "antd/dist/antd.css";
import { Layout, Menu , Icon, Breadcrumb} from 'antd';
import AdminRoute from 'routers/AdminRoute'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { ButtonLogout } from 'components/shared/ButtonLogout'

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin = (props) => {
  return (
    <Router>
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
        <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">User</span>
                <Link to="/admin/profile" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="team" />
                <span className="nav-text">List User</span>
                <Link to="/admin/listuser" />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user-add" />
                <span className="nav-text">Add User</span>
                <Link to="/admin/adduser" />
              </Menu.Item>
            </Menu>
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
              <Header style={{ background: '#fff', padding: 19 }} >
                <ButtonLogout {...props}/>
              </Header>
              <Breadcrumb style={{ margin: 20}}>
                <Breadcrumb.Item href="/home">
                  <Icon type="home" />
                  <span>Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <Icon type="user" />
                  <span>Admin</span>
                </Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <AdminRoute />
              </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Router>
  )
}

export default LayoutAdmin