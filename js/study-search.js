function closeModal() {
  $("#studyModalOverlay").addClass("hidden");
  $("body").removeClass("modal-open");
}

$(".study-item").on("click", function () {
  $("#studyModalOverlay").removeClass("hidden");
  $("body").addClass("modal-open");
});

$("#studyModalClose").on("click", closeModal);

$("#studyModalOverlay").on("click", function (e) {
  if (e.target.id === "studyModalOverlay") {
    closeModal();
  }
});

$(document).on("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
