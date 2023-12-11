import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/styles.css";
import { ElevatorButton } from "./ElevatorButton";
import { fixInvalidJson } from './ElevatorDisplay'
import '../styles/styles.css'

// Move to constant file
const mockUrl =
  "https://fe20262a-7b4f-4c51-a4e8-ea72cd87ab60.mock.pstmn.io/api/lift";

export const ControlPanel = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const getElevatorStatus = async () => {
      try {
        const response = await axios.get(`${mockUrl}/status`);
        const jsonRes = fixInvalidJson(response.data)
        setData(jsonRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getElevatorStatus();
  }, []);

  const handleButtonClick =  async (floorNumber) => {
    const currentFloor = 0
    try {
      const response = await axios.post(`${mockUrl}/request`, {
        from_floor: currentFloor ?? 0,
        to_floor: floorNumber,
      });
      console.log("Elevator request successful:", response.data);
    } catch (error) {
      console.error("Error requesting elevator:", error);
    }
  };

  // Mapping over hard coded data but am mid-way through combining serviced_floors array in elevatorDisplay and pass down as props
  const floorNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (

      <div className="control-panel-container">

        {floorNumbers.map((floorNumber) => {
          return (
            <ElevatorButton
              className="individual-elevator-button"
              key={floorNumber}
              floorNumber={floorNumber}
              onClick={async () => {
              await handleButtonClick(floorNumber)
            }}
            
            />
          );
        })}
      </div>
  );
};
