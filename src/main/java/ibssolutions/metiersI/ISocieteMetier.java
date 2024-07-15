package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.SocieteRepository;
import ibssolutions.entity.parametre.Societe;
import ibssolutions.metiers.SocieteMetier;


@Service @Transactional
public class ISocieteMetier implements SocieteMetier{

	@Autowired
	SocieteRepository societeRepository;
	
	@Override
	public Societe addSociete(Societe s) {
		
		return societeRepository.save(s);
	}

	@Override
	public Societe editeSociete(Long id) {
		
		return societeRepository.findOne(id);
	}

	@Override
	public void deleteSociete(Long id) {
		societeRepository.delete(id);
		
	}

	@Override
	public List<Societe> findAllOrdonly() {
		
		return societeRepository.findAllSociete();
	}

}
