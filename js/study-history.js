function getTodayKST() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const historyBody = document.getElementById("historyBody");

  let selectedDayEl = null;

  const HARDCODED_DATA = {
    studyDate: "2026-01-20",
    totalStudyTime: "5:30:00",
    doneTodoCount: 2,
    startTime: "10:35",
    endTime: "20:55",
    todos: [
      {
        title: "우선순위가 높은 일정 1",
        duration: "2:00:00",
        is_done: true,
        priority: "HIGH",
      },
    ],
  };

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: "auto",
    dateClick: function (info) {
      renderDay(info.dateStr, info.dayEl);
    },
  });

  calendar.render();

  const today = getTodayKST();

  setTimeout(() => {
    const todayEl = calendarEl.querySelector(
      `.fc-daygrid-day[data-date="${today}"]`,
    );
    renderDay(today, todayEl);
  }, 0);

  function renderDay(dateStr, dayEl) {
    if (selectedDayEl) selectedDayEl.classList.remove("selected-day");
    if (dayEl) {
      selectedDayEl = dayEl;
      selectedDayEl.classList.add("selected-day");
    }

    const data = HARDCODED_DATA;

    if (!data || data.studyDate !== dateStr) {
      historyBody.innerHTML = `<p class="history-empty">해당 날짜의 학습 기록이 없습니다.</p>`;
      return;
    }

    historyBody.innerHTML = `
      ${renderSummary(data)}
      ${renderTodoList(data.todos)}
    `;
  }

  function renderSummary(data) {
    return `
      <div class="summary">
        <div class="summary-row">
          <div class="summary-item">
            <div class="summary-label">총 학습 시간</div>
            <div class="summary-box">${escapeHtml(data.totalStudyTime)}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">완료한 TODO 수</div>
            <div class="summary-box">${escapeHtml(data.doneTodoCount)}</div>
          </div>
        </div>

        <div class="summary-row">
          <div class="summary-item">
            <div class="summary-label">시작 시간</div>
            <div class="summary-box">${escapeHtml(data.startTime)}</div>
          </div>
          <div class="summary-item">
            <div class="summary-label">종료 시간</div>
            <div class="summary-box">${escapeHtml(data.endTime)}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderTodoList(todos) {
    if (!todos || todos.length === 0) {
      return `<p class="history-empty">해당 날짜의 TODO가 없습니다.</p>`;
    }

    const bars = todos
      .map((t) => {
        const doneClass = t.is_done ? "is-done" : "";

        let priorityClass = "";
        if (t.priority === "HIGH") priorityClass = "todo-high";
        if (t.priority === "MIDDLE") priorityClass = "todo-middle";
        if (t.priority === "LOW") priorityClass = "todo-low";

        return `
          <div class="todo ${priorityClass}">
            <span class="todo-title ${doneClass}">${escapeHtml(t.title)}</span>
            <span class="todo-time">${escapeHtml(t.duration)}</span>
          </div>
        `;
      })
      .join("");

    return `<div class="todo-list">${bars}</div>`;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
});
