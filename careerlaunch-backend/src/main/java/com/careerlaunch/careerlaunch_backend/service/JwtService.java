package com.careerlaunch.careerlaunch_backend.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	 @Value("${app.jwt.secret}")
	 private String secret;

	 @Value("${app.jwt.expiration}")
	 private long expiration;

	 private SecretKey getSigningKey() {
	      byte[] keyBytes = Decoders.BASE64.decode(secret);
	      return Keys.hmacShaKeyFor(keyBytes);
	 }

	 public String generateToken(String email, String role) {
           return Jwts.builder()
	                .subject(email)
	                .claim("role", role)
	                .issuedAt(new Date())
	                .expiration(new Date(System.currentTimeMillis() + expiration))
	                .signWith(getSigningKey())
	                .compact();
	 }
}
