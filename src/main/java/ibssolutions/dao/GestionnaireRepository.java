package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.clientelle.Gestionnaire;


public interface GestionnaireRepository extends JpaRepository<Gestionnaire, Long>{

	@Query("select c from Gestionnaire c order by c.nom")
	List<Gestionnaire> listeOrdonee();

	
}
