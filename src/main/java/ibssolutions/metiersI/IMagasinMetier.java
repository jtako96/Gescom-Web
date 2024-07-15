package ibssolutions.metiersI;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.MagasinRepository;
import ibssolutions.entity.parametre.Magasin;
import ibssolutions.metiers.MagasinMetier;

@Service @Transactional
public class IMagasinMetier implements MagasinMetier{

	
	@Autowired 
	private MagasinRepository magasinRepository;
	
	@Override
	public Magasin addMagasin(Magasin m) {
		m.setDateDebut(new Date());
		return magasinRepository.save(m);
	}

	@Override
	public Magasin editeMagasin(Long id) {
		return magasinRepository.findOne(id);
	}

	@Override
	public void deleteMagasin(Long id) {
		magasinRepository.delete(id);
	}

	@Override
	public List<Magasin> findAllByTypeMagasin(Long id) {
		return magasinRepository.getAllMagasin(id);
	}

	@Override
	public List<Magasin> findAllOrdreBy() {
		return magasinRepository.listeAll();
	}

}
