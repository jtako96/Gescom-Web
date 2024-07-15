package ibssolutions.metiersI.comptabilite;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ClasseRepository;
import ibssolutions.entity.comptabilite.Classe;
import ibssolutions.metiers.comptabilite.ClasseMetier;

@Service @Transactional
public class IClasseMetier implements ClasseMetier {

	@Autowired
	private ClasseRepository classeRepository;
	
	@Override
	public Classe addClasse(Classe c) {
		
		return classeRepository.save(c);
	}

	@Override
	public Classe editeClasse(Long id) {
		
		return classeRepository.findOne(id);
	}

	@Override
	public void deleteClasse(Long id) {
		
		classeRepository.delete(id);
	}

	@Override
	public List<Classe> findAllOrdonly() {
		
		return classeRepository.findAll();
	}

}
