import React from 'react';  
import CssBaseline from '@material-ui/core/CssBaseline';
import { LayoutUser } from 'layouts/LayoutUser'; 
import { HomeForm } from 'components/HomeForm'; 

const Home = (props) => {
  return(
    <React.Fragment>
      <CssBaseline />
      <LayoutUser />
      <HomeForm {...props}/>
    </React.Fragment>
  );
}

export default Home; 