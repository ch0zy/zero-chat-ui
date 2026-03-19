import { useState, useRef, useEffect } from "react";

const brand={10:"#E9F4F5",20:"#CEE6E8",30:"#9FCED3",40:"#6BB3BA",50:"#2D949E",60:"#03727D",70:"#02545D",80:"#013D43",90:"#01282C",100:"#01181B"};
const grayCool={0:"#FFFFFF",10:"#F2F3F5",20:"#DEE1E7",30:"#C1C6D1",40:"#9FA8B9",50:"#7C879F",60:"#5C677E",70:"#444C5D",80:"#323743",90:"#21242C",100:"#13151A"};
const color={bgDefault:"#FFFFFF",bgSubtle:brand[10],bgOverlay:grayCool[10],bgAlternate:grayCool[10],bgDisabled:"#F0F1F2",borderLighter:grayCool[20],borderPrimary:brand[60],borderNegative:"#CC1616",typeHeaderDark:grayCool[100],typeHeaderLight:grayCool[90],typeLabelDark:grayCool[80],typeLabelLight:grayCool[60],typeBodyLight:grayCool[70],typeHelper:brand[50],typeDisabled:brand[30],typeInverse:"#FFFFFF",iconDefault:brand[50],iconDark:brand[70],primary:brand[60],primaryHover:brand[70],primaryActive:brand[80],primarySubtle:brand[10],negative:"#CC1616",positive:"#1E7F34"};
const sp={0:0,1:2,2:4,3:8,4:12,5:16,6:20,7:24,8:32,9:48,10:64,11:96,12:128};
const radius={sm:4,md:8,lg:16,full:512};
const font="'Lexend',system-ui,sans-serif";
const elevation={1:"0px 0px 2px rgba(19,21,26,0.04),0px 2px 12px rgba(19,21,26,0.08),0px 4px 4px -2px rgba(19,21,26,0.08)",2:"0px 0px 2px rgba(19,21,26,0.04),0px 2px 12px rgba(19,21,26,0.08),0px 16px 16px -8px rgba(19,21,26,0.08)",3:"0px 0px 2px rgba(19,21,26,0.04),0px 2px 12px rgba(19,21,26,0.08),0px 24px 24px -12px rgba(19,21,26,0.08)"};

const CONTACTS = [
  { id:1, name:"Ava Chen", role:"Product Designer", avatar:"AC", online:true, unread:2,
    messages:[
      {id:1,from:"them",text:"Hey! Are you free for a quick sync today?",time:"10:02 AM"},
      {id:2,from:"me",text:"Sure, how about 3pm?",time:"10:05 AM"},
      {id:3,from:"them",text:"Perfect, I'll send a calendar invite 📅",time:"10:06 AM"},
    ]
  },
  { id:2, name:"Marcus Reid", role:"Engineering Lead", avatar:"MR", online:true, unread:0,
    messages:[
      {id:1,from:"them",text:"The PR is ready for review when you get a chance.",time:"9:14 AM"},
      {id:2,from:"me",text:"On it! Will take a look after standup.",time:"9:30 AM"},
    ]
  },
  { id:3, name:"Priya Nair", role:"Data Analyst", avatar:"PN", online:false, unread:1,
    messages:[
      {id:1,from:"them",text:"Can you share the Q3 metrics doc?",time:"Yesterday"},
    ]
  },
  { id:4, name:"Team Zero", role:"Group · 5 members", avatar:"TZ", online:true, unread:5,
    messages:[
      {id:1,from:"them",text:"Design review is at 2pm in Conf Room B.",time:"8:00 AM"},
      {id:2,from:"me",text:"Thanks for the heads up!",time:"8:05 AM"},
    ]
  },
];

