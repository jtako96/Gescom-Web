package ibssolutions.metiersI.stockarticle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ArticleRepository;
import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.SousCompteRepository;
import ibssolutions.dao.StockRepository;
import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.SousCompte;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.entity.stockarticle.Article;
import ibssolutions.metiers.stockarticle.ArticleMetier;
import ibssolutions.utils.StringUtils;

@Service @Transactional
public class IArticleMetier implements ArticleMetier {

	@Autowired
	private ArticleRepository articleRepository;
	
	@Autowired
	private SousCompteRepository sousCompteRepository;
	
	@Autowired
	private ParametreRepository parametreRepository; 
	
	@Autowired
	private CompteRepository compteRepository;
	
	@Autowired
	private StockRepository stockRepository;
	
	@Override
	public Article addArticle(Article a) {
		
		Parametre p = parametreRepository.findByArticle();
		
		Article article = articleRepository.save(a);
		
		Compte c = compteRepository.findOne(a.getCompte().getId());
		
		String matricule = StringUtils.genererCodeLogiciel(p.getValeur());
		
		System.out.println("SKKKKKKKKK: "+c.getNumero());
		System.out.println("matricule: "+matricule);
       
		String s1 = Integer.toString(c.getNumero());
		String str = s1 + matricule;
		 
		sousCompteRepository.save(new SousCompte(c.getNumero(),
				Integer.parseInt(str), "A", article.getId(), "Compte Aticle", p.getValeur(), a.getCompte()));
		
		p.setValeur(p.getValeur() +1 );
		parametreRepository.save(p);
		
		return article;
	}

	@Override
	public Article editeArticle(Long id) {
		
		return articleRepository.findOne(id);
	}

	@Override
	public void deleteArticle(Long id) {
		
		Parametre p = parametreRepository.findByArticle();
	
		sousCompteRepository.deleteByIndex(p.getValeur());
		p.setValeur(p.getValeur() - 1);
		parametreRepository.save(p);
		
		articleRepository.delete(id);
	}

	@Override
	public List<Article> findAllOrdonly() {
		
		return articleRepository.findAllArticle();
	}

	@Override
	public Article updateArticle(Article a) {
		
		return articleRepository.save(a);
	}

	@Override
	public List<Article> findAllOrdonlyBySousGroup(Long id) {
	
		return articleRepository. findAlBySousGroup(id);
	}
	
	@Override
	public List<Article> findArticleSousGroupAChoisir(Long id,Long idscrussale) {
	
		List<Article> Larticle = articleRepository.findBySousGroup(id);
		
		List<Article> LarticleEnStock = stockRepository.findAllByScrussaleSousGroup(id,idscrussale);
		
		Larticle.removeAll(LarticleEnStock);
		
		return Larticle;
	}

}
