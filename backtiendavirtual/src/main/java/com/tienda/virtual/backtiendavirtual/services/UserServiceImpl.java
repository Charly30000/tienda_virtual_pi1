package com.tienda.virtual.backtiendavirtual.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Role;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.repositories.RoleRepository;
import com.tienda.virtual.backtiendavirtual.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    @Transactional
    public User save(User user) {
        Optional<Role> optionalRoleUser = roleRepository.findByRol(ConstantsRoles.ROLE_USER);
        List<Role> roles = new ArrayList<>();
        optionalRoleUser.ifPresent(roles::add);

        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
