// components/Loading.js
import React from 'react';
import './loading.scss';

const Loading = ({ loading }: {loading: boolean}) => {
  return loading ? (
    <div className={'w-full h-[65vh] z-[1000] flex justify-center items-center'}>
      <div className={'loader'}></div>
    </div>
  ) : <></>;
};

export default Loading;
