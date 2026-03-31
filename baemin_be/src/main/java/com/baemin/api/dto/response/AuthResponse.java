package com.baemin.api.dto.response;

import com.baemin.api.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {
    private String accessToken;
    private String tokenType;
    private UserInfo user;

    @Getter
    @Builder
    public static class UserInfo {
        private Long id;
        private String loginId;
        private String name;
        private String email;
        private String phone;
        private String role;   // "USER" | "OWNER"

        public static UserInfo from(User user) {
            return UserInfo.builder()
                    .id(user.getId())
                    .loginId(user.getLoginId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .role(user.getRole())
                    .build();
        }
    }
}