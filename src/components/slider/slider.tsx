import React, {FC} from 'react';
import styles from './slider.module.css'
import {composeClasses} from "./compose-classes";

interface SliderProps {
  children: React.ReactElement[];
  numberOfItems?: number;
}

const Slider:FC<SliderProps> = ({children}) => {
  return (
    <div className={styles.wrapper}>
      <button className={composeClasses(styles.button, styles.Previous)}></button>
      <div className={styles.display}>
        <ul className={styles.slider}>
          {children.map(elem => {
            return (
              <li className={styles.item}>
                {elem}
              </li>
            )
          })
          }
        </ul>
      </div>
      <button className={composeClasses(styles.button, styles.Next)}></button>
    </div>
  );
}

export default Slider;
