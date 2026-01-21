$(document).ready(function () {
  $("#searchBtn").click(function () {
    window.location.href = "study-search.html";
  });

  $("#createBtn").click(function () {
    window.location.href = "study-create.html";
  });
});

$(document).on("click", ".setting-btn", function (e) {
  e.stopPropagation();

  const panel = $(this).siblings(".setting-panel");
  const isOpen = panel.hasClass("show");

  $(".setting-panel").removeClass("show");

  if (!isOpen) panel.addClass("show");
});
