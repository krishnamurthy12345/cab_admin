import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../pageui/progras.css';
function Prograss() {
  const [percentage, setPercentage] = useState(0);
  const [percent, setPercent] = useState(0);
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 70) {
        setPercentage(percentage + 1);
      }
      if (percentage < 40) {
        setPercent(percent + 1);
      }
      if (percentage < 24) {
        setPercent1(percent1 + 1);
      }
      if (percentage < 50) {
        setPercent2(percent2 + 1);
      }
    }, 50);
  }, [percentage, percent]);


  const customStyles = buildStyles({
    pathColor: 'info',
    textColor: 'black',
    trailColor: '#d6d6d6',
  });
  const blueStyles = buildStyles({
    pathColor: 'orange',
    textColor: 'black',
    trailColor: '#d6d6d6',
  });
  const pinkStyles = buildStyles({
    pathColor: 'yellow',
    textColor: 'black',
    trailColor: '#d6d6d6',
  });
  const infoStyles = buildStyles({
    pathColor: 'green',
    textColor: 'black',
    trailColor: '#d6d6d6',
    width: "70px",
    height: "70px",
    margin: "10px",
  });



  return (

    <>

      <div className='container'>
      <h1>Bookings</h1>
        <div class="row mt-5 ">
          
          <div class="col-sm-3">
            
            <div class="pilll">
              
              <div class="card-body mt-3">
                <div>
                  <CircularProgressbar value={percentage} text={`${percentage}%`} className="suc" styles={customStyles} />
                </div>
                <p className='text-center mt-3'>booked</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="pilll">
              <div class="card-body mt-3">
                <div className='suc'>
                  <CircularProgressbar value={percentage} text={`${percent}%`} styles={blueStyles} />
                </div>
                <p className='text-center mt-3'>cancelled</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="pilll">
              <div class="card-body mt-3">
                <div className='suc'>
                  <CircularProgressbar value={percentage} text={`${percent1}%`} styles={pinkStyles} />
                </div>
                <p className='text-center mt-3'>New Booking</p>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="pilll">
              <div class="card-body mt-3">
                <div className='suc '>
                  <CircularProgressbar value={percentage} text={`${percent2}%`} styles={infoStyles} />
                </div>
                <p className='text-center mt-3'>collection</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>

  );
}

export default Prograss;
