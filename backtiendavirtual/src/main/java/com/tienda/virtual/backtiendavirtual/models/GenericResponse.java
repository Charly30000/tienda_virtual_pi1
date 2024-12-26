package com.tienda.virtual.backtiendavirtual.models;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

/**
 * Clase preparada de respuesta de mensajes genericos
 * Estos serán los datos que responda el servidor
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "message",
        "status",
        "error"
})
public class GenericResponse {
    // Mensaje de error
    @JsonProperty("message")
    private String message;

    // Codigo de error
    @JsonProperty("status")
    private int status;

    // Define si es un error
    @JsonProperty("error")
    private boolean error;

    public GenericResponse(String message, HttpStatus status, boolean error) {
        this.message = message;
        this.status = status.value();
        this.error = error;
    }

    @JsonProperty("message")
    public String getMessage() {
        return message;
    }

    @JsonProperty("message")
    public void setMessage(String message) {
        this.message = message;
    }

    @JsonProperty("status")
    public int getStatus() {
        return status;
    }

    @JsonProperty("status")
    public void setStatus(int status) {
        this.status = status;
    }

    @JsonProperty("error")
    public boolean isError() {
        return error;
    }

    @JsonProperty("error")
    public void setError(boolean error) {
        this.error = error;
    }

}
