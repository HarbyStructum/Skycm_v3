{
	"_Name": "Skycm_v3",
	"Version": "/Skycm_v3/Globals/Application/AppDefinition_Version.global",
	"MainPage": "/Skycm_v3/Pages/Main.page",
	"OnLaunch": [
		"/Skycm_v3/Actions/Service/InitializeOffline.action"
	],
	"OnWillUpdate": "/Skycm_v3/Rules/Application/OnWillUpdate.js",
	"OnDidUpdate": "/Skycm_v3/Actions/Service/InitializeOffline.action",
	"Styles": "/Skycm_v3/Styles/Styles.less",
	"Localization": "/Skycm_v3/i18n/i18n.properties",
	"_SchemaVersion": "25.9"
}