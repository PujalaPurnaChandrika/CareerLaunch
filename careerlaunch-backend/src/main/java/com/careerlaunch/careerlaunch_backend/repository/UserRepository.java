package com.careerlaunch.careerlaunch_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.careerlaunch.careerlaunch_backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
       User findByEmail(String email);
       boolean existsByEmail(String email);
}
