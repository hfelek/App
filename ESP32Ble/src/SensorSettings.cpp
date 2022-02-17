/*
 * SensorSettings.cpp
 *
 *  Created on: Dec 31, 2021
 *      Author: Canberk Demircan
 */

#include <SensorSettings.hpp>

CorrectionSettings CorrectionParameters[NUMBER_OF_CONDUCTIVITY_RANGES];
IO1Settings IO1;
IO2Settings IO2;
SettingsInsideProcessData SettingsInsidePD;
CommunicationSettings Communication;
LanguageSettings Language;
SensorInfo SensorInformation;
OperationSetups OperationConfiguration[NUMBER_OF_OPERATION_SETUPS];
SettingsManager SettingsHandler;

void SettingsManager::setOperationSetup(uint8_t *pData)
{
    if (SettingsInsidePD.Data.activeConfiguration != (operation_setup_t)*pData)
    {
        SettingsInsidePD.Data.activeConfiguration = (operation_setup_t)*pData;
        SettingsInsidePD.setupChanged = true;
    }
}
void SettingsManager::setOperationSetup(uint8_t pData)
{
    if (SettingsInsidePD.Data.activeConfiguration != (operation_setup_t)pData)
    {
        SettingsInsidePD.Data.activeConfiguration = (operation_setup_t)pData;
        SettingsInsidePD.setupChanged = true;
    }
}
uint8_t SettingsManager::getOperationSetup()
{
    return SettingsInsidePD.Data.activeConfiguration;
}

void SettingsManager::setTemperatureUnit(uint8_t *pData)
{
    if (SettingsInsidePD.Data.temperatureUnit != (temperature_unit_t)*pData)
    {
        SettingsInsidePD.Data.temperatureUnit = (temperature_unit_t)*pData;
        SettingsInsidePD.temperatureUnitChanged = true;
    }
}

uint8_t SettingsManager::getTemperatureUnit()
{
    return SettingsInsidePD.Data.temperatureUnit;
}

void SettingsManager::setConductivityInputs(operation_setup_t eSetup, uint8_t *pData)
{
    uint8_t prevActiveRange, prevFilterTimeConstant;
    bool checkChanges = false;

    if (memcmp((CONDUCTIVITY_INPUTS *)pData, &(OperationConfiguration[eSetup].Data.conductivityInputs), sizeof(CONDUCTIVITY_INPUTS) != 0))
    {
        if (eSetup == SettingsInsidePD.Data.activeConfiguration)
        {
            checkChanges = true;
            prevActiveRange = OperationConfiguration[eSetup].Data.conductivityInputs.eConductivityRange;
            prevFilterTimeConstant = OperationConfiguration[eSetup].Data.conductivityInputs.ui8FilterTimeConstant;
        }

        memcpy((uint8_t *)&OperationConfiguration[eSetup].Data.conductivityInputs, pData, sizeof(CONDUCTIVITY_INPUTS));
        OperationConfiguration[eSetup].conductivityInputsChanged = true;

        if (checkChanges)
        {
            if (prevActiveRange != OperationConfiguration[eSetup].Data.conductivityInputs.eConductivityRange)
            {
                SettingsInsidePD.rangeChanged = true;
            }

            if (prevFilterTimeConstant != OperationConfiguration[eSetup].Data.conductivityInputs.ui8FilterTimeConstant)
            {
                OperationConfiguration[eSetup].filterTimeConstantChanged = true;
            }

            checkChanges = false;
        }
    }
}

CONDUCTIVITY_INPUTS *SettingsManager::getConductivityInputs(operation_setup_t eSetup)
{
    return &(OperationConfiguration[eSetup].Data.conductivityInputs);
}

void SettingsManager::setTemperatureCoefficientLinear(operation_setup_t eSetup, float *pData)
{
    if (OperationConfiguration[eSetup].Data.temperatureCompensationSettings.fLinearCompensationCoefficient != (float)*pData)
    {
        OperationConfiguration[eSetup].Data.temperatureCompensationSettings.fLinearCompensationCoefficient = (float)*pData;
        OperationConfiguration[eSetup].temperatureCompensationSettingsChanged = true;
    }
}

float SettingsManager::getTemperatureCoefficientLinear(operation_setup_t eSetup)
{
    return OperationConfiguration[eSetup].Data.temperatureCompensationSettings.fLinearCompensationCoefficient;
}

void SettingsManager::setNonlinearTC_Params(operation_setup_t eSetup, uint8_t *pData)
{
    if (memcmp((NONLINEAR_TC_PARAMS *)pData, &(OperationConfiguration[eSetup].Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams),
               sizeof(NONLINEAR_TC_PARAMS) != 0))
    {
        memcpy((uint8_t *)&OperationConfiguration[eSetup].Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams,
               pData, sizeof(NONLINEAR_TC_PARAMS));

        OperationConfiguration[eSetup].temperatureCompensationSettingsChanged = true;
    }
}

