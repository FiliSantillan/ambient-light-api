(function(){
  "use strict";

  var changeColors = function(e) {
    var $body = document.getElementById("body"),
        $text = document.getElementById("text"),
        $lux = e.value;

    $text.textContent = "Lux: " + $lux;

    if($lux < 5)  {
      $body.classList.add("dark-mode");
      $body.classList.remove("normal-mode", "bright-mode");
    }

    else if($lux >= 5 && $lux <= 1500) {
      $body.classList.add("normal-mode");
      $body.classList.remove("dark-mode", "bright-mode");
    }

    else {
      $body.classList.add("bright-mode");
      $body.classList.remove("dark-mode", "normal-mode");
    }
  };

  window.addEventListener('devicelight', changeColors);

}());
