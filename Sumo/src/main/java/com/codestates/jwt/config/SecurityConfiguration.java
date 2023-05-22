package com.codestates.jwt.config;

import com.codestates.jwt.JwtTokenizer;
import com.codestates.jwt.auth.filter.JwtAuthenticationFilter;
import com.codestates.jwt.auth.filter.JwtVerificationFilter;
import com.codestates.jwt.auth.handler.MemberAccessDeniedHandler;
import com.codestates.jwt.auth.handler.MemberAuthenticationEntryPoint;
import com.codestates.jwt.auth.handler.MemberAuthenticationFailureHandler;
import com.codestates.jwt.auth.handler.MemberAuthenticationSuccessHandler;
import com.codestates.jwt.auth.utils.CustomAuthorityUtils;
import com.codestates.jwt.auth.utils.JwtDecoder;
import com.codestates.member.repository.MemberRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration{
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final JwtDecoder jwtDecoder;

    private final MemberRepository memberRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, JwtDecoder jwtDecoder, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.jwtDecoder = jwtDecoder;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST,"/members/signup").permitAll()
                        .antMatchers(HttpMethod.PATCH,"/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.POST,"/boards").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH,"/boards/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/boards/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/boards/**").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.POST, "/calendars/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH,"/calendars/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/calendars/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET,"/calendars/**").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.OPTIONS,"/members/signup").permitAll()
                        .anyRequest().permitAll());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addExposedHeader("MemberId");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, jwtDecoder,memberRepository);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
