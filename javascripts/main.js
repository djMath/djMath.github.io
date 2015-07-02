var formulas = [];

$.getJSON( "database/formulas.json", function( data ) {  
  $.each( data, function( key, formula ) {
    formulas.push({value : formula.title , data : key });
  });   
});


$('#ac').autocomplete({
    lookup: formulas,
    onSelect: function (suggestion) {
        console.log("Formula : " + suggestion.value + "Mapped @ " + suggestion.data);
    }
});