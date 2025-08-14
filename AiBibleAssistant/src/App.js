import React, { useState } from 'react';
import './style.css';

export default function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setResponse('');

        try {
            const res = await fetch('Add n8n Webhook URL here', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input }),
            });

            let data;
            try {
                data = await res.json();
            } catch (err) {
                console.error("Response was not JSON:", err);
                setResponse("Unexpected response from server.");
                setLoading(false);
                return;
            }

            console.log('n8n raw response:', data);
            const final = data.response || data.output || data.message ||
                (typeof data === 'string' ? data : JSON.stringify(data));
            setResponse(final);

        } catch (error) {
            setResponse('Error connecting to n8n');
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <div className="container">
            <h1>How are you feeling?</h1>
            <textarea
                type="text"
                rows="4"
                placeholder="Type how you're feeling..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            {!input.trim() && (
                <p style={{ color: 'red', marginTop: '5px' }}>
                    Please enter a message
                </p>
            )}
            <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>

            <div
                id="responseArea"
                className={response ? '' : 'hidden'}
                style={{ whiteSpace: 'pre-wrap' }}
            >
                {response}
            </div>
        </div>
    );
}
