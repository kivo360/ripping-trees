// This file is to shorten the lines of code you have in the node stuff.

var dataSet1 = {
	"items": [
			{
				"parent": "#",
				"_id": "0001",
				"value": "item1",
				"children": [
					{
						"parent": "0001",
						"_id": "0005",
						"value": "item1",
						"children": [
							{
								"parent": "0005",
								"_id": "0015",
								"value": "item1",
								"children": [
									{
										"parent": "0015",
										"_id": "0025",
										"value": "item1",
										"children": [
														
										]
									}		
								]
							},
							{
								"parent": "0005",
								"_id": "0016",
								"value": "item1",
								"children": [
												
								]
							}				
						]
					},
					{
						"parent": "0001",
						"_id": "0006",
						"value": "item1",
						"children": [
							{
								"parent": "0006",
								"_id": "0017",
								"value": "item1",
								"children": [
												
								]
							},
							{
								"parent": "0006",
								"_id": "0018",
								"value": "item1",
								"children": [
												
								]
							}	
						]
					},
					{
						"parent": "0001",
						"_id": "0007",
						"value": "item1",
						"children": [
							{
								"parent": "0007",
								"_id": "0019",
								"value": "item1",
								"children": [
												
								]
							},
							{
								"parent": "0007",
								"_id": "0020",
								"value": "item1",
								"children": [
												
								]
							}	
						]
					}	
				]
			}
		]
};



function print (x) {
	console.log(x);
}

function privateVars () {
	var selects = [];
	// Change the select list
	this.replaceSelects = function(newSelects) {
		selects = newSelects;
	};
}



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


var genericVals = new privateVars();
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
	for (var i = 0; i < this.length; i++) {
		console.log(this[i]);
		console.log(this[i]._id);
		console.log(this[i].value);
		console.log(par_element);
	}
};




Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
};

function addSelectListener () {

	var  divSelect = $('select');
	for(var i=0;i<divSelect.length;i++){
			console.log(divSelect[i]);
	       divSelect[i].addEventListener('change', function () {
	       	// var index = divSelect[0].selectedIndex;
	       	// console.log(divSelect);
	       	// console.log(this);
	       }, false);
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
Object.prototype.getAllChildren = function () {

	for (var i = 0; i < this.children.length; i++) {
		console.log(this.children[i]);
		if (this.children[i].length === 0) {
			// It reaches the end
			return;
		}
		// Append Children Id into array
		(this.children[i]).getAllChildrenById();
	}
	
};

Object.prototype.getChildrenById = function(__id) {
	console.log("Get Child By Id\n\n");
	console.log(this);
	console.log(__id);
	var item = findById(this, __id);
	if (!item) {
		console.log("Not found");
	}else{
		return item.children;
	}
};

(findById(dataSet1.items, '0001')).getAllChildren();


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