NONLINEAR_TC_PARAMS *SettingsManager::getNonlinearTC_Params(operation_setup_t eSetup)
{
    return &(OperationConfiguration[eSetup].Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams);
}

void SettingsManager::setTCCustom_Temperature(operation_setup_t eSetup, uint8_t *pData)
{
    if (memcmp((CUSTOM_TC_PARAMS *)pData, &(OperationConfiguration[eSetup].Data.temperatureCompensationSettings.temperaturesCustomChemical_TCW),
               sizeof(CUSTOM_TC_PARAMS) != 0))
    {
        memcpy((uint8_t *)&OperationConfiguration[eSetup].Data.temperatureCompensationSettings.temperaturesCustomChemical_TCW,
               pData, sizeof(CUSTOM_TC_PARAMS));

        OperationConfiguration[eSetup].temperatureCompensationSettingsChanged = true;
    }
}

CUSTOM_TC_PARAMS *SettingsManager::getTCCustom_Temperature(operation_setup_t eSetup)
{
    return &(OperationConfiguration[eSetup].Data.temperatureCompensationSettings.temperaturesCustomChemical_TCW);
}

void SettingsManager::setTCCustom_Concentration(operation_setup_t eSetup, uint8_t *pData)
{
    if (memcmp((CUSTOM_TC_PARAMS *)pData, &(OperationConfiguration[eSetup].Data.temperatureCompensationSettings.weightsCustomChemical_TCW),
               sizeof(CUSTOM_TC_PARAMS) != 0))
    {
        memcpy((uint8_t *)&OperationConfiguration[eSetup].Data.temperatureCompensationSettings.weightsCustomChemical_TCW,
               pData, sizeof(CUSTOM_TC_PARAMS));

        OperationConfiguration[eSetup].temperatureCompensationSettingsChanged = true;
    }
}

CUSTOM_TC_PARAMS *SettingsManager::getTCCustom_Concentration(operation_setup_t eSetup)
{
    return &(OperationConfiguration[eSetup].Data.temperatureCompensationSettings.weightsCustomChemical_TCW);
}

void SettingsManager::setTCCustom_Conductivity(operation_setup_t eSetup, uint8_t index, float *pData)
{
    if (OperationConfiguration[eSetup].Data.temperatureCompensationSettings.conductivitiesCustomChemical_TCW.fEntries[index] != *pData)
    {
        OperationConfiguration[eSetup].Data.temperatureCompensationSettings.conductivitiesCustomChemical_TCW.fEntries[index] = *pData;
        OperationConfiguration[eSetup].temperatureCompensationSettingsChanged = true;
    }
}

CUSTOM_TC_CONDUCTIVITY_PARAMS *SettingsManager::getTCCustom_Conductivity(operation_setup_t eSetup)
{
    return &(OperationConfiguration[eSetup].Data.temperatureCompensationSettings.conductivitiesCustomChemical_TCW);
}

void SettingsManager::setOperationMode_IO1(uint8_t *pData)
{
    if (IO1.Data.eMode != *pData)
    {
        IO1.Data.eMode = *pData;
        IO1.settingsChanged = true;
    }
}

uint8_t SettingsManager::getOperationMode_IO1()
{
    return (uint8_t)IO1.Data.eMode;
}

void SettingsManager::setOperationMode_IO2(uint8_t *pData)
{
    if (IO2.Data.eMode != *pData)
    {
        IO2.Data.eMode = *pData;
        IO2.settingsChanged = true;
    }
}

uint8_t SettingsManager::getOperationMode_IO2()
{
    return (uint8_t)IO2.Data.eMode;
}

void SettingsManager::setProcessVariable_IO1(uint8_t *pData)
{
    if (IO1.Data.eProcessVariable != *pData)
    {
        IO1.Data.eProcessVariable = *pData;
        IO1.settingsChanged = true;
    }
}

process_variable_t SettingsManager::getProcessVariable_IO1()
{
    return (process_variable_t)IO1.Data.eProcessVariable;
}

void SettingsManager::setCurrentOutputAssign_IO2(uint8_t *pData)
{
    if (IO2.Data.eProcessVariable != *pData)
    {
        IO2.Data.eProcessVariable = *pData;
        IO2.settingsChanged = true;
    }
}

process_variable_t SettingsManager::getCurrentOutputAssign_IO2()
{
    return (process_variable_t)IO2.Data.eProcessVariable;
}

