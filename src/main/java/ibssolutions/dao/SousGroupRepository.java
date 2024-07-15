package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.stockarticle.SousGroup;

public interface SousGroupRepository extends JpaRepository<SousGroup, Long>{

	@Query("select s from SousGroup s order by s.libelle")
	List<SousGroup> listeOrdonee();

	
}
