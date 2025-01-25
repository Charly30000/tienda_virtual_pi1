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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.virtual.backtiendavirtual.constants.ConstantsRoles;
import com.tienda.virtual.backtiendavirtual.entities.Role;
import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.models.ValidationErrorsResponse;
import com.tienda.virtual.backtiendavirtual.services.UserService;
import com.tienda.virtual.backtiendavirtual.utils.ResponseMessagesUtils;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/create/user")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user, BindingResult result) {
        if (result.hasFieldErrors()) {
            return validation(result);
        }

        Optional<User> userBBDD = service.findByUsername(user.getUsername());
        if (userBBDD.isPresent()) {
            return ResponseMessagesUtils.conflict("El usuario que intentas introducir ya existe");
        }
        userBBDD = service.findByEmail(user.getEmail());
        if (userBBDD.isPresent()) {
            return ResponseMessagesUtils.conflict("El email que intentas introducir ya existe");
        }

        List<Role> roles = new ArrayList<>();
        roles.add(new Role(ConstantsRoles.ROLE_USER));
        User newUser = new User(user.getUsername(), user.getEmail(), user.getPassword(), true, roles);
        service.save(newUser);

        return ResponseMessagesUtils.created("Usuario creado");
    }

    /**
     * Método auxiliar para manejar errores de validación.
     * 
     * @param result Resultado de validación
     * @return Respuesta con errores
     */
    private ResponseEntity<ValidationErrorsResponse> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });

        return ResponseEntity.badRequest()
                .body(new ValidationErrorsResponse(
                        "Errores de validación en la solicitud",
                        HttpStatus.BAD_REQUEST,
                        true,
                        errors));
    }

}
