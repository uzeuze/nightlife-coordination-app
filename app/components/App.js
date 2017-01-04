import React from 'react';
import Header from './Header';

require('./styles/index.scss');

const App = (props) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default App;
