$(document).ready(function () {
  $("#nicknameBtn").click(function () {
    window.location.href = "nickname.html";
  });

  $("#passwordBtn").click(function () {
    window.location.href = "password.html";
  });

  $("#deleteAccountBtn").click(function () {
    window.location.href = "delete-account.html";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    height: "auto",

    events: [{ date: "2026-01-05" }, { date: "2026-01-12" }],

    eventContent: function () {
      return {
        html: `
          <img
            src="/img/stamp.svg"
            class="calendar-stamp"
            alt="stamp"
          />
        `,
      };
    },
  });

  calendar.render();
});
