var layer, mouseLeft;

$(window).mouseup(function() {
  mouseLeft = false;
});
$(window).mouseout(function() {
  mouseLeft = false;
});

var noderules = ["Headquarter","AssetType","Headquarter_AssetType","Asset","Kein"];
var Headquarter = ["akquinet SLS"];
var HeadquarterIDs = [1];
var AssetType = ["Smartphone Android","Fahrzeug","Core"];
var AssetTypeIDs = [1,2,999];
var Asset = ["Smartphone1","Fahrzeug1","Fahrzeug2","Core"];
var AssetIDs = [3,1,2,999];
var Kein = [];
var KeinIDs = [];
var labelEditor = {type: 'select', choices: ['Alle', 'Selbes Asset', 'Selbes HQ'] };
var wireConfig = { 	label: "Alle",
					//labelStyle: { fontSize: "80%"},
					labelEditor: labelEditor,
					xtype: "WireIt.BezierWire" 
				};

				


var SLSruleBuilderLang = {	
	languageName: "sensorNetwork",
	adapter: WireIt.WiringEditor.adapters.RestJSON,
	modules: [
		{
			"name": "vs_orientation",
			"vs_code_id":1,
			"category": "input",
			"container": {
				"xtype":"WireIt.FormContainer", 
				"icon": "images/orientation.png",
				"collapsible": false,
				"resizable": false,
				"fields": [
					{"type": "select", "inputParams": {"label": "", "name": "SelectorType", "selectValues": noderules }}	
				],
				"terminals": [
					{"name": "0", "offsetPosition": {"left": 125, "bottom": -15 },"ddConfig": {"type": "Orientation"}, "alwaysSrc":true,  wireConfig: wireConfig}
				],
				"help":"Der Orientation-Sensor liefert die X,Y und Z-Achse und erzeugt daraus eine Lage im Raum."
			}

		},

		{
			"name": "vs_position",
			"vs_code_id":2,
			"category": "input",
			"container": {
				"xtype":"WireIt.FormContainer", 
				"icon": "images/geoPosition.png",
				"collapsible": false,
				"resizable": false,
				"fields": [
					{"type": "select", "inputParams": {"label": "", "name": "SelectorType", "selectValues": noderules }}	
				],
				"terminals": [
					{"name": "0", "offsetPosition": {"left": 125, "bottom": -15 },"ddConfig": {"type": "Position"}, "alwaysSrc":true,  wireConfig: wireConfig}
				],
				"help":"GPS-Position."
			}

		},

		{
			"name": "vs_geo_distance_2d",
			"vs_code_id":3,
			"category": "operator",
			"container" : {
				"xtype":"WireIt.FormContainer", 
				"image": "images/geoDistance2d.png",
				"icon": "images/geoDistance2d.png",
				"collapsible": false,
				"resizable": false,
				"fields": [
					{"type": "hidden", "name": "SelectorType", "value": "Asset" },
					{"type": "hidden", "name": "Headquarter", "value": null },
					{"type": "hidden", "name": "AssetType", "value": null },
					{"type": "hidden", "name": "Asset", "value": "999" },
					{"type": "hidden", "name": "Kein", "value": "0" }
				],
  				"terminals": [
  					{"name": "1", "direction": [0,-1], "offsetPosition": {"left": 5, "top": -15 },"ddConfig": {"allowedTypes": "Position"}},
					{"name": "2", "direction": [0,-1], "offsetPosition": {"left": 29, "top": -15 },"ddConfig": {"allowedTypes": "Position"}},
					{"name": "0", "direction": [0,1], "offsetPosition": {"left": 17, "bottom": -15 },"ddConfig": {"type": "Distance"}, "alwaysSrc":true,  wireConfig: wireConfig}
  				]
			}
		},
		

		{
			"name": "vs_threshold",
			"vs_code_id":4,
			"category": "operator",
			"container" : {
				"xtype":"WireIt.FormContainer", 
				//"image": "images/distanceSchwellwert.png",
				"icon": "images/distanceSchwellwert.png",
				"collapsible": true,
				//"legend": "Auf / Zuklappen",
				"resizable": false,
				"fields": [
					{"type":"string", "label": "Distance", "name": "Distance", "wirable": true, "ddConfig": {"allowedTypes": "Distance", "name": "1"} },
					{"type": "hidden", "name": "SelectorType", "value": "Asset" },
					{"type": "hidden", "name": "Headquarter", "value": null },
					{"type": "hidden", "name": "AssetType", "value": null },
					{"type": "hidden", "name": "Asset", "value": "999" },
					{"type": "hidden", "name": "Kein", "value": "0" }
				],
  				"terminals": [
  					{"name": "0", "direction": [0,1], "offsetPosition": {"left": 125, "bottom": -15 },"ddConfig": {"type": "boolean"}, "alwaysSrc":true,  wireConfig: wireConfig}
  				],
				"help":"GPS-Position."
			}
		},

		
		{
			"name": "vs_tows",
			"vs_code_id":5,
			"category": "output",
			"container" : {
				"xtype":"WireIt.FormContainer", 
				"icon": "images/websocket.png",
				"image": "images/websocket.png",
				"collapsible": false,
				"resizable": false,
				"fields": [
					{"type": "hidden", "name": "SelectorType", "value": "Asset" },
					{"type": "hidden", "name": "Headquarter", "value": null },
					{"type": "hidden", "name": "AssetType", "value": null },
					{"type": "hidden", "name": "Asset", "value": "999" },
					{"type": "hidden", "name": "Kein", "value": "0" }
				],
  				"terminals": [ {"name": "1", "direction": [0,-1], "offsetPosition": {"left": 17, "top": -15 },"ddConfig": {"allowedTypes": "\w*"} } ]
			}
		}
	]
};


