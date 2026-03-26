import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../api/authApi";

const LoginPage = ({ onLoginSuccess }) => {
    const { login, signup } = useAuth();
    const [mode, setMode] = useState("login");

    const [loginId, setLoginId]   = useState("");
    const [loginPw, setLoginPw]   = useState("");
    const [showPw, setShowPw]     = useState(false);
    const [loginErr, setLoginErr] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);

    const [form, setForm] = useState({ loginId:"", password:"", passwordConfirm:"", name:"", birthDate:"" });
    const [formErrors, setFormErrors] = useState({});
    const [signupLoading, setSignupLoading] = useState(false);
    const [signupDone, setSignupDone]       = useState(false);
    const [idCheck, setIdCheck]             = useState(null);
    const [idChecking, setIdChecking]       = useState(false);
    const [showSignupPw, setShowSignupPw]   = useState(false);

    const handleLogin = async () => {
        if (!loginId.trim() || !loginPw.trim()) { setLoginErr("아이디와 비밀번호를 입력해주세요."); return; }
        setLoginLoading(true); setLoginErr("");
        try {
            const res = await login(loginId.trim(), loginPw);
            onLoginSuccess?.(res.user);
        } catch (e) { setLoginErr(e.message); }
        finally { setLoginLoading(false); }
    };

    const handleCheckId = async () => {
        if (form.loginId.length < 4) { setIdCheck({ ok:false, msg:"아이디는 4자 이상이어야 해요." }); return; }
        setIdChecking(true);
        try {
            const res = await authApi.checkLoginId(form.loginId);
            setIdCheck(res.available ? { ok:true, msg:"사용 가능한 아이디예요 ✓" } : { ok:false, msg:"이미 사용 중인 아이디예요." });
        } catch { setIdCheck({ ok:false, msg:"확인 중 오류가 발생했어요." }); }
        finally { setIdChecking(false); }
    };

    const validateForm = () => {
        const errs = {};
        if (form.loginId.length < 4)                           errs.loginId = "아이디는 4자 이상이어야 해요.";
        if (idCheck && !idCheck.ok)                            errs.loginId = idCheck.msg;
        if (form.password.length < 6)                          errs.password = "비밀번호는 6자 이상이어야 해요.";
        if (form.password !== form.passwordConfirm)            errs.passwordConfirm = "비밀번호가 일치하지 않아요.";
        if (!form.name.trim())                                 errs.name = "이름을 입력해주세요.";
        if (form.birthDate.replace(/\D/g,"").length < 8)       errs.birthDate = "생년월일 8자리를 입력해주세요.";
        return errs;
    };

    const handleSignup = async () => {
        const errs = validateForm(); setFormErrors(errs);
        if (Object.keys(errs).length > 0) return;
        setSignupLoading(true);
        try {
            await signup({ loginId:form.loginId, password:form.password, name:form.name, birthDate:form.birthDate });
            setSignupDone(true);
        } catch (e) { setFormErrors({ general: e.message }); }
        finally { setSignupLoading(false); }
    };

    const formatBirth = (val) => {
        const d = val.replace(/\D/g,"").slice(0,8);
        if (d.length <= 4) return d;
        if (d.length <= 6) return `${d.slice(0,4)}.${d.slice(4)}`;
        return `${d.slice(0,4)}.${d.slice(4,6)}.${d.slice(6)}`;
    };

    const s = {
        page:    { minHeight:"100vh", background:"#fff", display:"flex", flexDirection:"column" },
        hero:    { background:"#29D3C4", padding:"48px 24px 36px", display:"flex", flexDirection:"column", alignItems:"center", gap:8 },
        logoEmoji: { fontSize:48 },
        logo:    { fontSize:28, fontWeight:900, color:"#fff", letterSpacing:-1, fontFamily:"'Black Han Sans', sans-serif" },
        sub:     { fontSize:13, color:"rgba(255,255,255,0.85)" },
        tabs:    { display:"flex", borderBottom:"1px solid #eee" },
        tab: (a) => ({ flex:1, padding:"16px 0", textAlign:"center", fontSize:15, fontWeight:a?800:500, color:a?"#29D3C4":"#aaa", borderBottom:a?"2px solid #29D3C4":"2px solid transparent", cursor:"pointer", background:"none", border:"none" }),
        form:    { padding:"28px 24px", display:"flex", flexDirection:"column", gap:16, flex:1 },
        group:   { display:"flex", flexDirection:"column", gap:6 },
        label:   { fontSize:12, fontWeight:700, color:"#555" },
        inputWrap:{ position:"relative", display:"flex", alignItems:"center" },
        input: (err) => ({ padding:"14px 16px", borderRadius:12, border:`1.5px solid ${err?"#FF3B30":"#e8e8e8"}`, fontSize:15, color:"#1A1A1A", outline:"none", background:"#fafafa", width:"100%", boxSizing:"border-box" }),
        pwInput: (err) => ({ padding:"14px 44px 14px 16px", borderRadius:12, border:`1.5px solid ${err?"#FF3B30":"#e8e8e8"}`, fontSize:15, color:"#1A1A1A", outline:"none", background:"#fafafa", width:"100%", boxSizing:"border-box" }),
        eyeBtn:  { position:"absolute", right:12, background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center" },
        err:     { fontSize:12, color:"#FF3B30" },
        ok:      { fontSize:12, color:"#29D3C4" },
        errBox:  { background:"#FFF0F0", border:"1px solid #FFD0D0", borderRadius:10, padding:"12px 14px", fontSize:13, color:"#FF3B30", textAlign:"center" },
        row:     { display:"flex", gap:8 },
        checkBtn:(loading) => ({ padding:"0 14px", borderRadius:12, border:"1.5px solid #29D3C4", background:"#fff", color:loading?"#aaa":"#29D3C4", fontSize:13, fontWeight:700, cursor:loading?"not-allowed":"pointer", whiteSpace:"nowrap" }),
        btn: (loading) => ({ width:"100%", padding:"17px", background:loading?"#aaa":"#29D3C4", color:"#fff", border:"none", borderRadius:14, fontSize:16, fontWeight:800, cursor:loading?"not-allowed":"pointer", marginTop:8 }),
        doneWrap:{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", gap:16 },
        doneBtn: { width:"100%", padding:"17px", background:"#29D3C4", color:"#fff", border:"none", borderRadius:14, fontSize:16, fontWeight:800, cursor:"pointer", marginTop:16 },
    };

    if (signupDone) return (
        <div style={s.page}>
            <div style={s.hero}><div style={s.logo}>배달의민족</div></div>
            <div style={s.doneWrap}>
                <div style={{ fontSize:64 }}>🎉</div>
                <div style={{ fontSize:22, fontWeight:900, color:"#1A1A1A", textAlign:"center" }}>{form.name}님, 환영합니다!</div>
                <div style={{ fontSize:14, color:"#888", textAlign:"center", lineHeight:1.6 }}>회원가입이 완료되었어요.{"\n"}지금 로그인하고 맛있는 음식을 만나보세요!</div>
                <button style={s.doneBtn} onClick={() => { setSignupDone(false); setMode("login"); setLoginId(form.loginId); }}>
                    로그인하러 가기 🛵
                </button>
            </div>
        </div>
    );

    return (
        <div style={s.page}>
            <div style={s.hero}>
                <div style={s.logoEmoji}>🛵</div>
                <div style={s.logo}>배달의민족</div>
                <div style={s.sub}>맛있는 음식, 빠르게 배달</div>
            </div>

            <div style={s.tabs}>
                <button style={s.tab(mode==="login")}  onClick={() => { setMode("login");  setLoginErr(""); }}>로그인</button>
                <button style={s.tab(mode==="signup")} onClick={() => { setMode("signup"); setFormErrors({}); }}>회원가입</button>
            </div>

            {mode === "login" && (
                <div style={s.form}>
                    {loginErr && <div style={s.errBox}>{loginErr}</div>}
                    <div style={s.group}>
                        <label style={s.label}>아이디</label>
                        <input style={s.input(false)} placeholder="아이디를 입력해주세요" value={loginId} onChange={(e) => setLoginId(e.target.value)} autoComplete="username" />
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>비밀번호</label>
                        <div style={s.inputWrap}>
                            <input style={s.pwInput(false)} type={showPw?"text":"password"} placeholder="비밀번호를 입력해주세요"
                                   value={loginPw} onChange={(e) => setLoginPw(e.target.value)}
                                   autoComplete="current-password" onKeyDown={(e) => e.key==="Enter" && handleLogin()} />
                            <button style={s.eyeBtn} onClick={() => setShowPw(!showPw)}>
                                {showPw ? <IoEyeOffOutline size={18} color="#aaa" /> : <IoEyeOutline size={18} color="#aaa" />}
                            </button>
                        </div>
                    </div>
                    <button style={s.btn(loginLoading)} onClick={handleLogin} disabled={loginLoading}>
                        {loginLoading ? "로그인 중..." : "로그인"}
                    </button>
                    <div style={{ textAlign:"center" }}>
            <span style={{ fontSize:13, color:"#888", cursor:"pointer", textDecoration:"underline" }} onClick={() => setMode("signup")}>
              아직 회원이 아니신가요? 회원가입
            </span>
                    </div>
                </div>
            )}

            {mode === "signup" && (
                <div style={s.form}>
                    {formErrors.general && <div style={s.errBox}>{formErrors.general}</div>}
                    <div style={s.group}>
                        <label style={s.label}>아이디</label>
                        <div style={s.row}>
                            <input style={{ ...s.input(!!formErrors.loginId), flex:1 }} placeholder="영문·숫자 4자 이상"
                                   value={form.loginId} onChange={(e) => { setForm(f=>({...f,loginId:e.target.value})); setIdCheck(null); }} autoComplete="username" />
                            <button style={s.checkBtn(idChecking)} onClick={handleCheckId} disabled={idChecking}>
                                {idChecking ? "확인 중" : "중복확인"}
                            </button>
                        </div>
                        {idCheck && <div style={idCheck.ok?s.ok:s.err}>{idCheck.msg}</div>}
                        {formErrors.loginId && !idCheck && <div style={s.err}>{formErrors.loginId}</div>}
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>비밀번호</label>
                        <div style={s.inputWrap}>
                            <input style={s.pwInput(!!formErrors.password)} type={showSignupPw?"text":"password"} placeholder="6자 이상"
                                   value={form.password} onChange={(e) => setForm(f=>({...f,password:e.target.value}))} autoComplete="new-password" />
                            <button style={s.eyeBtn} onClick={() => setShowSignupPw(!showSignupPw)}>
                                {showSignupPw ? <IoEyeOffOutline size={18} color="#aaa" /> : <IoEyeOutline size={18} color="#aaa" />}
                            </button>
                        </div>
                        {formErrors.password && <div style={s.err}>{formErrors.password}</div>}
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>비밀번호 확인</label>
                        <input style={s.input(!!formErrors.passwordConfirm)} type="password" placeholder="비밀번호 재입력"
                               value={form.passwordConfirm} onChange={(e) => setForm(f=>({...f,passwordConfirm:e.target.value}))} autoComplete="new-password" />
                        {formErrors.passwordConfirm && <div style={s.err}>{formErrors.passwordConfirm}</div>}
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>이름</label>
                        <input style={s.input(!!formErrors.name)} placeholder="실명을 입력해주세요"
                               value={form.name} onChange={(e) => setForm(f=>({...f,name:e.target.value}))} />
                        {formErrors.name && <div style={s.err}>{formErrors.name}</div>}
                    </div>
                    <div style={s.group}>
                        <label style={s.label}>생년월일</label>
                        <input style={s.input(!!formErrors.birthDate)} placeholder="예) 1999.01.01"
                               value={form.birthDate} onChange={(e) => setForm(f=>({...f,birthDate:formatBirth(e.target.value)}))}
                               inputMode="numeric" maxLength={10} />
                        {formErrors.birthDate && <div style={s.err}>{formErrors.birthDate}</div>}
                    </div>
                    <button style={s.btn(signupLoading)} onClick={handleSignup} disabled={signupLoading}>
                        {signupLoading ? "가입 중..." : "가입하기"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;