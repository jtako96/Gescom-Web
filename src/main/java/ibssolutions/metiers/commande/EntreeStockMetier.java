package ibssolutions.metiers.commande;

import java.util.List;

import ibssolutions.commande.EntreeStock;


public interface EntreeStockMetier {

	public EntreeStock addEntreeStock( EntreeStock e );
	public EntreeStock editeEntreeStock( Long id );
	public void deleteEntreeStock ( Long id );
	
	public List<EntreeStock> findAllOrdonly ();
	
}
