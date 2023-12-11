import React, { useEffect, useState } from "react";
import { ControlPanel } from "./ControlPanel";
import axios from 'axios'
import '../styles/styles.css'

const mockUrl =
  "https://fe20262a-7b4f-4c51-a4e8-ea72cd87ab60.mock.pstmn.io/api/lift";

  export const fixInvalidJson = (jsonString) => {
    // Add double quotes around property names
    jsonString = jsonString.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');

    // Remove trailing commas after the last element in an object or array
    jsonString = jsonString.replace(/,(?=\s*?[}\]])/g, '');
    
    // Replace with quotations
    jsonString= jsonString.replace(/[\u201C\u201D]/g, '"');

    return JSON.parse(jsonString);
}

export const ElevatorDisplay = () => {

    const [data, setData] = useState({});
    useEffect(() => {
        const getElevatorConfig = async () => {
          try {
            const response = await axios.get(`${mockUrl}/config`);
            const jsonRes = fixInvalidJson(response.data)
            setData(jsonRes);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        getElevatorConfig();
      }, []);
      
    //   const allServicedFloors = Object.values(data.lifts).map(lift => lift.serviced_floors);

      return (
        
        <section className="control-panel-section">
          {data && data.lifts && Object.keys(data.lifts).map((liftId) => (
            <ControlPanel key={liftId} lift={data.lifts[liftId]} />
          ))}
        </section>
      );
}