void SettingsManager::setCurrentOutputLimits(operation_setup_t eSetup, uint8_t *pData)
{
    if (memcmp((LIMITS_FOR_OUTPUTS *)pData, &(OperationConfiguration[eSetup].Data.analogOutputLimits), sizeof(LIMITS_FOR_OUTPUTS) != 0))
    {
        memcpy((uint8_t *)&OperationConfiguration[eSetup].Data.analogOutputLimits, pData, NUMBER_OF_PROCESS_VARIABLES * sizeof(LIMITS_FOR_OUTPUTS));
        OperationConfiguration[eSetup].analogOutputLimitsChanged = true;
    }
}

LIMITS_FOR_OUTPUTS *SettingsManager::getCurrentOutputLimits(operation_setup_t eSetup)
{
    return &OperationConfiguration[eSetup].Data.analogOutputLimits[0];
}

void SettingsManager::setSwitchOutputType_IO1(uint8_t *pData)
{
    if (IO1.Data.eSwitchType != *pData)
    {
        IO1.Data.eSwitchType = *pData;
        IO1.settingsChanged = true;
    }
}

io1_switch_type_t SettingsManager::getSwitchOutputType_IO1()
{
    return (io1_switch_type_t)IO1.Data.eSwitchType;
}

void SettingsManager::setSwitchOutputFunction_IO1(uint8_t *pData)
{
    if (IO1.Data.eFunction != *pData)
    {
        IO1.Data.eFunction = *pData;
        IO1.settingsChanged = true;
    }
}

switch_function_t SettingsManager::getSwitchOutputFunction_IO1()
{
    return (switch_function_t)IO1.Data.eFunction;
}

void SettingsManager::setSwitchOutputType_IO2(uint8_t *pData)
{
    if (IO2.Data.eSwitchType != *pData)
    {
        IO2.Data.eSwitchType = *pData;
        IO2.settingsChanged = true;
    }
}

io2_switch_type_t SettingsManager::getSwitchOutputType_IO2()
{
    return (io2_switch_type_t)IO2.Data.eSwitchType;
}

void SettingsManager::setProcessVariable_IO2(uint8_t *pData)
{
    if (IO2.Data.eProcessVariable != *pData)
    {
        IO2.Data.eProcessVariable = *pData;
        IO2.settingsChanged = true;
    }
}

process_variable_t SettingsManager::getProcessVariable_IO2()
{
    return (process_variable_t)IO2.Data.eProcessVariable;
}

void SettingsManager::setSwitchOutputFunction_IO2(uint8_t *pData)
{
    if (IO2.Data.eFunction != *pData)
    {
        IO2.Data.eFunction = *pData;
        IO2.settingsChanged = true;
    }
}

switch_function_t SettingsManager::getSwitchOutputFunction_IO2()
{
    return (switch_function_t)IO2.Data.eFunction;
}

void SettingsManager::setSwitchOutputLimits(operation_setup_t eSetup, uint8_t *pData)
{
    if (memcmp((LIMITS_FOR_OUTPUTS *)pData, &(OperationConfiguration[eSetup].Data.switchOutputLimits), sizeof(LIMITS_FOR_OUTPUTS) != 0))
    {
        memcpy((uint8_t *)&OperationConfiguration[eSetup].Data.switchOutputLimits, pData, sizeof(LIMITS_FOR_OUTPUTS));
        OperationConfiguration[eSetup].switchOutputLimitsChanged = true;
    }
}

LIMITS_FOR_OUTPUTS *SettingsManager::getSwitchOutputLimits(operation_setup_t eSetup)
{
    return &OperationConfiguration[eSetup].Data.switchOutputLimits[conductivity];
}

void SettingsManager::setDINFunctionality(uint8_t *pData)
{
    if (IO2.Data.eDinBasedSetupSelection != *pData)
    {
        IO2.Data.eDinBasedSetupSelection = *pData;
        IO2.settingsChanged = true;
    }
}

setup_selection_based_on_din_level_t SettingsManager::getDINFunctionality()
{
    return (setup_selection_based_on_din_level_t)IO2.Data.eDinBasedSetupSelection;
}

void SettingsManager::setDINAssign_HIGH(uint8_t *pData)
{
    if (IO2.Data.eSetup_HighInput != *pData)
    {
        IO2.Data.eSetup_HighInput = *pData;
        IO2.settingsChanged = true;
    }
}

operation_setup_t SettingsManager::getDINAssign_HIGH()
{
    return (operation_setup_t)IO2.Data.eSetup_HighInput;
}

void SettingsManager::setDINAssign_LOW(uint8_t pData)
{
    if (IO2.Data.eSetup_LowInput != pData)
    {
        IO2.Data.eSetup_LowInput = pData;
        IO2.settingsChanged = true;
    }
}

operation_setup_t SettingsManager::getDINAssign_LOW()
{
    return (operation_setup_t)IO2.Data.eSetup_LowInput;
}

