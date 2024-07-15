package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.Exercice;

public interface ExerciceMetier {

	public Exercice addExercice( Exercice e );
	public Exercice editeExercice( Long id );
	public Exercice getExerciceActif();
	public void  deleteExercice ( Long id );
	public void  activerExercice ( Long id );
	
	public List<Exercice> findAllOrdonly ();
	
}
