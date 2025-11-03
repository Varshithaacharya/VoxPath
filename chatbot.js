document.addEventListener('DOMContentLoaded', () => {
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    const faq = {
        'shipping': "We offer standard shipping in 3-5 business days and express shipping in 1-2 business days.",
        'return': "You can return any product within 14 days of purchase for a full refund, provided it is in its original condition.",
        'payment': "We accept all major credit cards, PayPal, and Apple Pay.",
        'organic': "Yes, all of our fruits are sourced from certified organic farms.",
        'contact': "You can contact our support team via the contact form on our website or by emailing support@voxifruits.com.",
        'default': "I'm sorry, I don't have an answer for that. Please try asking about shipping, returns, payment methods, or our organic policy."
    };

    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
    });

    const handleUserMessage = () => {
        const userMessage = chatInput.value.trim().toLowerCase();
        if (!userMessage) return;

        appendMessage(userMessage, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            appendMessage(botResponse, 'bot');
        }, 500);
    };

    chatSend.addEventListener('click', handleUserMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    function appendMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${type}`;
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
    }

    function getBotResponse(message) {
        if (message.includes('shipping') || message.includes('delivery')) return faq.shipping;
        if (message.includes('return') || message.includes('refund')) return faq.return;
        if (message.includes('payment') || message.includes('pay') || message.includes('card')) return faq.payment;
        if (message.includes('organic')) return faq.organic;
        if (message.includes('contact') || message.includes('help') || message.includes('support')) return faq.contact;
        return faq.default;
    }
});