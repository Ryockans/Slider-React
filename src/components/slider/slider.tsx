import React, {FC, useMemo, useState} from 'react';
import styles from './slider.module.css'
import {composeClasses} from "./compose-classes";

interface SliderProps {
  children: React.ReactElement[];
  slidesToShow?: number;
  slidesToScroll?: number;
  sliderWidth?: number;
  sliderHeight?: number;
  animationTime?: number;
}

const Slider: FC<SliderProps> = ({
                                   children,
                                   slidesToShow = 2,
                                   slidesToScroll = 1,
                                   sliderWidth = 750,
                                   sliderHeight = 300,
                                   animationTime = 500
                                 }) => {

  let isLooping = false;
  const [isClickable, setIsClickable] = useState(true);
  const [currentAnimationTime, setCurrentAnimationTime] = useState(animationTime);
  const [activeSlide, setActiveSlide] = useState(0);
  const ItemWidth = (sliderWidth - 100 - (slidesToShow - 1) * 20)/slidesToShow;
  const dots = [];
  const dotsAmount = Math.ceil((children.length - slidesToShow) / slidesToScroll);
  const translation = useMemo(() => {
    return {
      transition: `transform ${currentAnimationTime}ms`,
      transform: `translate3d(-${(activeSlide + slidesToShow) * (ItemWidth + 20)}px, 0, 0)`
    }
  }, [currentAnimationTime, activeSlide]);

  const prevSlide = () => {
    setIsClickable(false);
    const prev = activeSlide - slidesToScroll;
    if (prev < 0) {
      setActiveSlide(slide => slide - slidesToShow);
      setTimeout(() => {
        setActiveSlide(children.length - slidesToShow);
        setTimeout(() => setCurrentAnimationTime(animationTime), currentAnimationTime);
      }, currentAnimationTime + 100);

    } else {
      setActiveSlide(slide => slide - slidesToScroll);
    }
  }

  const nextSlide = () => {
    setIsClickable(false);
    const next = activeSlide + slidesToScroll;
    if (next > children.length - slidesToShow) {
      setActiveSlide(slide => slide + slidesToShow);
      setTimeout(() => {
        setActiveSlide(0);
        setTimeout(() => setCurrentAnimationTime(animationTime), currentAnimationTime);
      }, currentAnimationTime + 100);
    } else {
      setActiveSlide(slide => slide + slidesToScroll);
    }
  }

  const animationHandler = () => {
    setIsClickable(true);
    if (activeSlide < 0 || activeSlide >= children.length) {
      console.log('es')
      setCurrentAnimationTime(0)
    }
  }

  return (
    <div className={styles.wrapper} style={{width: sliderWidth + 'px', height: sliderHeight + 'px'}}>
      <button disabled={!isClickable} className={composeClasses(styles.button, styles.Previous)} onClick={prevSlide}/>
      <div className={styles.display}>

        <ul className={styles.slider} style={translation} onTransitionEnd={animationHandler}>

          {children.map((elem, index) => {
            if (index < children.length - slidesToShow) return;
          return (
            <li className={styles.item + ' cloned'} style={
              {minWidth: `${ItemWidth}px`}
            } key={index + 'cloned'}>
              {elem}
            </li>
          )
          }
          )}

          {children.map((elem, index) => {
            return (
              <li className={styles.item} style={
                {minWidth: `${ItemWidth}px`}
              } key={index}>
                {elem}
              </li>
            )
          })
          }

          {children.map((elem, index) => {
              if (index >= slidesToShow) return;
              return (
                <li className={styles.item + ' cloned'} style={
                  {minWidth: `${ItemWidth}px`}
                } key={index + 'cloned'}>
                  {elem}
                </li>
              )
            }
          )}

        </ul>
      </div>

      <button disabled={!isClickable} className={composeClasses(styles.button, styles.Next)} onClick={nextSlide}/>

      <ul className={styles.dots}>
        {
          children.map((item, index) => {
            if (index % slidesToScroll === 0 && dots.length <= dotsAmount) {
              const dotClass = (index === activeSlide) ? composeClasses(styles.dot, styles.Active) : styles.dot;
              dots.push(index);
              return (
                <li key={index}>
                  <button className={dotClass} onClick={() => setActiveSlide(index)}/>
                </li>
              )
            }
          })
        }
      </ul>
    </div>
  );
}

export default Slider;
