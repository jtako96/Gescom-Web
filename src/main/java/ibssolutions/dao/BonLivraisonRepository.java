package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.commande.BonLivraison;
import ibssolutions.entity.vente.Vente;

public interface BonLivraisonRepository extends JpaRepository<BonLivraison, Long> {

	@Query("select e from BonLivraison e where e.exercice.etat=true and e.scrussale.id=:x")
	List<BonLivraison> listeAllLivraison(@Param("x") Long id);

	@Query("select e from Vente e where e.exercice.etat=true and e.scrussale.id=:x and e.statutLivraison.id=1L")
	List<Vente> listeAllVenteScrussale(@Param("x") Long id);


	
}
