import React from 'react';  
import { LayoutUser } from 'layouts/LayoutUser'
import { HomeForm } from 'components/HomeForm'; 

const Home = (props) => {
  return(
    <React.Fragment>
      <LayoutUser />
      <HomeForm {...props}/>
    </React.Fragment>
  );
}

export default Home; 