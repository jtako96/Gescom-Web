package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.StatutLivraisonRepository;
import ibssolutions.entity.parametre.StatutLivraison;
import ibssolutions.metiers.StatutLivraisonMetier;

@Service @Transactional
public class IStatutLivraisonMetier implements StatutLivraisonMetier {
	
	@Autowired
	private StatutLivraisonRepository statutLivraisonRepository;
	
	@Override
	public StatutLivraison addStatutLivraison(StatutLivraison s) {
		
		return statutLivraisonRepository.save(s);
	}

	@Override
	public StatutLivraison editeStatutLivraison(Long id) {
		
		return statutLivraisonRepository.findOne(id);
	}

	@Override
	public void deleteStatutLivraison(Long id) {
		statutLivraisonRepository.delete(id);
	}

	@Override
	public List<StatutLivraison> findAllOrdonly() {

		return statutLivraisonRepository.findAllStatutLivraison();
	}

}
