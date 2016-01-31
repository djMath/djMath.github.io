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

