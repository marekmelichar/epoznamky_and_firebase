import React from 'react';

const IconLock = (props) => {
  const fill = props.fill || 'blue'

  return (
    <svg className="lock-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
      <title id="title">Lock</title>
      <path fill={fill} d="M7 23h19v-5.994c0-1.108-0.891-2.006-1.997-2.006h-15.005c-1.103 0-1.997 0.897-1.997 2.006v5.994zM7 24v2h0.75l1.5-2h-2.25zM7 27c0.003 1.105 0.893 2 1.997 2h15.005c1.101 0 1.994-0.894 1.997-2h-19zM26 26v-2h-0.75l-1.5 2h2.25zM9 14v-3.501c0-4.143 3.358-7.499 7.5-7.499 4.134 0 7.5 3.358 7.5 7.499v3.501c1.659 0.005 3 1.35 3 3.009v9.981c0 1.673-1.347 3.009-3.009 3.009h-14.982c-1.663 0-3.009-1.347-3.009-3.009v-9.981c0-1.67 1.342-3.005 3-3.009v0 0zM8.75 26h2l1.5-2h-2l-1.5 2zM11.75 26h2l1.5-2h-2l-1.5 2zM14.75 26h2l1.5-2h-2l-1.5 2zM17.75 26h2l1.5-2h-2l-1.5 2zM20.75 26h2l1.5-2h-2l-1.5 2zM10 14h1v-3.491c0-3.048 2.462-5.509 5.5-5.509 3.031 0 5.5 2.466 5.5 5.509v3.491h1v-3.507c0-3.586-2.917-6.493-6.5-6.493-3.59 0-6.5 2.908-6.5 6.493v3.507zM12 14h9v-3.499c0-2.486-2.020-4.501-4.5-4.501-2.485 0-4.5 2.009-4.5 4.501v3.499z"></path>
    </svg>
  )
}

export default IconLock;