void SettingsManager::setCommunicationType(uint8_t *pData)
{
    if (Communication.Data.eWirelessCommunicationType != *pData)
    {
        Communication.Data.eWirelessCommunicationType = *pData;
        Communication.settingsChanged = true;
    }
}

wireless_comm_selection_t SettingsManager::getCommunicationType()
{
    return (wireless_comm_selection_t)Communication.Data.eWirelessCommunicationType;
}

void SettingsManager::setBLE_TxPwrLevel(uint8_t Data)
{
    if (Communication.Data.eLevel != Data)
    {
        Communication.Data.eLevel = Data;
        Communication.settingsChanged = true;
    }
}

bluetooth_tx_power_t SettingsManager::getBLE_TxPwrLevel()
{
    return (bluetooth_tx_power_t)Communication.Data.eLevel;
}

void SettingsManager::setWiFiConnectionMode(uint8_t *pData)
{
    if (Communication.Data.eWifiMode != *pData)
    {
        Communication.Data.eWifiMode = (wifi_modes_t)*pData;
        Communication.settingsChanged = true;
    }
}

wifi_modes_t SettingsManager::getWiFiConnectionMode()
{
    return (wifi_modes_t)Communication.Data.eWifiMode;
}

void SettingsManager::setWiFiSSID(uint8_t *pData)
{
    if (memcmp(pData, &(Communication.Data.ssid), sizeof(Communication.Data.ssid) != 0))
    {
        memcpy(Communication.Data.ssid, (char *)pData, sizeof(Communication.Data.ssid));
        Communication.settingsChanged = true;
    }
}

char *SettingsManager::getWiFiSSID()
{
    return &Communication.Data.ssid[0];
}

void SettingsManager::setWiFiPassword(uint8_t *pData)
{
    if (memcmp(pData, &(Communication.Data.password), sizeof(Communication.Data.password) != 0))
    {
        memcpy(Communication.Data.password, (char *)pData, sizeof(Communication.Data.password));
        Communication.settingsChanged = true;
    }
}

void SettingsManager::setIP_ConfigurationMode(uint8_t *pData)
{
    if (Communication.Data.eIpConfiguration != *pData)
    {
        Communication.Data.eIpConfiguration = (wifi_modes_t)*pData;
        Communication.settingsChanged = true;
    }
}

ip_configuration_t SettingsManager::getIP_ConfigurationMode()
{
    return (ip_configuration_t)Communication.Data.eIpConfiguration;
}

void SettingsManager::setWiFi_IP(uint8_t *pData)
{
    if (memcmp(pData, &(Communication.Data.ipAddress), sizeof(Communication.Data.ipAddress) != 0))
    {
        memcpy(Communication.Data.ipAddress, (char *)pData, sizeof(Communication.Data.ipAddress));
        Communication.settingsChanged = true;
    }
}

char *SettingsManager::getWiFi_IP()
{
    return (char *)&Communication.Data.ipAddress;
}

void SettingsManager::setWiFiSubnet(uint8_t *pData)
{
    if (memcmp(pData, &(Communication.Data.subnetAddress), sizeof(Communication.Data.subnetAddress) != 0))
    {
        memcpy(Communication.Data.subnetAddress, (char *)pData, sizeof(Communication.Data.subnetAddress));
        Communication.settingsChanged = true;
    }
}

char *SettingsManager::getWiFiSubnet()
{
    return (char *)&Communication.Data.subnetAddress;
}

void SettingsManager::setWiFiRouter(uint8_t *pData)
{
    if (memcmp(pData, &(Communication.Data.router), sizeof(Communication.Data.router) != 0))
    {
        memcpy(Communication.Data.router, (char *)pData, sizeof(Communication.Data.router));
        Communication.settingsChanged = true;
    }
}

char *SettingsManager::getWiFiRouter()
{
    return (char *)&Communication.Data.router;
}

void SettingsManager::setCorrectionParameters(conductivity_range_t eRange, uint8_t *pData)
{
    if (memcmp(pData, &CorrectionParameters[eRange].Data, sizeof(CORRECTION_SETTINGS) != 0))
    {
        memcpy((uint8_t *)&CorrectionParameters[eRange].Data, pData, sizeof(CORRECTION_SETTINGS));
        CorrectionParameters[eRange].settingsChanged = true;
    }
}

CORRECTION_SETTINGS *SettingsManager::getCorrectionParameters(conductivity_range_t eRange)
{
    return &(CorrectionParameters[eRange].Data);
}

void SettingsManager::setSystemDefineAccessCode(uint8_t *pData)
{
}

void SettingsManager::setSystemEnterAccessCode(uint8_t *pData)
{
}

uint16_t SettingsManager::getSystemAccessCode()
{
    return 0;
}
