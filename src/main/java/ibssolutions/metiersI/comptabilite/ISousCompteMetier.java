package ibssolutions.metiersI.comptabilite;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibssolutions.dao.CompteRepository;
import ibssolutions.dao.SousCompteRepository;
import ibssolutions.entity.comptabilite.Compte;
import ibssolutions.entity.comptabilite.SousCompte;
import ibssolutions.metiers.comptabilite.SousCompteMetier;
import ibssolutions.utils.StringUtils;


@Service @Transactional
public class ISousCompteMetier implements SousCompteMetier{

	@Autowired
	private SousCompteRepository sousCompteRepository;
		
	@Autowired
	private CompteRepository compteRepository;
	
	@Override
	public SousCompte addSousCompte(SousCompte s) {

		Compte c = compteRepository.findOne(s.getCompte().getId());
		
		String matricule = StringUtils.genererCodeLogiciel(s.getIndex());       
		String s1 = Integer.toString(c.getNumero());
		String str = s1 + matricule;
		s.setCode(c.getNumero());
		s.setStatut("SC");
		s.setNumero(Integer.parseInt(str));
		s.setLibelle(c.getLibelle());
		return sousCompteRepository.save(s);
	}

	@Override
	public SousCompte editeSousCompte(Long id) {
		
		return sousCompteRepository.findOne(id);
	}

	@Override
	public void deleteSousCoompte(Long id) {
		
		sousCompteRepository.delete(id);
	}

	@Override
	public List<SousCompte> findSousCompteAll() {
		
		return sousCompteRepository.findAll();
	}

	@Override
	public List<SousCompte> findSousCompteByCompte(Long id) {
		// TODO Auto-generated method stub
		return sousCompteRepository.findAllByCompte(id);
	}

}
