package ibssolutions.metiersI.commande;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.commande.DetailsEntree;
import ibssolutions.commande.EntreeStock;
import ibssolutions.dao.ArticleRepository;
import ibssolutions.dao.DetailsEntreeRepository;
import ibssolutions.dao.EntreeStockRepository;
import ibssolutions.entity.stockarticle.Article;
import ibssolutions.metiers.commande.DetailsEntreeMetier;


@Service @Transactional
public class IDetailsEntreeMetier  implements DetailsEntreeMetier{

	@Autowired
	private DetailsEntreeRepository detailsEntreeRepository ;
	
	@Autowired
	private EntreeStockRepository entreeStockRepository;
	
	@Autowired
	private ArticleRepository articleRepository;

	@Override
	public DetailsEntree addDetailsEntree(DetailsEntree d,Long idEntree) {
		d.setEntreeStock(entreeStockRepository.findOne(idEntree));
		
		return detailsEntreeRepository.save(d);
	}

	@Override
	public DetailsEntree editeDetailsEntree(Long id) {
		
		return detailsEntreeRepository.findOne(id);
	}

	@Override
	public void deleteDetailsEntree(Long id) {
		
		detailsEntreeRepository.delete(id);
	}

	@Override
	public boolean actualisationQte(Long id) {
		boolean result = false;
		EntreeStock entreeStock = entreeStockRepository.findOne(id);
		List<DetailsEntree> Ldetail = detailsEntreeRepository.listByEntree(id);
		if (entreeStock.isEtat() == false) {
			for (DetailsEntree detailsEntree : Ldetail) 
			{
				
				  Article a = articleRepository.findOne(detailsEntree.getArticle().getId());
				  a.setStockOld(a.getStock());
				  a.setStock((int) (a.getStock() + detailsEntree.getQteEntree()));
				  articleRepository.save(a);
				  detailsEntree.setActualiser(true);
				  detailsEntree.setEtat(true);
				  detailsEntreeRepository.save(detailsEntree);
				  
			}
			
			entreeStock.setEtat(true);
			entreeStockRepository.save(entreeStock);
			
		}else {
			result = true;
		}
		
		return result;
	}

	@Override
	public List<DetailsEntree> findAllOrdonlyByEntre(Long id) {
		
		return detailsEntreeRepository.listByEntree(id);
	}


}
