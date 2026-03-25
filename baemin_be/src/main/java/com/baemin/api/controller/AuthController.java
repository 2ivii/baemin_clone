package com.baemin.api.controller;

import com.baemin.api.service.AuthService;
import com.baemin.api.dto.request.LoginRequest;
import com.baemin.api.dto.request.SignupRequest;
import com.baemin.api.dto.response.ApiResponse;
import com.baemin.api.dto.response.AuthResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * POST /api/auth/signup
     * 회원가입
     */
    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<AuthResponse> signup(@Valid @RequestBody SignupRequest req) {
        return ApiResponse.ok("회원가입이 완료되었습니다.", authService.signup(req));
    }

    /**
     * POST /api/auth/login
     * 로그인 → JWT 발급
     */
    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        return ApiResponse.ok(authService.login(req));
    }

    /**
     * GET /api/auth/check-id?loginId=xxx
     * 아이디 중복 확인
     */
    @GetMapping("/check-id")
    public ApiResponse<Map<String, Boolean>> checkLoginId(@RequestParam String loginId) {
        boolean available = authService.checkLoginIdAvailable(loginId);
        return ApiResponse.ok(Map.of("available", available));
    }
}