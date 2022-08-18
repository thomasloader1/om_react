import React from 'react';
import { Route, Routes } from 'react-router';
import Home from '../Home';

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      
          
      
        <Route path="*" element={
          <main style={{ padding: '1rem' }}>
            <p>There nothing here!</p>
          </main>} />
    </Routes>
    </div>
  );
}



export default App;
