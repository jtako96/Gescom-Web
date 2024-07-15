package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import ibssolutions.entity.parametre.Role;

public interface RoleRepository extends JpaRepository<Role, String> {

}
