(function(){
  "use strict";

  window.addEventListener('devicelight', function(e) {
    var $body = document.getElementByID("body"),
        $light = e.value

    console.log($light);

    if($light < 50)  {
      $body.classList.add("dark-mode");
      $body.classList.remove("normal-mode", "bright-mode");
    }

    else if($light >= 50 && $light <= 1500){
      $body.classList.add("normal-mode")
      $body.classList.remove("dark-mode", "bright-mode");
    }

    else {
      $body.classList.add("bright-mode");
      $body.classList.remove("dark-mode", "normal-mode")
    }

  });

}());
