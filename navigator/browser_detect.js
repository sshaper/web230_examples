var detect = {

  init : function() {

    // determine browser and assign to detect.browser
    // the detect.dataBrowser array is sent to the detect.searchingString function
    this.browser = this.searchString(this.dataBrowser);

    // determine version and assign to detect.version
    // userAgent string and appVersion are passed to the detect.searchVersion function
    this.version = this.searchVersion(navigator.userAgent) ||
                   this.searchVersion(navigator.appVersion) ||
                   "unknown version";

    // determine operating system and assign to detect.OS
    // the detect.dataOS array is sent to the detect.searchingString function
    this.OS = this.searchString(this.dataOS) || "unknown OS";

  },

  // used to parse the strings for browser and operating system
  searchString : function(data) {

    // loop through all the items in the array passed
    for (var i=0, allData=data.length; i<allData; i++) {

      // assign the 'string' property's value to dataString, if it exists
      var dataString = data[i].string;

      // assign the 'prop' property's value to dataProp, if it exists
      var dataProp = data[i].prop;

      // assign either the 'versionSearch' or the 'identity' property's
      // value to detect.versionSearchString
      // 'versionSearch' is given preference by listing it before 'identity'
      this.versionSearchString = data[i].versionSearch || data[i].identity;

      // execute this block of code if there is a 'string' property
      if (dataString) {

        // search the indicated string (the indicated navigator property)
        // for the associated 'subString' property
        if (dataString.indexOf(data[i].subString) != -1) {

	    // if there is a match, return the value of the
	    // 'identity' property which gets assigned to detect.browser
	    return data[i].identity;

	    }

      }

      // execute this block of code if there was a 'prop' property
      else if (dataProp) {

        // return the value of the 'identity' property if the 'prop' value exists,
        // which gets assigned to detect.browser
        return data[i].identity;

      }

    }

    return "unknown browser";

  },

  // used to determine the version number of the browser
  searchVersion : function(dataStr) {

    // look for the position of the detect.versionSearchString
    // in either the userAgent string or the appVersion string
    var index = dataStr.indexOf(this.versionSearchString);

    // if there is no match, the value will be -1 and the function should exit
    if (index == -1) { return; }

    // the version number follows the versionSearch string (e.g., MSIE, OmniWeb)
    // we move ahead one character, which is typically a forward slash, then use
    // parseFloat to return the number after that
    return parseFloat(dataStr.substring(index + this.versionSearchString.length + 1));

  },

  // array of all the browser configurations
  // to add another browser configuration, add another value to the array

  // 'string' property: the navigator property to check

  // 'subString' property: matched against the contents of the navigator property

  // 'versionSearch' property: the string that version number immediately follows

  // 'identity' property: the browser identity we report back, if there is a match

  // 'identity' property is also the fallback for determining the starting point for
  // version number if no versionSearch is provided

  // 'prop' property: a specific navigator property that only a given browser supports

  dataBrowser: [

    { string: navigator.userAgent, // we could also look at navigator.vendor
      subString: "Chrome",
      identity: "Chrome"
    },

    { string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb" },

    { string: navigator.vendor,
      subString: "Apple",
      identity: "Safari" },

    { prop: window.opera,
      identity: "Opera" },

    { string: navigator.vendor,
      subString: "iCab",
      identity: "iCab" },

    { string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror" },

    { string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox" },

    { string: navigator.vendor,
      subString: "Camino",
      identity: "Camino" },

    { // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape" },

    { string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE" },

    { string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv" },

    { // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla" }

  ],

  dataOS : [

    { string: navigator.platform,
      subString: "Win",
      identity: "Windows" },

    { string: navigator.platform,
      subString: "Mac",
      identity: "Mac" },

    { string: navigator.platform,
      subString: "Linux",
      identity: "Linux" }

  ]

};

detect.init();

alert("The browser is: " + detect.browser + " " +
       detect.version + " on " + detect.OS);