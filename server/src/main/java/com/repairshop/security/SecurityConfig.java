package com.repairshop.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {

        http.csrf().disable();

        http.cors();

        http.authorizeRequests()

                .antMatchers("/authenticate").permitAll()
                .antMatchers("/refresh_token").authenticated()
                .antMatchers("/create_account").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/appointment", "/appointment/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/customer", "/customer/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/vehicle", "/vehicle/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/user", "/user/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/appointment").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/customer").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/vehicle").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/user").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/appointment/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/customer/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/vehicle/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/user/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/appointment/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/customer/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/vehicle/*").hasAnyAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/user/*").hasAnyAuthority("ADMIN")
                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(authConfig), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
