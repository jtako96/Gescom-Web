package ibssolutions.metiersI.comptabilite;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.SousClasseRepository;
import ibssolutions.entity.comptabilite.SousClasse;
import ibssolutions.metiers.comptabilite.SousClasseMetier;

@Service @Transactional
public class ISousClasseMetier implements SousClasseMetier {

	@Autowired
	private SousClasseRepository sousClasseRepository;
	
	@Override
	public SousClasse addSousClasse(SousClasse s) {
		
		return sousClasseRepository.save(s);
	}

	@Override
	public SousClasse editeSousClasse(Long id) {
		
		return sousClasseRepository.findOne(id);
	}

	@Override
	public void deleteSousClasse(Long id) {
		
		sousClasseRepository.delete(id);
	}

	@Override
	public List<SousClasse> findAllOrdonly() {
		
		return sousClasseRepository.findAll();
	}

	@Override
	public List<SousClasse> findAllOrdonlyByClasse(Long id) {
		
		return sousClasseRepository.listeSousClasseByIdClasse(id);
	}

}
