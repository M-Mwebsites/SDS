// Function to load the Google Form
function loadGoogleForm() {
  var googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdQohZt9WaFPt3H62jvnpFHlk6em1u-q9DANPSdVJyMQvOVXg/viewform"; // Replace with your Google Form URL

  $("#googleFormContainer").html(
    '<iframe src="' +
      googleFormUrl +
      '" width="0" height="0" style="display:none"></iframe>'
  );
}

// Intercept form submission event
$("#customForm").submit(function (event) {
  event.preventDefault(); // Prevent the default form submission

  var name = $("#name").val();
  var confirm =
    $("#confirmYes:checked").val() ||
    $("#confirmLate:checked").val() ||
    $("#confirmNo:checked").val();
  var size =
    $("#sizeBig:checked").val() ||
    $("#sizeSmall:checked").val() ||
    $("#sizeSteal:checked").val();
  var request = $("#request").val();

  // Submit values to the Google Form
  var googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdQohZt9WaFPt3H62jvnpFHlk6em1u-q9DANPSdVJyMQvOVXg/formResponse"; // Replace with your Google Form URL

  $.ajax({
    url: googleFormUrl,
    data: {
      "entry.893839721": name,
      "entry.1114165787": confirm,
      "entry.735642970": size,
      "entry.37880607": request,
    },
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        // Show success message and hide the form
        $("#customForm").hide();
        $("#successMessage").show();
      },
      200: function () {
        // Error message
        $("#failureMessage").show();
      },
    },
  });
});

// Execute the function when the page loads
$(document).ready(function () {
  loadGoogleForm();
});
