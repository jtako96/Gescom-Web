package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.vente.Prestation;

public interface PrestationRepository extends JpaRepository<Prestation, Long>{

	@Query("select p from Prestation p where p.exercice.etat=true and p.scrussale.id=:x")
	List<Prestation> listeByScrussale(@Param("x") long idScrussale);

}
