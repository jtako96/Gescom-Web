package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.vente.DetailPrestation;
import ibssolutions.entity.vente.Prestation;

public interface DetailPrestationRepository extends JpaRepository<DetailPrestation, Long>{

	@Query("select p from DetailPrestation p where p.prestation.scrussale=:x and p.prestation=:y")
	List<DetailPrestation> listeDetailPrestationScrussal(@Param("x")  Scrussale findOne,@Param("y") Prestation p );

	@Query("select SUM(p.montantHT) from DetailPrestation p where p.prestation.id=:x")
	double sommeHT(@Param("x") Long idprestation);
	
	@Query("select SUM(p.montantTVA) from DetailPrestation p where p.prestation.id=:x")
	double sommeTVA(@Param("x") Long idprestation);
	
	@Query("select SUM(p.montantTTC) from DetailPrestation p where p.prestation.id=:x")
	double sommeTTC(@Param("x") Long idprestation);
	
	@Query("select SUM(p.montantRemise) from DetailPrestation p where p.prestation.id=:x")
	double sommeRemise(@Param("x") Long idprestation);

	@Query("select SUM(p.remise) from DetailPrestation p where p.prestation.id=:x")
	double sommeRemiseOk(@Param("x") Long idprestation);

	@Query("select p from DetailPrestation p where p.id=:x")
	List<DetailPrestation> findAllBy(@Param("x")Long id);
	
	@Query("select p from DetailPrestation p where p.prestation.id=:x")
	List<DetailPrestation> findAllByPrestation(@Param("x")Long id);

	@Query("select p from DetailPrestation p where p.prestation=:x")
	List<DetailPrestation> listpanierPrestation(@Param("x") Prestation prestation);

}
