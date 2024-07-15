package ibssolutions.metiers.commande;

import java.util.List;

import ibssolutions.commande.DetailsEntree;

public interface DetailsEntreeMetier {

	public DetailsEntree addDetailsEntree(DetailsEntree d, Long idEntree);
	public DetailsEntree editeDetailsEntree(Long id );
	public void deleteDetailsEntree (Long id );
	
	public boolean actualisationQte(Long id);
	
	public List<DetailsEntree> findAllOrdonlyByEntre (Long id);
	
	
}
