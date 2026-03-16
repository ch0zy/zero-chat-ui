import { useState, useRef, useEffect } from "react";

// ─── Zero Foundation — Brand Colour Tokens (Teal / GB) ────────────────────────
const brand = {
  10: "#E9F4F5",
  20: "#CEE6E8",
  30: "#9FCED3",
  40: "#6BB3BA",
  50: "#2D949E",
  60: "#03727D",
  70: "#02545D",
  80: "#013D43",
  90: "#01282C",
  100: "#01181B",
};

// ─── Zero Foundation — Semantic Colour Tokens ─────────────────────────────────
const color = {
  bgDefault:           "#FFFFFF",
  bgSubtle:            brand[10],
  bgSurface:           "#FFFFFF",
  bgOverlay:           "#F2F5F5",
  bgDisabled:          "#F0F1F2",
  borderLighter:       "#DEE1E7",
  borderLight:         brand[20],
  borderDark:          brand[40],
  borderPrimary:       brand[60],
  typeHeaderDark:      "#13151A",
  typeLabelDark:       "#323743",
  typeBodyLight:       "#444C5D",
  typePlaceholder:     brand[40],
  typeHelper:          brand[50],
  typeDisabled:        brand[30],
  typeInverse:         "#FFFFFF",
  iconLight:           brand[30],
  iconDefault:         brand[50],
  iconDark:            brand[70],
  primary:             brand[60],
  primaryHover:        brand[70],
  primaryActive:       brand[80],
  primarySubtle:       brand[10],
  primarySubtleBorder: brand[20],
};

// ─── Zero Foundation — Type Scale (Lexend) ────────────────────────────────────
const type = {
  headingMdSemi: { fontSize: 24, fontWeight: 600, lineHeight: "32px", letterSpacing: "0" },
  headingSmSemi: { fontSize: 20, fontWeight: 600, lineHeight: "28px", letterSpacing: "0" },
  labelLgSemi:   { fontSize: 16, fontWeight: 600, lineHeight: "24px", letterSpacing: "0" },
  labelLgReg:    { fontSize: 16, fontWeight: 400, lineHeight: "24px", letterSpacing: "0" },
  labelMdReg:    { fontSize: 14, fontWeight: 400, lineHeight: "20px", letterSpacing: "0" },
  labelSmReg:    { fontSize: 12, fontWeight: 400, lineHeight: "16px", letterSpacing: "0" },
  caption:       { fontSize: 11, fontWeight: 500, lineHeight: "16px", letterSpacing: "0.04em" },
};

const font = "'Lexend', system-ui, sans-serif";
const sp   = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };

// ─── Mock data ────────────────────────────────────────────────────────────────
const initialMessages = [
  { id: 1, role: "assistant", content: "Hi there! How can I help you today?", timestamp: "09:41" },
  { id: 2, role: "user",      content: "I need help understanding the Zero design system tokens.", timestamp: "09:42" },
  {
    id: 3, role: "assistant",
    content: "Of course! The Zero Foundation uses the Teal (GB) palette as its brand colour scale — from gb-teal-10 (#E9F4F5) for subtle surfaces all the way to gb-teal-100 (#01181B) for deep darks.",
    timestamp: "09:42",
  },
  { id: 4, role: "user", content: "What font does the system use?", timestamp: "09:43" },
  {
    id: 5, role: "assistant",
    content: "The primary typeface is Lexend — with Light (300), Regular (400), SemiBold (600), and Bold (700). The scale runs from 11px captions up to 48px Display Large.",
    timestamp: "09:43",
  },
];

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ role }) {
  const isUser = role === "user";
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
      background: isUser ? color.primary : color.bgSubtle,
      border: `1px solid ${isUser ? "transparent" : color.borderLight}`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {isUser ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="5.5" r="2.5" fill="white" />
          <path d="M2 13c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2"   y="2"   width="5.5" height="5.5" rx="1.5" fill={color.primary} />
          <rect x="8.5" y="2"   width="5.5" height="5.5" rx="1.5" fill={color.primary} opacity="0.55" />
          <rect x="2"   y="8.5" width="5.5" height="5.5" rx="1.5" fill={color.primary} opacity="0.55" />
          <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" fill={color.primary} opacity="0.25" />
        </svg>
      )}
    </div>
  );
}

// ─── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div style={{
      display: "flex",
      flexDirection: isUser ? "row-reverse" : "row",
      gap: sp.sm, alignItems: "flex-end",
      animation: "fadeSlideIn 0.2s ease-out",
    }}>
      <Avatar role={message.role} />
      <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start", gap: sp.xs }}>
        <div style={{
          padding: `${sp.sm}px ${sp.md}px`,
          borderRadius: isUser ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
          background: isUser ? color.primary : color.bgDefault,
          border: `1px solid ${isUser ? "transparent" : color.borderLight}`,
          color: isUser ? color.typeInverse : color.typeLabelDark,
          ...type.labelMdReg,
          fontFamily: font,
          wordBreak: "break-word",
        }}>
          {message.content}
        </div>
        <span style={{ ...type.caption, color: color.typeHelper, fontFamily: font }}>{message.timestamp}</span>
      </div>
    </div>
  );
}

