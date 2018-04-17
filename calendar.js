function setProgress() {
  var numberOfChecks = 0;
  var inputs = document.getElementsByTagName("input");
  var numberOfBoxes = 0;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === "checkbox") {
      if (!inputs[i].hidden) numberOfBoxes++;
      if (inputs[i].checked) numberOfChecks++;
    }
  }

  if (numberOfChecks == 0) {
    document.getElementById("progress").src = "empty.png";
  } else if (numberOfChecks == numberOfBoxes) {
    document.getElementById("progress").src = "full.png";
  } else {
    document.getElementById("progress").src = "middle.png";
  }
}

function showPlusMenu() {
  document.getElementById("plus-menu").hidden = !document.getElementById("plus-menu").hidden;
}

function showVideo() {
  document.getElementById("video-iframe").src = "https://www.youtube.com/embed/o5b0gS7wI1k";
  document.getElementById("video").hidden = false;
  document.getElementById("video-iframe").hidden = false;
}

function hideVideo() {
  document.getElementById("video-iframe").src = "";
  document.getElementById("video").hidden = true;
  document.getElementById("video-iframe").hidden = true;
}
