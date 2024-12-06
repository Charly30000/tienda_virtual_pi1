package com.tienda.virtual.backtiendavirtual.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Role;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.services.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAllUsers() {
        return service.findAll();
    }

    @PostMapping("/create/user")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }

        Optional<User> userBBDD = service.findByUsername(user.getUsername());
        if (userBBDD.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "El usuario que intentas introducir ya existe");
            response.put("error", true);
            response.put("status", 409);
            return ResponseEntity.status(409).body(response);
        }
        userBBDD = service.findByEmail(user.getEmail());
        if (userBBDD.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "El email que intentas introducir ya existe");
            response.put("error", true);
            response.put("status", 409);
            return ResponseEntity.status(409).body(response);
        }

        List<Role> roles = new ArrayList<>();
        roles.add(new Role(ConstantsRoles.ROLE_USER));
        User newUser = new User(user.getUsername(), user.getEmail(), user.getPassword(), true, roles);
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(newUser));
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
    
}
