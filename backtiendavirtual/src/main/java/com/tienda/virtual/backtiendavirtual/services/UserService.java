package com.tienda.virtual.backtiendavirtual.services;

import java.util.List;
import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.User;

public interface UserService {
    List<User> findAll();
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
