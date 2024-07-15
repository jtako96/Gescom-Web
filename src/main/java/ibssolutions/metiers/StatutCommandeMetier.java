package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.StatutCommande;


public interface StatutCommandeMetier {

	public StatutCommande addStatutCommande( StatutCommande s );
	public StatutCommande editeStatutCommande( Long id );
	public void deleteStatutCommande ( Long id );
	
	public List<StatutCommande> findAllOrdonly ();
	
}
