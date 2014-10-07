// This file is to shorten the lines of code you have in the node stuff.

var dataSet1 = {
	"items": [
				{
					"parent": "#",
					"_id": "0001",
					"value": "chevy",
					"children": [
						{
							"parent": "0001",
							"_id": "0005",
							"value": "turbo",
							"children": [
								{
									"parent": "0005",
									"_id": "0015",
									"value": "pressure",
									"children": [
										
									]
								},
								{
									"parent": "0005",
									"_id": "0016",
									"value": "burst",
									"children": [
													
									]
								}				
							]
						},
						{
							"parent": "0001",
							"_id": "0006",
							"value": "engine",
							"children": [
								{
									"parent": "0006",
									"_id": "0017",
									"value": "herp",
									"children": [
													
									]
								},
								{
									"parent": "0006",
									"_id": "0018",
									"value": "derp",
									"children": [
													
									]
								}	
							]
						},
						{
							"parent": "0001",
							"_id": "0007",
							"value": "wheel",
							"children": [
								{
									"parent": "0007",
									"_id": "0019",
									"value": "big",
									"children": [
													
									]
								},
								{
									"parent": "0007",
									"_id": "0020",
									"value": "small",
									"children": [
													
									]
								}	
							]
						}	
					]
				},
				{
					"parent": "#",
					"_id": "0002",
					"value": "Ford",
					"children": [
						{
							"parent": "0002",
							"_id": "0021",
							"value": "Transmission",
							"children": [
								{
									"parent": "0021",
									"_id": "0024",
									"value": "Well Tuned",
									"children": [
												
									]
								},
								{
									"parent": "0021",
									"_id": "0025",
									"value": "Loose",
									"children": [
													
									]
								}				
							]
						},
						{
							"parent": "0002",
							"_id": "0022",
							"value": "Engine",
							"children": [
								{
									"parent": "0022",
									"_id": "0026",
									"value": "Upgrade",
									"children": [
													
									]
								},
								{
									"parent": "00022",
									"_id": "0027",
									"value": "Tune-up",
									"children": [
													
									]
								}	
							]
						},
						{
							"parent": "0002",
							"_id": "0023",
							"value": "Shocks",
							"children": [
								{
									"parent": "0023",
									"_id": "0028",
									"value": "High",
									"children": [
													
									]
								},
								{
									"parent": "0023",
									"_id": "0029",
									"value": "Low",
									"children": [
													
									]
								}	
							]
						}	
					]
				}
		]
};

function loadJsonDoc(filename){
	if(window.XMLHttpRequest){
		xhttp=new XMLHttpRequest();
	}else{

		xhttp=new ActiveXObject("Microsoft.XMLHTTP");	
	}
	xhttp.open("GET",filename,false);
	xhttp.send();
	return JSON.parse(xhttp);
}
var exSet = loadJsonDoc('tree.json').items;
// var exSet = dataSet1.items;

function print (x) {
	console.log(x);
}

var pVal = new PrivateVariables();

var $ = function (arg) {
	// look at the first character to check for id, class, or tag
	// Make sure the type is a string

	if(typeof arg !== "string"){
		// Don't continue further. This isn't a string and can not be processed
		return;
	}
	var elType = arg.substring(0, 1);

	var elements;
	var argShort = arg.substr(1);
	if (elType === '.') {
		// the element type is a class
		elements = document.getElementsByClassName(argShort);
		if (!isValid(elements)) {
			return;
		}
		return elements;
	} else if (elType === '#') {
		elements = document.getElementById(argShort);
		if (!isValid(elements)) {
			console.log("Can\'t find any elements by class name");
			return;
		}
		return elements;

	} else{
		if(arg.indexOf('.') > -1){
			// Don't check if there are too many spaces
			// print(arg);
			if (arg.indexOf(' ') !== -1) {
				return;
			}
			// print(arg);
			elements = document.querySelectorAll(arg);
		}
		else{
			elements = document.getElementsByTagName(arg);
		}
		if (!isValid(elements)) {
			return;
		}
		
		return elements;
	}

};


// SELECT Instructions
// ------------------------------------
// To remove selects, scan for all previous option's children and see if they exist.
// If they do find the parent select and remove those elements.
// Once the elements no longer exist. Create all of the children for the new select option
// Then check and see if no children exist for either one of the two options to end the select tree
// Call an action to signify the end of the tree. I.E. Animations, Text, WhatEver

Object.prototype.createSelects = function(par_element) {
	// The parent element is the element we wish to append to.
	// Check to see if par_element is single
	// Value for select option will be _id
	// Text for select option will be value
	var parent;
	var sel = document.createElement("select");
	for (var i = 0; i < this.length; i++) {
		
		var opt = document.createElement("option");
		opt.value = this[i]._id;
		opt.text = this[i].value;
		sel.appendChild(opt);
	}
	if(par_element === 'body' || par_element === 'dom'|| par_element === 'doc' || par_element === 'document'){
		parent = document.body; 
		parent.appendChild(sel);

	}else{
		parent = $(par_element);
		parent.appendChild(sel);
	}
};