function Avatar({ initials, size=36, bg=brand[60], color="#fff", online }) {
  return (
    <div style={{position:"relative",flexShrink:0}}>
      <div style={{width:size,height:size,borderRadius:radius.full,background:bg,
        display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:font,fontWeight:600,fontSize:size*0.35,color,letterSpacing:"0.5px"}}>
        {initials}
      </div>
      {online !== undefined && (
        <div style={{position:"absolute",bottom:0,right:0,width:10,height:10,
          borderRadius:radius.full,background:online?"#1E7F34":grayCool[30],
          border:"2px solid #fff"}}/>
      )}
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 13s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="9" y1="9" x2="9.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="15" y1="9" x2="15.01" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function AttachIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="1" fill="currentColor"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <circle cx="12" cy="19" r="1" fill="currentColor"/>
    </svg>
  );
}

export default function ChatUI() {
  const [activeId, setActiveId] = useState(1);
  const [contacts, setContacts] = useState(CONTACTS);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const messagesEndRef = useRef(null);

  const active = contacts.find(c => c.id === activeId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [active?.messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setContacts(prev => prev.map(c =>
      c.id === activeId
        ? { ...c, messages: [...c.messages, { id: Date.now(), from:"me", text:input.trim(), time:"Now" }] }
        : c
    ));
    setInput("");
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const avatarColors = [brand[60], brand[70], brand[50], grayCool[70]];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:${brand[20]};border-radius:2px}
        textarea{resize:none;outline:none;border:none;background:transparent;font-family:${font}}
        input{outline:none;border:none;background:transparent;font-family:${font}}
        button{font-family:${font}}
      `}</style>
      <div style={{fontFamily:font,display:"flex",height:"100vh",background:color.bgOverlay,overflow:"hidden"}}>

        {/* ── Sidebar ── */}
        <div style={{width:300,flexShrink:0,display:"flex",flexDirection:"column",
          background:color.bgDefault,borderRight:`1px solid ${color.borderLighter}`}}>

          {/* Sidebar header */}
          <div style={{padding:`${sp[5]}px ${sp[6]}px ${sp[4]}px`,borderBottom:`1px solid ${color.borderLighter}`}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:sp[5]}}>
              <span style={{fontSize:18,fontWeight:700,color:color.typeHeaderDark,letterSpacing:"-0.3px"}}>
                Messages
              </span>
              <button style={{width:32,height:32,borderRadius:radius.md,background:"none",border:"none",
                cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
                color:color.iconDefault,transition:"background 120ms ease"}}
                onMouseEnter={e=>e.currentTarget.style.background=color.bgSubtle}
                onMouseLeave={e=>e.currentTarget.style.background="none"}>
                <MenuIcon/>
              </button>
            </div>

            {/* Search — Zero Search Input component */}
            <div style={{
              display:"flex",alignItems:"center",gap:sp[3],
              background:color.bgDefault,
              borderRadius:radius.md,
              border:`1px solid ${searchFocused ? color.borderPrimary : grayCool[50]}`,
              minHeight:44,
              padding:`0 ${sp[5]}px`,
              transition:"border 120ms ease"}}>
              <span style={{color:grayCool[50],display:"flex",flexShrink:0}}><SearchIcon/></span>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search conversations…"
                onFocus={()=>setSearchFocused(true)} onBlur={()=>setSearchFocused(false)}
                style={{flex:1,fontSize:16,fontWeight:300,lineHeight:"24px",
                  color:color.typeBodyLight}}/>
            </div>
          </div>

          {/* Contact list */}
          <div style={{flex:1,overflowY:"auto",padding:`${sp[2]}px 0`}}>
            {filteredContacts.map((c,i) => {
              const isActive = c.id === activeId;
              return (
                <button key={c.id} onClick={()=>{
                  setActiveId(c.id);
                  setContacts(prev=>prev.map(x=>x.id===c.id?{...x,unread:0}:x));
                }}
                  style={{width:"100%",display:"flex",alignItems:"center",gap:sp[4],
                    padding:`${sp[3]}px ${sp[6]}px`,cursor:"pointer",border:"none",textAlign:"left",
                    background:isActive?color.bgSubtle:"transparent",
                    borderLeft:`3px solid ${isActive?color.borderPrimary:"transparent"}`,
                    transition:"background 120ms ease"}}
                  onMouseEnter={e=>{if(!isActive)e.currentTarget.style.background=color.bgOverlay}}
                  onMouseLeave={e=>{if(!isActive)e.currentTarget.style.background="transparent"}}>
                  <Avatar initials={c.avatar} size={42} bg={avatarColors[i%avatarColors.length]} online={c.online}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:2}}>
                      <span style={{fontSize:14,fontWeight:600,color:isActive?color.primary:color.typeHeaderDark,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</span>
                      <span style={{fontSize:11,color:color.typeLabelLight,flexShrink:0,marginLeft:sp[2]}}>
                        {c.messages.at(-1)?.time}
                      </span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <span style={{fontSize:12,color:color.typeBodyLight,
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:160}}>
                        {c.messages.at(-1)?.text}
                      </span>
                      {c.unread > 0 && (
                        <span style={{minWidth:18,height:18,borderRadius:radius.full,
                          background:color.primary,color:"#fff",
                          fontSize:11,fontWeight:700,display:"flex",alignItems:"center",
                          justifyContent:"center",padding:"0 5px",flexShrink:0,marginLeft:sp[2]}}>
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* User footer */}
          <div style={{padding:`${sp[4]}px ${sp[5]}px`,borderTop:`1px solid ${color.borderLighter}`,
            display:"flex",alignItems:"center",gap:sp[3]}}>
            <Avatar initials="ME" size={36} bg={grayCool[80]} online={true}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:color.typeHeaderDark}}>You</div>
              <div style={{fontSize:11,color:color.typeHelper}}>Active now</div>
            </div>
          </div>
        </div>

        {/* ── Main chat area ── */}
        <div style={{flex:1,display:"flex",flexDirection:"column",minWidth:0}}>

          {/* Chat header */}
          <div style={{display:"flex",alignItems:"center",gap:sp[4],
            padding:`${sp[4]}px ${sp[7]}px`,background:color.bgDefault,
            borderBottom:`1px solid ${color.borderLighter}`,boxShadow:elevation[1]}}>
            <Avatar initials={active?.avatar} size={44} bg={avatarColors[(activeId-1)%avatarColors.length]} online={active?.online}/>
            <div style={{flex:1}}>
              <div style={{fontSize:16,fontWeight:700,color:color.typeHeaderDark}}>{active?.name}</div>
              <div style={{fontSize:12,color:active?.online?color.positive:color.typeLabelLight}}>
                {active?.online ? "● Online" : "● Offline"} · {active?.role}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{flex:1,overflowY:"auto",padding:`${sp[7]}px ${sp[7]}px ${sp[5]}px`,
            display:"flex",flexDirection:"column",gap:sp[4]}}>

            {/* Date divider */}
            <div style={{display:"flex",alignItems:"center",gap:sp[4],margin:`${sp[3]}px 0`}}>
              <div style={{flex:1,height:1,background:color.borderLighter}}/>
              <span style={{fontSize:11,fontWeight:600,color:color.typeLabelLight,
                padding:`${sp[1]}px ${sp[4]}px`,background:grayCool[10],
                borderRadius:radius.full,border:`1px solid ${color.borderLighter}`}}>
                Today
              </span>
              <div style={{flex:1,height:1,background:color.borderLighter}}/>
            </div>

            {active?.messages.map(msg => {
              const isMe = msg.from === "me";
              return (
                <div key={msg.id} style={{display:"flex",flexDirection:"column",
                  alignItems:isMe?"flex-end":"flex-start",gap:sp[1]}}>
                  <div style={{
                    maxWidth:"62%",padding:`${sp[4]}px ${sp[5]}px`,
                    borderRadius:isMe
                      ? `${radius.lg}px ${radius.lg}px ${radius.sm}px ${radius.lg}px`
                      : `${radius.lg}px ${radius.lg}px ${radius.lg}px ${radius.sm}px`,
                    background:isMe?color.primary:color.bgDefault,
                    color:isMe?"#fff":color.typeBodyLight,
                    boxShadow:isMe?"none":elevation[1],
                    border:isMe?"none":`1px solid ${color.borderLighter}`,
                    fontSize:14,lineHeight:"22px",fontWeight:400,
                  }}>
                    {msg.text}
                  </div>
                  <span style={{fontSize:11,color:color.typeLabelLight,padding:`0 ${sp[2]}px`}}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef}/>
          </div>

          {/* Input area — Zero Text Field + Zero Primary Button */}
          <div style={{padding:`${sp[5]}px ${sp[7]}px`,background:color.bgDefault,
            borderTop:`1px solid ${color.borderLighter}`,
            display:"flex",alignItems:"center",gap:sp[4]}}>

            {/* Zero Text Field */}
            <div style={{flex:1,display:"flex",flexDirection:"column",gap:sp[3]}}>
              <div style={{
                display:"flex",alignItems:"center",
                background:color.bgDefault,
                borderRadius:radius.md,
                border:`1px solid ${inputFocused ? color.borderPrimary : grayCool[50]}`,
                height:44,
                overflow:"hidden",
                transition:"border 120ms ease",
                boxShadow:inputFocused?`0 0 0 3px ${brand[50]}33`:"none"}}>
                {/* Attach icon — left adornment */}
                <button style={{width:44,height:44,flexShrink:0,border:"none",
                  background:"none",cursor:"pointer",display:"flex",alignItems:"center",
                  justifyContent:"center",color:grayCool[50],transition:"color 120ms ease"}}
                  onMouseEnter={e=>e.currentTarget.style.color=color.iconDark}
                  onMouseLeave={e=>e.currentTarget.style.color=grayCool[50]}>
                  <AttachIcon/>
                </button>
                {/* Input */}
                <input value={input}
                  onChange={e=>setInput(e.target.value)}
                  onFocus={()=>setInputFocused(true)}
                  onBlur={()=>setInputFocused(false)}
                  onKeyDown={e=>{if(e.key==="Enter")sendMessage();}}
                  placeholder="Type a message…"
                  style={{flex:1,height:"100%",fontSize:16,fontWeight:300,lineHeight:"24px",
                    color:color.typeLabelDark}}/>
                {/* Emoji icon — right adornment */}
                <button style={{width:44,height:44,flexShrink:0,border:"none",
                  background:"none",cursor:"pointer",display:"flex",alignItems:"center",
                  justifyContent:"center",color:grayCool[50],transition:"color 120ms ease"}}
                  onMouseEnter={e=>e.currentTarget.style.color=color.iconDark}
                  onMouseLeave={e=>e.currentTarget.style.color=grayCool[50]}>
                  <EmojiIcon/>
                </button>
              </div>
            </div>

            {/* Zero Primary Button */}
            <button onClick={sendMessage}
              disabled={!input.trim()}
              style={{
                flexShrink:0,
                display:"flex",alignItems:"center",justifyContent:"center",gap:sp[2],
                height:44,
                padding:`${sp[4]}px ${sp[6]}px`,
                borderRadius:radius.md,
                border:"none",
                background:input.trim()?color.primary:grayCool[20],
                color:"#fff",
                cursor:input.trim()?"pointer":"not-allowed",
                fontSize:14,fontWeight:600,lineHeight:"20px",fontFamily:font,
                whiteSpace:"nowrap",
                transition:"background 120ms ease"}}
              onMouseEnter={e=>{if(input.trim())e.currentTarget.style.background=color.primaryHover}}
              onMouseLeave={e=>{if(input.trim())e.currentTarget.style.background=color.primary}}>
              <SendIcon/>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
