package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ModeReglementRepository;
import ibssolutions.entity.parametre.ModeReglement;
import ibssolutions.metiers.ModeReglementMetier;

@Service @Transactional
public class IModeReglementMetier implements ModeReglementMetier{

	@Autowired
	ModeReglementRepository modeReglementRepository;
	
	@Override
	public ModeReglement addModeReglement(ModeReglement m) {
		
		return modeReglementRepository.save(m);
	}

	@Override
	public ModeReglement editeModeReglement(Long id) {
		
		return modeReglementRepository.findOne(id);
	}

	@Override
	public void deleteModeReglement(Long id) {
		modeReglementRepository.delete(id);
	}

	@Override
	public List<ModeReglement> findAllOrdonly() {
		
		return modeReglementRepository.findAllModeReglement();
	}

}
