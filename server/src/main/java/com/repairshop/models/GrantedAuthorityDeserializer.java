package com.repairshop.models;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class GrantedAuthorityDeserializer extends JsonDeserializer<Collection<GrantedAuthority>> {
    @Override
    public Collection<GrantedAuthority> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        List<String> authorityStrings = p.readValueAs(new TypeReference<List<String>>() {});
        return authorityStrings.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
}