/********
 * CODE
 ********/

// General logic container
LogicContainer = function(opts, layer) {
	LogicContainer.superclass.constructor.call(this, opts, layer);
	this.logicInputValues = [];
};
YAHOO.lang.extend(LogicContainer, WireIt.ImageContainer, {

	/** 
    * @property xtype
    * @description String representing this class for exporting as JSON
    * @default "WireIt.LogicContainer"
    * @type String
    */
   xtype: "LogicContainer",
	
	setInput: function(bStatus,term) {
		this.logicInputValues[term.name] = bStatus;
		
		if(this.title == "AND") {
			this.setLogic( this.logicInputValues["_INPUT1"] && this.logicInputValues["_INPUT2"]  );
		}
		else if (this.title == "OR") {
			this.setLogic( this.logicInputValues["_INPUT1"] || this.logicInputValues["_INPUT2"]  );
		}
		else if (this.title == "NOT") {
			this.setLogic(!this.logicInputValues["_INPUT"]);
		}
		else if (this.title == "NAND") {
			this.setLogic( !(this.logicInputValues["_INPUT1"] && this.logicInputValues["_INPUT2"])  );
		}
		else if (this.title == "XOR") {
			this.setLogic( (!this.logicInputValues["_INPUT1"] && this.logicInputValues["_INPUT2"]) ||
			  					(this.logicInputValues["_INPUT1"] && !this.logicInputValues["_INPUT2"]) );
		}
	},
	
	setLogic: function(bStatus) {
		this.status = bStatus;
		
		// Set the image
		if(this.imageName) {
			var image = this.imageName+"_"+(bStatus ? "on" : "off")+".png";
			YAHOO.util.Dom.setStyle(this.bodyEl, "background-image", "url(images/"+image+")");
		}
		
		// trigger the output wires !
		for(var i = 0 ; i < this.terminals.length ; i++) {
			var term = this.terminals[i];
			if(term.name == "_OUTPUT") {
				for(var j = 0 ; j < term.wires.length ; j++) {
					var wire = term.wires[j];
					var otherTerm = wire.getOtherTerminal(term);
					if(otherTerm.container) {
						otherTerm.container.setInput(bStatus, otherTerm);
					}
					wire.color = bStatus ? "rgb(173,216,230)" : "rgb(255,255,255)";
					wire.redraw();
				}
			}
		}
	},
	switchStatus: function() {
		this.setLogic(!this.status);
	}
});


ClockContainer = function(opts, layer) {
	ClockContainer.superclass.constructor.call(this, opts, layer);
	this.imageName = "clock";	
	var that = this;
	setInterval(function() { that.switchStatus();	}, 800);
};
YAHOO.lang.extend(ClockContainer, LogicContainer, {
	xtype: "ClockContainer"
});

SwitchContainer = function(opts, layer) {
	SwitchContainer.superclass.constructor.call(this, opts, layer);
	this.imageName = "switch";
	YAHOO.util.Event.addListener(this.bodyEl, "click", this.switchStatus, this, true);
};
YAHOO.lang.extend(SwitchContainer, LogicContainer, {
	xtype: "SwitchContainer"
});

LightbulbContainer = function(opts, layer) {
	LightbulbContainer.superclass.constructor.call(this, opts, layer);
	this.imageName = "lightbulb";
};
YAHOO.lang.extend(LightbulbContainer, LogicContainer, {
	xtype: "LightbulbContainer",
	
	setInput: function(bStatus,term) {
		this.setLogic(bStatus);
	}
	
});

YAHOO.util.Event.onDOMReady( function() { 
	try {
		logicGates = new WireIt.WiringEditor(SLSruleBuilderLang); 
	}catch(ex) {
		alert(ex);
	}
});

