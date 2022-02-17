#ifndef SENSOR_SETTINGS_H
#define SENSOR_SETTINGS_H

#include <stdint.h>
#include <stdbool.h>
#include <string.h>

#define NUMBER_OF_NONLINEAR_TEMPERATURE_COMPENSATION_POINTS           6
#define LENGTH_OF_SENSOR_TAG_KEY									  16

#ifdef true
#define NUMBER_OF_CONDUCTIVITY_RANGES							      6
#else
#define NUMBER_OF_CONDUCTIVITY_RANGES								  6
#endif

#define NUMBER_OF_CONCENTRATION_CALCULATION_TYPES					  (4+1)
#define NUMBER_OF_ANALOG_OUTPUTS									  2
#define NUMBER_OF_TEMPERATURE_UNITS								  	  2
#define NUMBER_OF_CONCENTRATION_UNITS								  2
#define NUMBER_OF_PROCESS_VARIABLES									  3
#define NUMBER_OF_OPERATION_SETUPS									  4

#define CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES			  			  6
#define CUSTOM_COMPENSATION_TABLE_CONDUCTIVITY_MAX_ENTRIES			  (CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES*CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES)

/* Default Settings - Begin */
#define DEFAULT_CONDUCTIVITY_RANGE						(conductivity_range_t)3
#define DEFAULT_TC_TYPE									0 // linear
#define DEFAULT_LINEAR_TC_COEFF   					    2.20f

#define DEFAULT_NONLINEAR_TC_T1_VALUE					0.0f
#define DEFAULT_NONLINEAR_TC_T2_VALUE					10.0f
#define DEFAULT_NONLINEAR_TC_T3_VALUE					20.0f
#define DEFAULT_NONLINEAR_TC_T4_VALUE					50.0f
#define DEFAULT_NONLINEAR_TC_T5_VALUE					60.0f
#define DEFAULT_NONLINEAR_TC_T6_VALUE					140.0f

#define DEFAULT_NONLINEAR_TC_COEFF1						1.8f
#define DEFAULT_NONLINEAR_TC_COEFF2						1.9f
#define DEFAULT_NONLINEAR_TC_COEFF3					    2.0f
#define DEFAULT_NONLINEAR_TC_COEFF4						2.1f
#define DEFAULT_NONLINEAR_TC_COEFF5						2.2f
#define DEFAULT_NONLINEAR_TC_COEFF6						2.2f

#define DEFAULT_CUSTOM_TC_TEMPERATURE_VALUES			0.0f
#define DEFAULT_CUSTOM_TC_DERIVED_VARIABLE_VALUES		0.0f
#define DEFAULT_CUSTOM_TC_CONDUCTIVITY_VALUES		    0.0f

#define DEFAULT_REFERENCE_TEMPERATURE					25.0f

#define DEFAULT_CELL_CONSTANT							8.70f
#define DEFAULT_MOUNTING_FACTOR							1.000f
#define DEFAULT_ZERO_POINT_VALUE						0.0f
#define DEFAULT_FILTER_TIME_CONSTANT					25

#define DEFAULT_ACTIVE_OPERATION_CONFIGURATION			0 /* setup1 */

#define DEFAULT_LOWER_PERCENTAGE_VALUE_FOR_OUTPUTS	    0.0f
#define DEFAULT_UPPER_PERCENTAGE_VALUE_FOR_OUTPUTS	    100.0f
#define DEFAULT_IO1_MODE								0 /* current output */
#define DEFAULT_IO2_MODE								0 /* current output */
#define DEFAULT_PROCESS_VARIABLE_FOR_ANALOG_OUTPUT1		0 /* conductivity */
#define DEFAULT_PROCESS_VARIABLE_FOR_ANALOG_OUTPUT2		2 /* temperature */
#define DEFAULT_TYPE_FOR_SWITCH_OUTPUT1					1 /* low side */
#define DEFAULT_TYPE_FOR_SWITCH_OUTPUT2					0 /* low side */
#define DEFAULT_FUNCTION_FOR_SWITCH_OUTPUT1				1 /* conductivity limit */
#define DEFAULT_FUNCTION_FOR_SWITCH_OUTPUT2				3 /* temperature limit */
#define SETUP_SELECTION_BASED_ON_DIN_LEVEL_IS_PASSIVE	0
#define DEFAULT_SETUP_WHEN_DIN_IS_LOW					0 /* setup1 */
#define DEFAULT_SETUP_WHEN_DIN_IS_HIGH					1 /* setup2 */
#define DEFAULT_TEMPERATURE_UNIT						0 /* celsius degree */
#define DEFAULT_WIRELESS_COMM_TECHNOLOGY				1 /* wifi */
#define DEFAULT_WIRELESS_COMM_STATE						1 /* off */
#define DEFAULT_WIFI_MODE								0 /* access point */
#define DEFAULT_BLUETOOTH_TX_POWER_LEVEL				0 /* level1 */
#define DEFAULT_NETWORK_SSID							"ICT-12345678"
#define DEFAULT_NETWORK_PASSWORD						"ICT-12345678"
#define DEFAULT_IP_CONFIGURATION						0 /* manual */
#define DEFAULT_IP_ADDRESS								"192.168.1.1"
#define DEFAULT_SUBNET_ADDRESS							"255.255.255.0"
#define DEFAULT_ROUTER									"192.168.1.1"
#define DEFAULT_SENSOR_TAG								"ICT-12345678"

