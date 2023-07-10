// Add an event listener to the occupation select element
document.getElementById("occupation").addEventListener("change", function () {
  var occupation = this.value;
  var scholarshipSection = document.getElementById("scholarshipSection");
  var schoolarshipYes = document.getElementById("schoolarshipYes");
  var schoolarshipNo = document.getElementById("schoolarshipNo");

  // Show or hide the scholarship section based on the selected occupation
  if (occupation === "Student (Undergrad, Postgrad, PhD)") {
    scholarshipSection.style.display = "block";
    schoolarshipYes.setAttribute("required", "true");
    schoolarshipNo.setAttribute("required", "true");
    //motivationSection.style.display = "block";
    //motivation.setAttribute("required", "true");
  } else {
    scholarshipSection.style.display = "none";
    schoolarshipYes.removeAttribute("required");
    schoolarshipNo.removeAttribute("required");
    //motivationSection.style.display = "none";
    //motivation.removeAttribute("required");
  }
});

// Add an event listener to the schoolarship select element
document.getElementById("schoolarshipYes").addEventListener("change", function () {
  var motivationSection = document.getElementById("motivationSection");
  var motivation = document.getElementById("motivation");
  motivationSection.style.display = "block";
  motivation.setAttribute("required", "true");
});

// Add an event listener to the schoolarship select element
document.getElementById("schoolarshipNo").addEventListener("change", function () {
  var motivationSection = document.getElementById("motivationSection");
  var motivation = document.getElementById("motivation");
  motivationSection.style.display = "none";
  motivation.removeAttribute("required");
});

// Intercept form submission event
$("#customForm").submit(function (event) {
  event.preventDefault(); // Prevent the default form submission

  var firstName = $("#firstName").val();
  var familyName = $("#familyName").val();
  var age = $("#age").val();
  var email = $("#email").val();
  var mobileNumber = $("#mobileNumber").val();
  var occupation = $("#occupation").val();
  var schoolarship =
    $("#schoolarshipYes:checked").val() || $("#schoolarshipNo:checked").val();
  var motivation = $("#motivation").val();
  var workplace = $("#workplace").val();
  var workfield = $("#workfield").val();
  var python = $("#python").val();
  var statistics = $("#statistics").val();

  // Submit values to the Google Form
  var googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdeQqgnhcJEpHYjr2FVW3oqbJ-gW3mdzpefWvJIW2hCQYA6Ag/formResponse"; // Replace with your Google Form URL

  $.ajax({
    url: googleFormUrl,
    data: {
      "entry.1524361955": firstName,
      "entry.132605492": familyName,
      "entry.1866305512": age,
      "entry.1183500704": email,
      "entry.1971163925": mobileNumber,
      "entry.1078397583": occupation,
      "entry.178189585": schoolarship,
      "entry.616132433": motivation,
      "entry.121025546": workplace,
      "entry.648620836": workfield,
      "entry.239397382": python,
      "entry.705131298": statistics,
    },
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        // Show success message and hide the form
        $("#customForm").hide();
        $("#refunds").hide();
        $("#successMessage").show();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      200: function () {
        // Error message
        $("#failureMessage").show();
      },
    },
  });
});
