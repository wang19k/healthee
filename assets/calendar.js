var notes = new Map();

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
    $('img.today-progress').attr({ src: "images/empty.png" });
    //document.getElementById("cur-day-header").style.backgroundColor = "#FFC0CB";
  } else if (numberOfChecks == numberOfBoxes) {
    $('img.today-progress').attr({ src: "images/full.png" });
  } else {
    $('img.today-progress').attr({ src: "images/middle.png" });
    //document.getElementById("cur-day-header").style.backgroundColor = "#FFC0CB";
  }
}

function showPlusMenu() {
  document.getElementById("plus-menu").hidden = !document.getElementById("plus-menu").hidden;
  if (!document.getElementById("appt-schedule").hidden) {
    document.getElementById("plus-menu").hidden = false;
    document.getElementById("appt-schedule").hidden = true;
  }
  else if (!document.getElementById("add-exercise").hidden) {
    document.getElementById("plus-menu").hidden = false;
    document.getElementById("add-exercise").hidden = true;
  }
  else if (!document.getElementById("self-note").hidden) {
    document.getElementById("plus-menu").hidden = false;
    document.getElementById("self-note").hidden = true;
  }
}

function hidePlusMenu() {
  document.getElementById("plus-menu").hidden = true;
}

function showHamVideo() {
  document.getElementById("video-iframe").src = "https://www.youtube.com/embed/bOf2AOpG4qM";
  document.getElementById("video").hidden = false;
  document.getElementById("video-iframe").hidden = false;
}

function showLiftVideo() {
  document.getElementById("video-iframe").src = "https://www.youtube.com/embed/l-mPHKQFMkk";
  document.getElementById("video").hidden = false;
  document.getElementById("video-iframe").hidden = false;
}

function hideVideo() {
  document.getElementById("video-iframe").src = "";
  document.getElementById("video").hidden = true;
  document.getElementById("video-iframe").hidden = true;
}

function showAppt() {
  hidePlusMenu();
  document.getElementById("appt-schedule").hidden = false;
}

function hideAppt() {
  document.getElementById("appt-schedule").hidden = true;
  document.getElementById("appt-subject").value = "";
  document.getElementById("appt-date").value = "";
  document.getElementById("appt-time").value = "";
  document.getElementById("appt-location").value = "";
}

function addAppt() {
  document.getElementById("thurs-appt").hidden = false;
  hideAppt();
}

function deleteAppt() {
  document.getElementById("thurs-appt").hidden = true;
}

function showAddExercise() {
  hidePlusMenu();
  document.getElementById("add-exercise").hidden = false;
}

function hideAddExercise() {
  document.getElementById("add-exercise").hidden = true;
  document.getElementById("ex").value = "";
  document.getElementById("ex-vid").value = "";
  document.getElementById("ex-info").value = "";
  document.getElementById("add-ex").checked = false;
}

function addExercise() {
  document.getElementById("calfCB").hidden = false;
  document.getElementById("calf").hidden = false;
  setProgress();
  hideAddExercise();
}

function showNote() {
  hidePlusMenu();
  document.getElementById("self-note").hidden = false;
}

function hideNote() {
  document.getElementById("self-note").hidden = true;
  document.getElementById("note-text").value = "";
  document.getElementById("note-title").value = "";
}

function hideNoteDisplay() {
  document.getElementById("note-modal").hidden = true;
}

function stopProp() {
  event.stopPropagation();
}

function addNote() {
  var noteContents = document.getElementById("note-text").value;
  var noteTitle = document.getElementById("note-title").value;

  if (noteTitle.length === 0 || noteContents.length === 0) {
    hideNote();
    return;
  }

  var noteTitleDate = "4/23: " + noteTitle;

  notes.set(noteTitleDate, noteContents);

  var button = document.createElement("button");
  button.setAttribute("style","width=100%;text-align=left");
  var textNode = document.createTextNode("Note:" + noteTitle);
  button.appendChild(textNode);

  button.addEventListener("click", function(){
    document.getElementById("note-text-here").innerHTML = notes.get(noteTitleDate);
    document.getElementById("note-title-here").innerHTML = noteTitleDate;
    document.getElementById("note-modal").hidden = false;
    document.getElementById("delete-note-1").onclick = function() {
      button.remove();
      notes.delete(noteTitleDate);
      hideNoteDisplay();
    };
    document.getElementById("delete-note-2").onclick = function() {
      button.remove();
      notes.delete(noteTitleDate);
      hideNoteDisplay();
    };
    document.getElementById("edit-note").onclick = function() {
      document.getElementById("note-edit-textarea").value = notes.get(noteTitleDate);
      document.getElementById("note-text-here").hidden = true;
      document.getElementById("note-edit-here").hidden = false;
      document.getElementById("edit-delete").hidden = true;
      document.getElementById("save-delete").hidden = false;
    };
    document.getElementById("save-note").onclick = function() {
      notes.set(noteTitleDate, document.getElementById("note-edit-textarea").value);
      document.getElementById("note-text-here").innerHTML = notes.get(noteTitleDate);
      document.getElementById("note-text-here").hidden = false;
      document.getElementById("note-edit-here").hidden = true;
      document.getElementById("edit-delete").hidden = false;
      document.getElementById("save-delete").hidden = true;
    };
  });

  document.getElementById("4-23").appendChild(button);
  //document.getElementById("mon-note").hidden = false;
  hideNote();
}
