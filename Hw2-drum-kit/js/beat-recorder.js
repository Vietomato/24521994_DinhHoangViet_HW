/*
 * BeatRecorder: FIFO Beat Recorder (timestamped event queue).
 * Stores triggered events in FIFO order with timestamp delta from start.
 * Decoupled architecture: Independent from audio-engine and keyboard-controller.
 */
(() => {
  "use strict";

  // Hàng đợi sự kiện FIFO: [{ soundName, timestamp }]
  let eventQueue = [];
  let isRecording = false;
  let isPlaying = false;
  let startTime = 0;
  let playbackTimers = [];

  /**
   * Bắt đầu phiên ghi âm mới
   */
  function start() {
    if (isPlaying) stopPlayback();

    eventQueue = [];
    isRecording = true;
    startTime = performance.now();
    updateUIState();
  }

  /**
   * Dừng ghi âm hoặc dừng phát lại
   */
  function stop() {
    if (isRecording) {
      isRecording = false;
    }
    if (isPlaying) {
      stopPlayback();
    }
    updateUIState();
  }

  /**
   * Ghi lại một nhịp trống vào hàng đợi FIFO
   * @param {string} soundName
   */
  function record(soundName) {
    if (!isRecording || !soundName) return;

    const timestamp = Math.round(performance.now() - startTime);
    // Đẩy sự kiện vào cuối hàng đợi FIFO
    eventQueue.push({ soundName, timestamp });
  }

  /**
   * Phát lại toàn bộ chuỗi nhịp đã ghi trong hàng đợi FIFO
   */
  function playback() {
    if (eventQueue.length === 0 || isRecording || isPlaying) return;

    isPlaying = true;
    updateUIState();

    // Duyệt qua bản sao của FIFO queue để phát lại đúng thứ tự và thời gian
    const queueCopy = [...eventQueue];
    const lastTimestamp = queueCopy[queueCopy.length - 1].timestamp;

    queueCopy.forEach((eventItem) => {
      const timer = setTimeout(() => {
        if (!isPlaying) return;

        // Kích hoạt phát âm thanh qua AudioEngine
        if (window.AudioEngine && typeof window.AudioEngine.play === "function") {
          window.AudioEngine.play(eventItem.soundName);
        }

        // Kích hoạt hiệu ứng visual trên nút trống tương ứng
        const matchingPad = document.querySelector(`.drum-pad[data-sound="${eventItem.soundName}"]`);
        if (matchingPad) {
          matchingPad.classList.add("is-active");
          setTimeout(() => matchingPad.classList.remove("is-active"), 120);
        }
      }, eventItem.timestamp);

      playbackTimers.push(timer);
    });

    // Sau khi nốt cuối cùng phát xong, reset trạng thái playing
    const finishTimer = setTimeout(() => {
      isPlaying = false;
      playbackTimers = [];
      updateUIState();
    }, lastTimestamp + 300);

    playbackTimers.push(finishTimer);
  }

  /**
   * Hủy các timer phát lại khi người dùng bấm Stop giữa chừng
   */
  function stopPlayback() {
    playbackTimers.forEach((timer) => clearTimeout(timer));
    playbackTimers = [];
    isPlaying = false;
  }

  /**
   * Cập nhật trạng thái hiển thị của các nút bấm và nhãn UI
   */
  function updateUIState() {
    const recordBtn = document.getElementById("record-btn");
    const stopBtn = document.getElementById("stop-btn");
    const playBtn = document.getElementById("play-btn");
    const statusText = document.getElementById("recorder-status-text");
    const statusDot = document.querySelector(".status-dot");

    if (recordBtn) {
      recordBtn.disabled = isRecording || isPlaying;
    }

    if (stopBtn) {
      stopBtn.disabled = !isRecording && !isPlaying;
    }

    if (playBtn) {
      playBtn.disabled = isRecording || isPlaying || eventQueue.length === 0;
    }

    if (statusText) {
      if (isRecording) {
        statusText.textContent = "Đang ghi âm...";
      } else if (isPlaying) {
        statusText.textContent = "Đang phát lại...";
      } else if (eventQueue.length > 0) {
        statusText.textContent = `Đã ghi ${eventQueue.length} nhịp`;
      } else {
        statusText.textContent = "Chưa ghi âm";
      }
    }

    if (statusDot) {
      statusDot.classList.toggle("status-dot--recording", isRecording);
      statusDot.classList.toggle("status-dot--playing", isPlaying);
    }
  }

  // Khởi tạo các sự kiện điều khiển UI khi DOM sẵn sàng
  document.addEventListener("DOMContentLoaded", () => {
    const recordBtn = document.getElementById("record-btn");
    const stopBtn = document.getElementById("stop-btn");
    const playBtn = document.getElementById("play-btn");

    if (recordBtn) recordBtn.addEventListener("click", start);
    if (stopBtn) stopBtn.addEventListener("click", stop);
    if (playBtn) playBtn.addEventListener("click", playback);

    updateUIState();
  });

  // Xuất API BeatRecorder toàn cục để các controller khác gọi
  window.BeatRecorder = Object.freeze({
    start,
    stop,
    record,
    playback,
    isRecording: () => isRecording,
    isPlaying: () => isPlaying,
    getQueue: () => [...eventQueue]
  });
})();

