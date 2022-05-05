import React, { useContext } from 'react';
import { css } from '@emotion/css'

import AppContext, { AppAction, ActionType } from '../context';
import { TempUnit } from '../types';

type SwitchProps = {
  dispatch: React.Dispatch<AppAction>
}

const SwitchTemp: React.FC<SwitchProps> = ({ dispatch }) => {
  const ctx = useContext(AppContext);
  const onToogle = () => {
    dispatch({ type: ActionType.ToggleTempUnit })
    //TODO trigger a refetch from API
  }
  const isF = ctx.tempUnit === TempUnit.F;
  return (<form onClick={onToogle}>
    <input type="radio" name="tempunit" value="F" checked={isF} />
    <input type="radio" name="tempunit" value="C" checked={!isF} />
  </form>)
};

export default SwitchTemp;