Element.prototype.remove = function() {
    // console.log(this.parentNode.parentNode);
    // print(this.parentNode);
    // print(this);
    this.parentNode.removeChild(this);    	
    
    
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {

            this[i].parentNode.removeChild(this);
        }
    }
};



// Holds all of the logic of the new listeners that you will create
function listenerLogic () {
	
}


function getIndex ( current) {
	var  allSelects = $('select');
	for (var i = allSelects.length - 1; i >= 0; i--) {
		if (allSelects[i] === current) {
			return i;
		}
	}
}





function removeSelects (current) {
	// find index of the current element warning: Inefficient
	// console.log(current);
	var childrenVals = [];
	var nextChildrenVals = [];
	var  allSelects = $('select');
	var index = getIndex(current);
	// console.log(index);
	while(allSelects.length > index + 2){
		allSelects[allSelects.length-1].remove();
	}
	// 
	for (var i = 0; i < allSelects.length; i++) {
		// print();
		if (allSelects[i].options.length === 0) {
			allSelects[i].remove();
		}
	}

	
	

}

function listenerArg (event) {
	// console.log(this.value);
	// console.log(this);
	var derp = exSet.findById(this.value);
	derp.children.createSelects('#ie8gt');
	removeSelectListeners();

	removeSelects(this);
	addSelectListener();
	if(derp.endChildren()){
		console.log("Final Event Here");
	}
	// console.log(derp);
}


// Checks if either of select's options don't have children. return true if they don't
Object.prototype.endChildren = function () {
	if (this.children.length === 0) {
		return true;
	}
	return false;
};


function removeSelectListeners () {
	var  allSelects = $('select');
	for (var i = 0; i < allSelects.length; i++) {
		allSelects[i].removeEvent('change', listenerArg);
	}
}


Element.prototype.addEvent = function (evnt, func) {
   if (this.addEventListener)  // W3C DOM
      this.addEventListener(evnt,func,false);
   else if (elem.attachEvent) { // IE DOM
      this.attachEvent("on"+evnt, func);
   }
   else { // No much to do
      this[evnt] = func;
   }
};

Element.prototype.removeEvent = function(type, handler) {
        if (this.removeEventListener) {
            this.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            this.detachEvent("on" + type, handler);
        } else {
            this["on" + type] = null;
        }
    };


function addSelectListener() {

	var  allSelects = $('select');
	for(var i=0;i<allSelects.length;i++){
			// console.log(allSelects[i]);
	       allSelects[i].addEvent('change', listenerArg);
	       // addEventListener('change', listenerArg, false);
	   }
}


var findById = function(obj, __id){
	for (var i = 0; i < obj.length; i++) {
		if (obj[i]._id === __id) {
			return obj[i];
		}
		var found = findById(obj[i].children, __id);
		if (found) return found;
		if (!found) return;
	}
	
};


Object.prototype.findById = function(__id) {
	// console.log(this);
	for (var i = 0; i < this.length; i++) {
		// console.log(this[i]);
		// console.log(this[i]._id);
		if (this[i]._id === __id) {
			return this[i];
		}
		var found = (this[i].children).findById(__id);
		if (found) return found;
	}
};


Object.prototype.getParentOfId = function(__id) {
	print('\n\nFindParent\n\n');
	var deredte  = this.findById(__id);
	var parentId = deredte.parent;
	return exSet.findById(parentId);
};

// print(exSet.getParentOfId('0005'));

// Must find the parent using find by id first
Object.prototype.getAllChildren = function () {

	for (var i = 0; i < this.children.length; i++) {
		// console.log(this.children[i]);
		if (this.children[i].length === 0) {
			// It reaches the end
			return;
		}
		// Append Children Id into array
		(this.children[i]).getAllChildren();
	}
	
};

Object.prototype.getChildrenById = function(__id) {
	// console.log("Get Child By Id\n\n");
	// console.log(this);
	// console.log(__id);
	var item = findById(this, __id);
	if (!item) {
		console.log("Not found");
	}else{
		return item.children;
	}
};



/**
*	
**/
function isValid (elements) {
	if (!elements || elements.length === 0) {
		// The element doesn't exist
		return false;
	}
	return true;
}



//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

// This holds all of the app's logic. You should not add anything else. It's purely for organizing the code.

function PrivateVariables() {
	var lastValue;
	var currentValue;
	this.addCurrentValue = function(cVal) {
		lastValue = currentValue;
		currentValue = cVal;
	};

	this.getLastValue = function() {
		return lastValue;
	};
}

// Use to add and check values. They are private because they should not be modified in any uncoventional methods.




function createFirstSelect () {
	var ie7 = (document.all && !window.opera && window.XMLHttpRequest) ? true : false;
	if (ie7) {
		var cont = document.getElementById('container');
		var parent = document.body;
		var p = document.createElement('p');
		p.appendChild(document.createTextNode("Sorry, We don't support your browser"));
	}else{
		exSet.createSelects('#ie8gt');
		addSelectListener();	
	}
	
}

