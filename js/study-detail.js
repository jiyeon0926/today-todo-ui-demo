function openTodoModal(nickname) {
  $("#todoModalUser").text(nickname);
  $(".todo-modal").show();
}

function closeTodoModal() {
  $(".todo-modal").hide();
  $(".setting-panel").removeClass("show");
}

$(document).on("click", ".setting-btn", function (e) {
  e.stopPropagation();

  const panel = $(this).siblings(".setting-panel");
  const isOpen = panel.hasClass("show");

  $(".setting-panel").removeClass("show");

  if (!isOpen) panel.addClass("show");
});

$(document).on("click", ".member-todo-btn", function (e) {
  e.preventDefault();

  const nickname = $(this)
    .closest(".member-card")
    .find(".member-name")
    .text()
    .trim();

  openTodoModal(nickname);
});

$(document).on("click", ".todo-modal-close", function () {
  closeTodoModal();
});

$(document).on("keydown", function (e) {
  if (e.key === "Escape") closeTodoModal();
});
