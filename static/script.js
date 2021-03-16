const msgForm = get(".m-inputarea");
const msgInput = get(".m-input");
const msgChat = get(".m-chat");

changeTotal();

msgForm.addEventListener("submit", event => {

  event.preventDefault();

  const msgText = msgInput.value;

  if (!msgText) return;

  changeTotal();
  
  document.getElementById("send-button").disabled = true;
  setTimeout(() => {
    document.getElementById("send-button").disabled = false;
  },2000);

  addMessage("You", "right", msgText);
  msgInput.value = "";
  botResponse(msgText);
});

const addMessage = (name, side, text) => {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgChat.insertAdjacentHTML("beforeend", msgHTML);
  msgChat.scrollTop += 500;
}

const botResponse = (rawText) => {

  $.get("/get", { message: rawText }).done((data) => {
    const msgText = data;
    addMessage("Thomas","left", msgText);
  });

}

function changeTotal() {

  $.get("/total").done((data) => {
    const total = data;
    document.getElementById("total-amount").innerHTML = `${total} messages sent in total`
  })

}

function get(selector, root = document) {
  return root.querySelector(selector);
}

const formatDate = (date) => {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}