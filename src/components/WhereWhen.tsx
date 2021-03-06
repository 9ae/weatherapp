import React, { useContext } from 'react';
import { css } from '@emotion/css'
import { IoLocationSharp } from 'react-icons/io5'
import dateFormat from "dateformat";
import AppContext from '../context';

const dateStyle = css({
  marginBlockStart: 'var(--space-xs)',
  marginBlockEnd: 0,
  fontSize: 'var(--size-s)'
})

const placeStyle = css({
  fontSize: 'var(--size-m)',
  fontWeight: 600
})

const style = css({
  textAlign: 'left',
  '@media (min-width:768px)': {
    textAlign: 'center'
  }
})

const WhereWhen = () => {
  const { city } = useContext(AppContext)

  return (<div className={style}>
    <IoLocationSharp size={16} /> <span className={css(placeStyle)}>{city}</span>
    <p className={dateStyle}>{dateFormat(new Date(), 'dddd, mmm d, yyyy')}</p>
  </div>)
};

export default WhereWhen;