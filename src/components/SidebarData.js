import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'USER',
    path: '/user',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'GRAPH',
    path: '/graph',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
//   {
//     title: 'FORM',
//     //path: '/team',
//     icon: <IoIcons.IoMdPeople />,
//     cName: 'nav-text'
//   },
//   {
//     title: 'SETTING',
//     //path: '/messages',
//     icon: <FaIcons.FaEnvelopeOpenText />,
//     cName: 'nav-text'
//   },
];