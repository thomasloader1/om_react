import React from 'react';
import { Route, Routes } from 'react-router';
import PasarelaApp from '../PasarelaCobros/App';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PasarelaApp />} />

      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
