import ConfigurationValuesInitialState from "./../Pages/Objects/SettingsPage/IOLINKISDU.json"
import SensorValuesInitialState from "./../Pages/Objects/SettingsPage/ProcessData.json"
import { useState, useContext } from "react";
import React from "react";
const ContextConfigurationValues = React.createContext(null)
const ContextSensorValues = React.createContext(null);
const ContextAppValues = React.createContext(null);


const ValuesProvider = (props) => {
    const [configurationValues, setConfigurationValues] = useState(ConfigurationValuesInitialState);
    const [sensorValues, setSensorValues] = useState(SensorValuesInitialState)
    const [appStateValues, setAppStateValues] = useState()

    function setValueByKey(ISDUIndex, Value) {

        const newState = { ...configurationValues, [ISDUIndex]: Value };
        setConfigurationValues(newState);
    }

    function setValueTotal(object) {
        setConfigurationValues(Object.assign({}, configurationValues, object));
    }

    function setProcessData(object) {
        setSensorValues(Object.assign({}, sensorValues, object));
    }

    function setAppState(object) {
        setAppStateValues(Object.assign({}, appStateValues, object));
    }
    const contextConfigurationValuesSetters = {
        setValueByKey,
        setValueTotal,
    }
    const contextSensorValuesSetters = {
        setProcessData
    }
    const contextAppStateValuesSetters = {
        setAppState
    }


    return (
        <ContextConfigurationValues.Provider value={{ ...configurationValues, ...contextConfigurationValuesSetters }}>
            <ContextSensorValues.Provider value={{ ...sensorValues, ...contextSensorValuesSetters }}>
                {props.children}
            </ContextSensorValues.Provider>
        </ContextConfigurationValues.Provider>)

};

export { ValuesProvider, ContextConfigurationValues, ContextAppValues, ContextSensorValues };
