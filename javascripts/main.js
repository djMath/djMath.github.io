$.getJSON( "database/formulas.json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    console.log(key + ' => ' + val);
  });   
});
