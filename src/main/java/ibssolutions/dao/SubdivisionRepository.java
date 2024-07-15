package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.comptabilite.Subdivision;

public interface SubdivisionRepository extends JpaRepository<Subdivision, Long>{

	@Query("select s from Subdivision s where s.sousClasse.id=:x")
	List<Subdivision> listBySousClasse(@Param("x") Long id);

}
