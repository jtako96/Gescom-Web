package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.Societe;

public interface SocieteRepository extends JpaRepository<Societe, Long> {

	@Query("select s from Societe s order by s.id desc")
	public List<Societe> findAllSociete();
}
