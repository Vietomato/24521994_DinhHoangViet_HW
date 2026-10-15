/*
 * Independent audio playback engine.
 * Audio samples are stored locally in ../sounds/.
 * Usage: AudioEngine.play("kick")
 */
(() => {
  "use strict";

  const soundFiles = Object.freeze({
    kick: "kick.mp3",
    snare: "snare.mp3",
    hihat: "hihat.mp3",
  });

  const soundsDirectory = new URL("sounds/", document.currentScript ? document.currentScript.src : window.location.href);

  function play(soundName) {
    const fileName = soundFiles[soundName];

    if (!fileName) {
      console.warn(`Unknown sound: "${soundName}".`);
      return Promise.resolve(false);
    }

    // Tạo Audio mới mỗi lần phát để các tiếng có thể chồng lên nhau.
    const audio = new Audio(new URL(fileName, soundsDirectory).href);

    return audio.play()
      .then(() => true)
      .catch((error) => {
        console.error(
          `Could not play "${soundName}". Check the file in sounds/.`,
          error
        );
        return false;
      });
  }

  window.AudioEngine = Object.freeze({ play });
})();