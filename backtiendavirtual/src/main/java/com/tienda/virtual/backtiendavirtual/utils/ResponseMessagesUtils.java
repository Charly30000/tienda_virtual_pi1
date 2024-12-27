package com.tienda.virtual.backtiendavirtual.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.tienda.virtual.backtiendavirtual.models.GenericResponse;

public class ResponseMessagesUtils {

    public static final ResponseEntity<GenericResponse> userNotFound() {
        GenericResponse response = new GenericResponse(
                "Usuario no encontrado",
                HttpStatus.UNAUTHORIZED,
                true);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    public static final ResponseEntity<GenericResponse> userBlocked() {
        GenericResponse response = new GenericResponse(
                "El usuario se encuentra bloqueado",
                HttpStatus.UNAUTHORIZED,
                true);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    public static final ResponseEntity<GenericResponse> serverError() {
        GenericResponse response = new GenericResponse(
                "Ha ocurrido un error inesperado",
                HttpStatus.INTERNAL_SERVER_ERROR,
                true);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    public static final ResponseEntity<GenericResponse> serverError(String message) {
        GenericResponse response = new GenericResponse(
                message,
                HttpStatus.INTERNAL_SERVER_ERROR,
                true);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    public static final ResponseEntity<GenericResponse> ok(String message) {
        GenericResponse response = new GenericResponse(
                message,
                HttpStatus.OK,
                false);
        return ResponseEntity.ok().body(response);
    }

    public static final ResponseEntity<GenericResponse> notFound(String message) {
        GenericResponse response = new GenericResponse(
                message,
                HttpStatus.NOT_FOUND,
                true);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    public static final ResponseEntity<GenericResponse> locked(String message) {
        GenericResponse response = new GenericResponse(
                message,
                HttpStatus.LOCKED,
                true);
        return ResponseEntity.status(HttpStatus.LOCKED).body(response);
    }

    public static final ResponseEntity<GenericResponse> notAcceptable(String message) {
        GenericResponse response = new GenericResponse(
                message,
                HttpStatus.NOT_ACCEPTABLE,
                true);
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(response);
    }

    public static final ResponseEntity<GenericResponse> badRequest(String message) {
        GenericResponse response = new GenericResponse(
                message,
                HttpStatus.BAD_REQUEST,
                true);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
}
