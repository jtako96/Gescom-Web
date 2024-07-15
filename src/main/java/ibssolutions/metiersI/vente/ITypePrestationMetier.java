package ibssolutions.metiersI.vente;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ibssolutions.dao.TypePrestationRepository;
import ibssolutions.entity.vente.TypePrestation;
import ibssolutions.metiers.vente.TypePrestationMetier;

@Service @Transactional
public class ITypePrestationMetier implements TypePrestationMetier{

	@Autowired
	private TypePrestationRepository typeRepository;
	
	@Override
	public TypePrestation addTypePrestation(TypePrestation tp) {
		
		return typeRepository.save(tp);
	}

	@Override
	public TypePrestation editeTypePrestation(Long id) {
		
		return typeRepository.findOne(id);
	}

	@Override
	public void deleteTypePrestation(Long id) {
		typeRepository.delete(id);
	}

	@Override
	public List<TypePrestation> findAllOrdonly() {
		
		return typeRepository.findAll();
	}

}
