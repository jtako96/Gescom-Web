package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.BanqueRepository;
import ibssolutions.entity.parametre.Banque;
import ibssolutions.metiers.BanqueMetier;

@Service @Transactional
public class IBanqueMetier implements BanqueMetier {
	
	@Autowired
	private BanqueRepository banqueRepository;
	
	@Override
	public Banque addBanque(Banque b) {
		
		return banqueRepository.save(b);
	}

	@Override
	public Banque editeBanque(Long id) {
		
		return banqueRepository.findOne(id);
	}

	@Override
	public void deleteBanque(Long id) {
		banqueRepository.delete(id);
	}

	@Override
	public List<Banque> findAllOrdonly() {

		return banqueRepository.findAllBanque();
	}

}
