package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.SocieteRepository;
import ibssolutions.entity.parametre.Scrussale;
import ibssolutions.entity.parametre.Societe;
import ibssolutions.metiers.ScrussaleMetier;

@Service @Transactional
public class IScrussaleMetier implements ScrussaleMetier{

	@Autowired
	ScrussaleRepository scrussaleRepository;

	@Autowired
	SocieteRepository societeRepository;
	
	
	@Override
	public Scrussale addScrussale(Scrussale e) {
		
		Societe s = societeRepository.findOne(1L);
		e.setSociete(s);
		return scrussaleRepository.save(e);
	}

	@Override
	public Scrussale editeScrussale(Long id) {
		
		return scrussaleRepository.findOne(id);
	}

	@Override
	public void deleteScrussale(Long id) {
		scrussaleRepository.delete(id);
		
	}

	@Override
	public List<Scrussale> findAllOrdonly() {
		
		return scrussaleRepository.findAllScrussale();
	}
	


}
