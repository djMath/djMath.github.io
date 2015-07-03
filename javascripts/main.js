var formulas  = [];
var fieldLock = false; // denotes calculator state
var checkboxLength = 0;
$.getJSON( "database/formulas.json", function( data ) {  
  $.each( data, function( key, formula ) {
    formulas.push({value : formula.title , data : key , get : [ formula.expr_get ], out : [ formula.expr_out ]});
  });   
});


$('.completeLoader').autocomplete({
    lookup: formulas,
    onSelect: function (suggestion) {
        console.log("Formula : " + suggestion.value + "Mapped @ " + suggestion.data);
        load.formulaActionWindow(suggestion.value,suggestion.data);
    }
});

var load = {
	calculator : function(){		
		fieldLock = true;
		$("#searchString").addClass("calc");
		console.log("Calculator Loaded");
	},
	search : function(){
		fieldLock = false;
		console.log("Search Loaded");
		$("#searchString").removeClass("calc");
	},
	formulaActionWindow : function(searchData,key){
		$('.formulaActionWindow').fadeIn(150);
		$('.formulaActionWindow').attr('formula',searchData);
		$('.formulaActionWindow').attr('key',key);
		$('.formulaActionWindow h2').html(searchData);
		var __form = formulas[key].get[0];
		var length = __form.length;
		console.log(length);
		var checkboxHTML = "";
		checkboxLength = 0;
		for (var i = 0; i < length; i++) {
			checkboxLength++;
			checkboxHTML += "<input type='checkbox' name='getVal' value='" + __form[i] + "'>" + __form[i] + ""
		};
		$('#haveData').html(checkboxHTML);
	}
};
function minimumDataOK(key){
	return true;
}

function getCheckedattrNames(){
	return ["a","b","c"];
}

//Action for Checkbox 
$('body').on('click','#haveData input',function(){
	var key = $(this).closest("div.formulaActionWindow").attr('key');
	if(minimumDataOK(key)){
		var getValHTML = "<p> ";
	for (var i = 0; i < getCheckedattrNames().length; i++) {
		getValHTML += "Enter the " + getCheckedattrNames()[i] + "<input type='number' ><br/>";
	};
		$('.getDataWindow').html(getValHTML + " </p>");
	}
	
});


//Search Initiator
$("#searchString").keyup(function(){
	var search = $(this).val();
	if(fieldLock == false){
		if(!isNaN(search)&&search!=""){			
			load.calculator();
		}		
	}else{
		if(isNaN(search)){			
			load.search();
		}
	}
	if(search==""&&fieldLock == true){
		load.search();
	}

});