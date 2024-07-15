package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.User;

public interface UserRepository extends JpaRepository<User, String> {

	@Query("select n from User n order by n.username")
	public List<User> listeProfil();
	
	@Query("select u from User u where username=:p")
	public User findOneUserName(@Param("p")String username);
	
	@Query("select n from User n where n.etat=true order by n.username")
	public List<User> listeProfilActiver();
	
	@Query("select n from User n where n.etat=false order by n.username")
	public List<User> listeProfilDesactiver();
	
	@Query("select u.nomComplet from User u where username=:p")
	public String findUserNames(@Param("p")String username);
}
