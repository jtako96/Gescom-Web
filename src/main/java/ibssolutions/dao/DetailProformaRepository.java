package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.vente.DetailProforma;
import ibssolutions.entity.vente.Proforma;

public interface DetailProformaRepository extends JpaRepository<DetailProforma, Long>{

	@Query("select p from DetailProforma p where p.proforma.scrussale=:x and p.proforma=:y")
	List<DetailProforma> listeDetailProformaScrussal(@Param("x")  Scrussale findOne,@Param("y") Proforma p );

	@Query("select SUM(p.montantHT) from DetailProforma p where p.proforma.id=:x")
	double sommeHT(@Param("x") Long idproforma);
	
	@Query("select SUM(p.montantTVA) from DetailProforma p where p.proforma.id=:x")
	double sommeTVA(@Param("x") Long idproforma);
	
	@Query("select SUM(p.montantTTC) from DetailProforma p where p.proforma.id=:x")
	double sommeTTC(@Param("x") Long idproforma);
	
	@Query("select SUM(p.montantRemise) from DetailProforma p where p.proforma.id=:x")
	double sommeRemise(@Param("x") Long idproforma);

	@Query("select SUM(p.remise) from DetailProforma p where p.proforma.id=:x")
	double sommeRemiseOk(@Param("x") Long idproforma);

	@Query("select p from DetailProforma p where p.id=:x")
	List<DetailProforma> findAllBy(@Param("x")Long id);
	
	@Query("select p from DetailProforma p where p.proforma.id=:x")
	List<DetailProforma> findAllByProforma(@Param("x")Long id);

	@Query("select p from DetailProforma p where p.proforma=:x")
	List<DetailProforma> listpanierProforma(@Param("x") Proforma proforma);

}
