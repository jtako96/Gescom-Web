package ibssolutions.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.ParametreTVA;
import ibssolutions.entity.parametre.Scrussale;

public interface ParametreTVARepository extends JpaRepository<ParametreTVA, Long>{

	@Query("select p.taux from ParametreTVA p where p.scrussale=:x ")
	double getTVA( @Param("x") Scrussale id);


}
