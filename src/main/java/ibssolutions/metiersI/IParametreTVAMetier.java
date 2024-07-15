package ibssolutions.metiersI;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ParametreTVARepository;
import ibssolutions.dao.ScrussaleRepository;
import ibssolutions.dao.UserRepository;
import ibssolutions.entity.parametre.ParametreTVA;
import ibssolutions.entity.parametre.User;
import ibssolutions.metiers.ParametreTVAMetier;
import ibssolutions.utils.GetLoggers;

@Service @Transactional
public class IParametreTVAMetier implements ParametreTVAMetier {
	
	@Autowired
	private ParametreTVARepository parametreTVARepository;
	
	@Autowired
	ScrussaleRepository scrussaleRepository;
		
	@Autowired
	UserRepository userrep;
	
	
	@Override
	public ParametreTVA addParametreTVA(ParametreTVA p) {
		
		return parametreTVARepository.save(p);
	}

	@Override
	public ParametreTVA editeParametreTVA(Long id) {
		
		return parametreTVARepository.findOne(id);
	}

	@Override
	public void deleteParametreTVA(Long id) {
		parametreTVARepository.delete(id);
	}

	@Override
	public List<ParametreTVA> findAllOrdonly() {

		return parametreTVARepository.findAll();
	}

	@Override
	public double getTVAScrussale(HttpSession httpSession) {
		
		   Map<String, Object> recuperer =  GetLoggers.getUserLogger(httpSession);
		   User users = userrep.findOne(recuperer.get("username").toString());
			
		return parametreTVARepository.getTVA(scrussaleRepository.findOne(users.getIdScrussale()));
	}

}
