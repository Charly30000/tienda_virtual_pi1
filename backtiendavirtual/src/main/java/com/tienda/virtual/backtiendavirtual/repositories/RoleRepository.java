package com.tienda.virtual.backtiendavirtual.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.tienda.virtual.backtiendavirtual.entities.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
    Optional<Role> findByRol(String rol);
}
