package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.tienda.virtual.backtiendavirtual.entities.Role;
import com.tienda.virtual.backtiendavirtual.entities.User;

public interface UserService {
    List<User> findAll();
    User save(User user);
    User updateRoles(User user, List<Role> roles);
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Page<User> findByUsernamePageable(String username, Pageable pageable);
}
