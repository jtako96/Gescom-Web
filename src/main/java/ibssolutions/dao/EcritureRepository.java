package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.commande.BonLivraison;
import ibssolutions.entity.comptabilite.Ecriture;
import ibssolutions.entity.comptabilite.Reglement;
import ibssolutions.entity.vente.Vente;

public interface EcritureRepository extends JpaRepository<Ecriture, Long> {

	@Query("select e from Ecriture e where e.vente.id=:x")
	List<Ecriture> findByVente(@Param("x")Long id);

	@Query("select e from Ecriture e where e.scrussale.id=:x and e.mois.id=:y and e.exercice.etat=true and e.etat=false order by e.id desc")
	List<Ecriture> listeByScrussale(@Param("x") Long idscrussale,@Param("y") Long id);

	@Query("select e from Ecriture e where e.vente.scrussale.id=:x and e.mois.id=:y and e.exercice.etat=true and e.etat=true order by e.id desc")
	List<Ecriture> listeByScrussaleTrue(@Param("x") Long idscrussale,@Param("y") Long id);

	@Query("select e from Ecriture e where e.bonLivraison=:x")
	List<Ecriture> findByBonLivraison(@Param("x")  BonLivraison b);

	@Query("select e from Ecriture e where e.reglement=:x")
	List<Ecriture> findByReglement(@Param("x")Reglement reg);

	@Query("select e from Ecriture e where e.reglement.vente=:x")
	Ecriture getEcriture(@Param("x") Vente vente);

	@Query("select e from Ecriture e where e.prestation.id=:x")
	List<Ecriture> findByPrestation(@Param("x") Long id);

	@Query("select e from Ecriture e where e.generer='O' and e.exercice.etat=true")
	List<Ecriture> findAllSaisir();

	
}
