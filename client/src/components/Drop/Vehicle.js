import React, { useState } from 'react';
import '../Drop/Vehicle.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const Vehicle = () => {
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [data, setData] = useState([]);
    const [fromKM, setFromKM] = useState('');
    const [toKM, setToKM] = useState('');
    const [amount, setAmount] = useState('');

    const handleVehicleChange = (event) => {
        const { value } = event.target;
        setSelectedVehicle(value);
    };

    const handleTypeChange = (event) => {
        const { value } = event.target;
        setSelectedType(value);
    };

    const handleSave = () => {
        if (selectedType === 'flat') {
            setData([...data, { vehicle: selectedVehicle, fromKM: '', amount: '' }]);
        } else if (selectedType === 'range') {
            setData([...data, { vehicle: selectedVehicle, fromKM, toKM, amount }]);
            setFromKM('');
            setToKM('');
            setAmount('');
        }
    };

    const handleUpdate = (index) => {

    };

    const handleDelete = (index) => {
       
    };


    return (
        <div className="container">
          <div className="">
    
            <div className="">
              <h2>Amount Type</h2>
              <select onChange={handleTypeChange}>
                <option value=''>Select</option>
                <option value="flat">Flat</option>
                <option value="range">Range</option>
              </select>
            </div><br />
    
            {selectedType === 'flat' && (
              <div className="">
                <table className="table table-bordered table-responsive">
                  <thead>
                    <tr>
                      <th>Vehicle Type</th>
                      <th>From KM</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <select onChange={handleVehicleChange}>
                          <option value=''>Select</option>
                          <option value="Bike">Bike</option>
                          <option value="Auto">Auto</option>
                          <option value="Car">Car</option>
                          <option value="PremiumCar">PremiumCar</option>
                          <option value="ElectricVehicle">Electric Vehicle</option>
                        </select>
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <input type="text" />
                      </td>
                      <td>
                        <button className='bg-primary'>ADD</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {selectedType === 'range' && (
              <div className="card">
                <table className="table table-bordered table-responsive">
                  <thead className='text-center'>
                    <tr>
                      <th>Vehicle Type</th>
                      <th>From KM</th>
                      <th>To KM</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    <tr>
                      <td>
                        <select className="form-control" onChange={handleVehicleChange}>
                          <option value=''>Select</option>
                          <option value="Bike">Bike</option>
                          <option value="Auto">Auto</option>
                          <option value="Car">Car</option>
                          <option value="PremiumCar">PremiumCar</option>
                          <option value="ElectricVehicle">Electric Vehicle</option>
                        </select>
                      </td>
                      <td>
                        <input className='form-control  text-center mr-4' type="text" />
                      </td>
                      <td>
                        <input className='form-control  text-center mr-4' type="text" />
                      </td>
                      <td>
                        <input className='form-control  text-center mr-4' type="text" />
                      </td>
                      <td>
                        <button onClick={handleSave}>Save</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {/* Display saved data */}
            {data.length > 0 && (
              <div>
                <h2>Saved Data</h2>
                <table className="table table-bordered table-responsive">
                  <thead>
                    <tr>
                      <th>Vehicle Type</th>
                      <th>From KM</th>
                      <th>To KM</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.vehicle}</td>
                        <td>{item.fromKM}</td>
                        <td>{item.toKM}</td>
                        <td>{item.amount}</td>
                        <td>
                          <button onClick={() => handleUpdate(index)}>Update</button>
                          <button onClick={() => handleDelete(index)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      );
};

export default Vehicle;
