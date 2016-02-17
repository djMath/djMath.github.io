//Event listeners for Search

//Search Initiator
$("#searchString").keyup(function(){
    var search = $(this).val();
    if(fieldLock == false){
        if(!isNaN(search)&&search!=""){
            load.calculator();
        }
    }
    if(search==""&&fieldLock == true){
        load.search();
    }

});


/*
 * Triggers the auto complete for search
 * return (void)
 */
$('.autocompleteLoader').autocomplete({
    lookup: formulas,
    onSelect: function (suggestion) {
        console.log("Formula : " + suggestion.value + "Mapped @ " + suggestion.key);
        load.formulaActionWindow(suggestion.value,suggestion.key);
    }
});
