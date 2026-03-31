package com.baemin.api.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class SignupRequest {
    @NotBlank @Size(min = 4, max = 50)
    private String loginId;

    @NotBlank @Size(min = 6, max = 100)
    private String password;

    @NotBlank @Size(max = 50)
    private String name;

    private String birthDate; // "1999.01.01"

    private String email;
    private String phone;

    /** "USER" | "OWNER" — 기본값 USER */
    private String role = "USER";
}