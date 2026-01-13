function formatTime(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

function parseTime(str) {
  const [h, m, s] = str.split(":").map(Number);

  return h * 3600 + m * 60 + s;
}

function updateTotalTime() {
  let total = 0;

  $(".todo .time").each(function () {
    total += parseTime($(this).text());
  });

  $("#totalTime").text(formatTime(total));
}

function updateDoneCount() {
  const count = $(".todo-check:checked").length;
  $("#doneCount").text(count);
}

function closeModal() {
  $(".modal").addClass("hidden");

  $("#addTodoTitle").val("");
  $("#addTodoGoal").val("");
}

let timer = null;
let currentTodo = null;

/* ================= 타이머 ================= */
$(document).on("click", ".play-btn", function () {
  const todo = $(this).closest(".todo");
  const timeEl = todo.find(".time");

  if (todo.hasClass("done")) return;

  if (timer && currentTodo !== todo[0]) {
    clearInterval(timer);
    $(".play-btn").text("▶");
  }

  if ($(this).text() === "▶") {
    $(this).text("⏸");
    currentTodo = todo[0];

    timer = setInterval(() => {
      let sec = parseTime(timeEl.text());

      sec++;
      timeEl.text(formatTime(sec));
      updateTotalTime();
    }, 1000);
  } else {
    $(this).text("▶");
    clearInterval(timer);
    timer = null;
    currentTodo = null;
  }
});

updateTotalTime();

/* ================= 체크박스 ================= */
$(document).on("change", ".todo-check", function () {
  const todo = $(this).closest(".todo");
  const playBtn = todo.find(".play-btn");

  if (this.checked) {
    todo.addClass("done");

    if (currentTodo === todo[0]) {
      clearInterval(timer);
      timer = null;
      currentTodo = null;
      playBtn.text("▶");
    }
  } else {
    todo.removeClass("done");
  }

  updateDoneCount();
});

/* ================= 설정 패널 ================= */
$(document).on("click", ".setting-btn", function (e) {
  e.stopPropagation();

  const panel = $(this).siblings(".setting-panel");
  const isOpen = panel.hasClass("show");

  $(".setting-panel").removeClass("show");

  if (!isOpen) panel.addClass("show");
});

$(document).on("click", ".setting-panel button[data-level]", function () {
  const level = $(this).data("level");
  const todo = $(this).closest(".todo");

  todo.removeClass("high middle low");
  todo.addClass(level);

  $(this).closest(".setting-panel").removeClass("show");
});

/* ================= TODO 추가 모달 ================= */
$(".add-btn").on("click", function () {
  $("#addTodoModal").removeClass("hidden");
});

$("#addCancelBtn").on("click", closeModal);

$("#addConfirmBtn").on("click", function () {
  const title = $("#addTodoTitle").val().trim();
  const goal = $("#addTodoGoal").val().trim();

  if (!title) {
    alert("TODO를 작성하세요.");

    return;
  }

  const todoHtml = `
    <li class="todo low">
      <button class="play-btn">▶</button>
      <input type="checkbox" class="todo-check" />
      <div class="todo-text">
        <div class="title">${title}</div>
        <div class="goal">${goal}</div>
      </div>
      <span class="time">00:00:00</span>
      <button class="setting-btn">⋮</button>

      <div class="setting-panel">
        <div class="section priority">
          <button class="edit-btn">TODO 수정</button>
          <button data-level="high">우선순위 높음</button>
          <button data-level="middle">우선순위 보통</button>
          <button data-level="low">우선순위 낮음</button>
        </div>
      </div>
    </li>
  `;

  $(".todo-list").append(todoHtml);

  closeModal();
});

/* ================= TODO 수정 ================= */
let currentEditTodo = null;

$(".todo-list").on("click", ".edit-btn", function () {
  currentEditTodo = $(this).closest(".todo");

  const title = currentEditTodo.find(".title").text();
  const goal = currentEditTodo.find(".goal").text();

  $("#editTodoTitle").val(title);
  $("#editTodoGoal").val(goal);

  $("#editTodoModal").removeClass("hidden");
});

$("#editCancelBtn").on("click", closeModal);

$("#editConfirmBtn").on("click", function () {
  if (!currentEditTodo) return;

  const title = $("#editTodoTitle").val().trim();
  const goal = $("#editTodoGoal").val().trim();

  if (!title) {
    alert("TODO를 작성하세요.");

    return;
  }

  currentEditTodo.find(".title").text(title);
  currentEditTodo.find(".goal").text(goal);

  closeModal();
  currentEditTodo = null;

  $(".setting-panel").removeClass("show");
});
