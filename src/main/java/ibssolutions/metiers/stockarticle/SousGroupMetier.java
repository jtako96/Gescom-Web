package ibssolutions.metiers.stockarticle;

import java.util.List;

import ibssolutions.entity.stockarticle.SousGroup;


public interface SousGroupMetier {

	public SousGroup addSousGroup( SousGroup s );
	public SousGroup editeSousGroup( Long id );
	public void deleteSousGroup ( Long id );
	
	public List<SousGroup> findAllOrdonly ();
	
}