#define DEFAULT_LANGUAGE								0 /* GB */

#define DEFAULT_SOFTWARE_VERSION						1.0f
#define DEFAULT_HARDWARE_VERSION						1.0f
/* Default Settings - End */

/*!
 * \brief ISDU indexes enum
 */
enum ISDU_indexes
{
	SYS_CMD = 0x0002,
	DATA_STORAGE_INDEX = 0x0003,
	DEV_ACC_LOCKS      = 0x000C,
	PROFILE_CHAR       = 0x000D,
	PDIN_DESCR          = 0x000E,
	PDOUT_DESCR         = 0x000F,
	VENDOR_NAME         = 0x0010,
	VENDOR_TXT          = 0x0011,
	PRODUCT_NAME        = 0x0012,
	PRODUCT_ID          = 0x0013,
	PRODUCT_TEXT        = 0x0014,
	SERIAL_NUM          = 0x0015,
	HW_REV              = 0x0016,
	FW_REV              = 0x0017,
	APP_SPEC_TAG        = 0x0018,
	FUNC_TAG            = 0x0019,
	LOC_TAG             = 0x001A,
	ERROR_CNT           = 0x0020,
	DEV_STAT            = 0x0024,
	DET_DEV_STAT        = 0x0025,
	PROC_DAT_IN         = 0x0028,
	PROC_DAT_OUT        = 0x0029,
	OFFSET_TIME         = 0x0030,
	PREF_INDEX_MIN      = 0x0040,
	PREF_INDEX_MAX      = 0x00FE,
	EXT_INDEX_MIN       = 0x0100,
	EXT_INDEX_MAX       = 0x3FFF,
	/*ELIAR*/
	/*MEASUREMENT VALUES*/
	MEASUREMENT_VALUES				= 0x0064,
	/*SETUP MENU*/
	ACTIVE_CONFIGURATION_MODE		= 0x006E,
	TEMPERATURE_UNIT				= 0x006F,
	/*CONDUCTIVITY INPUT*/
	CONDUCTIVITY_INPUT_CONF_1				= 0x0078,
	CONDUCTIVITY_INPUT_CONF_2				= 0x0079,
	CONDUCTIVITY_INPUT_CONF_3				= 0x007A,
	CONDUCTIVITY_INPUT_CONF_4				= 0x007B,
	/*TEMPERATURE COEFFICIENT LINEAR*/
	TEMPERATURE_COEFFICIENT_LINEAR_CONF_1			= 0x0082,
	TEMPERATURE_COEFFICIENT_LINEAR_CONF_2			= 0x0083,
	TEMPERATURE_COEFFICIENT_LINEAR_CONF_3			= 0x0084,
	TEMPERATURE_COEFFICIENT_LINEAR_CONF_4			= 0x0085,
	/*TEMPERATURE COEFFICIENT NON-LINEAR*/
	TEMPERATURE_COEFFICIENT_NONLINEAR_CONF_1			= 0x008C,
	TEMPERATURE_COEFFICIENT_NONLINEAR_CONF_2			= 0x008D,
	TEMPERATURE_COEFFICIENT_NONLINEAR_CONF_3			= 0x008E,
	TEMPERATURE_COEFFICIENT_NONLINEAR_CONF_4			= 0x008F,
	/*TEMPERATURE COMPENSATION CUSTOM*/
	TEMPERATURE_COMPENSATION_CUSTOM_TEMPERATURE_CONF_1			= 0x0096,
	TEMPERATURE_COMPENSATION_CUSTOM_TEMPERATURE_CONF_2			= 0x0097,
	TEMPERATURE_COMPENSATION_CUSTOM_TEMPERATURE_CONF_3			= 0x0098,
	TEMPERATURE_COMPENSATION_CUSTOM_TEMPERATURE_CONF_4			= 0x0099,
	TEMPERATURE_COMPENSATION_CUSTOM_CONCENTRATION_CONF_1		= 0x009A,
	TEMPERATURE_COMPENSATION_CUSTOM_CONCENTRATION_CONF_2		= 0x009B,
	TEMPERATURE_COMPENSATION_CUSTOM_CONCENTRATION_CONF_3		= 0x009C,
	TEMPERATURE_COMPENSATION_CUSTOM_CONCENTRATION_CONF_4		= 0x009D,
	TEMPERATURE_COMPENSATION_CUSTOM_CONDUCTIVITY_CONF_1			= 0x009E,
	TEMPERATURE_COMPENSATION_CUSTOM_CONDUCTIVITY_CONF_2			= 0x009F,
	TEMPERATURE_COMPENSATION_CUSTOM_CONDUCTIVITY_CONF_3			= 0x00A0,
	TEMPERATURE_COMPENSATION_CUSTOM_CONDUCTIVITY_CONF_4			= 0x00A1,
	/*OPERATION MODE*/
	IO1_OPERATION_MODE	= 0x00AA,
	IO2_OPERATION_MODE	= 0x00AB,
	/*CURRENT MODE*/
	IO1_CURRENT_OUTPUT_ASSIGN	= 0x00AF,
	IO2_CURRENT_OUTPUT_ASSIGN	= 0x00B0,
	CURRENT_OUTPUT_CONF_1		= 0x00B1,
	CURRENT_OUTPUT_CONF_2		= 0x00B2,
	CURRENT_OUTPUT_CONF_3		= 0x00B3,
	CURRENT_OUTPUT_CONF_4		= 0x00B4,
	/*SWITCH MODE*/
	IO1_SWITCH_OUTPUT_TYPE		= 0x00B9,
	IO1_SWITCH_OUTPUT_ASSIGN	= 0x00BA,
	IO1_SWITCH_OUTPUT_FUNCTION	= 0x00BB,
	IO2_SWITCH_OUTPUT_TYPE		= 0x00BC,
	IO2_SWITCH_OUTPUT_ASSIGN	= 0x00BD,
	IO2_SWITCH_OUTPUT_FUNCTION	= 0x00BE,
	SWITCH_OUTPUT_CONF_1		= 0x00BF,
	SWITCH_OUTPUT_CONF_2		= 0x00C0,
	SWITCH_OUTPUT_CONF_3		= 0x00C1,
	SWITCH_OUTPUT_CONF_4		= 0x00C2,
	/*D-IN MODE*/
	DIN_STATUS					= 0x00C8,
	DIN_FUNCTION				= 0x00C9,
	DIN_HIGH_ASSIGN				= 0x00CA,
	DIN_LOW_ASSIGN				= 0x00CB,
	/*DISPLAY SETUP*/
	DISPLAY_BACKLIGHT			= 0x00CD,
	/*COMMUNICATION SETUP*/
	COMMUNICATION_TYPE						= 0x00CE,
	BLE_ACTIVATION							= 0x00D2,
	BLE_PWR_LEVEL							= 0x00D3,
	BLE_COMM_STATUS							= 0x00D4,
	WIFI_ACTIVATION							= 0x00D7,
	WIFI_CONNECTION_MODE					= 0x00D8,
	WIFI_SSID								= 0x00D9,
	WIFI_PASSWORD							= 0x00DA,
	WIFI_IPv4_CONFIGURATION_MODE			= 0x00DB,
	WIFI_IPv4_CONFIGURATION_MANUAL_IP		= 0x00DC,
	WIFI_IPv4_CONFIGURATION_MANUAL_SUBNET	= 0x00DD,
	WIFI_IPv4_CONFIGURATION_MANUAL_ROUTER	= 0x00DE,
	/*CORRECTION SETUP*/
	CORRECTION_PARAMS_2000mS_per_cm			= 0x00E6,
	CORRECTION_PARAMS_1000mS_per_cm			= 0x00E7,
	CORRECTION_PARAMS_500mS_per_cm			= 0x00E8,
	CORRECTION_PARAMS_200mS_per_cm			= 0x00E9,
	CORRECTION_PARAMS_20mS_per_cm			= 0x00EA,
	CORRECTION_PARAMS_2000uS_per_cm			= 0x00EB,
	/*SYSTEM SETUP*/
	SYS_DEFINE_ACCESS_CODE					= 0x00F0,
	SYS_ENTER_ACCESS_CODE					= 0x00F1,
	/*ELIAR*/
	PROF_SPEC_INDEX_MIN = 0x4000,
	PROF_SPEC_INDEX_MAX = 0x4FFF
};

