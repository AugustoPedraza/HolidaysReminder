// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
  $('#calendar').fullCalendar({
    theme: true,
    header: {
      left: 'prev',
      center: 'title',
      right: 'next'
    },

    eventSources: [{
        url: '/holidays',
        color: 'yellow',
        textColor: 'black',
        ignoreTimezone: false
    }],
    eventClick: function(event, jsEvent, view){
      var fecha = event.start.getFullYear() + '-' + event.start.getMonth() + '-' + event.start.getDate();  
      var esElMismo = false;

      //Oculto a todos, excepto a el mismo.
      $('.fc-event.fc-event-skin').each(function(index){        
        if($('.' + fecha).length != 1){
          $(this).popover('destroy');
        }else{
          esElMismo = true;
        }
      });
      
      if(esElMismo){
        $(this).popover('destroy');
      } else{
        $(this).popover({title: dateFormat(event.start, "dS mmmm"), trigger: 'manual'});
        $(this).popover('toggle');
        
        
        $(".popover-content").html("<div class='"+ fecha + "'>" + event.title + "</div><br/><button type='button' id= 'edit-holiday' class='btn'>Edit</button>");

        var currentEvent = this;

        $("#edit-holiday").click(function(jsEventClick){
          $(currentEvent).popover('destroy');
          addHolidayEditionModal(event);
        });    
      }   
    },
    dayClick: function(date, allDay, jsEvent, view){
      $('.fc-event.fc-event-skin').each(function(index){
        $(this).popover('destroy');
      });
    }
  });
  
  $('.fc-button-inner').click(function(){
    $('.fc-event.fc-event-skin').each(function(index){
        $(this).popover('destroy');
      });
  });

  $('#calendar').append('<br/><button type="button" id="newHolidayButton" class="btn btn-primary">New Holiday</button>');
  bindingAddNewHolidayButton();
});

function addHolidayEditionModal(event){  
  var current = event.start;
  var date = current.getDate() + '/' + (current.getMonth() + 1) + '/' + current.getFullYear();  
  console.log(date);
  var modal =
    '<div id="editHolidayModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
      '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h3 id="myModalLabel">Edit Holiday</h3>' +
      '</div>' +
      '<div class="modal-body">' + 
        '<form class="form-horizontal">' +
          '<div class="control-group">' +
            '<label class="control-label" for="inputName">Name</label>' +
            '<div class="controls">' +
              '<input type="text" class="inputName" value="' + event.title + '" placeholder="Name">' +
            '</div>' +
          '</div>' +
          '<div class="control-group">' +
            '<label class="control-label" for="inputDate">Date</label>' +
            '<div class="controls">' +
              '<input type="text" class="inputDate" value="' + date + '" placeholder="Date">' +
            '</div>' +
          '</div>' +          
        '</form>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn-danger" id="deleteHolidayButton">Delete</button>' +
        '<button class="btn btn-primary" id="updateHolidayButton">Save changes</button>' +
      '</div>' +
    '</div>';

  $('#editHolidayModal').remove();
  $('#calendar').append(modal);
  bindingUpdateHolidayButton(event);
  bindingDeleteHolidayButton(event);
  $('#editHolidayModal').modal('toggle');
}

function bindingAddNewHolidayButton(){
  $('#newHolidayButton').click(function(jsEvent){
    var modal =
    '<div id="createHolidayModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
      '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h3 id="myModalLabel">New Holiday</h3>' +
      '</div>' +
      '<div class="modal-body">' + 
        '<form class="form-horizontal">' +
          '<div class="control-group">' +
            '<label class="control-label" for="inputName">Name</label>' +
            '<div class="controls">' +
              '<input type="text" class="inputName" placeholder="Name">' +
            '</div>' +
          '</div>' +
          '<div class="control-group">' +
            '<label class="control-label" for="inputDate">Date</label>' +
            '<div class="controls">' +
              '<input type="text" class="inputDate" placeholder="Date">' +
            '</div>' +
          '</div>' +          
        '</form>' +
      '</div>' +
      '<div class="modal-footer">' +
        '<button class="btn btn" data-dismiss="modal" >Cancel</button>' +
        '<button class="btn btn-primary" id="createHolidayButton">Create</button>' +
      '</div>' +
    '</div>';

    $('#createHolidayModal').remove();
    $('#calendar').append(modal);
  
    $('#createHolidayModal').modal('toggle');

    bindingCreateHolidayButton();
  
  });  
}

