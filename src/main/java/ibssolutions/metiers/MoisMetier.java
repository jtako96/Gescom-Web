package ibssolutions.metiers;

import java.text.ParseException;
import java.util.List;

import ibssolutions.entity.parametre.Mois;

public interface MoisMetier {

	public Mois addMois( Mois m );
	public Mois editeMois( Long id );
	public Mois getMoisActif();
	public void  deleteMois ( Long id );
	public void  activerMois ( Long id )throws ParseException ;
	
	public List<Mois> findAllOrdonly ();
	
}
