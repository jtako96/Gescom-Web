package ibssolutions.metiersI.comptabilite;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.SubdivisionRepository;
import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.Subdivision;
import ibssolutions.metiers.comptabilite.CompteMetier;

@Service @Transactional
public class ICompteMetier implements CompteMetier {

	@Autowired
	private CompteRepository compteRepository;
	
	@Autowired
	SubdivisionRepository subRepository;
	
	@Override
	public Compte addCompte(Compte c) {
		
		Subdivision sb = subRepository.findOne(c.getSubdivision().getId());
		
		c.setCode(sb.getNumero());
		 
        String s1 = Integer.toString(sb.getNumero());
		 
		String s2 = Integer.toString(c.getIndex());
		 
		String str = s1+s2;
		
		 c.setNumero(Integer.parseInt(str));
		
		return compteRepository.save(c);
	}

	@Override
	public Compte editeCompte(Long id) {
		
		return compteRepository.findOne(id);
	}

	@Override
	public void deleteCompte(Long id) {
		
		compteRepository.delete(id);
	}

	@Override
	public List<Compte> findAllOrdonly() {
		
		return compteRepository.findAll();
	}

	@Override
	public List<Compte> findAllOrdonlyBySubdivision(Long id) {
		
		return compteRepository.listBySubdivision(id);
	}
	
	@Override
	public Compte updateCompte(Compte c) {

		return compteRepository.save(c);
	}

}
