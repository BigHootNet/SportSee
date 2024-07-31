import {ReactNode} from 'react'

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
  } from "react-router-dom";

import Home from '../pages/Home'
import Login from '../pages/Login'
import Error404 from '../pages/Error404'
import Header from '../components/Header'
import SideBar from '../components/SideBar';

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({children}: LayoutProps) => <>
    <SideBar />
    <Header />
    <main>{children}</main>
</>

export const Router = () => (

<BrowserRouter>
  <Layout>
    <Switch>
      <Route exact path="/">
        <Redirect to="/login"/>
      </Route>
    <Route exact path={"/login"} component={Login} />
    <Route exact path={"/user/:userId"} component={Home} />
    <Route exact path={"*"} component={Error404} />
  </Switch>
 </Layout>
</BrowserRouter>
);

export default Router;