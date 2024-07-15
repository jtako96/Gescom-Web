package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.vente.Proforma;
import ibssolutions.entity.vente.Vente;

public interface VenteRepository extends JpaRepository<Vente, Long>{

	@Query("select p from Vente p where p.scrussale=:x and p.exercice.etat=true order by p.id desc")
	List<Vente> listeVenteScrussal(@Param("x")  Scrussale findOne);

	@Query("select p from Vente p where p.exercice.etat=true and p.proforma=:x")
	List<Vente> findAllByExercice(@Param("x") Proforma proforma);

	@Query("select p from Vente p where p.client.id=:x and p.exercice.etat=true and p.etatReglement=false")
	List<Vente> listeVentNonSolde(@Param("x")  Long id);

	@Query("select p from Vente p where p.id=:x")
    List<Vente> findVente(@Param("x") Long id);


}
