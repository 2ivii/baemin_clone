package com.baemin.api.controller;

import com.baemin.api.dto.request.OwnerMenuRequest;
import com.baemin.api.dto.request.OwnerRestaurantRequest;
import com.baemin.api.dto.response.ApiResponse;
import com.baemin.api.dto.response.MenuResponse;
import com.baemin.api.dto.response.RestaurantResponse;
import com.baemin.api.entity.User;
import com.baemin.api.exception.UnauthorizedException;
import com.baemin.api.service.OwnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owner")
@RequiredArgsConstructor
public class OwnerController {

    private final OwnerService ownerService;

    // ── 가게 ──────────────────────────────────────────────────

    /** GET /api/owner/restaurants — 내 가게 목록 */
    @GetMapping("/restaurants")
    public ApiResponse<List<RestaurantResponse>> getMyRestaurants(@AuthenticationPrincipal User user) {
        checkOwner(user);
        return ApiResponse.ok(ownerService.getMyRestaurants(user));
    }

    /** POST /api/owner/restaurants — 가게 등록 */
    @PostMapping("/restaurants")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<RestaurantResponse> createRestaurant(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody OwnerRestaurantRequest req) {
        checkOwner(user);
        return ApiResponse.ok("가게가 등록되었습니다.", ownerService.createRestaurant(user, req));
    }

    /** PUT /api/owner/restaurants/{id} — 가게 수정 */
    @PutMapping("/restaurants/{id}")
    public ApiResponse<RestaurantResponse> updateRestaurant(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @Valid @RequestBody OwnerRestaurantRequest req) {
        checkOwner(user);
        return ApiResponse.ok("가게 정보가 수정되었습니다.", ownerService.updateRestaurant(user, id, req));
    }

    /** PATCH /api/owner/restaurants/{id}/toggle-open — 영업 상태 토글 */
    @PatchMapping("/restaurants/{id}/toggle-open")
    public ApiResponse<RestaurantResponse> toggleOpen(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        checkOwner(user);
        return ApiResponse.ok(ownerService.toggleOpen(user, id));
    }

    /** DELETE /api/owner/restaurants/{id} — 가게 삭제 */
    @DeleteMapping("/restaurants/{id}")
    public ApiResponse<Void> deleteRestaurant(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        checkOwner(user);
        ownerService.deleteRestaurant(user, id);
        return ApiResponse.ok("가게가 삭제되었습니다.", null);
    }

    // ── 메뉴 ──────────────────────────────────────────────────

    /** GET /api/owner/restaurants/{id}/menus — 메뉴 목록 (비활성 포함) */
    @GetMapping("/restaurants/{id}/menus")
    public ApiResponse<List<MenuResponse>> getMenus(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        checkOwner(user);
        return ApiResponse.ok(ownerService.getMenus(user, id));
    }

    /** POST /api/owner/restaurants/{id}/menus — 메뉴 등록 */
    @PostMapping("/restaurants/{id}/menus")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<MenuResponse> createMenu(
            @AuthenticationPrincipal User user,
            @PathVariable Long id,
            @Valid @RequestBody OwnerMenuRequest req) {
        checkOwner(user);
        return ApiResponse.ok("메뉴가 등록되었습니다.", ownerService.createMenu(user, id, req));
    }

    /** PUT /api/owner/restaurants/{restaurantId}/menus/{menuId} — 메뉴 수정 */
    @PutMapping("/restaurants/{restaurantId}/menus/{menuId}")
    public ApiResponse<MenuResponse> updateMenu(
            @AuthenticationPrincipal User user,
            @PathVariable Long restaurantId,
            @PathVariable Long menuId,
            @Valid @RequestBody OwnerMenuRequest req) {
        checkOwner(user);
        return ApiResponse.ok("메뉴가 수정되었습니다.", ownerService.updateMenu(user, restaurantId, menuId, req));
    }

    /** PATCH /api/owner/restaurants/{restaurantId}/menus/{menuId}/toggle — 메뉴 활성/비활성 */
    @PatchMapping("/restaurants/{restaurantId}/menus/{menuId}/toggle")
    public ApiResponse<MenuResponse> toggleMenu(
            @AuthenticationPrincipal User user,
            @PathVariable Long restaurantId,
            @PathVariable Long menuId) {
        checkOwner(user);
        return ApiResponse.ok(ownerService.toggleMenuAvailable(user, restaurantId, menuId));
    }

    /** DELETE /api/owner/restaurants/{restaurantId}/menus/{menuId} — 메뉴 삭제 */
    @DeleteMapping("/restaurants/{restaurantId}/menus/{menuId}")
    public ApiResponse<Void> deleteMenu(
            @AuthenticationPrincipal User user,
            @PathVariable Long restaurantId,
            @PathVariable Long menuId) {
        checkOwner(user);
        ownerService.deleteMenu(user, restaurantId, menuId);
        return ApiResponse.ok("메뉴가 삭제되었습니다.", null);
    }

    // ── private ───────────────────────────────────────────────

    private void checkOwner(User user) {
        if (!"OWNER".equals(user.getRole())) {
            throw new UnauthorizedException("사장님 계정만 접근할 수 있습니다.");
        }
    }
}