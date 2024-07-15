package ibssolutions.metiers;

import java.util.List;

import ibssolutions.entity.parametre.Scrussale;

public interface ScrussaleMetier {

	public Scrussale addScrussale( Scrussale e );
	public Scrussale editeScrussale( Long id );
	public void  deleteScrussale ( Long id );;
	
	public List<Scrussale> findAllOrdonly ();
	
}
