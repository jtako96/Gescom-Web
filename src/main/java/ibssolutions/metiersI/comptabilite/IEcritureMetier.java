package ibssolutions.metiersI.comptabilite;

import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ClientRepository;
import ibssolutions.dao.EcritureRepository;
import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.entity.clientelle.Client;
import ibssolutions.entity.comptabilite.Ecriture;
import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.metiers.comptabilite.EcritureMetier;

@Service @Transactional
public class IEcritureMetier implements EcritureMetier{

	@Autowired
	EcritureRepository ecritureRepository;
	
	@Autowired
	private ParametreRepository  parametreRepository;
	
	@Autowired
	ExerciceRepository exerciceRepository;
	
	@Autowired
	ClientRepository clientRepository;
	
	@Override
	public Ecriture addEcriture(Ecriture e) {
		Parametre p = parametreRepository.findByEcriture();
		Exercice v = exerciceRepository.getExerciceTrue();
		e.setCode("ECR-"+v.getLibelle()+"-"+p.getValeur());
		e.setDateEcriture(new Date());
		e.setExercice(v);
		e.setGenerer("O");
		return ecritureRepository.save(e);
	}

	@Override
	public Ecriture editeEcriture(Long id) {
		
		return ecritureRepository.findOne(id);
	}

	@Override
	public void deleteEcriture(Long id) {
		ecritureRepository.delete(id);
	}

	@Override
	public List<Ecriture> findAllOrdonly(Long idscrussale, Long id ) {
		
		return ecritureRepository.listeByScrussale(idscrussale,id);
	}
	
	@Override
	public List<Ecriture> findAllOrdonlyTrue(Long idscrussale, Long id ) {
		
		return ecritureRepository.listeByScrussaleTrue(idscrussale,id);
	}

	@Override
	public void validateEcriture(Long id) {
		
		Ecriture e = ecritureRepository.findOne(id);
		e.setEtat(true);
		ecritureRepository.save(e);
		
		Client c = clientRepository.findOne(e.getVente().getClient().getId());
		c.setSoldeDebiteur(e.getTotalDebit());
		clientRepository.save(c);
		
	}

}
