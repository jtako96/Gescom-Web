package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.commande.DetailsLivraison;
import ibssolutions.entity.vente.Panier;

public interface DetailLivraisonRepository extends JpaRepository<DetailsLivraison, Long>{

	@Query("select d from DetailsLivraison d where d.panier.vente.id=:x and d.panier.vente.scrussale.id=:y")
	List<DetailsLivraison> getAllDetails(@Param("x") Long idvente,@Param("y")  Long id);

	@Query("select d from DetailsLivraison d where d.panier.vente.id=:x and d.panier=:y")
	DetailsLivraison getDetailsLivraison(@Param("x") Long id,@Param("y")Panier panier);


}
