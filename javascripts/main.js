var formulas  = [];
var fieldLock = false; // denotes calculator state

$.getJSON( "database/formulas.json", function( data ) {  
  $.each( data, function( key, formula ) {
    formulas.push({value : formula.title , data : key });
  });   
});


$('.completeLoader').autocomplete({
    lookup: formulas,
    onSelect: function (suggestion) {
        console.log("Formula : " + suggestion.value + "Mapped @ " + suggestion.data);
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
	}
};


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