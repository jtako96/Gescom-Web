package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.ModeReglement;

public interface ModeReglementRepository extends JpaRepository<ModeReglement, Long>{

	@Query("select m from ModeReglement m order by m.libelle")
	List<ModeReglement> findAllModeReglement();

}
