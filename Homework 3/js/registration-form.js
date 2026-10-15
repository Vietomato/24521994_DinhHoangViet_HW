const registrationForm = document.getElementById("registration-form");
const statusBox = document.getElementById("status-box");
const statusMessage = document.getElementById("status-message");
const simulateError = document.getElementById("simulate-error");
const submitButton = registrationForm.querySelector(".form__submit");

const formStates = {
  idle: {
    label: "Idle",
    message: "Chưa có đăng ký nào.",
    buttonText: "Đăng ký ngay",
  },
  submitting: {
    label: "Submitting",
    message: "Đang xử lý đăng ký...",
    buttonText: "Đang gửi...",
  },
  success: {
    label: "Success",
    message: "Đăng ký thành công!",
    buttonText: "Đăng ký ngay",
  },
  error: {
    label: "Error",
    message: "Đã xảy ra lỗi khi xử lý đăng ký.",
    buttonText: "Đăng ký lại",
  },
};

function setFormState(state) {
  const stateDetails = formStates[state];
  if (!stateDetails) {
    throw new Error(`Trạng thái đăng ký không hợp lệ: ${state}`);
  }

  statusBox.dataset.state = state;
  statusMessage.textContent = `Trạng thái: ${stateDetails.label} — ${stateDetails.message}`;
  submitButton.textContent = stateDetails.buttonText;
}

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setFormState("submitting");

  const shouldFail = simulateError.checked;
  window.setTimeout(() => {
    setFormState(shouldFail ? "error" : "success");
  }, 1000);
});
