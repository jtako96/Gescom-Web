package ibssolutions.metiers.comptabilite;

import java.util.List;

import ibssolutions.entity.comptabilite.Classe;

public interface ClasseMetier {

	public Classe addClasse( Classe c );
	public Classe editeClasse( Long id );
	public void deleteClasse ( Long id );
	
	public List<Classe> findAllOrdonly ();
	
}
