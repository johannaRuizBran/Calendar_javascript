/*
    function for call of creation of diferent 
    calendars according to what indicated by the user
*/
function loop_for_calendar_creation(date_var,final_day,initial_day,calendar_id){    
    
    var month = date_var.getMonth();
    var year = date_var.getFullYear();    
    var final_month_days;
    var is_input= false
    while(true){
        final_month_days= new Date(year, month+1, 0).getDate();
        if(final_day== -1){
            final_day= final_month_days;
            is_input= true;        
        }
        initial_funtion(calendar_id,final_day,month,year,final_month_days,initial_day);        
        if(final_day <= final_month_days-initial_day & is_input== false |
            final_day <= final_month_days & is_input== true){                        
            break;            
        }
        else{
            final_day= final_day - (final_month_days- initial_day)-1;
            calendar_id= calendar_id+1;
            initial_day= 1;
            if(month < 11){
                month= month+1;
            }
            else{
                year= year+1;
                month= 0;
            }
        }
    }    
    
}

/*
    Principal function. Get the data inserted by the user
*/
function input_data(){
    
    var date_var, initial_day;
    var final_day=-1;
    var calendar_id= 1;
    document.getElementById("calendar").innerHTML= "";
    var country_code_input= document.getElementById('country_code').value;
    var initial_day_input= document.getElementById('start_date​').value;
    var fina_day_input= document.getElementById('number_days').value;            
    if(country_code!= "" & initial_day_input != "" & fina_day_input != ""){        
        date_var= new Date(initial_day_input);                
        final_day=  fina_day_input;  
    }
    else{
        swal({
          title: "Hello!",
          text: "Some inputs are blank. We will show the current date.",
          icon: 'warning'
        });
        country_code_input= "CR";        
        date_var= new Date();    
    }    
    initial_day= date_var.getUTCDate();
    loop_for_calendar_creation(date_var,final_day,initial_day,calendar_id);
 }

 function initial_funtion(calendar_id,final_day,month,year,final_month_days,initial_day){        
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];    
    var first_date = month_name[month] + " " + 1 + " " + year;        
    var tmp = new Date(first_date).toDateString();       
    var first_day = tmp.substring(0, 3);   
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var initial_day_name = day_name.indexOf(first_day);     
    create_calendar(calendar_id,final_day,initial_day,initial_day_name, final_month_days,month_name,month,year);    
 }

 window.onload = function(){
    input_data();
}


/*
    create the containers for the information and enter the table in the div calendar
*/
function create_calendar(calendar_id,final_day,initial_day,initial_day_name, final_month_days,month_name,month,year){    
    var calendar_month_year = document.createElement('span');
    calendar_month_year.id ="calendar-month-year"+calendar_id;
    calendar_month_year.className= "calendar-month-year";
    var calendar_header = document.createElement('div');
    calendar_header.id ="calendar-header"+calendar_id;
    calendar_header.className= "calendar-header";
    calendar_header.appendChild(calendar_month_year);
    var calendar_dates = document.createElement('div');
    calendar_dates.id ="calendar-dates"+calendar_id;
    calendar_dates.className= "calendar-dates";
    var calendar_container = document.createElement('div');
    calendar_container.id ="calendar-container"+calendar_id;
    calendar_container.className="calendar-container";
    calendar_container.appendChild(calendar_header);
    calendar_container.appendChild(calendar_dates);    
    document.getElementById("calendar").appendChild(calendar_container);
    var calendar = get_calendar_create_table(final_day,initial_day,initial_day_name, final_month_days);
    document.getElementById("calendar-month-year"+calendar_id).innerHTML=month_name[month]+" "+year;
    document.getElementById("calendar-dates"+calendar_id).appendChild(calendar);
}


/*
    create the table 2_nd part
*/
function create_table_2_part(count,final_month_days,final_day,initial_day,table){
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > final_month_days | final_day == 0){                
                table.appendChild(tr);                
                return table;
            }
            var td = document.createElement('td');            
            if(initial_day <= count){                                                   
                td.innerHTML = count;                
                final_day= final_day-1;                           
            }                
            else{
                td.innerHTML = " ";                 
            }
            tr.appendChild(td);
            count++;
        }
        table.appendChild(tr);
    }
}

/*
    create the table 1_st part
*/
function create_table_1_part(tr,column,final_day,initial_day,table,final_month_days){
    var count = 1;
    for(; column<=6; column++){        
        var td = document.createElement('td');        
        if(initial_day <= count & final_day >= 1){             
            td.innerHTML = count;
            final_day= final_day-1;                       
        }        
        else{
            td.innerHTML = " "; 
        }
        tr.appendChild(td);
        count++;
    }
    table.appendChild(tr);    
    create_table_2_part(count,final_month_days,final_day,initial_day,table);
}

/*
    create the table principal function
*/
function get_calendar_create_table(final_day,initial_day,initial_day_name, final_month_days){            
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    tr = document.createElement('tr');
    var column;
    for(column=0; column<=6; column++){
        if(column == initial_day_name){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = " ";
        tr.appendChild(td);
    }    
    create_table_1_part(tr,column,final_day,initial_day,table,final_month_days);    
    return table;
}