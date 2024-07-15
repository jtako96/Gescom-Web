package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.StatutLivraison;


public interface StatutLivraisonMetier {

	public StatutLivraison addStatutLivraison( StatutLivraison s );
	public StatutLivraison editeStatutLivraison( Long id );
	public void deleteStatutLivraison ( Long id );
	
	public List<StatutLivraison> findAllOrdonly ();
	
}
