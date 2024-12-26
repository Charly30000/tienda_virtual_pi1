package com.tienda.virtual.backtiendavirtual.utils;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.tienda.virtual.backtiendavirtual.entities.User;
import com.tienda.virtual.backtiendavirtual.exceptions.UserBlockedException;
import com.tienda.virtual.backtiendavirtual.exceptions.UserNotFoundException;
import com.tienda.virtual.backtiendavirtual.services.UserService;

@Component
public class UserUtils {

    @Autowired
    private UserService userService;

    public User getUserAuthenticated() throws UserBlockedException, UserNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String userAuth = (String) authentication.getPrincipal();

        Optional<User> user = userService.findByUsername(userAuth);

        if (!user.isPresent()) {
            throw new UserNotFoundException("Usuario no encontrado");
        }

        if (!user.get().isEnabled()) {
            throw new UserBlockedException("El usuario se encuentra bloqueado");
        }

        return user.get();
    }

}
