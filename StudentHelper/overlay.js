(function() {
  // Remove existing overlay if any
  const existing = document.getElementById('simple-tts-overlay');
  if (existing) {
    existing.remove();
  }

  // Create overlay container
  const overlay = document.createElement('div');
  overlay.id = 'simple-tts-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px',
    background: 'white',
    border: '1px solid #ccc',
    zIndex: 9999,
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    borderRadius: '4px',
    fontFamily: 'sans-serif'
  });

  const playPauseBtn = document.createElement('button');
  playPauseBtn.textContent = 'Play';

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.style.marginLeft = '8px';

  overlay.appendChild(playPauseBtn);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  let utterance = null;

  playPauseBtn.addEventListener('click', () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      // Pause currently playing utterance
      speechSynthesis.pause();
      playPauseBtn.textContent = 'Resume';
      return;
    }

    if (speechSynthesis.paused) {
      // Resume paused speech
      speechSynthesis.resume();
      playPauseBtn.textContent = 'Pause';
      return;
    }

    // Start speaking selected text
    const text = window.getSelection().toString().trim();
    if (!text) {
      alert('Please select text to read.');
      return;
    }
    utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      playPauseBtn.textContent = 'Play';
    };
    speechSynthesis.speak(utterance);
    playPauseBtn.textContent = 'Pause';
  });

  closeBtn.addEventListener('click', () => {
    speechSynthesis.cancel();
    overlay.remove();
  });
})();