function bindingCreateHolidayButton(){
  $('#createHolidayButton').click(function(jsEvent){
    var nameInput  = $('#createHolidayModal :input[class=inputName]').val();
    var dateInput  = $('#createHolidayModal :input[class=inputDate]').val(); //Tiene el formato dd/mm/aaaa
  
    if (false) { //Comprobar que sea un fecha inválida
      //mostrar error de fecha mal ingresada.   
    };

    console.log(dateInput);
    console.log(nameInput);
    
    $.ajax('/holidays/', {
      type: 'POST',
      dataType: 'json',
      data: { holiday: {name: nameInput, date: dateInput} },
      success: function() {
        $('.modal-body').append('<br/><pre class="prettyprint linenums" style="text-align:center;color:white;background-color:#5BB75B" ><span class="pln">Holiday created!</span></pre>');
        $('.modal-footer').html('<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');

        $('#calendar').fullCalendar( 'refetchEvents' )
      },
      error: function(xhr, ajaxOptions, thrownError) {
        $('.modal-body').append('<br/><pre class="prettyprint linenums" style="text-align:center;color:white;background-color:#BD362F" ><span class="pln">Problem to create Holiday!</span></pre>');
        $('.modal-footer').html('<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');
        console.log(thrownError);
      }
    });
   });
}

function bindingUpdateHolidayButton(event){
  $('#updateHolidayButton').click(function(jsEvent){
    var updatedName = $('#editHolidayModal :input[id=inputName]').val();
    var dateInput   = $('#editHolidayModal :input[id=inputDate]').val(); //Tiene el formato dd/mm/aaaa
  
    if (false) { //Comprobar que sea un fecha inválida
      //mostrar error de fecha mal ingresada.   
    };

    var updatedDate = new Date(dateInput.split('/').reverse());
    var current     = updatedDate.toDateString();
    var previous    = event.start.toDateString();
    

    if(true){ // (updatedName != event.title) || (current != previous)
      if (true) { //Respuesta del servidor.
        
      $('.modal-body').append('<br/><pre class="prettyprint linenums" style="text-align:center;color:white;background-color:#5BB75B" ><span class="pln">Holiday updated!</span></pre>');
      $('.modal-footer').html('<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');

      event.start = updatedDate;
      event.end   = updatedDate;
      event.title = updatedName;

      $('#calendar').fullCalendar('updateEvent', event);

      } else{
        //Error en el servidor...
        $('.modal-body').append('<br/><pre class="prettyprint linenums" style="text-align:center;color:white;background-color:#BD362F" ><span class="pln">Problem to update Holiday!</span></pre>');
        $('.modal-footer').html('<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');
      };

    } else{
      console.log("No se actualiza nada");
    }
  });  
}

function bindingDeleteHolidayButton(event){
  $('#deleteHolidayButton').click(function(jsEvent){
    if (true) { //Respuesta del servidor.
      $('.modal-body').append('<br/><pre class="prettyprint linenums" style="text-align:center;color:white;background-color:#5BB75B" ><span class="pln">Holiday deleted!</span></pre>');
      $('.modal-footer').html('<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');

      $('#calendar').fullCalendar( 'removeEvents', [event.id]);
    } else{
      //Error en el servidor...
      $('.modal-body').append('<br/><pre class="prettyprint linenums" style="text-align:center;color:white;background-color:#BD362F" ><span class="pln">Problem to update Holiday!</span></pre>');
      $('.modal-footer').html('<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');
    }
  });
}
  //Ver los remove modal

  //jQuery $.ajax options
 // http://arshaw.com/fullcalendar/docs/event_data/events_json_feed/

 // refetchEvents
 // http://arshaw.com/fullcalendar/docs/event_data/refetchEvents/

 //removeEvents
 // http://arshaw.com/fullcalendar/docs/event_data/removeEvents/

// updateEvent
// http://arshaw.com/fullcalendar/docs/event_data/updateEvent/