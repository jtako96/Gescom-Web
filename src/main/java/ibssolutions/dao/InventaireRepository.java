package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.commande.DetailsInventaire;
import ibssolutions.commande.Inventaire;

public interface InventaireRepository  extends JpaRepository<Inventaire, Long> {

	@Query("select i from Inventaire i where i.exercice.etat=true and i.mois.etat=true and i.scrussale.id=:x order by i.id desc")
	List<Inventaire> findAllInventaire(@Param("x")long idScrussale);

	@Query("select i from DetailsInventaire i where i.inventaire.id=:x and i.inventaire.scrussale.id=:y and i.stock.magasin.id=:z ")
	List<DetailsInventaire> ficheInventorial(@Param("x")Long idinventaire,@Param("y") long idScrussale,@Param("z") long idmag);

	@Query("select i from DetailsInventaire i where i.inventaire.id=:x and i.inventaire.scrussale.id=:y and i.stock.magasin.id=:z")
	List<DetailsInventaire> listeDetails(@Param("x")Long idinv,@Param("y") Long idScrussale,@Param("z")Long idmagasin);

	@Query("select i from Inventaire i where i.exercice.etat=true and i.mois.id=:y and i.scrussale.id=:x order by i.id desc")
	List<Inventaire> findAllInventaireByID(@Param("x") Long idscrussale, @Param("y") Long idmois);

	@Query("select i from DetailsInventaire i where i.inventaire.id=:x")
	List<DetailsInventaire> findByIDinventaire(@Param("x") Long id);

}
