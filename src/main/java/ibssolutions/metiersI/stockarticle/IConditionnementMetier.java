package ibssolutions.metiersI.stockarticle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ConditionnementRepository;
import ibssolutions.entity.stockarticle.Conditionnement;
import ibssolutions.metiers.stockarticle.ConditionnementMetier;

@Service @Transactional
public class IConditionnementMetier implements ConditionnementMetier{

	@Autowired
	private ConditionnementRepository conditionnementRepository;
	
	
	@Override
	public Conditionnement addConditionnement(Conditionnement c) {
		
		return conditionnementRepository.save(c);
	}

	@Override
	public Conditionnement editeConditionnement(Long id) {
		
		return conditionnementRepository.findOne(id);
	}

	@Override
	public void deleteConditionnement(Long id) {
		
		conditionnementRepository.delete(id);
	}

	@Override
	public List<Conditionnement> findAllOrdonly() {
		
		return conditionnementRepository.listeOrdonee();
	}

}
