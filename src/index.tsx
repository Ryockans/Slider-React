import React from 'react';
import ReactDOM from 'react-dom/client';
import Slider from './components/slider';
import styles from './main.module.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className={styles.container}>
    <Slider>
      <h2>First</h2>
      <h2>Second</h2>
      <h2>Third</h2>
      <h2>Fourth</h2>
      <h2>Fifth</h2>
      <h2>Sixth</h2>
      <h2>Seventh</h2>
      <h2>Eighth</h2>
    </Slider>
  </div>
);
