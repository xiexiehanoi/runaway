package com.runaway.project.login.model;

import lombok.Data;

@Data
public class GoogleProfile {
    public String id;
    public String email;
    public Boolean verifiedEmail;
    public String name;
    public String givenName;
    public String familyName;
    public String picture;
    public String locale;

}
