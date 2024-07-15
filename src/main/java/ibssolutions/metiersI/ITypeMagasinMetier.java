package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.TypeMagasinRepository;
import ibssolutions.entity.parametre.TypeMagasin;
import ibssolutions.metiers.TypeMagasinMetier;

@Service @Transactional
public class ITypeMagasinMetier implements TypeMagasinMetier{

	@Autowired 
	private TypeMagasinRepository typeMagasinRepository;
	
	@Override
	public TypeMagasin addTypeMagasin(TypeMagasin m) {
		
		return typeMagasinRepository.save(m);
	}

	@Override
	public TypeMagasin editeTypeMagasin(Long id) {
		
		return typeMagasinRepository.findOne(id);
	}

	@Override
	public void deleteTypeMagasin(Long id) {
		
		typeMagasinRepository.delete(id);
	}

	@Override
	public List<TypeMagasin> findAllOrdonly() {
		
		return typeMagasinRepository.findAllOrder();
	}

}
