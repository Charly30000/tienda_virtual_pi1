package com.tienda.virtual.backtiendavirtual.models;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import java.util.Map;

/**
 * Clase de respuesta de errores de validación extendida de GenericResponse
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "message",
        "status",
        "error",
        "errors"
})
public class ValidationErrorsResponse extends GenericResponse {

    // Campo adicional para los errores de validación
    @JsonProperty("errors")
    private Map<String, String> errors;

    public ValidationErrorsResponse(String message, HttpStatus status, boolean error, Map<String, String> errors) {
        super(message, status, error);
        this.errors = errors;
    }

    @JsonProperty("errors")
    public Map<String, String> getErrors() {
        return errors;
    }

    @JsonProperty("errors")
    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
