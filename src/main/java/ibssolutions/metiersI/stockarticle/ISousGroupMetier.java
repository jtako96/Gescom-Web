package ibssolutions.metiersI.stockarticle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.SousGroupRepository;
import ibssolutions.entity.stockarticle.SousGroup;
import ibssolutions.metiers.stockarticle.SousGroupMetier;

@Service @Transactional
public class ISousGroupMetier implements SousGroupMetier{

	@Autowired
	private SousGroupRepository sousGroupRepository ;
	
	@Override
	public SousGroup addSousGroup(SousGroup s) {
		
		return sousGroupRepository.save(s);
	}

	@Override
	public SousGroup editeSousGroup(Long id) {
		
		return sousGroupRepository.findOne(id);
	}

	@Override
	public void deleteSousGroup(Long id) {
		
		sousGroupRepository.delete(id);
	}

	@Override
	public List<SousGroup> findAllOrdonly() {
		
		return sousGroupRepository.listeOrdonee();
	}

}
