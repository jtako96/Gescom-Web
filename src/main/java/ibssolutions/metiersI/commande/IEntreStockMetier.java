package ibssolutions.metiersI.commande;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.commande.EntreeStock;
import ibssolutions.dao.EntreeStockRepository;
import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.metiers.commande.EntreeStockMetier;
import ibssolutions.utils.StringUtils;


@Service @Transactional
public class IEntreStockMetier implements EntreeStockMetier{

	@Autowired
	private EntreeStockRepository entreStockRepository ;
	
	@Autowired
	private ExerciceRepository exerciceRepository;

	@Autowired
	private ParametreRepository parametreRepository;
	
	@Override
	public EntreeStock addEntreeStock(EntreeStock e) {
		
		Parametre p = parametreRepository.findByEntrer();
	
		    e.setDate(new Date());
			e.setCode("ME"+""+StringUtils.genererCodeLogiciel(p.getValeur()));
			e.setExercice(exerciceRepository.getExerciceTrue());
		
		p.setValeur(p.getValeur() + 1);
		parametreRepository.save(p);
		
		return entreStockRepository.save(e);
	}

	@Override
	public EntreeStock editeEntreeStock(Long id) {
		
		return entreStockRepository.findOne(id);
	}

	@Override
	public void deleteEntreeStock(Long id) {
		
//		EntreeStock e = entreStockRepository.findOne(id);
//		Parametre p = parametreRepository.findByEntrer();
//		p.setValeur(p.getValeur() - 1);
//		parametreRepository.save(p);
		
		entreStockRepository.delete(id);
		
	}

	@Override
	public List<EntreeStock> findAllOrdonly() {
		
		return entreStockRepository.listOrdonly();
	}
	
	
}
