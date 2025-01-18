package com.tienda.virtual.backtiendavirtual.services;

import java.util.Optional;

import com.tienda.virtual.backtiendavirtual.entities.Role;

public interface RoleService {
    Optional<Role> findByName(String name);
}