typedef enum
{
	eNaN_U = 0,
	eD
}user_interface_t;

typedef enum
{
	eNaN_A = 2,
	eA
}automatic_calibration_t;

typedef enum
{
	eNaN_W = 4,
	eW,
	eB
}wireless_connection_t;

typedef enum
{
	eS1 = 6,
	eS2,
	eS3,
	eS4,
	eM6
}measurement_capability_t;

typedef enum
{
	GB,
	TR,
	NUMBER_OF_LANGUAGES
}languages_t;

typedef enum _CONDUCTIVITY_RANGES_
{
	e2000ms_per_cm,
	e1000ms_per_cm,
	e500ms_per_cm,
	e200ms_per_cm,
	e20ms_per_cm,
	e2000us_per_cm
}conductivity_range_t;

typedef enum
{
	AP,
	STA
}wifi_modes_t;

typedef enum
{
	OFF,
	ON
}wireless_status_t;

typedef enum
{
	MANUAL,
	DHCP
}ip_configuration_t;

typedef enum
{
	linear = 0,
	nonlinear,
	custom,
	NaCl_wt_0_to_25,
	NaCl_baume_0_to_25,
	NaOH_wt_0_to_15,
	NaOH_baume_0_to_20,
	NaOH_wt_20_to_50,
	NaOH_baume_25_to_50,
	Na2SO4_wt_0_to_40,
	HNO3_wt_0_to_25,
	HNO3_wt_36_to_82,
	H2SO4_wt_0_to_28,
	H2SO4_wt_36_to_85,
	H2SO4_wt_92_to_99,
	HCl_wt_0_to_18,
	HCl_wt_22_to_44,
	MgCl2_wt_0_to_18,
	MgCl2_wt_19_to_25
}temperature_compensation_type_t;

