package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.stockarticle.Conditionnement;

public interface ConditionnementRepository extends JpaRepository<Conditionnement, Long>{

	@Query("select c from Conditionnement c order by c.libelle")
	List<Conditionnement> listeOrdonee();

	
}
