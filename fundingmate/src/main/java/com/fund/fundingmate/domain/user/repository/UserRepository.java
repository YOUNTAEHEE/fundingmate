package com.fund.fundingmate.domain.user.repository;

import com.fund.fundingmate.domain.user.dto.UserDTO;
import com.fund.fundingmate.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserid(String id);
    Optional<User> findBySnsLogin(String snsLogin);

    User findByNameAndTel(String name, String tel);

    User findByNameAndEmail(String name, String email);

    User findByNameAndTelAndUserid(String name, String tel, String userid);

    User findByNameAndEmailAndUserid(String name, String email, String userid);
}