typedef enum
{
	uS_per_cm = 0,
	mS_per_cm
}conductivity_unit_t;

typedef enum
{
	percent_by_weight = 0,
	baume
}derived_variable_unit_t;

typedef enum
{
	celsius_degree = 0,
	fahrenheit
}temperature_unit_t;

typedef enum /* TODO: no_assigned_pv is currently set to 0 in IODD. That must be changed. */
{
	conductivity,
	concentration_or_baume,
	temperature,
	no_assigned_pv // off
}process_variable_t;

typedef enum
{
	IO1_off = 0,
	IO1_io_link,
	IO1_current_output,
	IO1_switch_output
}io1_operation_mode_t;

typedef enum
{
	IO2_off = 0,
	IO2_current_output,
	IO2_switch_output,
	IO2_digital_input
}io2_operation_mode_t;

typedef enum
{
	io1_high_side = 0,
	io1_low_side,
	io1_push_pull
}io1_switch_type_t;

typedef enum
{
	io2_high_side = 0,
	io2_push_pull
}io2_switch_type_t;

typedef enum
{
	no_assigned_function = 0,
	alarmm,
	limit,
	window,
	conductivity_limit,
	concentration_limit,
	temperature_limit,
	conductivity_window,
	concentration_window,
	temperature_window
}switch_function_t;

typedef enum
{
	low = 0,
	high
}din_level_t;

typedef enum
{
	passive = 0,
	active
}setup_selection_based_on_din_level_t;

typedef enum
{
	setup1 = 0,
	setup2,
	setup3,
	setup4
}operation_setup_t;

typedef enum
{
	disconnected = 0,
	connected
}bluetooth_conn_status_t;

typedef enum
{
	level1 = 0,
	level2,
	level3,
	level4,
	level5
}bluetooth_tx_power_t;

typedef enum
{
	off = 0,
	bluetooth,
	wifi
}wireless_comm_selection_t;

#pragma pack(push, 1)
typedef struct _LIMITS_FOR_OUTPUTS_
{
	float fLower;
	float fUpper;
}LIMITS_FOR_OUTPUTS, *pLIMITS_FOR_OUTPUTS;

typedef	struct _CUSTOM_TC_PARAMS_
{
	uint8_t	ui8NumberOfPoints;
	float	fEntries[CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES];
}CUSTOM_TC_PARAMS, *pCUSTOM_TC_PARAMS;

typedef	struct _CUSTOM_TC_CONDUCTIVITY_PARAMS_
{
	uint8_t	ui8NumberOfPoints;
	float	fEntries[36];
}CUSTOM_TC_CONDUCTIVITY_PARAMS, *pCUSTOM_TC_CONDUCTIVITY_PARAMS;

typedef struct _NONLINEAR_TC_PARAMS_
{
	float	coefficients[NUMBER_OF_NONLINEAR_TEMPERATURE_COMPENSATION_POINTS];
	float	temperatures[NUMBER_OF_NONLINEAR_TEMPERATURE_COMPENSATION_POINTS];
}NONLINEAR_TC_PARAMS, *pNONLINEAR_TC_PARAMS;

typedef struct _TEMPERATURE_COMPENSATION_SETTINGS_
{
	float							fLinearCompensationCoefficient;
	NONLINEAR_TC_PARAMS				nonlinearTemperatureCompensationParams;
	CUSTOM_TC_PARAMS 				temperaturesCustomChemical_TCW;
	CUSTOM_TC_PARAMS 				weightsCustomChemical_TCW;
	CUSTOM_TC_CONDUCTIVITY_PARAMS	conductivitiesCustomChemical_TCW;
}TEMPERATURE_COMPENSATION_SETTINGS, *pTEMPERATURE_COMPENSATION_SETTINGS;

typedef struct _CORRECTION_SETTINGS_
{
	float 	fMountingFactor;
	float   fZeroPoint;
}CORRECTION_SETTINGS, *pCORRECTION_SETTINGS;

typedef struct _CONDUCTIVITY_INPUTS_
{
	uint8_t eConductivityRange;
	uint8_t	eTemperatureCompensationType;
	float	fReferenceTemperature;
	uint8_t	ui8FilterTimeConstant;
}CONDUCTIVITY_INPUTS, *pCONDUCTIVITY_INPUTS;

