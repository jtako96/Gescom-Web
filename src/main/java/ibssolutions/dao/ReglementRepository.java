package ibssolutions.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.comptabilite.Reglement;
import ibssolutions.entity.vente.Vente;


public interface ReglementRepository extends JpaRepository<Reglement, Long> {


	@Query(" select r from Reglement r ")
	List<Reglement> listOrdorly();
	
	//Liste reglement par dette de client
	@Query(" select r from Reglement r where r.vente.id=:x ")
	List<Reglement> findByDette(@Param("x") Long id);
	
    //renvoi le total des reglement par dette
	@Query("select sum(r.montantPayement) from Reglement r where r.vente.id=:x")
	public Double totalpayer(@Param("x") Long mc);

	@Query(" select r from Reglement r where r.id=:x")
	List<Reglement> findOneReglement(@Param("x") Long id);

	//Journal des payements
	@Query("select r from Reglement r where r.datePayement=:x")
	public List<Reglement> journaldespayement(@Param("x") Date mc);

	@Query(" select sum(r) from Reglement r where r.vente=:x")
	double sommeTotaleReglement(@Param("x") Vente vente);
	
	@Query("select p from Reglement p where p.datePayement=:x and p.vente.client.id=:y")
	List<Reglement> payementrecu(@Param("x") Date dateObj,@Param("y") Long id1);

	@Query("select sum(r.montantPayement) from Reglement r where  r.vente.id=:x ")
	Integer montantpaye(@Param("x") Long id1);

	@Query("select sum(p.montantPayement) from Reglement p where p.vente.id=:x "
			+ "and p.datePayement<=:d")
	double totalpayerecu(Long id1);

	

}
