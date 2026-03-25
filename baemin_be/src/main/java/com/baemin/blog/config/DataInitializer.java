package com.tistory.blog.config;

import com.tistory.blog.entity.Member;
import com.tistory.blog.entity.Post;
import com.tistory.blog.repository.MemberRepository;
import com.tistory.blog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * 개발 환경 샘플 데이터 초기화
 * 프로필 "dev" 또는 기본 실행 시 동작
 *
 * 테스트 계정:
 *   이메일: dev@tistory.com / 비밀번호: Test1234!
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final PostRepository   postRepository;
    private final PasswordEncoder  passwordEncoder;

    @Override
    public void run(String... args) {
        if (memberRepository.count() > 0) return; // 이미 데이터 있으면 skip

        // ── 샘플 회원 ──
        Member member = Member.builder()
                .email("dev@tistory.com")
                .password(passwordEncoder.encode("Test1234!"))
                .nickname("개발자K")
                .phone("010-1234-5678")
                .gender("남성")
                .birthDate("1995-06-15")
                .blogAddress("devk")
                .blogTitle("개발자의 일상노트")
                .blogDescription("코딩, 일상, 그리고 소소한 기록들")
                .profileEmoji("👩‍💻")
                .theme("light")
                .agreedService(true)
                .agreedPrivacy(true)
                .agreedLocation(false)
                .agreedMarketing(false)
                .build();
        member = memberRepository.save(member);

        // ── 샘플 게시글 ──
        String[] titles = {
            "React 18의 새로운 기능들 총정리 — Concurrent Mode부터 Suspense까지",
            "AWS EC2 없이 Vercel로 Next.js 앱 10분 만에 배포하기",
            "Python으로 만드는 나만의 크롤러 — requests와 BeautifulSoup 실전 가이드",
            "개발자라면 꼭 읽어야 할 책 5권 — 2025년 추천 리스트"
        };
        String[] categories = { "React / Next.js", "DevOps", "Python", "일상" };
        String[] tags = {
            "React,프론트엔드,Concurrent",
            "Next.js,배포,Vercel",
            "Python,크롤링,BeautifulSoup",
            "독서,추천,개발자"
        };
        String sampleContent = "<h2>들어가며</h2><p>안녕하세요, 개발자K입니다. " +
            "이번 포스팅에서는 최신 개발 트렌드를 공유합니다.</p>" +
            "<h2>주요 내용</h2><p>개발 생태계는 빠르게 변화하고 있습니다. " +
            "최신 기술을 꾸준히 따라가는 것이 중요합니다.</p>" +
            "<h2>마치며</h2><p>이번 글이 도움이 되셨으면 좋겠습니다. 궁금한 점은 댓글로 남겨주세요!</p>";

        for (int i = 0; i < titles.length; i++) {
            postRepository.save(Post.builder()
                    .member(member)
                    .title(titles[i])
                    .content(sampleContent)
                    .category(categories[i])
                    .visibility(Post.Visibility.PUBLIC)
                    .published(true)
                    .tags(tags[i])
                    .build());
        }

        // 임시저장 샘플
        postRepository.save(Post.builder()
                .member(member)
                .title("[임시저장] TypeScript 제네릭 완전 정복")
                .content("<p>작성 중인 글입니다...</p>")
                .category("개발")
                .visibility(Post.Visibility.PRIVATE)
                .published(false)
                .tags("TypeScript,제네릭")
                .build());

        log.info("✅ 샘플 데이터 초기화 완료 | 이메일: dev@tistory.com / 비밀번호: Test1234!");
    }
}
