const DUMMY = {
  myRank: { rank: 20, nickname: "사용자사용자사용자20", totalSeconds: 19800 },
  itemsAll: Array.from({ length: 97 }, (_, i) => {
    const rank = i + 1;

    return {
      rank,
      nickname: `사용자사용자사용자${rank}`,
      totalSeconds: 60000 - rank * 123,
    };
  }),
};

const state = {
  page: 1,
  size: 10,
  nickname: "",
};

$(document).ready(function () {
  renderFromDummy();

  $("#searchForm").on("submit", function (e) {
    e.preventDefault();
    state.nickname = $("#nicknameInput").val().trim();
    state.page = 1;
    renderFromDummy();
  });

  $("#pagination").on("click", ".page-btn", function () {
    state.page = Number($(this).data("page"));
    renderFromDummy();
  });
});

function renderFromDummy() {
  const pageInfo = buildPageInfo(DUMMY.itemsAll.length, state.page, state.size);
  const pageItems = paginate(DUMMY.itemsAll, pageInfo.page, pageInfo.size);

  renderMyRank(DUMMY.myRank);
  renderList(pageItems);
  renderPagination(pageInfo);
}

function renderMyRank(myRank) {
  if (!myRank) {
    $("#myRankBox").html(`<div class="empty">내 순위 정보 없음</div>`);

    return;
  }

  $("#myRankBox").html(`
    <div class="my-rank-right">
      <span class="my-rank-num">${myRank.rank}</span>
      <span class="my-rank-name">${myRank.nickname}</span>
      <span class="my-rank-time">${formatTime(myRank.totalSeconds)}</span>
    </div>
  `);
}

function renderList(items) {
  if (!items || items.length === 0) {
    $("#rankList").html(`<div class="empty">검색 결과가 없습니다.</div>`);

    return;
  }

  const html = items
    .map(
      (item) => `
      <div class="rank-row">
        <div class="col-rank">${item.rank}</div>
        <div class="col-name">${escapeHtml(item.nickname)}</div>
        <div class="col-time">${formatTime(item.totalSeconds)}</div>
      </div>
    `,
    )
    .join("");

  $("#rankList").html(html);
}

function renderPagination(pageInfo) {
  if (!pageInfo || pageInfo.totalPages <= 1) {
    $("#pagination").empty();

    return;
  }

  const pages = buildPages(pageInfo.page, pageInfo.totalPages);

  const html = pages
    .map((p) => {
      if (p === "...") return `<span class="page-ellipsis">…</span>`;

      return `
        <button type="button"
                class="page-btn ${p === pageInfo.page ? "is-active" : ""}"
                data-page="${p}">
          ${p}
        </button>
      `;
    })
    .join("");

  $("#pagination").html(html);
}

function paginate(list, page, size) {
  const start = (page - 1) * size;

  return list.slice(start, start + size);
}

function buildPageInfo(totalElements, page, size) {
  const totalPages = Math.max(1, Math.ceil(totalElements / size));
  const safePage = Math.min(Math.max(1, page), totalPages);

  return { page: safePage, size, totalPages, totalElements };
}

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const result = [1];

  if (current > 4) result.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) result.push(i);

  if (current < total - 3) result.push("...");

  result.push(total);

  return result.filter((v, i, arr) => i === 0 || arr[i - 1] !== v);
}

function formatTime(sec) {
  const s = Math.max(0, Number(sec) || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;

  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
