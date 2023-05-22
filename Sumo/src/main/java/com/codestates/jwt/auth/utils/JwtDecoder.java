package com.codestates.jwt.auth.utils;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Slf4j
@Component
public class JwtDecoder {
    public Map<String, Object> decode(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String[] jwtParts = jws.split("\\.");
        String base64EncodedClaims = jwtParts[1];
        byte[] decodedBytes = Base64.getUrlDecoder().decode(base64EncodedClaims);
        String claimsJson = new String(decodedBytes, StandardCharsets.UTF_8);

        Gson gson = new Gson();
        Map<String, Object> claims = gson.fromJson(claimsJson, Map.class);

        log.debug("Jwt decode complete");

        StringBuilder result = new StringBuilder();
        for (Map.Entry<String, Object> entry : claims.entrySet()) {
            result.append(entry.getKey()).append(": ").append(entry.getValue()).append("\n");
        }
        log.debug(result.toString());

        return claims;
    }
}
