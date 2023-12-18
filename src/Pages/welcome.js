import React from 'react';
import Login from './loginpage';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome() {
  return (
    <div>
        <h2 className='text-center m-2'>Welcome to chat app</h2>
      <Login></Login>
    </div>
  )
}

export default Welcome;
