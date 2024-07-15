package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.entity.vente.Panier;
import ibssolutions.entity.vente.Vente;

public interface PanierRepository extends JpaRepository<Panier, Long>{

	@Query("select p.stock from Panier p where p.vente=:x")
	List<Stock> getArticleVendu(@Param("x") Vente v);

	@Query("select SUM(p.montantHT) from Panier p where p.vente.id=:x")
	double sommeHT(@Param("x") Long idvente);

	@Query("select SUM(p.remise) from Panier p where p.vente.id=:x")
	double sommeRemiseOk(@Param("x") Long idvente);

	@Query("select SUM(p.montantRemise) from Panier p where p.vente.id=:x")
	double sommeRemise(@Param("x") Long idvente);

	@Query("select SUM(p.montantTVA) from Panier p where p.vente.id=:x")
	double sommeTVA(@Param("x") Long idvente);

	@Query("select SUM(p.montantTTC) from Panier p where p.vente.id=:x")
	double sommeTTC(@Param("x") Long idvente);

	@Query("select p from Panier p where p.vente.scrussale=:x and p.vente=:y")
	List<Panier> listePanierScrussal(@Param("x") Scrussale findOne,@Param("y")  Vente findOne2);

	
	@Query("select p from Panier p where  p.vente.id=:x")
	List<Panier> findFacture(@Param("x")  Long id);

}
