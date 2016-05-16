var formulas  = [];
var fieldLock = false; // denotes calculator state
var checkboxLength = 0;
var _dj = {};

var cTracker = {
	formula : null,
	formulaIndex : 0,
	inputs : null
};

/*
 * Retrives data from the formlulas JSON File
 * Formula contains
 *     - value  :   Title
 *     - key    :   Key / Index
 *     - get    :   Required variables data
 *     - out    :   Output details
 * return (void)
 */
$.getJSON( "database/formulas.json", function( data ) {
  $.each( data, function( key, formula ) {
    formulas.push({value : formula.title , key : key , get : [ formula.expr_get ], out : [ formula.expr_out ],formula : formula.formula });
  });
});



/*
 * Loads different options / Load library
 */

var load = {

/*
 * Initialize the calculator mode
 * return (void)
 */
	calculator : function(){
		fieldLock = true;
		$("#searchString").addClass("calc");
		console.log("Calculator Loaded");
	},
/*
 * Initialize the search mode
 * return (void)
 */
	search : function(){
		fieldLock = false;
		console.log("Search Loaded");
		$("#searchString").removeClass("calc");
	},
/*
 * Opens formula data entry window
 * return (void)
 */
	formulaActionWindow : function(formulaTitle,index){
		$('.formulaActionWindow').fadeIn(100);
		$('.formulaActionWindow').attr('formula',formulaTitle);
		$('.formulaActionWindow').attr('index',index);
		$('.formulaActionWindow h2').html(formulaTitle);
		var formulaInputDetails = formulas[index].get[0];
        console.log(formulaInputDetails);

		var inputboxHTML = "";

		for (var i = 0; i < formulaInputDetails.length; i++) {

			inputboxHTML+= "<div class='input'><label for='"+ formulaInputDetails[i] +"'>  " + formulaInputDetails[i] + "</label><input type='number' name='"
                        + formulaInputDetails[i] +"' value=''><div>";
		};

		$('#inputBoxHTML').html(inputboxHTML);

		cTracker.formulaIndex = index;
		console.log("Formula index is " + cTracker.formulaIndex);
	}
};


var DJMath = {
    hasMeetMinRequiredInput : function(){
    	var requiredInputsLength = formulas[cTracker.formulaIndex].get[0].length;
    	_dj = {};
  		var value;
    	for ( var i = 0 ; i < requiredInputsLength ; i++){
    		value = $("#inputBoxHTML input")[i].value;
    		//declare to _dj variable
    		_dj[$("#inputBoxHTML input")[i].name] = Number(value);
    		if(value == null || value == ""){
    			return false;
    		}
    	}
    	return true;
    },
    computeOutput : function(){
    	if(this.hasMeetMinRequiredInput()){
    		var formula = this.getFormula(this.getFormulaPair());
    		console.log(formula);
    		this.writeFormula(formula);
    	}
    },
    getFormulaPair : function(){
    	return 0;
    },
    getFormula : function(pair){
    	return formulas[cTracker.formulaIndex].formula;
    },
    writeFormula : function(f){
    	$("#djformula").remove();
    	var htmlData = "<script id='djformula' type='text/javascript'> function djCompute() { var djOut = " + f + "; DJMath.output(djOut); } </script>";
    	$("body").append(htmlData);
    	djCompute();

    },
    output : function(o){
    	$("#outputWindow").html("The " + formulas[cTracker.formulaIndex].out + " is : " + o );
    }
};

/*
 * Closes the window
 *
 */
$('#closeIcon').click(function(){
    $('.formulaActionWindow').fadeOut(100);
});

/* Event Listener for input datachange
 * Finds the answer and update the output window
 */

$("body").on("input","#inputBoxHTML input",function(){
    console.log('Input data changed!');
    DJMath.computeOutput();
});

