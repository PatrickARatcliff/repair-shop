package com.repairshop.models;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import org.springframework.security.core.GrantedAuthority;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class GrantedAuthoritySerializer extends JsonSerializer<Collection<GrantedAuthority>> {
    @Override
    public void serialize(Collection<GrantedAuthority> authorities, JsonGenerator gen, SerializerProvider provider) throws IOException {
        List<String> authorityStrings = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        gen.writeObject(authorityStrings);
    }
}
