package ibssolutions.metiersI.vente;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ExerciceRepository;
import ibssolutions.dao.MagasinRepository;
import ibssolutions.dao.ParametreRepository;
import ibssolutions.dao.ProformaRepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.parametre.Exercice;
import ibssolutions.entity.parametre.Parametre;
import ibssolutions.entity.parametre.User;
import ibssolutions.entity.vente.Proforma;
import ibssolutions.metiers.vente.ProformaMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IProformaMetier implements ProformaMetier {

	@Autowired
	private ProformaRepository proformaRepository;

	@Autowired
	private ParametreRepository parametreRepository;
	
	@Autowired
	private ExerciceRepository exerciceRepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
	
	@Autowired
	MagasinRepository magasinRepository;
	
	@Autowired
	UserRepository userrep;
	
	@Override
	public Proforma addProforma(Proforma p,HttpSession httpsession) {
		
        Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpsession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		Parametre pa = parametreRepository.findByProforma();
		Exercice e = exerciceRepository.getExerciceTrue();
		p.setCode("FP/"+e.getLibelle()+"-"+pa.getValeur());
		p.setDateProforma(new Date());
		p.setScrussale(scrussaleRepository.findOne(users.getIdScrussale()));
		p.setUsername(users.getUsername());
		p.setExercice(exerciceRepository.getExerciceTrue());
		pa.setValeur(pa.getValeur() +1 );
		parametreRepository.save(pa);
		
		return proformaRepository.save(p);
		
	}

	@Override
	public Proforma editeProforma(Long id) {
		
		return proformaRepository.findOne(id);
	}

	@Override
	public void deleteProforma(Long id) {
		proformaRepository.delete(id);
	}

	@Override
	public List<Proforma> proformatByScrussale(HttpSession httpSession) {

        Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		User users = userrep.findOne(recuperer.get("username").toString());
		
		return proformaRepository.listeProformaScrussal(scrussaleRepository.findOne(users.getIdScrussale()));
	}

	@Override
	public Proforma updateProforma(Proforma p) {
		
		return proformaRepository.save(p);
	}

}
