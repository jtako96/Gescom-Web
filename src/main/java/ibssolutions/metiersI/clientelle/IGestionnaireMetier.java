package ibssolutions.metiersI.clientelle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.GestionnaireRepository;
import ibssolutions.entity.clientelle.Gestionnaire;
import ibssolutions.metiers.clientelle.GestionnaireMetier;

@Service @Transactional
public class IGestionnaireMetier implements GestionnaireMetier{

	@Autowired
	GestionnaireRepository gestionnaireRepository;

	
	@Override
	public Gestionnaire addGestionnaire(Gestionnaire g) {
		
		return gestionnaireRepository.save(g);
	}

	@Override
	public Gestionnaire editeGestionnaire(Long id) {
		
		return gestionnaireRepository.findOne(id);
	}

	@Override
	public void deleteGestionnaire(Long id) {
		
		gestionnaireRepository.delete(id);
	}

	@Override
	public List<Gestionnaire> findAllGestionnaire() {
		
		return gestionnaireRepository.listeOrdonee();
	}

}