typedef struct _SETUP_SETTINGS_
{
	CONDUCTIVITY_INPUTS					conductivityInputs;
	TEMPERATURE_COMPENSATION_SETTINGS   temperatureCompensationSettings;
	LIMITS_FOR_OUTPUTS	    			analogOutputLimits[NUMBER_OF_PROCESS_VARIABLES];
	LIMITS_FOR_OUTPUTS					switchOutputLimits[NUMBER_OF_PROCESS_VARIABLES];
}SETUP_SETTINGS, *pSETUP_SETTINGS;

typedef struct _IO1_SETTINGS_
{
	uint8_t 	eMode;
	uint8_t		eProcessVariable;
	uint8_t  	eSwitchType;
	uint8_t  	eFunction;
}IO1_SETTINGS, *pIO1_SETTINGS;

typedef struct _IO2_SETTINGS_
{
	uint8_t  eMode;
	uint8_t	 eProcessVariable;
	uint8_t  eSwitchType;
	uint8_t  eFunction;
	uint8_t	 eDinBasedSetupSelection;
	uint8_t	 eSetup_HighInput;
	uint8_t	 eSetup_LowInput;
}IO2_SETTINGS, *pIO2_SETTINGS;

typedef struct _SETTINGS_INSIDE_PD_
{
	uint8_t	activeConfiguration;
	uint8_t	conductivityUnit;
	uint8_t	derivedVariableUnit;
	uint8_t temperatureUnit;
}SETTINGS_INSIDE_PD, *pSETTINGS_INSIDE_PD;

typedef struct _SENSOR_INFO_
{
	uint8_t eUserInterface;
	uint8_t	eAutomaticCalibration;
	uint8_t	eWirelessConnection;
	uint8_t eMeasurementRange;
	float 	fSoftwareVersion;
	float 	fHardwareVersion;
	char	cSensorTagKey[LENGTH_OF_SENSOR_TAG_KEY];
}SENSOR_INFO, *pSENSOR_INFO;

typedef struct _COMMUNICATION_SETTINGS_
{
	uint8_t	eWirelessCommunicationType;
	uint8_t eWirelessConnectionState;
	uint8_t	eWifiMode;
	uint8_t	eLevel;
	char	ssid[32];
	char	password[32];
	uint8_t eIpConfiguration;
	char	ipAddress[15];
	char	subnetAddress[15];
	char	router[15];
}COMMUNICATION_SETTINGS, *pCOMMUNICATION_SETTINGS;

typedef struct _LANGUAGE_SETTINGS_
{
	uint8_t	 DeviceLanguage;
}LANGUAGE_SETTINGS, *pLANGUAGE_SETTINGS;

typedef struct _SAVED_SETTINGS_
{
	CORRECTION_SETTINGS 				CorrectionParameters[NUMBER_OF_CONDUCTIVITY_RANGES];
	IO1_SETTINGS						IO1;
	IO2_SETTINGS						IO2;
	SETTINGS_INSIDE_PD					FromProcessData;
	COMMUNICATION_SETTINGS				Communication;
	LANGUAGE_SETTINGS					Language;
	SENSOR_INFO							SensorInformation;
	SETUP_SETTINGS						OperationConfiguration[NUMBER_OF_OPERATION_SETUPS];
}SAVED_SETTINGS, *pSAVED_SETTINGS;
#pragma pack(pop)

typedef union
{
	uint8_t   ui8Val;
	uint16_t  ui16Val;
	uint32_t  ui32Val;
	float	  fVal;
	char	  cArray[32];
}settingValues;

class CorrectionSettings
{
public:
	CorrectionSettings()
	{
		this->settingsChanged = false;
	};

	void loadDefaults(void)
	{
		this->Data.fMountingFactor = DEFAULT_MOUNTING_FACTOR;
		this->Data.fZeroPoint = DEFAULT_ZERO_POINT_VALUE;
	}

	~CorrectionSettings(){};

	CORRECTION_SETTINGS Data;
	bool settingsChanged;

private:
};

class TemperatureCompensationSettings
{
public:
	TemperatureCompensationSettings(){};
	~TemperatureCompensationSettings(){};

	TEMPERATURE_COMPENSATION_SETTINGS Data;

private:
};

class IO1Settings
{
public:
	IO1Settings()
	{
		this->settingsChanged = false;
	}

	void loadDefaults(void)
	{
		this->Data.eMode = (uint8_t) DEFAULT_IO1_MODE;
		this->Data.eProcessVariable = (process_variable_t) DEFAULT_PROCESS_VARIABLE_FOR_ANALOG_OUTPUT1;
		this->Data.eSwitchType = (io1_switch_type_t) DEFAULT_TYPE_FOR_SWITCH_OUTPUT1;
		this->Data.eFunction = (switch_function_t) DEFAULT_FUNCTION_FOR_SWITCH_OUTPUT1;
	}

	~IO1Settings(){};

	IO1_SETTINGS Data;
	bool		 settingsChanged;

private:

};

class IO2Settings
{
public:
	IO2Settings()
	{
		this->settingsChanged = false;
	}

