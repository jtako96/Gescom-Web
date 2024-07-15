package ibssolutions.metiersI.commande;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.commande.Fournisseur;
import ibssolutions.dao.FournisseurRepository;
import ibssolutions.metiers.commande.FournisseurMetier;



@Service @Transactional
public class IFournisseurMetier implements FournisseurMetier {

	@Autowired
	private FournisseurRepository fournisseurRepository;

	@Override
	public Fournisseur addFournisseur(Fournisseur f) {
		
		return fournisseurRepository.save(f);
	}

	@Override
	public Fournisseur editeFournisseur(Long id) {
		
		return fournisseurRepository.findOne(id);
	}

	@Override
	public void deleteFournisseur(Long id) {
		fournisseurRepository.delete(id);
		
	}

	@Override
	public List<Fournisseur> findAllOrdonly() {
		
		return fournisseurRepository.listOrdorly();
	}
	
	
}
