/* Connect drum buttons and keyboard keys to the audio engine. */
(() => {
  "use strict";

  const drumButtons = document.querySelectorAll(
    ".drum-pad[data-key][data-sound]"
  );

  // Bấm pad bằng chuột sẽ phát âm thanh theo data-sound.
  drumButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      AudioEngine.play(event.currentTarget.dataset.sound);
    });
  });

  // Nhấn phím sẽ tìm nút có data-key tương ứng.
  document.addEventListener("keydown", (event) => {
    if (event.repeat) return;

    const target = event.target;
    if (target instanceof Element && target.closest("input, textarea")) return;

    const pressedKey = event.key.toLowerCase();

    const matchingButton = [...drumButtons].find(
      (button) => button.dataset.key.toLowerCase() === pressedKey
    );

    if (matchingButton) {
      AudioEngine.play(matchingButton.dataset.sound);
      matchingButton.classList.add("is-active");
      setTimeout(() => matchingButton.classList.remove("is-active"), 120);
    }
  });
})();