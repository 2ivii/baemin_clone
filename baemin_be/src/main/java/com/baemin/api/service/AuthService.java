package com.baemin.api.service;

import com.baemin.api.exception.BadRequestException;
import com.baemin.api.security.JwtTokenProvider;
import com.baemin.api.exception.UnauthorizedException;
import com.baemin.api.dto.request.LoginRequest;
import com.baemin.api.dto.request.SignupRequest;
import com.baemin.api.dto.response.AuthResponse;
import com.baemin.api.entity.User;
import com.baemin.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    /** 회원가입 */
    @Transactional
    public AuthResponse signup(SignupRequest req) {
        // 아이디 중복 확인
        if (userRepository.existsByLoginId(req.getLoginId())) {
            throw new BadRequestException("이미 사용 중인 아이디입니다.");
        }

        // 생년월일 파싱 (1999.01.01 or 19990101 형식 허용)
        LocalDate birthDate = null;
        if (req.getBirthDate() != null && !req.getBirthDate().isBlank()) {
            birthDate = parseBirthDate(req.getBirthDate());
        }

        User user = User.builder()
                .loginId(req.getLoginId())
                .password(passwordEncoder.encode(req.getPassword()))
                .name(req.getName())
                .birthDate(birthDate)
                .email(req.getEmail())
                .phone(req.getPhone())
                .build();

        user = userRepository.save(user);

        String token = jwtTokenProvider.generateToken(user.getId(), user.getLoginId());
        return buildAuthResponse(token, user);
    }

    /** 로그인 */
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByLoginId(req.getLoginId())
                .orElseThrow(() -> new UnauthorizedException("아이디 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new com.baemin.api.exception.UnauthorizedException("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        String token = jwtTokenProvider.generateToken(user.getId(), user.getLoginId());
        return buildAuthResponse(token, user);
    }

    /** 아이디 중복 체크 */
    @Transactional(readOnly = true)
    public boolean checkLoginIdAvailable(String loginId) {
        return !userRepository.existsByLoginId(loginId);
    }

    // ── private helpers ───────────────────────────────────────

    private AuthResponse buildAuthResponse(String token, User user) {
        return AuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(AuthResponse.UserInfo.from(user))
                .build();
    }

    private LocalDate parseBirthDate(String raw) {
        // "1999.01.01" → remove dots/hyphens → "19990101"
        String digits = raw.replaceAll("[.\\-/]", "");
        try {
            return LocalDate.parse(digits, DateTimeFormatter.ofPattern("yyyyMMdd"));
        } catch (DateTimeParseException e) {
            throw new com.baemin.api.exception.BadRequestException("생년월일 형식이 올바르지 않습니다. 예) 1999.01.01");
        }
    }
}
