package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.Banque;


public interface BanqueMetier {

	public Banque addBanque( Banque b );
	public Banque editeBanque( Long id );
	public void deleteBanque ( Long id );
	
	public List<Banque> findAllOrdonly ();
	
}
