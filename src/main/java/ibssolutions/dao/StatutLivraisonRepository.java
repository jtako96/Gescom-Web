package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import ibssolutions.entity.parametre.StatutLivraison;

public interface StatutLivraisonRepository extends JpaRepository<StatutLivraison, Long> {

	@Query("select s from StatutLivraison s order by s.libelle")
	public List<StatutLivraison> findAllStatutLivraison();

	@Query("select s from StatutLivraison s where s.id=1L order by s.libelle")
	public StatutLivraison getStatutLivraisonNonLivrer();
}