	void loadDefaults(void)
	{
		this->Data.eMode = (uint8_t) DEFAULT_IO2_MODE;
		this->Data.eProcessVariable = (process_variable_t) DEFAULT_PROCESS_VARIABLE_FOR_ANALOG_OUTPUT2;
		this->Data.eSwitchType = (io2_switch_type_t) DEFAULT_TYPE_FOR_SWITCH_OUTPUT1;
		this->Data.eFunction = (switch_function_t) DEFAULT_FUNCTION_FOR_SWITCH_OUTPUT2;
	}

	~IO2Settings(){};

	IO2_SETTINGS Data;
	bool		 settingsChanged;

private:

};

class SettingsInsideProcessData
{
public:
	SettingsInsideProcessData()
	{
		this->rangeChanged = false;
		this->setupChanged = false;
	}

	void loadDefaults(void)
	{
		this->Data.temperatureUnit= (temperature_unit_t) DEFAULT_TEMPERATURE_UNIT;
		this->Data.activeConfiguration = (operation_setup_t) DEFAULT_ACTIVE_OPERATION_CONFIGURATION;
	}

	~SettingsInsideProcessData(){};

	SETTINGS_INSIDE_PD  Data;
	bool 			 	rangeChanged;
	bool			 	setupChanged;
	bool			 	temperatureUnitChanged;
	bool			 	conductivityUnitChanged;
	bool			 	derivedVariableUnitChanged;
private:

};

class CommunicationSettings
{
public:
	CommunicationSettings()
	{
		this->settingsChanged = false;
	}

	void loadDefaults(void)
	{
		this->Data.eIpConfiguration = (ip_configuration_t) DEFAULT_IP_CONFIGURATION;
		this->Data.eLevel = (bluetooth_tx_power_t) DEFAULT_BLUETOOTH_TX_POWER_LEVEL;
		this->Data.eWifiMode = (wifi_modes_t) DEFAULT_WIFI_MODE;
		this->Data.eWirelessCommunicationType = (wireless_comm_selection_t) DEFAULT_WIRELESS_COMM_TECHNOLOGY;
		this->Data.eWirelessConnectionState = (wireless_status_t) DEFAULT_WIRELESS_COMM_STATE;

		strncpy(this->Data.ipAddress, DEFAULT_IP_ADDRESS, sizeof(this->Data.ipAddress));
		strncpy(this->Data.password, DEFAULT_NETWORK_PASSWORD, sizeof(this->Data.password));
		strncpy(this->Data.router, DEFAULT_ROUTER, sizeof(this->Data.router));
		strncpy(this->Data.ssid, DEFAULT_NETWORK_SSID, sizeof(this->Data.ssid));
		strncpy(this->Data.subnetAddress, DEFAULT_SUBNET_ADDRESS, sizeof(this->Data.subnetAddress));
	}

	~CommunicationSettings(){};

	COMMUNICATION_SETTINGS Data;
	bool		 settingsChanged;

private:

};

class LanguageSettings
{
public:
	LanguageSettings()
	{
		this->settingsChanged = false;
	}

	void loadDefaults(void)
	{
		this->Data.DeviceLanguage = (languages_t) DEFAULT_LANGUAGE;
	}

	~LanguageSettings(){};

	LANGUAGE_SETTINGS Data;
	bool settingsChanged;

private:

};

class SensorInfo
{
public:
	SensorInfo()
	{
		this->settingsChanged = false;
	}

	void loadDefaults(void)
	{
		strncpy(this->Data.cSensorTagKey, DEFAULT_SENSOR_TAG, sizeof(this->Data.cSensorTagKey));

		this->Data.fHardwareVersion = DEFAULT_HARDWARE_VERSION;
		this->Data.fSoftwareVersion = DEFAULT_SOFTWARE_VERSION;

		/* Other default elements are set according to the device order code */
#ifdef DISPLAY_ACTIVE
		this->Data.eUserInterface = eD;
#else
		this->Data.eUserInterface = eNaN_U;
#endif

#ifdef AUTO_CALIBRATION_ACTIVE
		this->Data.eAutomaticCalibration = eA;
#else
		this->Data.eAutomaticCalibration = eNaN_A;
#endif

#if defined(WIFI_ACTIVE)
		this->Data.eWirelessConnection 	= eW;
#elif defined(BLE_ACTIVE)
		this->Data.eWirelessConnection 	= eB;
#else
		this->Data.eWirelessConnection 	= eNaN_W;
#endif

#ifdef MULTIPLE_RANGE_ACTIVE
		this->Data.eMeasurementRange 	= eM6;
#else
		this->Data.eMeasurementRange 	= eS1;
#endif
	}

	~SensorInfo(){};

	SENSOR_INFO	Data;
	bool settingsChanged;

private:

};

class OperationSetups
{
public:
	OperationSetups()
	{
		this->conductivityInputsChanged = false;
		this->filterTimeConstantChanged = false;
		this->analogOutputLimitsChanged = false;
		this->switchOutputLimitsChanged = false;
		this->temperatureCompensationSettingsChanged = false;
	}

