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
				},
				{
					"parent": "#",
					"_id": "0002",
					"value": "item2",
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

var exSet = dataSet1.items;


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
    print(this.parentNode);
    print(this);
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
	console.log(current);
	var childrenVals = [];
	var nextChildrenVals = [];
	var  allSelects = $('select');
	var index = getIndex(current);
	console.log(index);
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

	
	// console.log(allSelects.remove(-2));

	// var selVal = exSet.findById(current.value);
	// // The currentValue's children
	// for (var i = 0; i < selVal.children.length; i++) {
	// 	childrenVals.push(selVal.children[i]._id);
	// }
	// print(allSelects[allSelects.length - 1].options);
	// for (var j = 0; j < allSelects[allSelects.length - 1].options.length; j++) {
	// 	nextChildrenVals.push(allSelects[allSelects.length - 1].options[j].value);
	// }
	// console.log(childrenVals);
	// print(nextChildrenVals);
	// // allSelects[allSelects.length-1]
	// if (childrenVals === nextChildrenVals) {
	// 	// allSelects[allSelects.length-1].remove();
	// 	print(allSelects[allSelects.length-1]);
	// 	print('fuck');	
	// }

	
	// print("DERP")
	
	

}

function listenerArg (event) {
	// console.log(this.value);
	// console.log(this);
	var derp = exSet.findById(this.value);
	derp.children.createSelects('body');
	removeSelectListeners();

	removeSelects(this);
	addSelectListener();
}


function removeSelectListeners () {
	var  allSelects = $('select');
	for (var i = 0; i < allSelects.length; i++) {
		allSelects[i].removeEventListener('change', listenerArg, false);
	}
}


function addSelectListener() {

	var  allSelects = $('select');
	for(var i=0;i<allSelects.length;i++){
			// console.log(allSelects[i]);
	       allSelects[i].addEventListener('change', listenerArg, false);
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
	exSet.createSelects('body');
	addSelectListener();
}

