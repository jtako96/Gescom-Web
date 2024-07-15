package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.Magasin;

public interface MagasinRepository extends JpaRepository<Magasin, Long>{

	@Query("select m from Magasin m where m.scrussale.id=:x ")
	List<Magasin> getAllMagasin(@Param(value = "x") Long id);

	@Query("select m from Magasin m order by m.libelle")
	List<Magasin> listeAll();


}
