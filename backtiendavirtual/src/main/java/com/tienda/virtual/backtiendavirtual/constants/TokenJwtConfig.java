package com.tienda.virtual.backtiendavirtual.constants;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import io.jsonwebtoken.security.Keys;

public class TokenJwtConfig {
    // Metodo de generacion de claves secretas a partir de un String (utilizaremos esta para no tener que ir generando
    // tokens constantemente durante el desarrollo)
    // Debe de tener almenos 256 bits para que sea permitida por el SecretKey
    private static final String SECRET_STRING = "nX90zOCEhiAHyrug79eTjOUdCFIgcIb2zKDJEwchmjU";
    public static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));
    // Metodo de generacion de claves secretas a partir de JWT (Más segura, el metodo que se utilizaría en producción)
    // De este método, ni siquiera los desarrolladores sabrían la clave secreta
    // public static final SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();

    public static final String PREFIX_TOKEN = "Bearer ";
    public static final String HEADER_AUTHORIZATION = "Authorization";
    public static final String CONTENT_TYPE_JSON = "application/json";
    public static final int TOKEN_DURATION_DAYS = 365;
}