	void loadDefaults(void)
	{
		uint16_t i = 0;

		this->Data.conductivityInputs.eConductivityRange = DEFAULT_CONDUCTIVITY_RANGE;
		this->Data.conductivityInputs.eTemperatureCompensationType = (temperature_compensation_type_t) DEFAULT_TC_TYPE;
		this->Data.conductivityInputs.fReferenceTemperature = DEFAULT_REFERENCE_TEMPERATURE;
		this->Data.conductivityInputs.ui8FilterTimeConstant = DEFAULT_FILTER_TIME_CONSTANT;

		for(i = 0; i < NUMBER_OF_PROCESS_VARIABLES; i++)
		{
			this->Data.analogOutputLimits[i].fLower = DEFAULT_LOWER_PERCENTAGE_VALUE_FOR_OUTPUTS;
			this->Data.analogOutputLimits[i].fUpper = DEFAULT_UPPER_PERCENTAGE_VALUE_FOR_OUTPUTS;

			this->Data.switchOutputLimits[i].fLower = DEFAULT_LOWER_PERCENTAGE_VALUE_FOR_OUTPUTS;
			this->Data.switchOutputLimits[i].fUpper = DEFAULT_UPPER_PERCENTAGE_VALUE_FOR_OUTPUTS;
		};

		this->Data.temperatureCompensationSettings.fLinearCompensationCoefficient = DEFAULT_LINEAR_TC_COEFF;

		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.coefficients[0] = DEFAULT_NONLINEAR_TC_COEFF1;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.coefficients[1] = DEFAULT_NONLINEAR_TC_COEFF2;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.coefficients[2] = DEFAULT_NONLINEAR_TC_COEFF3;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.coefficients[3] = DEFAULT_NONLINEAR_TC_COEFF4;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.coefficients[4] = DEFAULT_NONLINEAR_TC_COEFF5;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.coefficients[5] = DEFAULT_NONLINEAR_TC_COEFF6;

		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.temperatures[0] = DEFAULT_NONLINEAR_TC_T1_VALUE;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.temperatures[1] = DEFAULT_NONLINEAR_TC_T2_VALUE;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.temperatures[2] = DEFAULT_NONLINEAR_TC_T3_VALUE;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.temperatures[3] = DEFAULT_NONLINEAR_TC_T4_VALUE;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.temperatures[4] = DEFAULT_NONLINEAR_TC_T5_VALUE;
		this->Data.temperatureCompensationSettings.nonlinearTemperatureCompensationParams.temperatures[5] = DEFAULT_NONLINEAR_TC_T6_VALUE;

		this->Data.temperatureCompensationSettings.temperaturesCustomChemical_TCW.ui8NumberOfPoints = CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES;

		this->Data.temperatureCompensationSettings.temperaturesCustomChemical_TCW.ui8NumberOfPoints = CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES;
		this->Data.temperatureCompensationSettings.weightsCustomChemical_TCW.ui8NumberOfPoints = CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES;

		for(i = 0; i < CUSTOM_COMPENSATION_TABLE_MAX_ENTRIES; i++)
		{
			this->Data.temperatureCompensationSettings.temperaturesCustomChemical_TCW.fEntries[i] = DEFAULT_CUSTOM_TC_TEMPERATURE_VALUES;
			this->Data.temperatureCompensationSettings.weightsCustomChemical_TCW.fEntries[i] = DEFAULT_CUSTOM_TC_DERIVED_VARIABLE_VALUES;
		};

		this->Data.temperatureCompensationSettings.conductivitiesCustomChemical_TCW.ui8NumberOfPoints = CUSTOM_COMPENSATION_TABLE_CONDUCTIVITY_MAX_ENTRIES;
		for(i = 0; i < CUSTOM_COMPENSATION_TABLE_CONDUCTIVITY_MAX_ENTRIES; i++)
		{
			this->Data.temperatureCompensationSettings.conductivitiesCustomChemical_TCW.fEntries[i] = DEFAULT_CUSTOM_TC_CONDUCTIVITY_VALUES;
		};
	}

	~OperationSetups(){};

	SETUP_SETTINGS		Data;
	bool				conductivityInputsChanged;
	bool				filterTimeConstantChanged;
	bool   				temperatureCompensationSettingsChanged;
	bool				analogOutputLimitsChanged;
	bool				switchOutputLimitsChanged;

private:

};

class SettingsManager
{
public:
	SettingsManager(){};
	~SettingsManager(){};

	void setOperationSetup(uint8_t *);
	uint8_t getOperationSetup();
    void setOperationSetup(uint8_t);

	void	setTemperatureUnit(uint8_t *);
	uint8_t	getTemperatureUnit();

	void	setConductivityInputs(operation_setup_t, uint8_t *);
	CONDUCTIVITY_INPUTS* getConductivityInputs(operation_setup_t);

	void	setTemperatureCoefficientLinear(operation_setup_t, float *);
	float	getTemperatureCoefficientLinear(operation_setup_t);

