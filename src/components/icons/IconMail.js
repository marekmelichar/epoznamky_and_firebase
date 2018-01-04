import React from 'react';

const IconMail = (props) => {
  const fill = props.fill || 'blue'

  return (
    <svg className="mail-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" aria-labelledby="title">
      <title id="title">Mail</title>
      <path fill={fill} d="M5.315 9.274l7.735 6.726-7.737 6.728c-0.194-0.184-0.313-0.445-0.313-0.735v-11.986c0-0.289 0.121-0.549 0.315-0.733zM27.687 9.272c0.194 0.184 0.313 0.445 0.313 0.735v11.986c0 0.289-0.121 0.549-0.315 0.733l-7.735-6.726 7.737-6.728zM19.202 16.651l7.298 6.349h-20l7.298-6.349 2.702 2.349 2.702-2.349zM6.004 8c-1.107 0-2.004 0.895-2.004 1.994v12.012c0 1.101 0.89 1.994 2.004 1.994h20.993c1.107 0 2.004-0.895 2.004-1.994v-12.012c0-1.101-0.89-1.994-2.004-1.994h-20.993zM16.5 17.7l-10-8.7h20l-10 8.7z"></path>
    </svg>
  )
}

export default IconMail;
