package ibssolutions.metiersI.comptabilite;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.SubdivisionRepository;
import ibssolutions.entity.comptabilite.Subdivision;
import ibssolutions.metiers.comptabilite.SubdivisionMetier;

@Service @Transactional
public class ISubdivisionMetier implements SubdivisionMetier {

	@Autowired
	private SubdivisionRepository subdivisionRepository;
	
	@Override
	public Subdivision addSubdivision(Subdivision s) {
		
		 String s1 = Integer.toString(s.getCode());
		 
		 String s2 = Integer.toString(s.getIndex());
		 
		 String str = s1+s2;
		    
		s.setNumero(Integer.parseInt(str));
		
		return subdivisionRepository.save(s);
	}

	@Override
	public Subdivision editeSubdivision(Long id) {
		
		return subdivisionRepository.findOne(id);
	}

	@Override
	public void deleteSubdivision(Long id) {
		
		subdivisionRepository.delete(id);
	}

	@Override
	public List<Subdivision> findAllOrdonly() {
		
		return subdivisionRepository.findAll();
	}

	@Override
	public List<Subdivision> findAllOrdonlyBySousClasse(Long id) {
		
		return subdivisionRepository.listBySousClasse(id);
	}

}