	void	setNonlinearTC_Params(operation_setup_t, uint8_t *);
	NONLINEAR_TC_PARAMS*	getNonlinearTC_Params(operation_setup_t);

	void	setTCCustom_Temperature(operation_setup_t, uint8_t *);
	CUSTOM_TC_PARAMS*	getTCCustom_Temperature(operation_setup_t);

	void	setTCCustom_Concentration(operation_setup_t, uint8_t *);
	CUSTOM_TC_PARAMS*	getTCCustom_Concentration(operation_setup_t);

	void	setTCCustom_Conductivity(operation_setup_t, uint8_t, float *);
	CUSTOM_TC_CONDUCTIVITY_PARAMS* getTCCustom_Conductivity(operation_setup_t);

	void	setOperationMode_IO1(uint8_t *);
	uint8_t	getOperationMode_IO1();

	void	setOperationMode_IO2(uint8_t *);
	uint8_t	getOperationMode_IO2();

	void	setCurrentOutputAssign_IO1(uint8_t *);
	process_variable_t	getCurrentOutputAssign_IO1();

	void	setCurrentOutputAssign_IO2(uint8_t *);
	process_variable_t	getCurrentOutputAssign_IO2();

	void	setCurrentOutputLimits(operation_setup_t, uint8_t *);
	LIMITS_FOR_OUTPUTS*	getCurrentOutputLimits(operation_setup_t);

	void	setSwitchOutputType_IO1(uint8_t *);
	io1_switch_type_t	getSwitchOutputType_IO1();

	void	setSwitchOutputAssign_IO1(uint8_t *);
	process_variable_t	getSwitchOutputAssign_IO1();

	void	setSwitchOutputFunction_IO1(uint8_t *);
	switch_function_t	getSwitchOutputFunction_IO1();

	void	setSwitchOutputType_IO2(uint8_t *);
	io2_switch_type_t	getSwitchOutputType_IO2();

	void	setSwitchOutputAssign_IO2(uint8_t *);
	process_variable_t	getSwitchOutputAssign_IO2();

	void	setSwitchOutputFunction_IO2(uint8_t *);
	switch_function_t	getSwitchOutputFunction_IO2();

	void setProcessVariable_IO1(uint8_t*);
	void setProcessVariable_IO2(uint8_t*);

	process_variable_t getProcessVariable_IO1(void);
	process_variable_t getProcessVariable_IO2(void);

	void	setSwitchOutputLimits(operation_setup_t, uint8_t *);
	LIMITS_FOR_OUTPUTS*	getSwitchOutputLimits(operation_setup_t);

	void 	setDINStatus(bool);
	bool	getDINStatus();

	void 	setDINFunctionality(uint8_t *);
	setup_selection_based_on_din_level_t getDINFunctionality();

	void 	setDINAssign_HIGH(uint8_t *);
	operation_setup_t	getDINAssign_HIGH();

	void 	setDINAssign_LOW(uint8_t);
	operation_setup_t	getDINAssign_LOW();

	void	setDisplayBacklight(uint8_t *);
	uint8_t	getDisplayBacklight();

	void	setCommunicationType(uint8_t *);
	wireless_comm_selection_t getCommunicationType();

	void 	setBLE_TxPwrLevel(uint8_t);
	bluetooth_tx_power_t getBLE_TxPwrLevel();

	bool	getBLE_CommunicationStatus();

	void	setWiFiActivation(uint8_t *);
	wireless_comm_selection_t getWiFiActivation();

	void	setWiFiConnectionMode(uint8_t *);
	wifi_modes_t getWiFiConnectionMode();

	void	setWiFiSSID(uint8_t *);
	char	*getWiFiSSID();

	void	setWiFiPassword(uint8_t *);

	void	setIP_ConfigurationMode(uint8_t *);
	ip_configuration_t	getIP_ConfigurationMode();

	void	setWiFi_IP(uint8_t *);
	char	*getWiFi_IP();

	void	setWiFiSubnet(uint8_t *);
	char	*getWiFiSubnet();

	void	setWiFiRouter(uint8_t *);
	char	*getWiFiRouter();

	void	setCorrectionParameters(conductivity_range_t, uint8_t *);
	CORRECTION_SETTINGS* getCorrectionParameters(conductivity_range_t);

	void	setSystemDefineAccessCode(uint8_t *);
	void	setSystemEnterAccessCode(uint8_t *);
	uint16_t getSystemAccessCode();
};

extern CorrectionSettings 	    	CorrectionParameters[NUMBER_OF_CONDUCTIVITY_RANGES];
extern IO1Settings					IO1;
extern IO2Settings					IO2;
extern SettingsInsideProcessData	SettingsInsidePD;
extern CommunicationSettings		Communication;
extern LanguageSettings				Language;
extern SensorInfo					SensorInformation;
extern OperationSetups				OperationConfiguration[NUMBER_OF_OPERATION_SETUPS];
extern SettingsManager				SettingsHandler;

#endif /* SENSOR_SETTINGS_H */
