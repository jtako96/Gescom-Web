package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.stockarticle.Article;
import ibssolutions.entity.stockarticle.Stock;
import ibssolutions.entity.vente.Panier;


public interface StockRepository extends JpaRepository<Stock, Long>{

	@Query("select s from Stock s order by s.article.designation")
	List<Stock> findAllStock();

	@Query("select s.article from Stock s where s.article.sousGroup.id=:x and s.scrussale.id=:y order by s.article.designation")
	List<Article> findAllByScrussaleSousGroup(@Param("x") Long id,@Param("y")  Long idscrussale);

	@Query("select s from Stock s where s.magasin.id=:x and s.scrussale.id=:y order by s.article.designation")
	List<Stock> listStockByScrussale(@Param("x")  Long idmagasin,@Param("y")  Long idscrussale);

	@Query("select p from Panier p where p.vente.id=:x")
	List<Panier> findArticleByVente(@Param("x") Long id);
	

}
