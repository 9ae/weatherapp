import React, { useContext } from 'react';
import { css } from '@emotion/css'

import AppContext, { AppAction, ActionType } from '../context';
import { TempUnit } from '../types';
import { temperatureText } from './styleVars';

const labelStyle = css({
  ...temperatureText,
  display: 'inline-block',
  width: '25px',
  textAlign: 'center' as 'center',
  fontWeight: 600,
  zIndex: 10,
  fontSize: 'var(--size-s)',
  position: 'absolute',
  top: '2px'
});

type SwitchProps = {
  dispatch: React.Dispatch<AppAction>
}
const SwitchTemp: React.FC<SwitchProps> = ({ dispatch }) => {
  const ctx = useContext(AppContext);
  const onToogle = () => {
    dispatch({ type: ActionType.ToggleTempUnit })
  }
  const isF = ctx.tempUnit === TempUnit.F;

  const formStyle = css({
    backgroundColor: 'var(--color-blue-medium)',
    height: '24px',
    width: '55px',
    borderRadius: '12px',
    zIndex: 0,
    position: 'relative',
    cursor: 'pointer',
    ':before': {
      content: '" "',
      zIndex: 1,
      display: 'block',
      width: '20px',
      height: '20px',
      borderRadius: '10px',
      position: 'absolute',
      backgroundColor: 'white',
      left: isF ? '32px' : '3px',
      top: '2px',
      transition: 'left 0.5s'
    }
  });

  return (<div onClick={onToogle} className={formStyle}>
    <span className={labelStyle} style={{ left: 0, color: !isF ? 'var(--color-blue-dark)' : 'white' }} >C</span>
    <span className={labelStyle} style={{ right: 0, color: isF ? 'var(--color-blue-dark)' : 'white' }} >F</span>
  </div >)
};

export default SwitchTemp;