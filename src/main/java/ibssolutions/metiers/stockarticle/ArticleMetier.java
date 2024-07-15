package ibssolutions.metiers.stockarticle;

import java.util.List;

import ibssolutions.entity.stockarticle.Article;


public interface ArticleMetier {

	public Article addArticle( Article a );
	
	public Article updateArticle( Article a );
	
	public Article editeArticle( Long id );
	public void deleteArticle ( Long id );
	
	public List<Article> findAllOrdonly ();

	public List<Article> findAllOrdonlyBySousGroup(Long id);

	List<Article> findArticleSousGroupAChoisir(Long id, Long idscrussale);
	
}
