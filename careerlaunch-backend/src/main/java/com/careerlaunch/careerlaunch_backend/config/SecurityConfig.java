package com.careerlaunch.careerlaunch_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

@Configuration
public class SecurityConfig {
	@Bean
	public PasswordEncoder passwordEncoder() {
	    return new BCryptPasswordEncoder();
	}

	@Bean
	public JwtDecoder jwtDecoder(
	    @Value("${app.jwt.secret}") String secret) {

	    SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));

	    return NimbusJwtDecoder.withSecretKey(key)
	            .macAlgorithm(MacAlgorithm.HS256)
	            .build();
	}
	
	@Bean
	public JwtAuthenticationConverter jwtAuthenticationConverter() {

	    JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();

	    authoritiesConverter.setAuthoritiesClaimName("role");
	    authoritiesConverter.setAuthorityPrefix("ROLE_");

	    JwtAuthenticationConverter converter =
	            new JwtAuthenticationConverter();
                 converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);

	    return converter;
	}
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtDecoder jwtDecoder) throws Exception {

	    http
	        .csrf(csrf -> csrf.disable())
	        .cors(cors -> {})
	        .sessionManagement(session ->
	            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	        .oauth2ResourceServer(oauth2 ->
	        oauth2.jwt(jwt -> jwt
	            .decoder(jwtDecoder)
	            .jwtAuthenticationConverter(jwtAuthenticationConverter())
	        )
	        )

.authorizeHttpRequests(auth -> auth
    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

    .requestMatchers(HttpMethod.POST, "/api/users/register", "/api/users/login").permitAll()

    .requestMatchers(HttpMethod.GET, "/api/jobs", "/api/jobs/**").permitAll()

    .requestMatchers(HttpMethod.POST, "/api/jobs").hasRole("RECRUITER")

    .requestMatchers(HttpMethod.PUT,"/api/jobs/**").hasRole("RECRUITER")

    .requestMatchers(HttpMethod.DELETE, "/api/jobs/**").hasRole("RECRUITER")

    .requestMatchers(HttpMethod.POST, "/api/applications/*/apply").hasRole("JOB_SEEKER")

    .requestMatchers(HttpMethod.GET, "/api/applications/my-applications").hasRole("JOB_SEEKER")

    .requestMatchers(HttpMethod.GET, "/api/applications/recruiter-applications").hasRole("RECRUITER")

    .requestMatchers(HttpMethod.PATCH, "/api/applications/*/status").hasRole("RECRUITER")

    .anyRequest().authenticated()
);
	    return http.build();
	}
}
