package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.comptabilite.DetailEcriture;
import ibssolutions.entity.comptabilite.Ecriture;

public interface DetailEcritureRepository extends JpaRepository<DetailEcriture, Long>{

	@Query("select d from DetailEcriture d where d.ecriture.id=:x")
	List<DetailEcriture> listeDetailEcriture(@Param("x") Long idecriture);

	@Query("select SUM(d.montantCredit) from DetailEcriture d where d.ecriture.id=:x")
	double sommeCredit(@Param("x") Long idecriture);

	@Query("select SUM(d.montantDebit) from DetailEcriture d where d.ecriture.id=:x")
    double sommeDebit(@Param("x") Long idecriture);

	@Query("select d from DetailEcriture d where d.ecriture=:x ")
	List<DetailEcriture> getDetailsByEcriture(@Param("x") Ecriture e);

}
