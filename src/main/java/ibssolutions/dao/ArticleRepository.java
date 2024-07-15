package ibssolutions.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ibssolutions.entity.stockarticle.Article;


public interface ArticleRepository extends JpaRepository<Article, Long> {

	@Query("select a from Article a order by a.designation")
	public List<Article> findAllArticle();

	@Query("select a from Article a where a.sousGroup.id=:x order by a.designation")
	public List<Article> findAlBySousGroup(@Param("x") Long id);

	@Query("select a from Article a where a.sousGroup.id=:x order by a.designation")
	public List<Article> findBySousGroup(@Param("x") Long id);

}
