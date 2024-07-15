package ibssolutions.metiersI;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ibssolutions.dao.ExerciceRepository;
import ibssolutions.entity.parametre.Exercice;
import ibssolutions.metiers.ExerciceMetier;


@Service @Transactional
public class IExerciceMetier implements ExerciceMetier {

	@Autowired 
	private ExerciceRepository moisRepository;
	
	@Override
	public Exercice addExercice(Exercice m) {
		
		return moisRepository.save(m);
	}

	@Override
	public Exercice editeExercice(Long id) {
		
		return moisRepository.findOne(id);
	}

	@Override
	public Exercice getExerciceActif() {
		
		return moisRepository.getExerciceTrue();
	}

	@Override
	public void deleteExercice(Long id) {
		
		moisRepository.delete(id);
		
	}

	@Override
	public void activerExercice(Long id) {
		
		List<Exercice> Lexercices = moisRepository.findAll();
		for (Exercice exercice : Lexercices)
		{
			if ( exercice.isEtat() != false ) 
			{
				exercice.setEtat(false);
				moisRepository.save(exercice);
			}
		
		}
		
		Exercice mo = moisRepository.findOne(id);
		mo.setEtat(true);
		moisRepository.save(mo);
		
	}

	@Override
	public List<Exercice> findAllOrdonly() {
		
		return moisRepository.findAllExercice();
	}

}
