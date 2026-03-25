import { useState } from "react";

const LoginPage = ({ onLogin }) => {
    const [mode, setMode] = useState("login"); // "login" | "signup"

    // 로그인 폼
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");
    const [loginError, setLoginError] = useState("");

    // 회원가입 폼
    const [signupId, setSignupId] = useState("");
    const [signupPw, setSignupPw] = useState("");
    const [signupPwConfirm, setSignupPwConfirm] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupBirth, setSignupBirth] = useState("");
    const [signupErrors, setSignupErrors] = useState({});
    const [signupDone, setSignupDone] = useState(false);

    const handleLogin = () => {
        if (!loginId || !loginPw) {
            setLoginError("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        setLoginError("");
        onLogin?.();
    };

    const validateSignup = () => {
        const errs = {};
        if (!signupId || signupId.length < 4) errs.id = "아이디는 4자 이상이어야 해요.";
        if (!signupPw || signupPw.length < 6) errs.pw = "비밀번호는 6자 이상이어야 해요.";
        if (signupPw !== signupPwConfirm) errs.pwConfirm = "비밀번호가 일치하지 않아요.";
        if (!signupName) errs.name = "이름을 입력해주세요.";
        if (!signupBirth || signupBirth.length < 8) errs.birth = "생년월일 8자리를 입력해주세요.";
        return errs;
    };

    const handleSignup = () => {
        const errs = validateSignup();
        setSignupErrors(errs);
        if (Object.keys(errs).length === 0) {
            setSignupDone(true);
        }
    };

    const formatBirth = (val) => {
        const digits = val.replace(/\D/g, "").slice(0, 8);
        if (digits.length <= 4) return digits;
        if (digits.length <= 6) return `${digits.slice(0, 4)}.${digits.slice(4)}`;
        return `${digits.slice(0, 4)}.${digits.slice(4, 6)}.${digits.slice(6)}`;
    };

    const s = {
        page: {
            minHeight: "100vh",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Noto Sans KR', sans-serif",
        },
        // 상단 로고 영역
        hero: {
            background: "#29D3C4",
            padding: "48px 24px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
        },
        logoEmoji: {
            fontSize: 48,
            marginBottom: 4,
        },
        logoText: {
            fontSize: 28,
            fontWeight: 900,
            color: "#fff",
            letterSpacing: -1,
            fontFamily: "'Black Han Sans', sans-serif",
        },
        logoSub: {
            fontSize: 13,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 500,
        },
        // 탭
        tabRow: {
            display: "flex",
            borderBottom: "1px solid #eee",
            background: "#fff",
        },
        tab: (active) => ({
            flex: 1,
            padding: "16px 0",
            textAlign: "center",
            fontSize: 15,
            fontWeight: active ? 800 : 500,
            color: active ? "#29D3C4" : "#aaa",
            borderBottom: active ? "2px solid #29D3C4" : "2px solid transparent",
            cursor: "pointer",
            background: "none",
            border: "none",
            transition: "all 0.2s",
        }),
        // 폼 영역
        form: {
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            flex: 1,
        },
        fieldGroup: {
            display: "flex",
            flexDirection: "column",
            gap: 6,
        },
        label: {
            fontSize: 12,
            fontWeight: 700,
            color: "#555",
        },
        input: (hasError) => ({
            padding: "14px 16px",
            borderRadius: 12,
            border: `1.5px solid ${hasError ? "#FF3B30" : "#e8e8e8"}`,
            fontSize: 15,
            color: "#1A1A1A",
            outline: "none",
            background: "#fafafa",
            transition: "border 0.2s",
            width: "100%",
            boxSizing: "border-box",
        }),
        errorMsg: {
            fontSize: 12,
            color: "#FF3B30",
            marginTop: 2,
        },
        submitBtn: {
            width: "100%",
            padding: "17px",
            background: "#29D3C4",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
            marginTop: 8,
            letterSpacing: -0.3,
        },
        errorBox: {
            background: "#FFF0F0",
            border: "1px solid #FFD0D0",
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 13,
            color: "#FF3B30",
            fontWeight: 600,
            textAlign: "center",
        },
        // 회원가입 완료
        doneWrap: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            gap: 16,
        },
        doneEmoji: { fontSize: 64, marginBottom: 8 },
        doneTitle: { fontSize: 22, fontWeight: 900, color: "#1A1A1A", textAlign: "center" },
        doneSub: { fontSize: 14, color: "#888", textAlign: "center", lineHeight: 1.6 },
        doneBtn: {
            width: "100%",
            padding: "17px",
            background: "#29D3C4",
            color: "#fff",
            border: "none",
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 800,
            cursor: "pointer",
            marginTop: 16,
        },
    };

    // 회원가입 완료 화면
    if (signupDone) {
        return (
            <div style={s.page}>
                <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <div style={s.hero}>
                    <div style={s.logoText}>배달의민족</div>
                </div>
                <div style={s.doneWrap}>
                    <div style={s.doneEmoji}>🎉</div>
                    <div style={s.doneTitle}>{signupName}님,{"\n"}환영합니다!</div>
                    <div style={s.doneSub}>
                        배달의민족 회원이 되셨어요.{"\n"}
                        맛있는 음식을 빠르게 만나보세요!
                    </div>
                    <button style={s.doneBtn} onClick={onLogin}>
                        바로 시작하기 🛵
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={s.page}>
            <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

            {/* 로고 헤더 */}
            <div style={s.hero}>
                <div style={s.logoEmoji}>🛵</div>
                <div style={s.logoText}>배달의민족</div>
                <div style={s.logoSub}>맛있는 음식, 빠르게 배달</div>
            </div>

            {/* 탭 */}
            <div style={s.tabRow}>
                <button style={s.tab(mode === "login")} onClick={() => { setMode("login"); setLoginError(""); }}>
                    로그인
                </button>
                <button style={s.tab(mode === "signup")} onClick={() => { setMode("signup"); setSignupErrors({}); }}>
                    회원가입
                </button>
            </div>

            {/* ── 로그인 폼 ── */}
            {mode === "login" && (
                <div style={s.form}>
                    {loginError && <div style={s.errorBox}>{loginError}</div>}

                    <div style={s.fieldGroup}>
                        <label style={s.label}>아이디</label>
                        <input
                            style={s.input(false)}
                            placeholder="아이디를 입력해주세요"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div style={s.fieldGroup}>
                        <label style={s.label}>비밀번호</label>
                        <input
                            style={s.input(false)}
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            value={loginPw}
                            onChange={(e) => setLoginPw(e.target.value)}
                            autoComplete="current-password"
                            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        />
                    </div>

                    <button style={s.submitBtn} onClick={handleLogin}>
                        로그인
                    </button>

                    <div style={{ textAlign: "center", marginTop: 8 }}>
            <span
                style={{ fontSize: 13, color: "#888", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setMode("signup")}
            >
              아직 회원이 아니신가요? 회원가입
            </span>
                    </div>
                </div>
            )}

            {/* ── 회원가입 폼 ── */}
            {mode === "signup" && (
                <div style={s.form}>
                    <div style={s.fieldGroup}>
                        <label style={s.label}>아이디</label>
                        <input
                            style={s.input(!!signupErrors.id)}
                            placeholder="영문·숫자 4자 이상"
                            value={signupId}
                            onChange={(e) => setSignupId(e.target.value)}
                            autoComplete="username"
                        />
                        {signupErrors.id && <div style={s.errorMsg}>{signupErrors.id}</div>}
                    </div>

                    <div style={s.fieldGroup}>
                        <label style={s.label}>비밀번호</label>
                        <input
                            style={s.input(!!signupErrors.pw)}
                            type="password"
                            placeholder="6자 이상 입력해주세요"
                            value={signupPw}
                            onChange={(e) => setSignupPw(e.target.value)}
                            autoComplete="new-password"
                        />
                        {signupErrors.pw && <div style={s.errorMsg}>{signupErrors.pw}</div>}
                    </div>

                    <div style={s.fieldGroup}>
                        <label style={s.label}>비밀번호 확인</label>
                        <input
                            style={s.input(!!signupErrors.pwConfirm)}
                            type="password"
                            placeholder="비밀번호를 한 번 더 입력해주세요"
                            value={signupPwConfirm}
                            onChange={(e) => setSignupPwConfirm(e.target.value)}
                            autoComplete="new-password"
                        />
                        {signupErrors.pwConfirm && <div style={s.errorMsg}>{signupErrors.pwConfirm}</div>}
                    </div>

                    <div style={s.fieldGroup}>
                        <label style={s.label}>이름</label>
                        <input
                            style={s.input(!!signupErrors.name)}
                            placeholder="실명을 입력해주세요"
                            value={signupName}
                            onChange={(e) => setSignupName(e.target.value)}
                        />
                        {signupErrors.name && <div style={s.errorMsg}>{signupErrors.name}</div>}
                    </div>

                    <div style={s.fieldGroup}>
                        <label style={s.label}>생년월일</label>
                        <input
                            style={s.input(!!signupErrors.birth)}
                            placeholder="예) 1999.01.01"
                            value={signupBirth}
                            onChange={(e) => setSignupBirth(formatBirth(e.target.value))}
                            inputMode="numeric"
                            maxLength={10}
                        />
                        {signupErrors.birth && <div style={s.errorMsg}>{signupErrors.birth}</div>}
                    </div>

                    <button style={s.submitBtn} onClick={handleSignup}>
                        가입하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginPage;