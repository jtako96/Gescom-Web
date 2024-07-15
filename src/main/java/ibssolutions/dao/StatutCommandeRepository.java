package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.StatutCommande;

public interface StatutCommandeRepository extends JpaRepository<StatutCommande, Long> {

	@Query("select s from StatutCommande s order by s.libelle")
	public List<StatutCommande> findAllStatutCommande();
}
