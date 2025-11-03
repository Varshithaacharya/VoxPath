# 🥭 Voxi — Voice-Enabled Exotic Fruit Store

Voxi is an **interactive e-commerce website** where users can explore, learn about, and purchase exotic fruits from around the world — completely **hands-free**.

Built using **HTML, CSS, and JavaScript**, Voxi combines traditional navigation with **voice commands** and a **chatbot assistant**, making online shopping more natural, accessible, and fun.

---

## 🌍 Overview

Voxi allows users to browse exotic fruits such as **Jackfruit**, **Dragon Fruit**, **Lychee**, and more.  
Each fruit card provides **two options on hover**:
- 🛒 **Add to Cart**
- ℹ️ **View Details** (shows fruit origin & background info)

Users can interact with the website either by:
- **Speaking commands** (e.g., “Hey Luma, add jackfruit to cart”), or
- **Typing messages** in the built-in **chatbot** for quick queries.

---

## 🗣️ Voice Navigation

The **voice assistant (“Luma”)** is powered by the **Web Speech API** (SpeechRecognition + SpeechSynthesis).  
It enables complete control of the shopping experience via speech.

### 🎧 Example Commands
| Command | Action |
|----------|--------|
| “Hey Luma” | Activates the assistant |
| “Go to login” | Opens the login page |
| “Go to cart” | Opens the shopping cart |
| “Go home” | Returns to homepage |
| “Add Jackfruit to cart” | Adds the fruit to your cart |
| “Read Jackfruit details” | Speaks out the fruit’s origin story |
| “Proceed to payment” | Opens the checkout page |

### 💡 How It Works
- **SpeechRecognition** continuously listens for audio input.  
- When you say the wake word **“Hey Luma”**, the assistant activates.  
- It parses the spoken text, checks for fruit names or navigation keywords, and executes the appropriate command.
- **SpeechSynthesis** provides natural voice responses like:
  > “Adding Jackfruit to your cart.”  
  > “Taking you to the login page.”

The voice assistant also supports multiple commands in one session, e.g.:
> “Hey Luma, add Jackfruit to cart.”  
> “Add Durian to cart.”  
> “Read details for Lychee.”

---

## 💬 Chatbot Assistant

Alongside the voice system, Voxi features a **text-based chatbot** that:
- Answers common customer queries (e.g., *“Where do these fruits come from?”*)
- Assists users who prefer typing over speaking
- Provides fallback help if voice access is unavailable or blocked

The chatbot interface is integrated seamlessly in the lower-right corner of the website.

---

## 🛒 Product Experience

Each fruit card includes:
- **High-resolution images**
- **Hover buttons** for *Details* and *Add to Cart*
- **Modal pop-ups** describing the fruit’s *origin* and *flavor profile*
- **Cart persistence** using `localStorage`, so items remain saved between visits

---

## ⚙️ Technology Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **Voice Assistant** | Web Speech API (SpeechRecognition & SpeechSynthesis) |
| **Chatbot** | JavaScript-based conversational interface |
| **Storage** | LocalStorage for cart management |
| **Optional Wake Word Engine** | Picovoice Porcupine (for offline “Hey Luma” detection) |

---

## 🚀 Getting Started

### 1️⃣ Clone or Download
```bash
git clone https://github.com/your-username/voxi-voice-store.git
cd voxi-voice-store

