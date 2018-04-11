
/*
    Principal function. Get the data inserted by the user
*/
function input_data(){    
    document.getElementById("calendar").innerHTML= "";
    var country_code_input= document.getElementById('country_code').value;
    var initial_day_input= document.getElementById('start_date​').value;
    var fina_day_input= document.getElementById('number_days').value;            
    if(country_code!= "" & initial_day_input != "" & fina_day_input != ""){        
        date_var= new Date(initial_day_input);                
        final_day=  fina_day_input;  
        alert(date_var);
    }
    else{
        alert("no-data");
    }        
 }

 