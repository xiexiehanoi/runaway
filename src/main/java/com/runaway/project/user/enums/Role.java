package com.runaway.project.user.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

  GUEST("USER"), USER("ADMIN");

  private final String key;
}