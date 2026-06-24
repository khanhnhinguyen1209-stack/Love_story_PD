const chip = document.querySelector(".chip-stage");
const flowCards = [...document.querySelectorAll(".flow-card")];
const signoffButton = document.querySelector(".signoff-button");
const photoCards = [...document.querySelectorAll(".photo-card")];
const surpriseModal = document.querySelector(".surprise-modal");
const revealButton = document.querySelector(".reveal-button");
const closeSurprise = document.querySelector(".close-surprise");

const stages = ["floorplan", "power", "placement", "cts", "route"];
const buttonLabels = {
  idle: "Chạy Love Signoff",
  running: "Đang chạy flow tình yêu...",
  done: "Signoff: I love you Khánh Nhi ❤️ Hoàng Anh",
};

function setStage(stage) {
  if (!chip) return;

  chip.dataset.stage = stage;
  flowCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.card === stage);
  });
}

function openSurprise() {
  if (!surpriseModal) return;

  surpriseModal.classList.add("is-open");
  surpriseModal.setAttribute("aria-hidden", "false");
}

function closeSurpriseModal() {
  if (!surpriseModal) return;

  surpriseModal.classList.remove("is-open", "is-revealed");
  surpriseModal.setAttribute("aria-hidden", "true");
}

signoffButton?.addEventListener("click", () => {
  signoffButton.textContent = buttonLabels.running;
  signoffButton.disabled = true;

  stages.forEach((stage, index) => {
    window.setTimeout(() => {
      setStage(stage);

      if (stage === "route") {
        signoffButton.textContent = buttonLabels.done;
        signoffButton.disabled = false;
        window.setTimeout(openSurprise, 650);
      }
    }, index * 650);
  });
});

revealButton?.addEventListener("click", () => {
  surpriseModal?.classList.add("is-revealed");
  revealButton.textContent = "Đã reveal secret net";
});

closeSurprise?.addEventListener("click", closeSurpriseModal);

surpriseModal?.addEventListener("click", (event) => {
  if (event.target.classList.contains("surprise-backdrop")) {
    closeSurpriseModal();
  }
});

photoCards.forEach((card) => {
  const image = card.querySelector("img");
  if (!image) return;

  image.addEventListener("load", () => {
    card.classList.add("has-photo");
  });

  image.addEventListener("error", () => {
    image.remove();
    card.classList.remove("has-photo");
  });
});

setStage("floorplan");
