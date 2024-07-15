package ibssolutions.metiers.commande;

import java.util.List;

import ibssolutions.commande.Fournisseur;


public interface FournisseurMetier {

	public Fournisseur addFournisseur( Fournisseur f );
	public Fournisseur editeFournisseur( Long id );
	public void deleteFournisseur ( Long id );
	
	public List<Fournisseur> findAllOrdonly ();
	
}
