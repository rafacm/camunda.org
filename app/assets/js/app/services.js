'use strict';

/* Services */

angular
  .module('camundaorg.services', [])
  .factory('CSV', function() {	
		return {
			/**
			 * splitCSV function (c) 2009 Brian Huisman, see http://www.greywyvern.com/?post=258
			 * Works by spliting on seperators first, then patching together quoted values
			 */
			splitCSV : function(string, seperator) {
				for (var value = string.split(seperator = seperator || ","), x = value.length - 1, tl; x >= 0; x--) {
		            if (value[x].replace(/"\s+$/, '"').charAt(value[x].length - 1) == '"') {
		                if ((tl = value[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
		                    value[x] = value[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
		                } else if (x) {
		                    value.splice(x - 1, 2, [value[x - 1], value[x]].join(sep));
		                } else value = value.shift().split(seperator).concat(value);
		            } else value[x].replace(/""/g, '"');
		    } return value;
		  },
		    
		    /**
			 * Converts from CSV formatted data (as a string) to JSON returning
			 * 	an object.
			 * @required csvdata {string} The CSV data, formatted as a string.
			 * @param args.delim {string} The delimiter used to seperate CSV
			 * 	items. Defauts to ','.
			 * @param args.textdelim {string} The delimiter used to wrap text in
			 * 	the CSV data. Defaults to nothing (an empty string).
			 */
		  csv2json : function(csvData, args) {
        args = args || {};
				var delim = null;
				
				if(typeof args.delim === "undefined") {
					delim = ",";
				} else {
					delim = args.delim;
				}
				
        // Linux line ending check
        var csvLines = (csvData.search("\r\n")) ? csvData.split("\r\n") : csvData.split("\n");
        
				var csvHeaders = this.splitCSV(csvLines[0], delim);
				var csvRows = csvLines.slice(1, csvLines.length);
	
				var returnValue = {};
				returnValue.rows = [];
	
				for(var r in csvRows) {
					if (csvRows.hasOwnProperty(r)) {
						var row = csvRows[r];
						var rowItems = this.splitCSV(row, delim);
	
						// Break if we're at the end of the file
						if(row.length == 0) break;
	
						var rowObj = {};
						for(var i in rowItems) {
							if (rowItems.hasOwnProperty(i)) {
								var item = rowItems[i];
	
								rowObj[csvHeaders[i]] = item;
							}
						}
						returnValue.rows.push(rowObj);
					}
				}
				return returnValue;
			}
		};
  });