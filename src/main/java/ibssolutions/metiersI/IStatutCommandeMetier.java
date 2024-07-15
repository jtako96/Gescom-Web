package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.StatutCommandeRepository;
import ibssolutions.entity.parametre.StatutCommande;
import ibssolutions.metiers.StatutCommandeMetier;

@Service @Transactional
public class IStatutCommandeMetier implements StatutCommandeMetier {
	
	@Autowired
	private StatutCommandeRepository statutCommandeRepository;
	
	@Override
	public StatutCommande addStatutCommande(StatutCommande s) {
		
		return statutCommandeRepository.save(s);
	}

	@Override
	public StatutCommande editeStatutCommande(Long id) {
		
		return statutCommandeRepository.findOne(id);
	}

	@Override
	public void deleteStatutCommande(Long id) {
		statutCommandeRepository.delete(id);
	}

	@Override
	public List<StatutCommande> findAllOrdonly() {

		return statutCommandeRepository.findAllStatutCommande();
	}

}
