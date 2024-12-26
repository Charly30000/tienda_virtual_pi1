package com.tienda.virtual.backtiendavirtual.utils;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ExceptionResponseMessagesUtils {
    
    public static final ResponseEntity<Map<String, Object>> userNotFound() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Usuario no encontrado");
        response.put("error", true);
        response.put("status", HttpStatus.UNAUTHORIZED.value());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    public static final ResponseEntity<Map<String, Object>> userBlocked() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "El usuario se encuentra bloqueado");
        response.put("error", true);
        response.put("status", HttpStatus.UNAUTHORIZED.value());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    public static final ResponseEntity<Map<String, Object>> serverError() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Ha ocurrido un error inesperado");
        response.put("error", true);
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
