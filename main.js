$(document).ready(function(){
  let image = "00.jpg";
  let ww = $(window).width();
  let arr = [];
  let degg = ['0', '90', '180', '270'];
  let x = 0;
  
  $("style").append(".tumb { position: absolute!important; width: 100px; height: 100px; border: 1px solid #EEE; background: url('" + image + "') } ")
  
  $("<img/>")
    .attr("src", image)
    .css("opacity", .1)
    .appendTo("#puzzle");
  
  for(i = 0; i < 6; i++){
    arr[i] = [];
    for(j = 0; j < 8; j++){
      $("<div>")
        .addClass("tumb")
        .css({
          top: rand(0, 500),
          left: rand(850, ww - 200),
          transform: "rotate(" + degg[rand(0, 4)] + "deg)",
          backgroundPosition: (j * -100) + "px " + (i * -100) + "px",
        })
        .draggable({
          snap: ".tumb, #puzzle",
          drag: function() {
            $(".tumb").not(this).css("zIndex", 5);
            $(this).css("zIndex", 10);
          },
          stop: function( event, ui ) {
            $(this).css({
              left: 100 * Math.round(ui.position.left / 100),
              top: 100 * Math.round(ui.position.top / 100),
            });
            check( $(this) );
          },	
        })
        .appendTo("#puzzle")
        .click(function() {
          let s =  $(this)[0].style.transform;
          x = parseInt(s.slice(7)) + 90;
          $(this)[0].style.transform = 'rotate(' + x + 'deg)';
        });
    }
  }
  function check(elem){
    let el = parseInt(elem[0].style.left) / 100;
    let et = parseInt(elem[0].style.top) / 100;
    let px = parseInt(elem[0].style.backgroundPositionX) / -100;
    let py = parseInt(elem[0].style.backgroundPositionY) / -100;
    
    if(el == px && et == py) arr[et][el] = true;
    
    for(i = 0; i < 6; i++){
      for(j = 0; j < 8; j++){
        if(!arr[i][j]) return;
      }
    }
    alert("GAME OVER! CONGRATULATIONS!!!");
    $(".tumb").css({border: "none"});
  }
  
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
});
