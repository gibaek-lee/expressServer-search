//event handler via ajax call
$(function(){
  $('#search').on('keyup',(e)=>{
    if(e.keyCode === 13){//enter event
      var params = {search:$('#search').val()};//this?
      $.get('/searching',params,(data)=>{
        $('#results').html(data);
      })
    }
  })
})
