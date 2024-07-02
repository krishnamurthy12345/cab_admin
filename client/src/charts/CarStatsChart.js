

import React, { useState,useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import '../charts/CarStatsChart.css';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,

} from 'recharts';

  const initialData = [
  {
    name: 'Jan',
    bs: 2000,
    cs: 1400,
    amt: 1000,
  },
  {
    name: 'Feb',
    bs: 1500,
    cs: 1398,
    amt: 1510,
  },
  {
    name: 'Mar',
    bs: 1800,
    cs: 900,
    amt: 2000,
  },
  {
    name: 'Apr',
    bs: 2200,
    cs: 2000,
    amt: 2500,
  },
  {
    name: 'May',
    bs: 2500,
    cs: 1398,
    amt: 2210,
  },
  {
    name: 'Jun',
    bs: 2000,
    cs: 1500,
    amt: 2290,
  },
  {
    name: 'Jul',
    bs: 4000,
    cs: 2400,
    amt: 2400,
  },
  {
    name: 'Aug',
    bs: 3000,
    cs: 1398,
    amt: 2210,
  },
  {
    name: 'Sep',
    bs: 2000,
    cs: 1800,
    amt: 2290,
  },
  {
    name: 'Oct',
    bs: 4000,
    cs: 2400,
    amt: 2400,
  },
  {
    name: 'Nov',
    bs: 3000,
    cs: 1398,
    amt: 2210,
  },
  {
    name: 'Dec',
    bs: 2000,
    cs: 800,
    amt: 2290,
  },
];


const Example = () => {
  const [data, setData] = useState(initialData);

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
  }, []);


  return (
    <div className='container  mt-4'>
      <div className='row box1'>
        <div className=' col-10'>
        <h2>status</h2>

        <BarChart width={950} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="bs" fill="green" />
          <Bar dataKey="cs" fill="red" />

        </BarChart>
      </div>
      <div className='col-1'>
      <FontAwesomeIcon className='btnn' onClick={handleRefresh} icon={faArrowsRotate} bounce />
      
      </div>
        </div>
    </div>
  );
};

export default Example;
