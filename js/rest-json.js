/**
 * Ajax Adapter using a REST interface. Expect JSON response for all queries.
 * @static 
 */
WireIt.WiringEditor.adapters.RestJSON = {
	
	init: function() {
		YAHOO.util.Connect.setDefaultPostHeader('application/json; charset=utf-8');
	},
	
	saveWiring: function(val, callbacks) {
		try {
		
		// TODO/ 
		// var prev = project.editor.pipesByName[val.name];
		var method = 'PUT';
		var url = '';
		var wiring = {};
		
		//if(prev) {
		if(true) {
			//YAHOO.lang.augmentObject({},  prev);
			//url = '/wirings/'+prev.id+'.json';
			url = '/wirings/dummy.json';
		}
		else {
			wiring = {};
			url = '/wirings?format=json';
			method = 'POST';
		}
		
		wiring.name = val.name;
		wiring.config = val.working;
		
		var postData = YAHOO.lang.JSON.stringify({"wiring": wiring });// , 'authenticity_token':window._token });
		
		YAHOO.util.Connect.asyncRequest( method, url, {
			success: function(o) {
				var r,s;
				// TODO: store the id ?
				if( !wiring ) {
					s = o.responseText;
					r = YAHOO.lang.JSON.parse(s);
				}
				else {
					r = {};
				}
			 	callbacks.success.call(callbacks.scope, r);
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		},postData);
	}catch(ex) {console.log(ex);}
	},
	
	deleteWiring: function(val, callbacks) {
		
		// TODO: 
		//var wiring = project.editor.pipesByName[val.name];
		
		var url ='/wirings/'+wiring.id+'.json';
		YAHOO.util.Connect.asyncRequest('DELETE', url, {
			success: function(o) {
			 	callbacks.success.call(callbacks.scope, {});
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		});
	},
	
	triggerBuild: function(val, callbacks) {
		
		// TODO: 
		//var wiring = project.editor.pipesByName[val.name];
		console.log("TRIGGER");
		var url ='/build';
		YAHOO.util.Connect.asyncRequest('POST', url, {
			success: function(o) {
			 	//alert(o);
				//callbacks.success.call(callbacks.scope, {});
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		});
	},

	saveBuild: function(val, callbacks) {
		try {
		
		// TODO/ 
		// var prev = project.editor.pipesByName[val.name];
		var method = 'PUT';
		var url = '';
		var wiring = {};
		
		//if(prev) {
		if(true) {
			//YAHOO.lang.augmentObject({},  prev);
			//url = '/wirings/'+prev.id+'.json';
			url = '/wirings/dummy.json';
		}
		else {
			wiring = {};
			url = '/wirings?format=json';
			method = 'POST';
		}
		
		wiring.name = val.name;
		wiring.config = val.working;
		
		var postData = YAHOO.lang.JSON.stringify({"wiring": wiring });// , 'authenticity_token':window._token });
		
		YAHOO.util.Connect.asyncRequest( method, url, {
			success: function(o) {
				var r,s;
				// TODO: store the id ?
				if( !wiring ) {
					s = o.responseText;
					r = YAHOO.lang.JSON.parse(s);
				}
				else {
					r = {};
				}
			 	callbacks.success.call(callbacks.scope, r);
				
				//alert("now build");
				YAHOO.util.Connect.asyncRequest('POST', '/build', {
					success: function(o) {},
					failure: function(o) {
						var error = o.status + " " + o.statusText;
						callbacks.failure.call(callbacks.scope, error);
					}
				});
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		},postData);
		}catch(ex) {console.log(ex);}
	},

	reorder: function(val, callbacks) {
		
		// TODO: 
		//var wiring = project.editor.pipesByName[val.name];
		console.log("TRIGGER reorder");
		var url ='/gv';
		YAHOO.util.Connect.asyncRequest('POST', url, {
			success: function(o) {
				callbacks.success.call(callbacks.scope, o.responseText);
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		}, val);
	},
	
	listWirings: function(val, callbacks) {
		YAHOO.util.Connect.asyncRequest('GET', '/wirings', {
			success: function(o) {
				var s = o.responseText;
					v = YAHOO.lang.JSON.parse(s);
				var p = [];
//ce v.length / v[i].X -> v.result.length / v.result[i].X
				for(var i = 0 ; i < v.result.length ; i++) {
					p.push({
						id: v.result[i].id,
						name: v.result[i].name,
						working: v.result[i].config
					});
				}
			 	callbacks.success.call(callbacks.scope, p);
			},
			failure: function(o) {
				var error = o.status + " " + o.statusText;
				callbacks.failure.call(callbacks.scope, error);
			}
		});
	}
	
};