// ─── Sidebar item ─────────────────────────────────────────────────────────────
function SidebarItem({ active, title, preview, time, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", gap: sp.xs,
        padding: `${sp.sm}px ${sp.md}px`,
        borderRadius: 8,
        background: active ? color.primarySubtle : hovered ? color.bgSubtle : "transparent",
        border: `1px solid ${active ? color.primarySubtleBorder : "transparent"}`,
        cursor: "pointer", textAlign: "left", width: "100%",
        transition: "all 0.12s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          ...type.labelMdReg,
          fontWeight: active ? 600 : 400,
          color: active ? color.primary : color.typeLabelDark,
          fontFamily: font,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 130,
        }}>{title}</span>
        <span style={{ ...type.caption, color: color.typeHelper, fontFamily: font, flexShrink: 0 }}>{time}</span>
      </div>
      <span style={{ ...type.labelSmReg, color: color.typeHelper, fontFamily: font, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {preview}
      </span>
    </button>
  );
}

// ─── Text field ───────────────────────────────────────────────────────────────
function TextField({ value, onChange, onKeyDown, placeholder, onSend, disabled }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", gap: sp.sm, alignItems: "flex-end" }}>
      <div style={{
        flex: 1, display: "flex", alignItems: "center", height: 44,
        borderRadius: 8,
        border: `1px solid ${focused ? color.borderPrimary : color.borderDark}`,
        outline: focused ? `3px solid ${brand[50]}33` : "none",
        background: disabled ? color.bgDisabled : color.bgDefault,
        paddingLeft: sp.lg, paddingRight: sp.sm, gap: sp.sm,
        transition: "border-color 0.12s ease, outline 0.12s ease",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <path
            d="M14 8c0 3.314-2.686 6-6 6a5.973 5.973 0 01-3.764-1.329L2 14l1.329-2.236A5.973 5.973 0 012 8c0-3.314 2.686-6 6-6s6 2.686 6 6z"
            stroke={focused ? color.borderPrimary : color.iconLight}
            strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <input
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            ...type.labelLgReg,
            fontFamily: font,
            fontWeight: value ? 600 : 300,
            color: value ? color.typeLabelDark : color.typePlaceholder,
          }}
        />
        {value && (
          <button
            onClick={() => onChange({ target: { value: "" } })}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" fill={color.borderDark} />
              <path d="M6 6l4 4M10 6l-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
      <button
        onClick={onSend}
        disabled={!value.trim() || disabled}
        style={{
          width: 44, height: 44, borderRadius: 8,
          background: value.trim() && !disabled ? color.primary : color.bgDisabled,
          border: "none",
          cursor: value.trim() && !disabled ? "pointer" : "not-allowed",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          transition: "background 0.12s ease",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M16 9L2 2l2.5 7L2 16l14-7z" fill={value.trim() && !disabled ? "white" : color.typeDisabled} />
        </svg>
      </button>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function ChatUI() {
  const [messages, setMessages]   = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping]   = useState(false);
  const [activeConv, setActiveConv] = useState(0);
  const messagesEndRef = useRef(null);

  const conversations = [
    { title: "Zero design tokens",  preview: "The input field height is...", time: "09:43"     },
    { title: "Teal colour scale",   preview: "gb-teal-10 maps to...",        time: "Yesterday" },
    { title: "Type system",         preview: "Lexend, display/lg-bold...",   time: "Mon"       },
    { title: "Accessibility",       preview: "aria-describedby connects...", time: "Sun"       },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    const now  = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages((p) => [...p, { id: Date.now(), role: "user", content: text, timestamp: time }]);
    setInputValue("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((p) => [...p, {
        id: Date.now() + 1, role: "assistant", timestamp: time,
        content: `Thanks for asking about "${text}". The Zero Foundation's Teal palette and Lexend type system work in harmony — gb-teal-60 (#03727D) is the primary action colour, while Lexend keeps everything clean and legible.`,
      }]);
    }, 1600);
  };

  return (
    <>
      <style>{`

        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-4px); opacity: 1; }
        }
        ::-webkit-scrollbar       { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${color.borderLight}; border-radius: 2px; }
        input::placeholder        { color: ${color.typePlaceholder}; font-weight: 300; }
      `}</style>

      <div style={{ width: "100vw", height: "100vh", display: "flex", fontFamily: font, background: color.bgOverlay, overflow: "hidden" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 240, height: "100%", background: color.bgSurface, borderRight: `1px solid ${color.borderLighter}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>

          {/* Logo */}
          <div style={{ padding: `${sp.lg}px ${sp.md}px`, borderBottom: `1px solid ${color.borderLighter}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: sp.sm, marginBottom: sp.md }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: color.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1.5" fill="white" />
                  <rect x="9" y="2" width="5" height="5" rx="1.5" fill="white" opacity="0.7" />
                  <rect x="2" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.7" />
                  <rect x="9" y="9" width="5" height="5" rx="1.5" fill="white" opacity="0.4" />
                </svg>
              </div>
              <span style={{ ...type.labelLgSemi, fontFamily: font, color: color.typeHeaderDark }}>Zero Chat</span>
            </div>
            <button style={{
              width: "100%", height: 36, borderRadius: 8,
              border: `1px solid ${color.borderLighter}`,
              background: color.bgDefault,
              color: color.typeLabelDark,
              ...type.labelMdReg, fontFamily: font,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: sp.xs,
            }}>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 2v10M2 7h10" stroke={color.iconDark} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              New conversation
            </button>
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: "auto", padding: sp.sm }}>
            <p style={{ ...type.caption, color: color.typeHelper, fontFamily: font, padding: `${sp.xs}px ${sp.sm}px`, marginBottom: sp.xs, textTransform: "uppercase" }}>
              Recent
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {conversations.map((c, i) => (
                <SidebarItem key={i} active={activeConv === i} title={c.title} preview={c.preview} time={c.time} onClick={() => setActiveConv(i)} />
              ))}
            </div>
          </div>

          {/* User footer */}
          <div style={{ padding: sp.md, borderTop: `1px solid ${color.borderLighter}`, display: "flex", alignItems: "center", gap: sp.sm }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: color.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5.5" r="2.5" fill="white" />
                <path d="M2 13c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p style={{ ...type.labelSmReg, fontWeight: 600, color: color.typeHeaderDark, fontFamily: font }}>Alex Kim</p>
              <p style={{ ...type.caption, color: color.typeHelper, fontFamily: font }}>Free plan</p>
            </div>
          </div>
        </div>

        {/* ── Main panel ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Header */}
          <div style={{
            height: 60, padding: `0 ${sp.xl}px`,
            borderBottom: `1px solid ${color.borderLighter}`,
            background: color.bgSurface,
            display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: sp.sm }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
              <span style={{ ...type.labelLgSemi, fontFamily: font, color: color.typeHeaderDark }}>
                {conversations[activeConv]?.title}
              </span>
            </div>
            <div style={{ display: "flex", gap: sp.sm }}>
              {["share", "more"].map((action) => (
                <button key={action} style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: `1px solid ${color.borderLighter}`,
                  background: color.bgDefault, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: color.iconDark,
                }}>
                  {action === "share" ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="11" cy="3"  r="1.5" stroke="currentColor" strokeWidth="1.25" />
                      <circle cx="3"  cy="7"  r="1.5" stroke="currentColor" strokeWidth="1.25" />
                      <circle cx="11" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.25" />
                      <path d="M4.5 6.25L9.5 3.75M4.5 7.75L9.5 10.25" stroke="currentColor" strokeWidth="1.25" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="3"  cy="7" r="1" fill="currentColor" />
                      <circle cx="7"  cy="7" r="1" fill="currentColor" />
                      <circle cx="11" cy="7" r="1" fill="currentColor" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: `${sp.xl}px`, display: "flex", flexDirection: "column", gap: sp.lg }}>
            <div style={{ display: "flex", alignItems: "center", gap: sp.md }}>
              <div style={{ flex: 1, height: 1, background: color.borderLighter }} />
              <span style={{ ...type.caption, color: color.typeHelper, fontFamily: font, whiteSpace: "nowrap" }}>Today, 09:41</span>
              <div style={{ flex: 1, height: 1, background: color.borderLighter }} />
            </div>

            {messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)}

            {isTyping && (
              <div style={{ display: "flex", gap: sp.sm, alignItems: "flex-end", animation: "fadeSlideIn 0.2s ease-out" }}>
                <Avatar role="assistant" />
                <div style={{
                  padding: "10px 14px", borderRadius: "12px 12px 12px 2px",
                  background: color.bgDefault, border: `1px solid ${color.borderLight}`,
                  display: "flex", gap: 4, alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: "50%", background: color.primary,
                      animation: `typing 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: `${sp.md}px ${sp.xl}px ${sp.xl}px`, background: color.bgSurface, borderTop: `1px solid ${color.borderLighter}` }}>
            <TextField
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Type a message…"
              onSend={sendMessage}
              disabled={isTyping}
            />
            <p style={{ marginTop: sp.xs, ...type.caption, color: color.typeHelper, fontFamily: font, textAlign: "center" }}>
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
