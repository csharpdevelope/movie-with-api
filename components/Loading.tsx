// components/Loading.js
import React from 'react';
import './loading.scss';

const Loading = ({ loading }: {loading: boolean}) => {
  return loading ? (
    <div className={'overlay'}>
      <div className={'loader'}></div>
    </div>
  ) : <></>;
};

export default Loading;
