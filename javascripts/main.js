var formulas  = [];
var fieldLock = false; // denotes calculator state

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
		$('.formulaActionWindow h2').html(searchData);
		var __form = formulas[key];
		var length = __form.get.length;
		console.log(length);
		var radioHTML = "";
		for (var i = 0; i < length; i++) {
			radioHTML = "<input type='checkbox' name='getVal' value='" + __form.get[i] + "'>" + __form.get[i] + ""
		};
		$('#haveData').html(radioHTML);
	}
};

//Action for Checkbox 
$('body').on('click','#haveData input',function(){
	console.log($(this));
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