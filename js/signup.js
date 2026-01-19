const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,10}$/;
const LOGIN_ID_REGEX = /^[a-zA-Z0-9]{6,20}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function isValidNickname(nickname) {
  return NICKNAME_REGEX.test(nickname);
}

function isValidLoginId(loginId) {
  return LOGIN_ID_REGEX.test(loginId);
}

function isValidPassword(password) {
  return PASSWORD_REGEX.test(password);
}

$(document).ready(function () {
  $("#cancelBtn").click(function () {
    window.location.href = "index.html";
  });

  $("#signupForm").submit(function (e) {
    e.preventDefault();

    const nickname = $("#nickname").val().trim();
    const loginId = $("#loginId").val().trim();
    const password = $("#password").val();

    if (!isValidNickname(nickname)) {
      alert("닉네임은 2~10자, 한글/영문/숫자만 사용할 수 있습니다.");

      return;
    }

    if (!isValidLoginId(loginId)) {
      alert("아이디는 6~20자, 영문/숫자만 사용할 수 있습니다.");

      return;
    }

    if (!isValidPassword(password)) {
      alert(
        "비밀번호는 8자 이상, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      );

      return;
    }

    alert("회원가입이 완료되었습니다!");
    window.location.href = "login.html";
  });
});
