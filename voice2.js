console.log("🎤 Starting stable voice assistant (Web Speech API)");

async function initializeVoiceAssistant() {
  const speak = (text) => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1;
    u.pitch = 1;
    speechSynthesis.speak(u);
  };

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert("Your browser does not support the Web Speech API.");
    return;
  }

  let isAwake = false;
  let micGranted = false;

  // 1️⃣ Ask for mic once and keep stream open
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    micGranted = true;
    console.log("🎤 Microphone access granted");
  } catch (err) {
    console.error("❌ Mic permission error:", err);
    alert("Please allow microphone access and reload the page.");
    return;
  }

  // 2️⃣ Create recognition instance
  const recognition = new SR();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript
      .toLowerCase()
      .trim();
    console.log("🎧 Heard:", transcript);

    // --- Wake word detection ---
    if (transcript.includes("hey luma")) {
      isAwake = true;
      speak("Hey there, I'm listening!");
      return;
    }

    // --- Ignore if not awake ---
    if (!isAwake) return;

    // --- Command handling ---
    if (transcript.includes("go to login")) {
      speak("Taking you to the login page.");
      setTimeout(() => (window.location.href = "./login.html"), 1200);
      isAwake = false;
    } else if (transcript.includes("go to cart")) {
      speak("Opening your cart.");
      setTimeout(() => (window.location.href = "./cart.html"), 1200);
      isAwake = false;
    } else if (transcript.includes("go home") || transcript.includes("homepage")) {
      speak("Going home.");
      setTimeout(() => (window.location.href = "./index.html"), 1200);
      isAwake = false;
    } else if (transcript.includes("checkout") || transcript.includes("payment")) {
      speak("Proceeding to payment.");
      setTimeout(() => (window.location.href = "./payment.html"), 1200);
      isAwake = false;
    } 
    //product related
    if (window.products && Array.isArray(window.products)) {
      const matched = window.products.find(p =>
        transcript.includes(p.name.toLowerCase())
      );

      if (transcript.includes("add") && matched) {
        // Add to cart
        window.addToCart(matched.id);
        speak(`Adding ${matched.name} to your cart.`);
        isAwake = false;
        return;
      }

      if ((transcript.includes("details") || transcript.includes("read")) && matched) {
        // Speak product details
        speak(`${matched.name}. ${matched.origin}`);
        isAwake = false;
        return;
      }
    }
    
    else {
      speak("Sorry, I didn't understand that.");
      isAwake = false;
    }
  };

  recognition.onerror = (e) => {
    console.warn("⚠️ Speech recognition error:", e.error);
  };

  recognition.onend = () => {
    console.log("⏳ Restarting recognition in 1s...");
    setTimeout(() => {
      if (micGranted) recognition.start();
    }, 1000);
  };

  // 3️⃣ Start once
  speak("Voice assistant ready. Say 'Hey Luma' to start.");
  recognition.start();
}

initializeVoiceAssistant();
