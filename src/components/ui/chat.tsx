import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const Chat = ({ userId, otherUserId }) => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Backend-dən əvvəlki mesajları yüklə
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get("https://localhost:7104/api/chat/getAllChatMessages", {
                    params: { senderId: userId, receiverId: otherUserId }
                });
                const sorted = res.data.sort(
                    (a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
                );
                setMessages(sorted);
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            }
        };
        fetchMessages();
    }, [userId, otherUserId]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("https://localhost:7104/chatHub")
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start().then(() => {
                connection.on("ReceiveMessage", (senderId, message, timestamp) => {
                    setMessages(prev =>
                        [...prev, { senderId, message, createDate: timestamp }].sort(
                            (a, b) => new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
                        )
                    );
                });
            });
        }
    }, [connection]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!connection || text.trim() === "") return;

        try {
            await connection.invoke("SendMessage", userId, otherUserId, text);
            setMessages(prev => [...prev, { senderId: userId, message: text, createDate: new Date().toISOString() }]);
            setText("");
        } catch (err) {
            console.error("Send message failed:", err);
        }
    };
    //const height = window.innerHeight;
    return (
        // Əsas parent (məs: App.js-də)
        <div style={{
            height: "600px", // 80% ekran hündürlüyü
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{
                flex: 1, // yuxarıdan aşağı bütün boşluğu tutur
                display: "flex",
                flexDirection: "column",
                border: "1px solid #E0E0E0",
                borderRadius: 16,
                overflow: "hidden",
                backgroundColor: "#FAFAFA",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}>
                {/* Header */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "#f9f9f9"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                            style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                        />
                        <div>
                            <div style={{ fontWeight: 600 }}>Sevda</div>
                            <div style={{ fontSize: 12, color: "#666" }}>Online</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button style={{ background: "none", border: "none", cursor: "pointer" }}>📞</button>
                        <button style={{ background: "none", border: "none", cursor: "pointer" }}>🎥</button>
                        <button style={{ background: "none", border: "none", cursor: "pointer" }}>⋯</button>
                    </div>
                </div>

                {/* Mesajlar */}
                <div style={{
                    flex: 1, // burası tam boşluğu tutur
                    padding: 16,
                    overflowY: "auto", // çox mesaj olanda scroll
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                }}>
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            style={{
                                alignSelf: m.senderId === userId ? "flex-end" : "flex-start",
                                maxWidth: "75%",
                            }}
                        >
                            <span style={{
                                display: "inline-block",
                                padding: "10px 14px",
                                borderRadius: 20,
                                backgroundColor: m.senderId === userId ? "#0B93F6" : "#E5E5EA",
                                color: m.senderId === userId ? "white" : "black",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                wordBreak: "break-word",
                            }}>
                                {m.message}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div style={{
                    display: "flex",
                    padding: 12,
                    borderTop: "1px solid #E0E0E0",
                    gap: 8
                }}>
                    <input
                        style={{
                            flex: 1,
                            padding: 10,
                            borderRadius: 20,
                            border: "1px solid #ccc",
                            outline: "none",
                            backgroundColor: "white",
                        }}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        style={{
                            padding: "10px 20px",
                            borderRadius: 20,
                            backgroundColor: "#0B93F6",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 600
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
