package org.example.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<AppUser, String> {
//    AppUser getByName(String userName);
}
