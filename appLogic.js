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
var pVal = new PrivateVariables();



function createFirstSelect () {
	exSet.createSelects('body');
	addSelectListener();
}

